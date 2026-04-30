import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import BillPrintTemplate from "@/components/section/order/ReceiptTemplate";

const InvoiceDetailModal = ({ open, onClose, data }: any) => {
	const printRef = useRef<HTMLDivElement>(null);

	const handlePrint = useReactToPrint({
		contentRef: printRef,
	});

	if (!data) return null;

	return (
		<>
			<Dialog open={open} onOpenChange={onClose}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Chi tiết hóa đơn</DialogTitle>
					</DialogHeader>

					<div className="space-y-4">
						{/* Info */}
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
								<p className="text-muted-foreground">Mã hóa đơn</p>
								<p className="font-semibold">{data.code}</p>
							</div>

							<div>
								<p className="text-muted-foreground">Ngày</p>
								<p>{new Date(data.createdAt).toLocaleString("vi-VN")}</p>
							</div>

							<div>
								<p className="text-muted-foreground">Khách hàng</p>
								<p className="font-medium">{data.customer?.name}</p>
								<p className="text-xs text-muted-foreground">
									{data.customer?.phoneNumber}
								</p>
							</div>

							<div>
								<p className="text-muted-foreground">Nhân viên</p>
								<p>{data.employeeId?.name || "—"}</p>
							</div>

							<div>
								<p className="text-muted-foreground">Thanh toán</p>
								<Badge variant="secondary">{data.paymentMethod}</Badge>
							</div>
						</div>

						<Separator />

						{/* Items */}
						<div>
							<p className="font-semibold mb-2">Danh sách món</p>

							<div className="space-y-2">
								{data.items?.map((item: any) => (
									<div
										key={item._id}
										className="flex justify-between text-sm border-b pb-1"
									>
										<div>
											<p className="font-medium">{item.name}</p>
											<p className="text-xs text-muted-foreground">
												{item.quantity} x {item.price.toLocaleString()} đ
											</p>
										</div>

										<p className="font-semibold">
											{item.total.toLocaleString()} đ
										</p>
									</div>
								))}
							</div>
						</div>

						<Separator />

						{/* Summary */}
						<div className="text-sm space-y-1">
							<div className="flex justify-between">
								<span>Tổng tiền</span>
								<span>{data.totalAmount.toLocaleString()} đ</span>
							</div>

							<div className="flex justify-between">
								<span>Giảm giá</span>
								<span>{data.discount.toLocaleString()} đ</span>
							</div>

							<div className="flex justify-between font-bold text-red-500">
								<span>Thanh toán</span>
								<span>{data.finalAmount.toLocaleString()} đ</span>
							</div>

							<div className="flex justify-between">
								<span>Khách đưa</span>
								<span>{data.cashReceived.toLocaleString()} đ</span>
							</div>
						</div>

						<Separator />
						<div className="flex justify-end pt-4">
							<Button onClick={handlePrint}>🖨️ In hóa đơn</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
			{/* PRINT AREA */}
			<div style={{ display: "none" }}>
				<div ref={printRef}>{data && <BillPrintTemplate bill={data} />}</div>
			</div>
		</>
	);
};

export default InvoiceDetailModal;
