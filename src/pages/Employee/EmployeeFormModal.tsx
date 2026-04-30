import { Dialog } from "@/components/ui/dialog";
import CreateEmployeeForm from "./CreateEmployeeForm";
import UpdateEmployeeForm from "./UpdateEmployeeForm";
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export const EmployeeFormModal = ({
	open,
	onClose,
	onSuccess,
	data,
	isLoading,
}: any) => {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>{data ? "Sửa nhân viên" : "Thêm nhân viên"}</DialogTitle>
				</DialogHeader>

				<div className="relative">
					{isLoading && (
						<div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-md">
							<div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
						</div>
					)}

					{data ? (
						<UpdateEmployeeForm
							data={data}
							onSuccess={onSuccess}
							onClose={onClose}
						/>
					) : (
						<CreateEmployeeForm onSuccess={onSuccess} onClose={onClose} />
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};
