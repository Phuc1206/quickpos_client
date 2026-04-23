import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateProduct } from "@/services/productServices";

const productSchema = z.object({
	name: z.string().min(1, "Tên món không được để trống"),
	price: z.coerce.number().min(1000, "Giá phải lớn hơn 1000"),
	image: z.any().optional(),
});

type FormValues = z.infer<typeof productSchema>;

export default function ProductFormModal({
	open,
	onClose,
	onSuccess,
	data,
}: any) {
	const [preview, setPreview] = useState("");

	const { mutate: updateProduct, isLoading } = useUpdateProduct();

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

	// chỉ reset khi mở modal
	useEffect(() => {
		if (!open) return;

		if (data) {
			reset({
				name: data.name,
				price: data.price,
			});
			setPreview(data.image);
		} else {
			reset({
				name: "",
				price: 0,
			});
			setPreview("");
		}
	}, [open, data, reset]);

	const onSubmit = (values: FormValues) => {
		const formData = new FormData();
		formData.append("name", values.name);
		formData.append("price", String(values.price));

		if (values.image?.[0]) {
			formData.append("image", values.image[0]);
		}

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
						disabled={isLoading}
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
						disabled={isLoading}
					/>
					{errors.price && (
						<p className="text-red-500 text-sm mb-2">{errors.price.message}</p>
					)}

					{/* image */}
					<input
						type="file"
						className="mb-4"
						{...register("image")}
						onChange={(e) => {
							if (e.target.files?.[0]) {
								setPreview(URL.createObjectURL(e.target.files[0]));
							}
						}}
						disabled={isLoading}
					/>

					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={onClose}
							className="px-3 py-1 rounded bg-gray-100"
							disabled={isLoading}
						>
							Hủy
						</button>

						<button
							type="submit"
							disabled={isLoading}
							className="bg-blue-600 text-white px-4 py-1 rounded flex items-center gap-2"
						>
							{isLoading && (
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
