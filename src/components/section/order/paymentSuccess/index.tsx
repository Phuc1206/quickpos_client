'use client';

import { CheckCircle, Printer, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentSuccessProps {
    invoiceCode: string;
    onPrintBill?: () => void;
    onNewOrder?: () => void;
}

export function PaymentSuccess({
    invoiceCode,
    onPrintBill,
    onNewOrder,
}: PaymentSuccessProps) {

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-4">
            <div className="w-full max-w-md flex flex-col items-center gap-4">
                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="bg-green-100 rounded-full p-6">
                        <CheckCircle className="w-16 h-16 text-green-600" />
                    </div>
                </div>

                {/* Main Message */}
                <p className="text-3xl font-bold text-center text-gray-900">
                    Thanh toán thành công!
                </p>

                {/* Amount and Invoice Code */}
                <div className="text-center">
                    <p className="text-gray-500 text-md">Mã HĐ: <span className="font-semibold text-primary">{invoiceCode}</span></p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full">
                    <Button
                        variant="outline"
                        onClick={onPrintBill}
                        className="flex-1 gap-2 w-10 h-10"
                    >
                        <Printer className="w-6 h-6" />
                        In Bill
                    </Button>
                    <Button
                        onClick={onNewOrder}
                        className="flex-1 gap-2 bg-orange-600 hover:bg-orange-700 w-10 h-10"
                    >
                        <Plus className="w-6 h-6" />
                        Đơn mới
                    </Button>
                </div>
            </div>
        </div>
    );
}
