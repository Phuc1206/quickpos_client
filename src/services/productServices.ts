import gateway from "@/api";
import type { IPagination } from "@/types/common";
import type { IProductData } from "@/types/product";
import { useQuery } from "@tanstack/react-query";


export const useGetProductList = (payload: IPagination) => {
    const query = useQuery({
        queryKey: ["get-products-list", payload?.page, payload?.rows, payload?.search],
        queryFn: async () => {
            try {
                const res = await gateway.product.sendProductListRequest(payload);
                return res?.data ?? null;
            } catch (error: any) {
                console.error("Failed to fetch product list:", error);
                throw error;
            }
        }
        // enabled: false
    });
    const queryData = (query.data as any)?.data as IProductData[];
    const countTotal = ((query.data as any)?.count as number) || 0;

    // const productsList = queryData?.map((item: IProductData) => ({
    //     ...item
    // }));

    return {
        productsList: queryData,
        productListCount: countTotal,
        ...query
    };
};