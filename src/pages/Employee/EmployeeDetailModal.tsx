import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

const EmployeeDetailModal = ({ open, onClose, data, isLoading }: any) => {
	const employee = data;

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-xl">
				<DialogHeader>
					<DialogTitle>Chi tiết nhân viên</DialogTitle>
				</DialogHeader>

				{isLoading || !employee ? (
					<div className="py-10 text-center text-muted-foreground">
						Đang tải...
					</div>
				) : (
					<div className="space-y-5">
						{/* INFO */}
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
								<p className="text-muted-foreground">Tên</p>
								<p className="font-semibold">{employee.name}</p>
							</div>

							<div>
								<p className="text-muted-foreground">SĐT</p>
								<p>{employee.phoneNumber}</p>
							</div>

							<div>
								<p className="text-muted-foreground">Địa chỉ</p>
								<p>{employee.address || "Không có"}</p>
							</div>

							<div>
								<p className="text-muted-foreground">Ngày tạo</p>
								<p>{new Date(employee.createdAt).toLocaleString("vi-VN")}</p>
							</div>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default EmployeeDetailModal;
