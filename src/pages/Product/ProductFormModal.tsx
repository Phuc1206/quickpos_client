import { useState } from "react";

export default function ProductFormModal({ open, onClose, onSuccess }) {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [file, setFile] = useState<File | null>(null);

	if (!open) return null;

	const handleSubmit = async () => {
		const formData = new FormData();
		formData.append("name", name);
		formData.append("price", price);
		if (file) formData.append("image", file);

		// await api.createMenu(formData);

		onSuccess();
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black/30 flex items-center justify-center">
			<div className="bg-white p-6 rounded w-96">
				<h2 className="text-lg font-bold mb-4">Thêm món</h2>

				<input
					placeholder="Tên món"
					className="border w-full mb-2 p-2"
					onChange={(e) => setName(e.target.value)}
				/>

				<input
					placeholder="Giá"
					className="border w-full mb-2 p-2"
					onChange={(e) => setPrice(e.target.value)}
				/>

				<input
					type="file"
					className="mb-3"
					onChange={(e) => setFile(e.target.files?.[0] || null)}
				/>

				<div className="flex justify-end gap-2">
					<button onClick={onClose}>Hủy</button>
					<button
						onClick={handleSubmit}
						className="bg-blue-500 text-white px-3 py-1 rounded"
					>
						Lưu
					</button>
				</div>
			</div>
		</div>
	);
}
