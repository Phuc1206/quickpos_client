import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
	useCreateCustomer,
	useUpdateCustomer,
} from "@/services/customerServices";
import { z } from "zod";

const CustomerFormModal = ({
	open,
	onClose,
	onSuccess,
	data,
	isLoading,
}: any) => {
	const { mutate: createCustomer, isLoading: isCreating } = useCreateCustomer();

	const { mutate: updateCustomer, isLoading: isUpdating } = useUpdateCustomer();
	const customerSchema = z.object({
		name: z.string().min(1, "Tên không được để trống"),

		phoneNumber: z
			.string()
			.min(10, "SĐT không hợp lệ")
			.max(11, "SĐT không hợp lệ")
			.regex(/^[0-9]+$/, "Chỉ được nhập số"),

		address: z.string().optional(),
	});

	type CustomerFormValues = z.infer<typeof customerSchema>;
	const isSubmitting = isCreating || isUpdating;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CustomerFormValues>({
		resolver: zodResolver(customerSchema),
		defaultValues: {
			name: "",
			phoneNumber: "",
			address: "",
		},
	});

	// reset form khi mở modal
	useEffect(() => {
		if (!open) return;

		reset({
			name: data?.name || "",
			phoneNumber: data?.phoneNumber || "",
			address: data?.address || "",
		});
	}, [open, data, reset]);

	const onSubmit = (values: any) => {
		if (data) {
			updateCustomer(
				{
					id: data._id,
					name: values.name,
					phoneNumber: values.phoneNumber,
					address: values.address,
				},
				{
					onSuccess: () => {
						onSuccess();
						onClose();
					},
				},
			);
		} else {
			createCustomer(values, {
				onSuccess: () => {
					onSuccess();
					onClose();
				},
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent key={data?._id || "create"} className="max-w-md">
				<DialogHeader>
					<DialogTitle>
						{data ? "Sửa khách hàng" : "Thêm khách hàng"}
					</DialogTitle>
				</DialogHeader>

				{/* WRAPPER để overlay */}
				<div className="relative">
					{/* LOADING OVERLAY */}
					{isLoading && (
						<div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-md">
							<div className="w-6 h-6 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
						</div>
					)}

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						{/* NAME */}
						<div>
							<Label>Tên khách hàng</Label>
							<Input
								placeholder="Nhập tên"
								{...register("name")}
								disabled={isSubmitting || isLoading}
							/>
							{errors.name && (
								<p className="text-sm text-red-500">{errors.name.message}</p>
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
								<p className="text-sm text-red-500">
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

export default CustomerFormModal;
