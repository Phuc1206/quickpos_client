import { Skeleton } from "@/components/ui/skeleton";

export function OrderItemSkeleton() {
    return (
        <div className="relative w-full max-w-xs rounded-2xl overflow-hidden border border-gray-100 bg-card shadow-sm">
            {/* Container giả lập aspect-square */}
            <div className="relative w-full aspect-square">
                {/* Skeleton cho phần ảnh nền */}
                <Skeleton className="w-full h-full rounded-none" />

                {/* Skeleton cho Badge giá (top-2 left-2) */}
                <div className="absolute top-2 left-2">
                    <Skeleton className="h-6 w-20 rounded-md bg-gray-300/50" />
                </div>

                {/* Lớp overlay đen mờ ở dưới để giống UI thật */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-black/20 to-transparent" />

                {/* Skeleton cho Tên món ăn (bottom-0) */}
                <div className="absolute bottom-0 w-full p-3">
                    <Skeleton className="h-4 w-3/4 rounded bg-gray-200/60" />
                </div>
            </div>
        </div>
    );
}

// Bạn có thể tạo thêm một Grid để dùng trong OrderPage cho tiện
export function OrderListSkeleton({ count = 10 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: count }).map((_, i) => (
                <OrderItemSkeleton key={i} />
            ))}
        </div>
    );
}
