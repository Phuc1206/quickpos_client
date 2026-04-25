import gateway from "@/api";
import type { IPagination } from "@/types/common";
import type { IProductData } from "@/types/product";
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

export const useGetProductList = (payload: IPagination) => {
	const query = useQuery({
		queryKey: [
			"get-products-list",
			payload?.page,
			payload?.rows,
			payload?.search,
		],
		queryFn: async () => {
			try {
				const res = await gateway.product.sendProductListRequest(payload);
				return res?.data ?? null;
			} catch (error: any) {
				console.error("Failed to fetch product list:", error);
				throw error;
			}
		},
		// enabled: false
	});
	const queryData = (query.data as any)?.data?.menuItems as IProductData[];
	const countTotal = ((query.data as any)?.data?.count as number) || 0;

	// const productsList = queryData?.map((item: IProductData) => ({
	//     ...item
	// }));

	return {
		productsList: queryData,
		productListCount: countTotal,
		...query,
	};
};

export const useGetInfiniteProducts = (payload: Omit<IPagination, "page">) => {
	const query = useInfiniteQuery({
		queryKey: ["get-products-infinite", payload?.rows, payload?.search],
		queryFn: async ({ pageParam = 1 }) => {
			try {
				const res = await gateway.product.sendProductListRequest({
					...payload,
					page: pageParam,
				});
				return res?.data?.data ?? null;
			} catch (error: any) {
				console.error("Failed to fetch product list:", error);
				throw error;
			}
		},
		getNextPageParam: (lastPage, allPages) => {
			const currentTotalLoaded = allPages.length * (payload.rows || 10);
			const totalCount = lastPage?.count || 0;

			return currentTotalLoaded < totalCount ? allPages.length + 1 : undefined;
		},
	});

	const productsList =
		query.data?.pages.flatMap((page) => page.menuItems as IProductData[]) || [];
	const productListCount = query.data?.pages[0]?.count || 0;

	return {
		productsList,
		productListCount,
		...query,
	};
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
			return await gateway.product.updateProductRequest(id, payload);
		},

		onSuccess: (_, variables) => {
			// refresh detail
			queryClient.invalidateQueries({
				queryKey: ["get-product-detail", variables.id],
			});

			// refresh list
			queryClient.invalidateQueries({
				queryKey: ["get-products-list"],
			});
		},

		onError: (error: any) => {
			console.error("Update product failed:", error);
		},
	});
};

export const useGetProductDetail = (productId: string) => {
	const query = useQuery({
		queryKey: ["get-product-detail", productId],
		queryFn: async () => {
			try {
				const res = await gateway.product.getProductDetailRequest(productId);
				return res?.data ?? null;
			} catch (error: any) {
				console.error("Failed to fetch product detail:", error);
				throw error;
			}
		},
		enabled: !!productId,
	});

	const queryData = (query.data as any)?.data as IProductData[];

	return {
		productDetail: queryData,
		...query,
	};
};

export const useCreateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: any) => {
			return await gateway.product.createProductRequest(payload);
		},
		onSuccess: () => {
			// refresh list
			queryClient.invalidateQueries({
				queryKey: ["get-products-list"],
			});
		},
		onError: (error: any) => {
			console.error("Create product failed:", error);
		},
	});
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			return await gateway.product.deleteProductRequest(id);
		},
		onSuccess: () => {
			// refresh list
			queryClient.invalidateQueries({
				queryKey: ["get-products-list"],
			});
		},
		onError: (error: any) => {
			console.error("Delete product failed:", error);
		},
	});
};
