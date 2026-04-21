import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, MoveLeft, MoveRight } from 'lucide-react';
import { OrderStatus, PaymentMode, type OrderForm } from '@/types/order';
import { ReceiptText } from 'lucide-react';
import QuantitySelector from '../quantitySelector';
import { useOrderStore } from '@/zustand/orderStore';
import { AnimatePresence, motion } from 'framer-motion';


export function MenuSelector() {
    const { currentOrder,
        removeCurrentOrderById,
        removeAllCurrentOrder,
        updateQuantityCurrentOrder,
        statusOrder,
        setStatusOrder,
        addDraftOrder,
        setOrderForm
    } = useOrderStore();

    const [draftNote, setDraftNote] = useState('');

    const totalPrice = currentOrder?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

    return (
        <div className="w-full h-full border-r border-gray-200 flex flex-col gap-4 p-2 overflow-auto max-h-svh">
            <section className="flex-1 min-h-60 max-h-60 overflow-auto">
                {(currentOrder?.length ?? 0) > 0 ? (
                    <div className="space-y-4 mb-8">
                        {currentOrder?.map((item) => (
                            <div key={item._id}>
                                {/* 👉 Tablet (md) */}
                                <div >
                                    <QuantitySelector.Tablet
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        onQuantityChange={(newQuantity) => {
                                            updateQuantityCurrentOrder(item._id, newQuantity);
                                        }}
                                        onDelete={() => removeCurrentOrderById(item._id)}
                                    />
                                </div>

                                {/* 👉 Desktop (lg) */}
                                {/* <div className="hidden lg:block">
                                    <QuantitySelector
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        onQuantityChange={(newQuantity) => {
                                            updateQuantityCurrentOrder(item._id, newQuantity);
                                        }}
                                        onDelete={() => removeCurrentOrderById(item._id)}
                                    />
                                </div> */}
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

            <section className="border-t border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Số món</span>
                    <span className="text-lg font-semibold">{currentOrder?.length || 0} món</span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <span className="text-md font-semibold md:text-md lg:text-lg">Tổng cộng</span>
                    <span className="text-md font-bold text-primary md:text-lg lg:text-lg">
                        {totalPrice.toLocaleString('vi-VN')} đ
                    </span>
                </div>

                {
                    statusOrder === OrderStatus.ORDER && (
                        <Button
                            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg"
                            onClick={() => {
                                if (currentOrder) {
                                    const newOrderForm: OrderForm = {
                                        code: `draft-${Date.now()}`,
                                        timeOrder: new Date(),
                                        totalPrice: totalPrice,
                                        status: OrderStatus.DRAFT,
                                        orders: currentOrder,
                                        note: draftNote || "",
                                        paymentMethod: PaymentMode.CASH
                                    };
                                    setOrderForm(newOrderForm);
                                    setStatusOrder(OrderStatus.PAYMENT);
                                }
                            }}
                            disabled={currentOrder?.length === 0}
                        >
                            Tiếp tục <MoveRight />
                        </Button>
                    )
                }

                {
                    statusOrder === OrderStatus.PAYMENT && (
                        <Button
                            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg"
                            onClick={() => setStatusOrder(OrderStatus.ORDER)}
                        >
                            <MoveLeft /> Quay lại chọn món
                        </Button>
                    )
                }


                <AnimatePresence>
                    {statusOrder === OrderStatus.ORDER && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: 20 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="space-y-3"
                        >
                            <Input
                                type="text"
                                placeholder="Ghi chú đơn tạm..."
                                value={draftNote}
                                onChange={(e) => setDraftNote(e.target.value)}
                                className="border-gray-300 rounded-md h-10"
                            />

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 gap-2 lg:h-10 md:h-8 border-gray-300"
                                    onClick={() => {
                                        if (currentOrder) {
                                            const newDraft: OrderForm = {
                                                code: `draft-${Date.now()}`,
                                                timeOrder: new Date(),
                                                totalPrice: totalPrice,
                                                status: OrderStatus.DRAFT,
                                                orders: currentOrder,
                                                note: draftNote || "Không có ghi chú"
                                            };
                                            addDraftOrder(newDraft);
                                            removeAllCurrentOrder();
                                            setDraftNote("");
                                        }
                                    }}
                                >
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}
