import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateProduct } from "@/services/productServices";

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

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: "",
			price: 0,
		},
	});

	// derive preview (KHÔNG cần setState từ data nữa)
	const preview = localPreview || data?.image || "";

	// cleanup preview blob
	useEffect(() => {
		return () => {
			if (localPreview && localPreview.startsWith("blob:")) {
				URL.revokeObjectURL(localPreview);
			}
		};
	}, [localPreview]);

	// chỉ reset form khi mở modal
	useEffect(() => {
		if (!open) return;
		if (isLoading) return;
		reset({
			name: data?.name || "",
			price: data?.price || 0,
		});

		// reset preview local
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setLocalPreview("");
	}, [open, data, isLoading, reset]);

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
			console.log("create");
		}
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />

			<div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
				<h2 className="text-lg font-bold mb-4">
					{data ? "Sửa món" : "Thêm món"}
				</h2>

				{/* preview */}
				{preview && (
					<img
						src={preview}
						className="w-full h-40 object-cover rounded-lg mb-3"
					/>
				)}

				<form onSubmit={handleSubmit(onSubmit)}>
					{/* name */}
					<input
						placeholder="Tên món"
						className="border w-full mb-1 p-2 rounded-lg"
						{...register("name")}
						disabled={isUpdating}
					/>
					{errors.name && (
						<p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
					)}

					{/* price */}
					<input
						type="number"
						placeholder="Giá"
						className="border w-full mb-1 p-2 rounded-lg"
						{...register("price")}
						disabled={isUpdating}
					/>
					{errors.price && (
						<p className="text-red-500 text-sm mb-2">{errors.price.message}</p>
					)}

					{/* image */}
					<input
						key={data?._id || "new"}
						type="file"
						className="mb-4"
						{...register("image")}
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) {
								const url = URL.createObjectURL(file);
								setLocalPreview(url);

								// cho phép chọn lại cùng file
								e.target.value = "";
							}
						}}
						disabled={isUpdating}
					/>

					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={onClose}
							className="px-3 py-1 rounded bg-gray-100 disabled:opacity-70"
							disabled={isUpdating}
						>
							Hủy
						</button>

						<button
							type="submit"
							disabled={isUpdating}
							className="bg-blue-600 text-white px-4 py-1 rounded flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
						>
							{isUpdating && (
								<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
							)}
							{data ? "Cập nhật" : "Lưu"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
