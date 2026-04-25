import useDebounce from "@/hooks/useDebounce";
import ProductDetailModal from "@/pages/Product/ProductDetailModal";
import ProductFormModal from "@/pages/Product/ProductFormModal";
import {
	useDeleteProduct,
	useGetProductDetail,
	useGetProductList,
} from "@/services/productServices";
import { useState } from "react";

// shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

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
		isRefetching,
	} = useGetProductList({
		page,
		rows,
		search: debouncedSearch,
	});

	const { productDetail, isLoading: isLoadingDetail } = useGetProductDetail(
		selectedItem?._id,
	);
	const { mutate: deleteProduct, isLoading: isLoadingDelete } =
		useDeleteProduct();
	const totalPages = Math.ceil(productListCount / rows);

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold">Quản lý món ăn</h1>
					<p className="text-sm text-muted-foreground">
						Quản lý danh sách món ăn trong hệ thống
					</p>
				</div>

				<div className="flex items-center gap-3">
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Tìm món ăn..."
						className="w-64"
					/>

					<Button
						onClick={() => {
							setSelectedItem(null);
							setOpen(true);
						}}
					>
						+ Thêm món
					</Button>
				</div>
			</div>

			{/* Content */}
			{isLoading || isRefetching || isLoadingDelete ? (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
					{Array.from({ length: 10 }).map((_, i) => (
						<Card key={i} className="animate-pulse">
							<CardContent className="p-3">
								<div className="h-36 bg-muted rounded mb-3" />
								<div className="h-4 bg-muted rounded w-3/4 mb-2" />
								<div className="h-4 bg-muted rounded w-1/2" />
							</CardContent>
						</Card>
					))}
				</div>
			) : menus.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
					<div className="text-5xl mb-3">🍽️</div>
					<p className="text-lg font-medium">Không có món ăn nào</p>
					<p className="text-sm">Thử tìm kiếm hoặc thêm món mới</p>
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
					{menus.map((item: any) => (
						<Card
							key={item._id}
							className="group overflow-hidden cursor-pointer hover:shadow-lg transition"
						>
							<div className="relative">
								<img
									src={item.image}
									className="w-full h-40 object-cover transition group-hover:scale-105"
								/>

								{/* overlay */}
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
									<Button
										size="sm"
										variant="secondary"
										onClick={(e) => {
											e.stopPropagation();
											setSelectedItem(item);
											setOpenView(true);
										}}
									>
										Xem
									</Button>

									<Button
										size="sm"
										onClick={(e) => {
											e.stopPropagation();
											setSelectedItem(item);
											setOpen(true);
										}}
									>
										Sửa
									</Button>

									<Button
										size="sm"
										variant="destructive"
										onClick={(e) => {
											e.stopPropagation();
											if (confirm("Bạn có chắc muốn xóa?")) {
												deleteProduct(item._id);
											}
										}}
									>
										Xóa
									</Button>
								</div>
							</div>

							<CardContent className="p-3">
								<h2 className="font-semibold line-clamp-1">{item.name}</h2>
								<p className="text-red-500 font-semibold mt-1">
									{item.price.toLocaleString()} đ
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			{/* Pagination */}
			{totalPages > 1 && (
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
							/>
						</PaginationItem>

						{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
							<PaginationItem key={p}>
								<PaginationLink
									isActive={p === page}
									onClick={() => setPage(p)}
								>
									{p}
								</PaginationLink>
							</PaginationItem>
						))}

						<PaginationItem>
							<PaginationNext
								onClick={() =>
									setPage((prev) => Math.min(prev + 1, totalPages))
								}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			)}

			{/* Modals */}
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
