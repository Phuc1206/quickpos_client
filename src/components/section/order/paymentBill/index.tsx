import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { UserPlus, Printer, Check } from "lucide-react";
import { PaymentMode, type PaymentModeType } from "@/types/order";
import { useOrderStore } from "@/zustand/orderStore";

const formatVND = (value: number) => value.toLocaleString("vi-VN");

interface PaymentBillProps {
    mode: PaymentModeType;
    totalAmount: number;
    customerPaid: number;
    printBill: boolean;
    onPrintBillChange: (val: boolean) => void;
    onConfirm: () => void;
}

export default function PaymentBill({
    mode,
    totalAmount,
    customerPaid,
    printBill,
    onPrintBillChange,
    onConfirm,
}: PaymentBillProps) {
    const { orderForm } = useOrderStore();

    console.log("orderForm", orderForm);

    const change = customerPaid - totalAmount;

    return (
        <div className="bg-white border-gray-100 flex flex-col p-5 gap-4">
            {/* Total */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-400 mb-1">Tổng thanh toán</p>
                <p className="text-3xl font-bold text-orange-500 tracking-tight">
                    {formatVND(orderForm?.totalPrice ?? 0)} đ
                </p>
            </div>

            {/* Customer */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 font-medium mb-2 flex items-center gap-1">
                    <UserPlus size={13} /> Khách hàng
                </p>
                <button className="w-full flex items-center justify-center gap-1.5 text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg py-2 hover:border-orange-300 hover:text-orange-400 transition-all">
                    <UserPlus size={14} />
                    Chọn / Thêm khách hàng
                </button>
            </div>

            {mode === PaymentMode.CASH && (
                <>
                    {/* Customer gave */}
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <p className="text-xs text-gray-400 mb-1">Tiền khách đưa</p>
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
                        <p className="text-xs text-gray-500 mb-1">Tiền thừa trả khách</p>
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
                </>
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
            <button
                onClick={onConfirm}
                className="mt-auto w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-200 transition-all"
            >
                <Check size={18} />
                Xác nhận thanh toán
            </button>
        </div>
    );
}