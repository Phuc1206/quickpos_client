import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProduct, useUpdateProduct } from "@/services/productServices";

// shadcn
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const productSchema = z.object({
	name: z.string().min(1, "Tên món không được để trống"),
	price: z.coerce.number().min(1000, "Giá phải lớn hơn 1000"),
	image: z
		.any()
		.refine((files) => {
			if (!files || files.length === 0) return true;
			return files[0] instanceof File;
		}, "File không hợp lệ")
		.refine((files) => {
			if (!files || files.length === 0) return true;
			return files[0].size <= 2 * 1024 * 1024;
		}, "Ảnh tối đa 2MB")
		.refine((files) => {
			if (!files || files.length === 0) return true;
			return ["image/jpeg", "image/png", "image/webp"].includes(files[0].type);
		}, "Chỉ hỗ trợ JPG, PNG, WEBP")
		.optional(),
});

type FormValues = z.input<typeof productSchema>;

export default function ProductFormModal({
	open,
	onClose,
	onSuccess,
	data,
	isLoading,
}: any) {
	const [localPreview, setLocalPreview] = useState("");

	const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();
	const { mutate: createProduct, isLoading: isCreating } = useCreateProduct();

	const isSubmitting = isUpdating || isCreating;

	const form = useForm<FormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: "",
			price: 0,
		},
	});

	// preview
	const preview = localPreview || data?.image || "";

	// cleanup blob
	useEffect(() => {
		return () => {
			if (localPreview?.startsWith("blob:")) {
				URL.revokeObjectURL(localPreview);
			}
		};
	}, [localPreview]);

	// reset khi mở modal
	useEffect(() => {
		if (!open || isLoading) return;

		form.reset({
			name: data?.name || "",
			price: data?.price || 0,
		});

		// eslint-disable-next-line react-hooks/set-state-in-effect
		setLocalPreview("");
	}, [open, data, isLoading, form]);

	const buildFormData = (values: FormValues) => {
		const formData = new FormData();
		formData.append("name", values.name);
		formData.append("price", String(values.price));

		if (values.image?.[0]) {
			formData.append("image", values.image[0]);
		}

		return formData;
	};

	const onSubmit = (values: FormValues) => {
		const formData = buildFormData(values);

		if (data) {
			updateProduct(
				{ id: data._id, payload: formData },
				{
					onSuccess: () => {
						onSuccess();
						onClose();
					},
				},
			);
		} else {
			createProduct(formData, {
				onSuccess: () => {
					onSuccess();
					onClose();
				},
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{data ? "Sửa món" : "Thêm món"}</DialogTitle>
					<p className="text-sm text-muted-foreground">
						Nhập thông tin sản phẩm của bạn
					</p>
				</DialogHeader>

				{/* preview */}
				{preview && (
					<div className="relative">
						<img
							src={preview}
							className="w-full h-40 object-cover rounded-xl"
						/>
						<Button
							type="button"
							size="sm"
							variant="secondary"
							className="absolute top-2 right-2"
							onClick={() => {
								setLocalPreview("");
								form.setValue("image", undefined);
							}}
						>
							Xóa
						</Button>
					</div>
				)}

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						{/* name */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên món</FormLabel>
									<Input
										placeholder="Nhập tên món..."
										{...field}
										disabled={isSubmitting}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* price */}
						<FormField
							control={form.control}
							name="price"
							render={({ field }: any) => (
								<FormItem>
									<FormLabel>Giá</FormLabel>
									<Input
										type="number"
										placeholder="Nhập giá..."
										{...field}
										disabled={isSubmitting}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* upload */}
						<FormField
							control={form.control}
							name="image"
							render={() => (
								<FormItem>
									<FormLabel>Hình ảnh</FormLabel>

									<label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition">
										<span className="text-sm text-gray-500">
											Click để upload hoặc kéo ảnh vào
										</span>

										<input
											type="file"
											className="hidden"
											onChange={(e) => {
												const file = e.target.files?.[0];
												if (file) {
													const url = URL.createObjectURL(file);
													setLocalPreview(url);

													form.setValue("image", e.target.files);
												}
											}}
											disabled={isSubmitting}
										/>
									</label>

									<FormMessage />
								</FormItem>
							)}
						/>

						{/* actions */}
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
								{isSubmitting ? "Đang xử lý..." : data ? "Cập nhật" : "Tạo mới"}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
