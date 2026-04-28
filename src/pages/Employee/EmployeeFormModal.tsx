import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
	useCreateEmployee,
	useUpdateEmployee,
} from "@/services/employeeServices";
import { useEffect } from "react";

// Định nghĩa schema bên ngoài component để tránh khởi tạo lại không cần thiết
const employeeSchema = z.object({
	name: z.string().min(1, "Tên không được để trống"),
	phoneNumber: z
		.string()
		.min(10, "SĐT không hợp lệ")
		.max(11, "SĐT không hợp lệ")
		.regex(/^[0-9]+$/, "Chỉ được nhập số"),
	address: z.string().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const EmployeeFormModal = ({
	open,
	onClose,
	onSuccess,
	data,
	isLoading, // Trạng thái loading khi lấy dữ liệu chi tiết (nếu có)
}: any) => {
	const { mutate: createEmployee, isLoading: isCreating } = useCreateEmployee();
	const { mutate: updateEmployee, isLoading: isUpdating } = useUpdateEmployee();

	const isSubmitting = isCreating || isUpdating;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<EmployeeFormValues>({
		resolver: zodResolver(employeeSchema),

		values: {
			name: data?.name || "",
			phoneNumber: data?.phoneNumber || "",
			address: data?.address || "",
		},
	});
	useEffect(() => {
		if (!open) {
			reset({
				name: "",
				phoneNumber: "",
				address: "",
			});
		}
	}, [open, reset]);
	const onSubmit = (values: EmployeeFormValues) => {
		if (data?._id) {
			updateEmployee(
				{
					id: data._id,
					...values,
				},
				{
					onSuccess: () => {
						onSuccess();
						onClose();
					},
				},
			);
		} else {
			createEmployee(values, {
				onSuccess: () => {
					onSuccess();
					onClose();
				},
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			{/* Bỏ 'key' ở DialogContent nếu bạn dùng 'values' ở useForm. 
                Nếu vẫn muốn giữ key để "reset cứng" thì đặt key={open ? data?._id || 'new' : 'closed'}
            */}
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>{data ? "Sửa nhân viên" : "Thêm nhân viên"}</DialogTitle>
				</DialogHeader>

				<div className="relative">
					{/* LOADING OVERLAY khi đang fetch data cũ */}
					{isLoading && (
						<div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-md">
							<div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
						</div>
					)}

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						{/* NAME */}
						<div>
							<Label>Tên nhân viên</Label>
							<Input
								placeholder="Nhập tên"
								{...register("name")}
								disabled={isSubmitting || isLoading}
							/>
							{errors.name && (
								<p className="text-sm text-red-500 mt-1">
									{errors.name.message}
								</p>
							)}
						</div>

						{/* PHONE */}
						<div>
							<Label>Số điện thoại</Label>
							<Input
								placeholder="Nhập SĐT"
								{...register("phoneNumber")}
								disabled={isSubmitting || isLoading}
							/>
							{errors.phoneNumber && (
								<p className="text-sm text-red-500 mt-1">
									{errors.phoneNumber.message}
								</p>
							)}
						</div>

						{/* ADDRESS */}
						<div>
							<Label>Địa chỉ</Label>
							<Input
								placeholder="Nhập địa chỉ"
								{...register("address")}
								disabled={isSubmitting || isLoading}
							/>
						</div>

						{/* ACTION */}
						<div className="flex justify-end gap-2 pt-2">
							<Button
								type="button"
								variant="outline"
								onClick={onClose}
								disabled={isSubmitting || isLoading}
							>
								Hủy
							</Button>

							<Button type="submit" disabled={isSubmitting || isLoading}>
								{isSubmitting && (
									<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
								)}
								{data ? "Cập nhật" : "Tạo mới"}
							</Button>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default EmployeeFormModal;
