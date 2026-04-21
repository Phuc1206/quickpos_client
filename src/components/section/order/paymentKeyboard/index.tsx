import { cn } from "@/lib/utils";
import { PaymentMode } from "@/types/order";
import { useOrderStore } from "@/zustand/orderStore";
import { Banknote, CreditCard, Delete } from "lucide-react";

const QUICK_AMOUNTS = [10000, 20000, 50000, 100000, 200000, 500000];

interface PaymentKeyboardProps {
    onDigit: (digit: string) => void;
    onBackspace: () => void;
    onClear: () => void;
    onQuickAmount: (amount: number) => void;
}

export default function PaymentKeyboard({
    onDigit,
    onBackspace,
    onClear,
    onQuickAmount,
}: PaymentKeyboardProps) {
    const { orderForm, updatePaymentMethodOrderForm } = useOrderStore();

    return (
        <div>
            <div
                className="w-full bg-white flex"
                style={{ minHeight: 520 }}
            >
                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-gray-50 p-1 gap-1">
                        <button
                            onClick={() => {
                                updatePaymentMethodOrderForm(PaymentMode.CASH);
                            }}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all duration-200",
                                orderForm?.paymentMethod === PaymentMode.CASH
                                    ? "bg-green-500 text-white shadow"
                                    : "text-gray-500 hover:bg-gray-100"
                            )}
                        >
                            <Banknote size={18} />
                            <span className="md:hidden lg:block">Tiền mặt</span>
                        </button>
                        <button
                            onClick={() => {
                                updatePaymentMethodOrderForm(PaymentMode.CARD);
                            }}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all duration-200",
                                orderForm?.paymentMethod === PaymentMode.CARD
                                    ? "bg-orange-500 text-white shadow"
                                    : "text-gray-500 hover:bg-gray-100"
                            )}
                        >
                            <CreditCard size={18} />
                            <span className="md:hidden lg:block">Chuyển khoản</span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                        <div className="grid grid-cols-3 gap-2">
                            {QUICK_AMOUNTS.map((amt) => (
                                <button
                                    key={amt}
                                    onClick={() => onQuickAmount(amt)}
                                    className="py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-all"
                                >
                                    {amt >= 1000 ? `${amt / 1000}K` : amt}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-2 flex-1">
                            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
                                <button
                                    key={d}
                                    onClick={() => onDigit(d)}
                                    className="py-5 rounded-xl border border-gray-200 text-xl font-semibold text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700 active:scale-95 transition-all"
                                >
                                    {d}
                                </button>
                            ))}
                            <button
                                onClick={() => onDigit("000")}
                                className="py-5 rounded-xl border border-gray-200 text-xl font-semibold text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700 active:scale-95 transition-all"
                            >
                                000
                            </button>
                            <button
                                onClick={() => onDigit("0")}
                                className="py-5 rounded-xl border border-gray-200 text-xl font-semibold text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700 active:scale-95 transition-all"
                            >
                                0
                            </button>
                            <button
                                onClick={onBackspace}
                                className="py-5 rounded-xl border border-red-100 bg-red-50 text-red-400 hover:bg-red-100 active:scale-95 transition-all flex items-center justify-center"
                            >
                                <Delete size={22} />
                            </button>
                        </div>

                        <button
                            onClick={onClear}
                            className="w-full py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-all"
                        >
                            Xóa tất cả
                        </button>
                    </div>
                </div>

            </div>

        </div>

    );
}