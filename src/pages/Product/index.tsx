import useDebounce from "@/hooks/useDebounce";
import ProductDetailModal from "@/pages/Product/ProductDetailModal";
import ProductFormModal from "@/pages/Product/ProductFormModal";
import {
	useGetProductDetail,
	useGetProductList,
} from "@/services/productServices";
import { useState } from "react";

const ProductPage = () => {
	const [open, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [openView, setOpenView] = useState(false);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [rows] = useState(10);

	const debouncedSearch = useDebounce(search, 500);

	const {
		productsList: menus = [],
		productListCount = 0,
		isLoading,
	} = useGetProductList({
		page,
		rows,
		search: debouncedSearch,
	});
	const { productDetail, isLoading: isLoadingDetail } = useGetProductDetail(
		selectedItem?._id,
	);

	const totalPages = Math.ceil(productListCount / rows);

	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-800">Quản lý món ăn</h1>
					<p className="text-sm text-gray-500 mt-1">
						Quản lý danh sách món ăn trong hệ thống
					</p>
				</div>

				<div className="flex gap-3 items-center">
					{/* Search */}
					<div className="relative">
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Tìm món ăn..."
							className="pl-10 pr-4 py-2 w-64 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
					</div>

					<button
						onClick={() => {
							setSelectedItem(null);
							setOpen(true);
						}}
						className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow"
					>
						+ Thêm món
					</button>
				</div>
			</div>

			{/* Content */}
			{isLoading ? (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
					{Array.from({ length: 10 }).map((_, i) => (
						<div key={i} className="bg-white rounded-xl p-3 animate-pulse">
							<div className="h-36 bg-gray-200 rounded mb-3"></div>
							<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
							<div className="h-4 bg-gray-200 rounded w-1/2"></div>
						</div>
					))}
				</div>
			) : menus.length === 0 ? (
				<div className="flex flex-col items-center justify-center mt-20 text-gray-500">
					<div className="text-5xl mb-3">🍽️</div>
					<p className="text-lg font-medium">Không có món ăn nào</p>
					<p className="text-sm">Thử tìm kiếm hoặc thêm món mới</p>
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
					{menus.map((item: any) => (
						<div
							key={item._id}
							className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
						>
							<div className="relative">
								<img
									src={item.image}
									className="w-full h-40 object-cover group-hover:scale-105 transition"
								/>

								{/* overlay */}
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
									{/* Xem */}
									<button
										onClick={(e) => {
											e.stopPropagation();
											setSelectedItem(item);
											setOpenView(true);
										}}
										className="bg-white text-gray-800 px-3 py-1 rounded-lg text-sm shadow hover:bg-gray-100"
									>
										👁 Xem
									</button>

									{/* Sửa */}
									<button
										onClick={(e) => {
											e.stopPropagation();
											setSelectedItem(item);
											setOpen(true);
										}}
										className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm shadow hover:bg-blue-700"
									>
										✏️ Sửa
									</button>

									{/* Xóa */}
									<button
										onClick={(e) => {
											e.stopPropagation();
											if (confirm("Bạn có chắc muốn xóa món này?")) {
												console.log("delete", item);
												// TODO: call API delete
											}
										}}
										className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm shadow hover:bg-red-600"
									>
										🗑 Xóa
									</button>
								</div>
							</div>

							<div className="p-3">
								<h2 className="font-semibold text-gray-800 line-clamp-1">
									{item.name}
								</h2>

								<p className="text-red-500 font-semibold mt-1">
									{item.price.toLocaleString()} đ
								</p>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex justify-center items-center mt-10 gap-2">
					<button
						disabled={page === 1}
						onClick={() => setPage((prev) => prev - 1)}
						className="px-3 py-1 border rounded-lg bg-white disabled:opacity-50"
					>
						←
					</button>

					{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
						<button
							key={p}
							onClick={() => setPage(p)}
							className={`px-3 py-1 rounded-lg border ${
								p === page
									? "bg-blue-600 text-white"
									: "bg-white hover:bg-gray-100"
							}`}
						>
							{p}
						</button>
					))}

					<button
						disabled={page === totalPages}
						onClick={() => setPage((prev) => prev + 1)}
						className="px-3 py-1 border rounded-lg bg-white disabled:opacity-50"
					>
						→
					</button>
				</div>
			)}

			<ProductFormModal
				open={open}
				onClose={() => setOpen(false)}
				onSuccess={() => setOpen(false)}
				data={productDetail}
				isLoading={isLoadingDetail}
			/>
			<ProductDetailModal
				open={openView}
				onClose={() => setOpenView(false)}
				data={productDetail}
			/>
		</div>
	);
};

export default ProductPage;
