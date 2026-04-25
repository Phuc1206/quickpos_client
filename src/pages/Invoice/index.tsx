import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";

// shadcn
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import { useGetBillDetail, useGetBillList } from "@/services/orderServices";
import InvoiceDetailModal from "@/pages/Invoice/InvoiceDetailModal";

const InvoicePage = () => {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [rows] = useState(10);
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [openDetail, setOpenDetail] = useState(false);
	const [selectedBill, setSelectedBill] = useState<any>(null);

	const debouncedSearch = useDebounce(search, 500);

	const { data, isLoading, isRefetching } = useGetBillList({
		page,
		rows,
		search: debouncedSearch,
		from,
		to,
	});
	const { data: billDetail } = useGetBillDetail(selectedBill?._id);

	const bills = data?.bills || [];
	const totalPages = Math.ceil((data?.count || 0) / rows);
	const formatDate = (date: string) => {
		if (!date) return "...";
		return new Date(date).toLocaleDateString("vi-VN");
	};
	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="flex flex-col gap-4">
				<div>
					<h1 className="text-2xl font-bold">Đơn hàng</h1>
					<p className="text-sm text-muted-foreground">
						Quản lý hóa đơn bán hàng
					</p>
				</div>

				{/* FILTER BAR */}
				<div className="flex flex-wrap items-center gap-3">
					<Input
						value={search}
						onChange={(e) => {
							setPage(1);
							setSearch(e.target.value);
						}}
						placeholder="Tìm mã hóa đơn, khách hàng..."
						className="w-64"
					/>

					<Input
						type="date"
						value={from}
						onChange={(e) => {
							setPage(1);
							setFrom(e.target.value);
						}}
						className="w-40"
					/>

					<Input
						type="date"
						value={to}
						min={from}
						onChange={(e) => {
							setPage(1);
							setTo(e.target.value);
						}}
						className="w-40"
					/>

					<Button
						variant="outline"
						onClick={() => {
							setFrom("");
							setTo("");
							setPage(1);
						}}
					>
						Xóa lọc
					</Button>
				</div>

				{/* SHOW FILTER */}
				{(from || to) && (
					<div className="flex items-center gap-2 text-sm">
						<span className="text-muted-foreground">Đang lọc:</span>
						<Badge variant="secondary">
							{formatDate(from)} → {formatDate(to)}
						</Badge>
					</div>
				)}
			</div>

			{/* Table */}
			<div className="border rounded-xl bg-white">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Mã</TableHead>
							<TableHead>Khách hàng</TableHead>
							<TableHead>Số món</TableHead>
							<TableHead>Tổng tiền</TableHead>
							<TableHead>Thanh toán</TableHead>
							<TableHead>Ngày</TableHead>
							<TableHead>Hành động</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{isLoading || isRefetching ? (
							<TableRow>
								<TableCell colSpan={6} className="text-center py-10">
									Đang tải...
								</TableCell>
							</TableRow>
						) : bills.length === 0 ? (
							<TableRow>
								<TableCell colSpan={6} className="text-center py-10">
									Không có dữ liệu
								</TableCell>
							</TableRow>
						) : (
							bills.map((bill: any) => (
								<TableRow key={bill._id} className="hover:bg-muted/50">
									<TableCell className="font-medium">{bill.code}</TableCell>

									<TableCell>
										<div className="font-medium">{bill.customer?.name}</div>
										<div className="text-xs text-muted-foreground">
											{bill.customer?.phoneNumber}
										</div>
									</TableCell>

									<TableCell>{bill.totalQuantity}</TableCell>

									<TableCell className="font-semibold text-red-500">
										{bill.finalAmount?.toLocaleString()} đ
									</TableCell>

									<TableCell>
										<Badge variant="secondary">{bill.paymentMethod}</Badge>
									</TableCell>

									<TableCell>
										{new Date(bill.createdAt).toLocaleString("vi-VN")}
									</TableCell>
									<TableCell>
										<Button
											size="sm"
											variant="outline"
											onClick={() => {
												setSelectedBill(bill);
												setOpenDetail(true);
											}}
										>
											Xem
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
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
			<InvoiceDetailModal
				open={openDetail}
				onClose={() => setOpenDetail(false)}
				data={billDetail?.data}
			/>
		</div>
	);
};

export default InvoicePage;
