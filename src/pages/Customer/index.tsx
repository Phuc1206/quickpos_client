import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";

// shadcn
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import {
	useGetCustomerDetail,
	useGetCustomerList,
} from "@/services/customerServices";
import CustomerDetailModal from "@/pages/Customer/CustomerDetailModal";
import CustomerFormModal from "@/pages/Customer/CustomerFormModal";

const CustomerPage = () => {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [rows] = useState(10);
	const [openDetail, setOpenDetail] = useState(false);
	const [openForm, setOpenForm] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
	const debouncedSearch = useDebounce(search, 500);

	const { customerList, customerListCount, isLoading, isRefetching } =
		useGetCustomerList({
			page,
			rows,
			search: debouncedSearch,
		});

	const { data: customerDetail, isLoading: isLoadingDetail } =
		useGetCustomerDetail(selectedCustomer?._id);
	const totalPages = Math.ceil((customerListCount || 0) / rows);

	return (
		<div className="p-6 space-y-6">
			{/* HEADER */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold">Khách hàng</h1>
					<p className="text-sm text-muted-foreground">
						Quản lý danh sách khách hàng
					</p>
				</div>

				<div className="flex items-center gap-3">
					<Input
						value={search}
						onChange={(e) => {
							setPage(1);
							setSearch(e.target.value);
						}}
						placeholder="Tìm tên, số điện thoại..."
						className="w-64"
					/>

					<Button onClick={() => setOpenForm(true)}>+ Thêm khách</Button>
				</div>
			</div>

			{/* CONTENT */}
			{isLoading || isRefetching ? (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
					{Array.from({ length: 10 }).map((_, i) => (
						<Card key={i} className="animate-pulse">
							<CardContent className="p-4 space-y-2">
								<div className="h-4 bg-muted rounded w-3/4" />
								<div className="h-3 bg-muted rounded w-1/2" />
								<div className="h-3 bg-muted rounded w-full" />
							</CardContent>
						</Card>
					))}
				</div>
			) : customerList.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
					<div className="text-5xl mb-3">👤</div>
					<p className="text-lg font-medium">Không có khách hàng</p>
					<p className="text-sm">Thử tìm kiếm hoặc thêm mới</p>
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
					{customerList.map((item: any) => (
						<Card
							key={item._id}
							className="hover:shadow-lg transition cursor-pointer"
						>
							<CardContent className="p-4 space-y-2">
								<div className="flex items-center justify-between">
									<h2 className="font-semibold line-clamp-1">{item.name}</h2>

									<Badge variant="secondary">KH</Badge>
								</div>

								<p className="text-sm text-muted-foreground">
									📞 {item.phoneNumber}
								</p>

								<p className="text-xs text-muted-foreground line-clamp-2">
									📍 {item.address || "Không có địa chỉ"}
								</p>

								<div className="flex justify-between items-center pt-2">
									<p className="text-xs text-muted-foreground">
										{new Date(item.createdAt).toLocaleDateString("vi-VN")}
									</p>
									<div className="flex gap-2">
										<Button
											size="sm"
											variant="outline"
											onClick={() => {
												setSelectedCustomer(item);
												setOpenDetail(true);
											}}
										>
											Xem
										</Button>
										<Button
											size="sm"
											variant="secondary"
											onClick={() => {
												setSelectedCustomer(item);
												setOpenForm(true);
											}}
										>
											Sửa
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			{/* PAGINATION */}
			{totalPages > 1 && (
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={() => setPage((p) => Math.max(p - 1, 1))}
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
								onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			)}
			<CustomerDetailModal
				open={openDetail}
				onClose={() => setOpenDetail(false)}
				data={customerDetail?.data}
				isLoading={isLoadingDetail}
			/>
			<CustomerFormModal
				open={openForm}
				onClose={() => setOpenForm(false)}
				onSuccess={() => setOpenForm(false)}
				data={customerDetail?.data.customer}
				isLoading={isLoadingDetail}
			/>
		</div>
	);
};

export default CustomerPage;
