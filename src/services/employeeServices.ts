import gateway from "@/api";
import type { IPagination } from "@/types/common";
import type { IEmployeeDetail } from "@/types/employee";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: any) => {
			return await gateway.employee.sendCreateEmployeeRequest(payload);
		},
		onSuccess: async (data: any) => () => {
			toast.success(data?.data?.message || "Tạo nhân viên thành công", {
				description: "Nhân viên đã được tạo thành công.",
			});
			// refresh list
			queryClient.invalidateQueries({
				queryKey: ["get-employee-list"],
			});
		},
		onError: (error: any) => {
			console.error("Create employee failed:", error);
			toast.error("Tạo nhân viên thất bại!", {
				description: "Vui lòng kiểm tra lại thông tin nhân viên.",
			});
		},
	});
};

export const useGetEmployeeList = (payload: IPagination) => {
	const query = useQuery({
		queryKey: ["get-employee-list"],
		queryFn: async () => {
			try {
				const res = await gateway.employee.getEmployeeListRequest(payload);
				return res?.data ?? null;
			} catch (error: any) {
				console.error("Failed to fetch employee list:", error);
				throw error;
			}
		},
	});

	const queryData = (query.data as any)?.data?.employees as IEmployeeDetail[];
	const countTotal = ((query.data as any)?.data?.count as number) || 0;

	return {
		employeeList: queryData,
		employeeListCount: countTotal,
		...query,
	};
};

export const useGetEmployeeDetail = (employeeId: string) => {
	const query = useQuery({
		queryKey: ["get-employee-detail", employeeId],
		queryFn: async () => {
			try {
				const res = await gateway.employee.getEmployeeDetailRequest(employeeId);
				return res?.data ?? null;
			} catch (error: any) {
				console.error("Failed to fetch employee detail:", error);
				throw error;
			}
		},
		enabled: !!employeeId,
	});

	const queryData = (query.data as any)?.data as IEmployeeDetail[];

	return {
		employeeDetail: queryData,
		...query,
	};
};

export const useUpdateEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: any) => {
			return await gateway.employee.sendUpdateEmployeeRequest(payload);
		},
		onSuccess: async (data: any) => () => {
			toast.success(data?.data?.message || "Cập nhật nhân viên thành công", {
				description: "Nhân viên đã được cập nhật thành công.",
			});
			// refresh list
			queryClient.invalidateQueries({
				queryKey: ["get-employee-list"],
			});
		},
		onError: (error: any) => {
			console.error("Update employee failed:", error);
			toast.error("Cập nhật nhân viên thất bại!", {
				description: "Vui lòng kiểm tra lại thông tin nhân viên.",
			});
		},
	});
};

export const useDeleteEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			return await gateway.employee.sendDeleteEmployeeRequest(id);
		},
		onSuccess: async (data: any) => () => {
			toast.success(data?.data?.message || "Xóa nhân viên thành công", {
				description: "Nhân viên đã được xóa thành công.",
			});
			// refresh list
			queryClient.invalidateQueries({
				queryKey: ["get-employee-list"],
			});
		},
		onError: (error: any) => {
			console.error("Delete employee failed:", error);
			toast.error("Xóa nhân viên thất bại!", {
				description: "Vui lòng kiểm tra lai thông tin nhân viên.",
			});
		},
	});
};
