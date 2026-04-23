"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, User, Plus } from "lucide-react"
import { useCreateCustomer, useGetCustomerSelection } from "@/services/customerServices"
import type { ICustomerDetail, ICustomerPayload } from "@/types/customer"
import { Spinner } from "@/components/ui/spinner"
import { useOrderStore } from "@/zustand/orderStore"
import { CustomerItem } from "../customerItem"

export function CustomerModal({ onClose }: { onClose: () => void }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
    const { customerSelection } = useGetCustomerSelection();

    const customers = customerSelection?.filter((customer) => {
        const name = customer.name?.toLowerCase() || "";
        const phone = String(customer.phoneNumber || "");

        const query = searchQuery.toLowerCase().trim();

        return (
            name.includes(query) ||
            phone.includes(query)
        );
    });

    return (
        <DialogContent className="sm:max-w-125">
            <DialogHeader>
                <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-500" />
                    <DialogTitle>Chọn khách hàng</DialogTitle>
                </div>
                <DialogDescription>
                    Tìm theo tên hoặc số điện thoại
                </DialogDescription>
            </DialogHeader>

            <>
                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Tìm khách..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-gray-200"
                    />
                </div>

                {/* Add New Customer Button */}


                <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full py-4 border-dashed bg-orange-50 text-primary border-orange-200 hover:bg-orange-100 hover:text-primary"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm khách hàng mới
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-125">
                        <AddCustomerForm
                            onCancel={() => setIsAddCustomerOpen(false)}
                            onSave={() => {
                                setIsAddCustomerOpen(false)
                                onClose?.()
                            }}
                        />
                    </DialogContent>
                </Dialog>

                {/* Customer List / Empty State */}
                <div className="max-h-[60vh] min-h-[60vh] overflow-y-auto">
                    {customers?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-4 text-center">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                <User className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500">Chưa có khách hàng nào</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {
                                customers?.map((customer) => (
                                    <div key={customer._id} onClick={() => {
                                        useOrderStore.getState().updateCustomerOrderForm(customer);
                                        onClose?.();
                                    }}>
                                        <CustomerItem
                                            name={customer.name}
                                            phoneNumber={customer.phoneNumber}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </>

        </DialogContent>
    )
}

function AddCustomerForm({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) {
    const { updateCustomerOrderForm } = useOrderStore();

    const [formCustomer, setFormCustomer] = useState<ICustomerPayload>({
        name: "",
        phoneNumber: "",
        address: ""
    });
    const { name, phoneNumber, address } = formCustomer;
    const { mutateAsync: createCustomer, isPending: isCreatingCustomer } = useCreateCustomer();

    const handleSave = async () => {
        try {
            const newCustomer: ICustomerPayload = { name, phoneNumber, address }
            await createCustomer(newCustomer, {
                onSuccess: (data) => {
                    const createdCustomer = (data as any)?.data?.data as ICustomerDetail;
                    updateCustomerOrderForm(createdCustomer);
                    console.log("Customer created successfully:", createdCustomer);
                },
            });
            onSave();
        } catch (error) {
            console.error("Failed to create customer:", error);
        }
    };

    return (
        <>
            <DialogHeader>
                <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-orange-500" />
                    <DialogTitle>Thêm khách hàng mới</DialogTitle>
                </div>
                <DialogDescription>
                    Điền thông tin khách hàng mới
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
                <Input
                    placeholder="Tên khách hàng"
                    value={name}
                    onChange={(e) => setFormCustomer({ ...formCustomer, name: e.target.value })}
                    className="border-gray-200 h-10"
                />
                <Input
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setFormCustomer({ ...formCustomer, phoneNumber: e.target.value })}
                    className="border-gray-200 h-10"
                />
                <Input
                    placeholder="Địa chỉ"
                    value={address}
                    onChange={(e) => setFormCustomer({ ...formCustomer, address: e.target.value })}
                    className="border-gray-200 h-10"
                />
            </div>

            <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={onCancel} disabled={isCreatingCustomer}>
                    Hủy
                </Button>
                <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto"
                    onClick={handleSave}
                    disabled={isCreatingCustomer}
                >
                    {isCreatingCustomer ? <Spinner className="text-white" /> : `Lưu & chọn`}
                </Button>
            </div>
        </>
    )
}
