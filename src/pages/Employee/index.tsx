import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";

// UI
import { Input } from "@/components/ui/input";
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
import { Trash2 } from "lucide-react";

// Services
import {
	useGetEmployeeList,
	useGetEmployeeDetail,
	useDeleteEmployee,
} from "@/services/employeeServices";

// Modals
import EmployeeDetailModal from "@/pages/Employee/EmployeeDetailModal";
import { EmployeeFormModal } from "@/pages/Employee/EmployeeFormModal";

const EmployeePage = () => {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [rows] = useState(10);

	const [openDetail, setOpenDetail] = useState(false);
	const [openForm, setOpenForm] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

	const [deletingId, setDeletingId] = useState<string | null>(null);

	const debouncedSearch = useDebounce(search, 500);

	const { employeeList, employeeListCount, isLoading, isRefetching } =
		useGetEmployeeList({
			page,
			rows,
			search: debouncedSearch,
		});

	const { data: employeeDetail, isFetching: isLoadingDetail } =
		useGetEmployeeDetail(selectedEmployee?._id, {
			enabled: !!selectedEmployee?._id && (openForm || openDetail),
		});
	console.log("employeeDetail", isLoadingDetail);
	const { mutate: deleteEmployee } = useDeleteEmployee();

	const totalPages = Math.ceil((employeeListCount || 0) / rows);

	const handleDelete = (id: string) => {
		const confirmDelete = window.confirm("Bạn có chắc muốn xóa nhân viên?");
		if (!confirmDelete) return;

		setDeletingId(id);

		deleteEmployee(id, {
			onSuccess: () => setDeletingId(null),
			onError: () => setDeletingId(null),
		});
	};

	return (
		<div className="p-6 space-y-6">
			{/* HEADER */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold">Nhân viên</h1>
					<p className="text-sm text-muted-foreground">
						Quản lý danh sách nhân viên
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

					<Button onClick={() => setOpenForm(true)}>+ Thêm nhân viên</Button>
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
			) : employeeList.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
					<div className="text-5xl mb-3">👨‍🍳</div>
					<p className="text-lg font-medium">Không có nhân viên</p>
					<p className="text-sm">Thử tìm kiếm hoặc thêm mới</p>
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
					{employeeList.map((item: any) => (
						<Card
							key={item._id}
							className="hover:shadow-lg transition cursor-pointer"
						>
							<CardContent className="p-4 space-y-2">
								{/* HEADER */}
								<div className="flex items-center justify-between">
									<h2 className="font-semibold line-clamp-1">{item.name}</h2>

									{/* DELETE */}
									<Button
										size="icon"
										variant="ghost"
										onClick={(e) => {
											e.stopPropagation();
											handleDelete(item._id);
										}}
										disabled={deletingId === item._id}
									>
										{deletingId === item._id ? (
											<span className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
										) : (
											<Trash2 className="w-4 h-4 text-red-500" />
										)}
									</Button>
								</div>

								{/* INFO */}
								<p className="text-sm text-muted-foreground">
									📞 {item.phoneNumber}
								</p>

								<p className="text-xs text-muted-foreground line-clamp-2">
									📍 {item.address || "Không có địa chỉ"}
								</p>

								{/* ACTION */}
								<div className="flex justify-between items-center pt-2">
									<p className="text-xs text-muted-foreground">
										{new Date(item.createdAt).toLocaleDateString("vi-VN")}
									</p>

									<div className="flex gap-2">
										<Button
											size="sm"
											variant="outline"
											onClick={() => {
												setSelectedEmployee(item);
												setOpenDetail(true);
											}}
										>
											Xem
										</Button>

										<Button
											size="sm"
											variant="secondary"
											onClick={() => {
												setSelectedEmployee(item);
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

			{/* MODALS */}
			<EmployeeDetailModal
				open={openDetail}
				onClose={() => {
					setOpenDetail(false);
					setSelectedEmployee(null);
				}}
				data={employeeDetail?.data}
				isLoading={isLoadingDetail}
			/>

			<EmployeeFormModal
				open={openForm}
				onClose={() => {
					setSelectedEmployee(null);
					setOpenForm(false);
				}}
				onSuccess={() => {
					setSelectedEmployee(null);
					setOpenForm(false);
				}}
				data={employeeDetail?.data}
				isLoading={isLoadingDetail}
			/>
		</div>
	);
};

export default EmployeePage;
