import ProductFormModal from "@/pages/Product/ProductFormModal";
import { useState } from "react";

const ProductPage = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className="p-6">
			<div className="flex justify-between mb-4">
				<h1 className="text-2xl font-bold">Quản lý món ăn</h1>

				<button
					onClick={() => setOpen(true)}
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					+ Thêm món
				</button>
			</div>

			{/* Table */}
			<div className="grid grid-cols-4 gap-4">
				{/* {menus.map((item: any) => (
					<div key={item._id} className="border rounded-lg p-3 shadow">
						<img
							src={item.image}
							className="w-full h-32 object-cover rounded"
						/>

						<h2 className="font-semibold mt-2">{item.name}</h2>
						<p className="text-red-500">{item.price}đ</p>
					</div>
				))} */}
			</div>

			<ProductFormModal
				open={open}
				onClose={() => setOpen(false)}
				onSuccess={() => setOpen(false)}
			/>
		</div>
	);
};

export default ProductPage;
