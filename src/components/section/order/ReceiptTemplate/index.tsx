import { PaymentMode, type IBillDetail } from "@/types/order";
import { formatVND, UNIT_PRICE } from "@/utils";

interface BillPrintTemplateProps {
    bill: IBillDetail;
}

export default function BillPrintTemplate({ bill }: BillPrintTemplateProps) {
    const formatCurrency = (value: number) => {
        return `${formatVND(value)} ${UNIT_PRICE}`
    };

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const change = bill.cashReceived - bill.finalAmount;

    return (
        /* Wrapper để căn giữa trên màn hình trình duyệt */
        <div className="flex justify-center bg-gray-100 min-h-screen py-5 print:p-0 print:bg-white">
            <style>{`
                @page {
                    size: 80mm auto;
                    margin: 0;
                }
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, Helvetica, sans-serif !important;
                    }
                    .print-container {
                        width: 80mm !important;
                        margin: 0 !important;
                        padding: 6mm !important; /* Padding cho giấy in */
                        box-shadow: none !important;
                    }
                }
            `}</style>

            <div className="print-container w-[80mm] h-auto flex flex-col gap-4 bg-white p-4 shadow-md text-black font-mono text-sm leading-tight">
                {/* Header */}
                <div className="text-center border-b border-dashed border-black pb-3 flex flex-col gap-1">
                    <p className="text-md font-bold uppercase">Hộ kinh doanh Phúc An</p>
                    <p className="text-xs">2761 Phạm Thế Hiển, Phường 6, Quận 8</p>
                    <p className="text-xs">Hotline: 0786.437.882</p>
                </div>

                {/* Receipt Title */}
                <div className="text-center">
                    <h2 className="text-base font-bold">HÓA ĐƠN BÁN HÀNG</h2>
                    <p className="text-xs">{bill?.code}</p>
                </div>

                {/* Info */}
                <div className="text-[11px] mb-3 space-y-1">
                    <div className="grid grid-cols-[70px_1fr] gap-1">
                        <span className="text-gray-600">Ngày bán:</span>
                        <span className="font-medium">{formatDate(bill?.createdAt)}</span>
                    </div>

                    <div className="grid grid-cols-[70px_1fr] gap-1">
                        <span className="text-gray-600">Nhân viên:</span>
                        <span className="font-medium">{bill?.employeeName || bill.employeeId?.name || "Hệ thống"}</span>
                    </div>

                    {bill?.customer && (
                        <div className="grid grid-cols-[70px_1fr] gap-1">
                            <span className="text-gray-600">Khách hàng:</span>
                            <span className="font-bold">{bill.customer.name}</span>
                        </div>
                    )}

                </div>


                {/* Items Table */}
                <div className="text-[11px]">
                    <div className="flex justify-between font-bold border-b border-t border-black py-1 mb-2">
                        <span className="w-1/6 text-left">SL</span>
                        <span className="w-1/6 text-right">Đơn giá</span>
                        <span className="w-1/3 text-right">T.Tiền</span>
                    </div>
                    <div className="flex flex-col divide-y divide-dashed divide-black">
                        {bill?.items?.map((item, index) => (
                            <div key={index} className="py-2 first:pt-0 last:pb-0">
                                {/* Tên món */}
                                <div className="flex justify-between">
                                    <span className="w-full font-bold uppercase text-[12px]">{item.name}</span>
                                </div>

                                {/* Chi tiết số lượng và giá */}
                                <div className="flex justify-between text-[11px] mt-1">
                                    <span className="w-1/4 text-left">{item.quantity}</span>
                                    <span className="w-1/4 text-right">{formatCurrency(item.price)}</span>
                                    <span className="w-1/2 text-right font-medium">{formatCurrency(item.total)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Summary & Payment */}
                <div className="text-[12px] border-t border-dashed border-black pt-2 space-y-1">
                    <div className="flex justify-between">
                        <span>Tổng số lượng</span>
                        <span>{bill?.totalQuantity}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Phương thức thanh toán</span>
                        <span>{bill?.paymentMethod === PaymentMode.CASH ? "Tiền mặt" : "Chuyển khoản"}</span>
                    </div>
                    {bill?.discount > 0 && (
                        <div className="flex justify-between">
                            <span>Giảm giá</span>
                            <span>-{formatCurrency(bill?.discount)}</span>
                        </div>
                    )}
                    <div className="flex justify-between font-bold text-base pt-1">
                        <span>THÀNH TIỀN</span>
                        <span>{formatCurrency(bill?.finalAmount)}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                        <span>Tiền khách đưa</span>
                        <span>{bill?.cashReceived > 0 ? formatCurrency(bill?.cashReceived) : formatCurrency(bill?.finalAmount)}</span>
                    </div>
                    {
                        bill?.paymentMethod === PaymentMode.CASH && (
                            <div className="flex justify-between">
                                <span>Tiền thừa trả khách</span>
                                <span>{formatCurrency(change > 0 ? change : 0)}</span>
                            </div>
                        )
                    }
                </div>

                {/* Footer */}
                <div className="text-center flex flex-col gap-2">
                    <p className="text-[11px] italic border-t border-b border-dotted py-2">Quý khách vui lòng kiểm tra hóa đơn và hàng hóa trước khi ra khỏi cửa hàng</p>
                    <p className="text-[10px] font-bold uppercase">Cảm ơn quý khách. Hẹn gặp lại!</p>
                </div>
            </div>
        </div>
    );
}
