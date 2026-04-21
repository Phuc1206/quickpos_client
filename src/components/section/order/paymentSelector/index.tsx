import { useState, useCallback } from "react";
import { PaymentMode } from "@/types/order";
import PaymentKeyboard from "../paymentKeyboard";
import PaymentBill from "../paymentBill";
import { useOrderStore } from "@/zustand/orderStore";

export default function PaymentSelector() {
    const { orderForm } = useOrderStore();
    const [customerPaid, setCustomerPaid] = useState(0);
    const [printBill, setPrintBill] = useState(true);

    const handleDigit = useCallback((digit: string | number) => {
        setCustomerPaid((prev) => Number(`${prev}${digit}`));
    }, []);

    const handleBackspace = useCallback(() => {
        setCustomerPaid((prev) => {
            const next = prev.toString().slice(0, -1);
            return next ? Number(next) : 0;
        });
    }, []);

    const handleClear = useCallback(() => {
        setCustomerPaid(0);
    }, []);

    const handleQuickAmount = useCallback((amount: number) => {
        setCustomerPaid(amount);
    }, []);

    const handleConfirm = useCallback(() => {
        // TODO: submit payment
    }, []);

    return (
        <div className="bg-white grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 md:border-r md:pr-4 md:border-gray-100">
                <PaymentKeyboard
                    onDigit={handleDigit}
                    onBackspace={handleBackspace}
                    onClear={handleClear}
                    onQuickAmount={handleQuickAmount}
                />
            </div>

            <div className="md:col-span-5 bg-white">
                <PaymentBill
                    mode={orderForm?.paymentMethod ?? PaymentMode.CASH}
                    totalAmount={orderForm?.totalPrice ?? 0}
                    customerPaid={customerPaid}
                    printBill={printBill}
                    onPrintBillChange={setPrintBill}
                    onConfirm={handleConfirm}
                />
            </div>
        </div>
    );
}