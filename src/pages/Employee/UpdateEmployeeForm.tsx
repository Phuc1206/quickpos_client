import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema, type EmployeeFormValues } from "./employee.schema";
import { useUpdateEmployee } from "@/services/employeeServices";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
const UpdateEmployeeForm = ({ data, onSuccess, onClose }: any) => {
	const { mutate, isLoading } = useUpdateEmployee();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<EmployeeFormValues>({
		resolver: zodResolver(employeeSchema),
		defaultValues: {
			name: "",
			phoneNumber: "",
			address: "",
		},
	});

	useEffect(() => {
		if (!data) return;

		reset({
			name: data.name || "",
			phoneNumber: data.phoneNumber || "",
			address: data.address || "",
		});
	}, [data?._id]);

	const onSubmit = (values: EmployeeFormValues) => {
		console.log("values", values);
		mutate(
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
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			{/* NAME */}
			<div>
				<Label>Tên nhân viên</Label>
				<Input
					placeholder="Nhập tên"
					{...register("name")}
					disabled={isLoading}
				/>
				{errors.name && (
					<p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
				)}
			</div>

			{/* PHONE */}
			<div>
				<Label>Số điện thoại</Label>
				<Input
					placeholder="Nhập SĐT"
					{...register("phoneNumber")}
					disabled={isLoading}
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
					disabled={isLoading}
				/>
			</div>

			{/* ACTION */}
			<div className="flex justify-end gap-2 pt-2">
				<Button
					type="button"
					variant="outline"
					onClick={onClose}
					disabled={isLoading}
				>
					Hủy
				</Button>

				<Button type="submit" disabled={isLoading}>
					Cập nhật
				</Button>
			</div>
		</form>
	);
};

export default UpdateEmployeeForm;
