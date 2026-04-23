import gateway from "@/api";
import type { ICustomerDetail, ICustomerPayload } from "@/types/customer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";


export const useCreateCustomer = () => {
    return useMutation({
        mutationFn: (payload: ICustomerPayload) => gateway.customer.sendCreateCustomerRequest(payload),
        onSuccess: async (data) => {
            toast.success(data?.data?.message || "Tạo khách hàng thành công", {
                description: "Khách hàng đã được tạo thành công."
            });
        },
        onError: (error) => {
            console.log("Create customer error:", error);
            toast.error("Tạo khách hàng thất bại!", {
                description: "Vui lòng kiểm tra lại thông tin khách hàng."
            });
        }
    });
};

export const useGetCustomerDetail = (customerId: string) => {
    const query = useQuery({
        queryKey: ["get-customer-detail", customerId],
        queryFn: async () => {
            try {
                const res = await gateway.customer.sendGetCustomerDetailRequest(customerId);
                return res?.data ?? null;
            } catch (error: any) {
                console.error("Failed to fetch customer detail:", error);
                throw error;
            }
        }
        // enabled: false
    });

    const queryData = (query.data as any)?.data as ICustomerDetail[];

    return {
        customerDetail: queryData,
        ...query
    };
};

export const useGetCustomerSelection = (searchTerm?: string) => {
    const query = useQuery({
        queryKey: ["get-customer-selection", searchTerm],
        queryFn: async () => {
            try {
                const res = await gateway.customer.sendGetCustomerSelectionRequest(searchTerm);
                return res?.data ?? null;
            } catch (error: any) {
                console.error("Failed to fetch customer selection:", error);
                throw error;
            }
        }
        // enabled: false
    });

    const queryData = (query.data as any)?.data as ICustomerDetail[];

    return {
        customerSelection: queryData,
        ...query
    };
};