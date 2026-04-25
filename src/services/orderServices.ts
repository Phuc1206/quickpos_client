import gateway from "@/api";
import type { IBillDetail, IBillPayload } from "@/types/order";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateBill = () => {
	return useMutation({
		mutationFn: (payload: IBillPayload) =>
			gateway.order.sendCreateBillRequest(payload),
		onSuccess: async (data) => {
			console.log("Create bill success:", data);
			// toast.success(data?.data?.message || "Tạo hóa đơn thành công", {
			// 	description: "Hóa đơn đã được tạo thành công.",
			// });
		},
		onError: (error) => {
			console.log("Create bill error:", error);
			toast.error("Tạo hóa đơn thất bại!", {
				description: "Vui lòng kiểm tra lại thông tin hóa đơn.",
			});
		},
	});
};

export const useGetBillDetail = (billId: string) => {
	const query = useQuery({
		queryKey: ["get-bill-detail", billId],
		queryFn: async () => {
			try {
				const res = await gateway.order.sendGetBillDetailRequest(billId);
				return res?.data ?? null;
			} catch (error: any) {
				console.error("Failed to fetch bill detail:", error);
				throw error;
			}
		},
		enabled: !!billId,
	});

	const queryData = (query.data as any)?.data as IBillDetail;

	return {
		billDetail: queryData,
		...query,
	};
};

export const useGetBillList = (payload: {
	page: number;
	rows: number;
	search?: string;
	from?: string;
	to?: string;
}) => {
	const { page, rows, search, from, to } = payload;

	return useQuery({
		// 🔥 KEY PHẢI CÓ PARAMS
		queryKey: ["get-bill-list", page, rows, search, from, to],

		queryFn: async () => {
			try {
				const res = await gateway.order.getListBillRequest({
					page,
					rows,
					search,
					from,
					to,
				});

				return (
					res?.data?.data ?? {
						bills: [],
						count: 0,
					}
				);
			} catch (error: any) {
				console.error("Failed to fetch bill list:", error);
				throw error;
			}
		},

		keepPreviousData: true, // 🔥 chuyển page mượt
	});
};
