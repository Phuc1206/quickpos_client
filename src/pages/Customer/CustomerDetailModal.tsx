import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const formatMoney = (v?: number) => (v ?? 0).toLocaleString("vi-VN") + " đ";

const CustomerDetailModal = ({ open, onClose, data, isLoading }: any) => {
	console.log(data);
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Chi tiết khách hàng</DialogTitle>
				</DialogHeader>

				{isLoading || !data ? (
					<div className="py-10 text-center text-muted-foreground">
						Đang tải...
					</div>
				) : (
					<div className="space-y-4">
						{/* INFO */}
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
								<p className="text-muted-foreground">Tên</p>
								<p className="font-semibold">{data.customer.name}</p>
							</div>

							<div>
								<p className="text-muted-foreground">SĐT</p>
								<p>{data.customer.phoneNumber}</p>
							</div>

							<div className="col-span-2">
								<p className="text-muted-foreground">Địa chỉ</p>
								<p>{data.customer.address || "Không có"}</p>
							</div>

							<div>
								<p className="text-muted-foreground">Ngày tạo</p>
								<p>
									{new Date(data.customer.createdAt).toLocaleString("vi-VN")}
								</p>
							</div>

							<div>
								<p className="text-muted-foreground">Trạng thái</p>
								<Badge variant="secondary">Hoạt động</Badge>
							</div>
						</div>

						<Separator />

						{/* BILL HISTORY */}
						<div>
							<p className="font-semibold mb-2">Lịch sử mua hàng</p>

							{data.bills.length === 0 ? (
								<p className="text-sm text-muted-foreground">Chưa có hóa đơn</p>
							) : (
								<ScrollArea className="h-64 pr-3">
									<div className="space-y-2">
										{data.bills.map((bill: any) => (
											<div
												key={bill._id}
												className="flex justify-between items-center border rounded-lg p-2 text-sm hover:bg-muted/50"
											>
												<div>
													<p className="font-medium">{bill.code}</p>
													<p className="text-xs text-muted-foreground">
														{new Date(bill.createdAt).toLocaleDateString(
															"vi-VN",
														)}
													</p>
												</div>

												<div className="text-right">
													<p className="font-semibold text-red-500">
														{formatMoney(bill.finalAmount)}
													</p>
													<Badge variant="outline">{bill.paymentMethod}</Badge>
												</div>
											</div>
										))}
									</div>
								</ScrollArea>
							)}
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default CustomerDetailModal;
