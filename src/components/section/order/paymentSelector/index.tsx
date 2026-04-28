import { useState, useCallback, useRef } from "react";
import { EditField, OrderStatus, PaymentMode, type EditFieldType, type IBillDetail, type IBillPayload } from "@/types/order";
import PaymentKeyboard from "../paymentKeyboard";
import PaymentBill from "../paymentBill";
import { useOrderStore } from "@/zustand/orderStore";
import { useCreateBill } from "@/services/orderServices";
import BillPrintTemplate from "../ReceiptTemplate";
import { useReactToPrint } from "react-to-print";

export default function PaymentSelector() {
    const { orderForm, updateTotalPriceChangeOrderForm, updateCustomerPaidOrderForm, setStatusOrder, bill, setBill } = useOrderStore();
    const [printBill, setPrintBill] = useState<boolean>(true);
    const [editField, setEditField] = useState<EditFieldType>(EditField.CUSTOMER_PAID);
    const printRef = useRef<HTMLDivElement>(null);
    const { mutateAsync: createBill, isPending: isCreatingBill } = useCreateBill();

    const handleDigit = useCallback((digit: string) => {
        if (editField === EditField.CUSTOMER_PAID) {
            const current = `${orderForm?.customerPaid ?? "0"}`;
            updateCustomerPaidOrderForm(`${current}${digit}`);
        }

        if (editField === EditField.TOTAL) {
            const current = `${orderForm?.totalPriceChange ?? "0"}`;
            updateTotalPriceChangeOrderForm(`${current}${digit}`);
        }
    }, [editField, updateCustomerPaidOrderForm, updateTotalPriceChangeOrderForm, orderForm]);


    const handleBackspace = useCallback(() => {
        if (editField === EditField.CUSTOMER_PAID) {
            const current = `${orderForm?.customerPaid ?? "0"}`;
            const next = current.slice(0, -1);
            updateCustomerPaidOrderForm(next || "0");
        }

        if (editField === EditField.TOTAL) {
            const current = `${orderForm?.totalPriceChange ?? "0"}`;
            const next = current.slice(0, -1);
            updateTotalPriceChangeOrderForm(next || "0");
        }
    }, [editField, orderForm, updateCustomerPaidOrderForm, updateTotalPriceChangeOrderForm]);

    const handleClear = useCallback(() => {
        if (editField === EditField.CUSTOMER_PAID) {
            updateCustomerPaidOrderForm("0");
        }
        if (editField === EditField.TOTAL) {
            updateTotalPriceChangeOrderForm("0");
        }
    }, [editField, updateCustomerPaidOrderForm, updateTotalPriceChangeOrderForm]);

    const handleQuickAmount = useCallback((amount: number) => {
        if (editField === EditField.CUSTOMER_PAID) {
            updateCustomerPaidOrderForm(amount.toString());
        }
        if (editField === EditField.TOTAL) {
            updateTotalPriceChangeOrderForm(amount.toString());
        }
    }, [editField, updateCustomerPaidOrderForm, updateTotalPriceChangeOrderForm]);


    const handlePrint = useReactToPrint({
        contentRef: printRef,
        // onAfterPrint: () => {
        //     removeBill();
        // },
    });

    const handleConfirm = useCallback(() => {
        const bill: IBillPayload = {
            customerId: orderForm?.customer?._id,
            items: orderForm?.orders.map(order => ({
                menuItemId: order._id,
                quantity: order.quantity,
            })) || [],
            paymentMethod: orderForm?.paymentMethod || PaymentMode.CASH,
            cashReceived: orderForm?.paymentMethod === PaymentMode.CASH ? Number(orderForm?.customerPaid) || 0 : 0,
            finalAmount: Number(orderForm?.totalPriceChange) || Number(orderForm?.totalPrice) || 0,
        }

        createBill(bill, {
            onSuccess: async (data) => {
                const billData = (data as any)?.data?.data as IBillDetail;
                setBill(billData);

                console.log("Bill created:", billData);

                const finalizeOrder = () => {
                    setStatusOrder(OrderStatus.PAYMENT_SUCCESS);
                };

                if (printBill && billData) {
                    setTimeout(() => {
                        handlePrint();
                        finalizeOrder();
                    }, 100);
                } else {
                    finalizeOrder();
                }
            }
        });
    }, [orderForm, createBill, setBill, handlePrint, printBill, setStatusOrder]);

    return (
        <>
            <div data-print-hide className="bg-white grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
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
                        customerPaid={Number(orderForm?.customerPaid) || 0}
                        printBill={printBill}
                        onPrintBillChange={setPrintBill}
                        onConfirm={handleConfirm}
                        onSelectEditField={setEditField}
                        editingField={editField}
                        finalTotal={Number(orderForm?.totalPriceChange) || Number(orderForm?.totalPrice) || 0}
                        isCreatingBill={isCreatingBill}
                    />
                </div>
            </div>

            <div id="print-area" style={{ display: "none" }}>
                <div ref={printRef}>
                    {bill && <BillPrintTemplate bill={bill} />}
                </div>
            </div>

        </>
    );
}
