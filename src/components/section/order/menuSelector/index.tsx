import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';
import { OrderStatus, type OrderStatusType } from '@/types/order';
import { ReceiptText } from 'lucide-react';
import QuantitySelector from '../quantitySelector';
import { useOrderStore } from '@/zustand/orderStore';


export function MenuSelector() {
    const [status, setStatus] = useState<OrderStatusType>(OrderStatus.ORDER);
    const { currentOrder, removeCurrentOrderById, removeAllCurrentOrder, updateQuantityCurrentOrder } = useOrderStore();

    const [draftNote, setDraftNote] = useState('');

    const totalPrice = currentOrder?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

    return (
        <div className="bg-white border-r border-gray-200">
            <div className="p-6 w-full">
                {/* Selected Items */}
                {(currentOrder?.length ?? 0) > 0 ? (
                    <div className="space-y-4 mb-8">
                        {currentOrder?.map((item) => (
                            <div key={item._id}>
                                {/* 👉 Tablet (md) */}
                                <div className="hidden md:block lg:hidden">
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
                    <div className="text-center py-16">
                        <ReceiptText className="mx-auto text-gray-300 mb-4" size={50} />
                        <p className="text-gray-500 text-md font-bold">Đơn hàng trống</p>
                        <p className="text-gray-500 text-xs">Chọn món từ menu bên phải</p>
                    </div>
                )}

                {/* Summary Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                    {/* Item Count and Total */}
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

                    {/* Draft Note Section */}
                    <div className="space-y-3">
                        <Input
                            type="text"
                            placeholder="Ghi chú đơn tạm..."
                            value={draftNote}
                            onChange={(e) => setDraftNote(e.target.value)}
                            className="border-gray-300"
                        />

                        {/* Save Draft & Delete All Buttons */}
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 gap-2 lg:h-10 md:h-8 border-gray-300 hover:bg-amber-50 hover:border-primary hover:text-primary"
                            >
                                <Plus className="h-4 w-4" />
                                Lưu tạm
                            </Button>

                            <Button
                                variant="outline"
                                className="flex-1 gap-2 lg:h-10 md:h-8 bg-white border-red-300 text-destructive hover:text-destructive hover:bg-red-50"
                                onClick={removeAllCurrentOrder}
                            >
                                <Trash2 className="h-4 w-4" />
                                Xóa tất cả món
                            </Button>
                        </div>
                    </div>

                    {/* Active Button */}
                    {status === OrderStatus.ORDER &&
                        <Button
                            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg gap-2"
                            onClick={() => setStatus(OrderStatus.PAYMENT)}
                            disabled={currentOrder?.length === 0}
                        >
                            Tiếp tục
                            <span>›</span>
                        </Button>
                    }

                    {status === OrderStatus.PAYMENT &&
                        <Button
                            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg gap-2"
                            onClick={() => setStatus(OrderStatus.ORDER)}
                        >
                            <span>‹</span>
                            Quay lại thanh toán
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}
