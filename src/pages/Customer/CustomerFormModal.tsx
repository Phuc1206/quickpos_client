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
		if (isLoading) return;

		reset({
			name: data?.name || "",
			phoneNumber: data?.phoneNumber || "",
			address: data?.address || "",
		});
	}, [open, data, isLoading, reset]);

	const onSubmit = (values: any) => {
		if (data) {
			updateCustomer(
				{ id: data._id, payload: values },
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
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>
						{data ? "Sửa khách hàng" : "Thêm khách hàng"}
					</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* NAME */}
					<div>
						<Label>Tên khách hàng</Label>
						<Input
							placeholder="Nhập tên"
							{...register("name")}
							disabled={isSubmitting}
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
							disabled={isSubmitting}
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
							disabled={isSubmitting}
						/>
					</div>

					{/* ACTION */}
					<div className="flex justify-end gap-2 pt-2">
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={isSubmitting}
						>
							Hủy
						</Button>

						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting && (
								<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
							)}
							{data ? "Cập nhật" : "Tạo mới"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CustomerFormModal;
