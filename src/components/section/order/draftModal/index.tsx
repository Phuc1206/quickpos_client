import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useOrderStore } from "@/zustand/orderStore"
import { DraftItem } from "../draftItem";

export function DraftModal() {
    const { draftOrders, removeDraftOrderById, addListCurrentOrder } = useOrderStore();

    return (
        <DialogContent className="sm:max-w-150">
            <DialogHeader>
                <DialogTitle>Danh sách đơn hàng tạm</DialogTitle>
                <DialogDescription>
                    Chọn một đơn hàng để tiếp tục xử lý.
                </DialogDescription>
            </DialogHeader>

            <div className="py-4 max-h-[60vh] overflow-y-auto">
                {draftOrders.length === 0 ? (
                    <p className="text-center text-gray-500">Không có đơn hàng tạm nào.</p>
                ) : (
                    <ul className="space-y-2">
                        {draftOrders.map((order) => (
                            <DraftItem
                                key={order.code}
                                name={order.note}
                                itemCount={order.orders.length}
                                totalPrice={order.totalPrice}
                                timestamp={order.timeOrder}
                                onDelete={() => removeDraftOrderById(order.code)}
                                onResume={() => {
                                    addListCurrentOrder(order?.orders || []);
                                    removeDraftOrderById(order.code);
                                }}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </DialogContent>
    )
}
