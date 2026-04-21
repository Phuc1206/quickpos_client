import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';
import { OrderStatus } from '@/types/order';
import { ReceiptText } from 'lucide-react';
import QuantitySelector from '../quantitySelector';
import { useOrderStore } from '@/zustand/orderStore';


export function MenuSelector() {
    const { currentOrder,
        removeCurrentOrderById,
        removeAllCurrentOrder,
        updateQuantityCurrentOrder,
        statusOrder,
        setStatusOrder
    } = useOrderStore();

    const [draftNote, setDraftNote] = useState('');

    const totalPrice = currentOrder?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

    return (
        // 1. Thêm flex flex-col và h-full ở đây
        <div className="w-full h-full bg-amber-300 flex flex-col gap-4 p-2">

            {/* 2. Phần Menu: dùng flex-1 để chiếm không gian trống và cho phép scroll */}
            <section className="min-h-65 max-h-65 overflow-auto">
                {(currentOrder?.length ?? 0) > 0 ? (
                    <div className="space-y-4 mb-8">
                        {currentOrder?.map((item) => (
                            <div key={item._id}>
                                {/* 👉 Tablet (md) */}
                                <div className="hidden sm:block lg:hidden">
                                    <QuantitySelector.Tablet
                                        name={item.name}
                                        price={item.price}
                                        initialQuantity={item.quantity}
                                        onQuantityChange={(newQuantity) => {
                                            updateQuantityCurrentOrder(item._id, newQuantity);
                                        }}
                                        onDelete={() => removeCurrentOrderById(item._id)}
                                    />
                                </div>

                                {/* 👉 Desktop (lg) */}
                                <div className="hidden lg:block">
                                    <QuantitySelector
                                        name={item.name}
                                        price={item.price}
                                        initialQuantity={item.quantity}
                                        onQuantityChange={(newQuantity) => {
                                            updateQuantityCurrentOrder(item._id, newQuantity);
                                        }}
                                        onDelete={() => removeCurrentOrderById(item._id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-16">
                        <ReceiptText className="text-gray-300 mb-4" size={50} />
                        <p className="text-gray-500 text-md font-bold">Đơn hàng trống</p>
                        <p className="text-gray-500 text-xs">Chọn món từ menu bên phải</p>
                    </div>
                )}
            </section>

            {/* 3. Phần Tổng cộng: Tự động bám sát đáy nhờ flex-col */}
            <section className=" border-t border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Số món</span>
                    <span className="text-lg font-semibold">{currentOrder?.length || 0}</span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <span className="text-lg font-semibold">Tổng cộng</span>
                    <span className="text-2xl font-bold text-orange-500">
                        {totalPrice.toLocaleString('vi-VN')} đ
                    </span>
                </div>

                {/* Các nút bấm giữ nguyên như cũ */}
                {statusOrder === OrderStatus.ORDER && (
                    <div className="space-y-3">
                        <Input
                            type="text"
                            placeholder="Ghi chú đơn tạm..."
                            value={draftNote}
                            onChange={(e) => setDraftNote(e.target.value)}
                            className="border-gray-300 rounded-md h-10"
                        />
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1 gap-2 lg:h-10 md:h-8 border-gray-300">
                                <Plus className="h-4 w-4" /> Lưu tạm
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 gap-2 lg:h-10 md:h-8 text-destructive border-red-300"
                                onClick={removeAllCurrentOrder}
                            >
                                <Trash2 className="h-4 w-4" /> Xóa tất cả
                            </Button>
                        </div>
                    </div>
                )}

                <Button
                    className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg"
                    onClick={() => setStatusOrder(statusOrder === OrderStatus.ORDER ? OrderStatus.PAYMENT : OrderStatus.ORDER)}
                    disabled={currentOrder?.length === 0}
                >
                    {statusOrder === OrderStatus.ORDER ? "Tiếp tục ›" : "‹ Quay lại"}
                </Button>
            </section>
        </div>
    );
}
