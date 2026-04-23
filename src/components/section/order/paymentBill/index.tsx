import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { UserPlus, Printer, Check } from "lucide-react";
import { EditField, PaymentMode, type EditFieldType, type PaymentModeType } from "@/types/order";
import { useOrderStore } from "@/zustand/orderStore";
import { formatVND } from "@/utils";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CustomerModal } from "../customerModal";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

interface PaymentBillProps {
    mode: PaymentModeType;
    printBill: boolean;
    onPrintBillChange: (val: boolean) => void;

    onConfirm: () => void;

    finalTotal?: number;
    customerPaid: number;

    onSelectEditField?: (field: EditFieldType) => void;
    editingField?: EditFieldType;

    isCreatingBill?: boolean;
}

export default function PaymentBill({
    mode,
    printBill,
    onPrintBillChange,
    onConfirm,
    onSelectEditField,
    editingField,
    finalTotal = 0,
    customerPaid,
    isCreatingBill = false,
}: PaymentBillProps) {
    const { orderForm, updateCustomerOrderForm } = useOrderStore();
    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
    const change = customerPaid - finalTotal;

    return (
        <div className=" border-gray-100 flex flex-col gap-4">
            {/* Total */}
            <div
                onClick={() => onSelectEditField?.(EditField.TOTAL)}
                className={cn(
                    "rounded-xl p-4 border shadow-sm flex justify-between items-center cursor-pointer transition-all",
                    editingField === EditField.TOTAL
                        ? "border-orange-400 bg-orange-50 ring-2 ring-orange-200"
                        : "bg-white border-gray-200"
                )}
            >
                <p className="text-xs font-medium text-gray-700">Tổng thanh toán</p>
                <p className="text-xl font-bold text-orange-500">
                    {formatVND(finalTotal)} đ
                </p>
            </div>

            {/* Customer */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex flex-col gap-2">
                <p className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <UserPlus size={13} />
                    Khách hàng
                    <span className="text-primary">{orderForm?.customer?.name && `: ${orderForm.customer.name}`}</span>
                </p>
                {
                    !orderForm?.customer && (
                        <Dialog open={isCustomerModalOpen} onOpenChange={setIsCustomerModalOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full flex items-center justify-center gap-1.5 text-sm bg-white hover:bg-orange-100 text-gray-400 border border-dashed border-gray-200 rounded-lg py-2 hover:border-orange-300 hover:text-orange-400 transition-all"
                                >
                                    <UserPlus className="h-4 w-4 shrink-0" />
                                    <p className="hidden lg:inline text-sm">Chọn / Thêm khách hàng</p>
                                </Button>
                            </DialogTrigger>

                            <CustomerModal onClose={() => setIsCustomerModalOpen(false)} />
                        </Dialog>
                    )
                }

                {orderForm?.customer && (
                    <div className="flex gap-2">
                        {/* Đổi */}
                        <Dialog open={isCustomerModalOpen} onOpenChange={setIsCustomerModalOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="flex-1 text-sm border-gray-200 hover:border-orange-300 hover:text-orange-500"
                                >
                                    Đổi
                                </Button>
                            </DialogTrigger>

                            <CustomerModal onClose={() => setIsCustomerModalOpen(false)} />
                        </Dialog>

                        {/* Bỏ */}
                        <Button
                            variant="ghost"
                            className="flex-1 text-sm border-red-400 text-red-400 hover:text-red-500 hover:bg-red-50"
                            onClick={() => { updateCustomerOrderForm(undefined) }}
                        >
                            Bỏ
                        </Button>
                    </div>
                )}
            </div>

            {mode === PaymentMode.CASH && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Customer gave */}
                    <div
                        onClick={() => onSelectEditField?.(EditField.CUSTOMER_PAID)}
                        className={cn(
                            "bg-white rounded-xl p-4 border border-gray-200 shadow-sm cursor-pointer transition-all",
                            editingField === EditField.CUSTOMER_PAID &&
                            "border-orange-400 ring-2 ring-orange-200 bg-orange-50"
                        )}
                    >
                        <p className="text-xs font-medium text-gray-700">Tiền khách đưa</p>
                        <p className="text-xl font-bold text-gray-800">
                            {formatVND(customerPaid)} đ
                        </p>
                    </div>

                    {/* Change */}
                    <div
                        className={cn(
                            "rounded-xl p-4 border shadow-sm transition-all",
                            change >= 0
                                ? "bg-green-50 border-green-100"
                                : "bg-red-50 border-red-100"
                        )}
                    >
                        <p className="text-xs font-medium text-gray-700">Tiền thừa trả khách</p>
                        <p
                            className={cn(
                                "text-xl font-bold",
                                change >= 0 ? "text-green-600" : "text-red-500"
                            )}
                        >
                            {change >= 0
                                ? formatVND(change)
                                : "–" + formatVND(Math.abs(change))}{" "}
                            đ
                        </p>
                    </div>
                </div>
            )}

            {/* Print toggle */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-start gap-3">
                <Printer size={16} className="text-gray-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">In bill sau thanh toán</p>
                    <p className="text-xs text-gray-400">Tự động mở hộp thoại in</p>
                </div>
                <Switch
                    checked={printBill}
                    onCheckedChange={onPrintBillChange}
                    className="data-[state=checked]:bg-orange-500"
                />
            </div>

            {/* Confirm button */}
            <Button
                disabled={isCreatingBill}
                onClick={onConfirm}
                className="mt-auto w-full py-6 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-200 transition-all"
            >
                {
                    isCreatingBill ? (
                        <>
                            <Spinner className="text-white" />
                        </>
                    ) : (
                        <>
                            <Check size={16} />
                            Xác nhận thanh toán
                        </>
                    )
                }
            </Button>
        </div>
    );
}