import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, MoveLeft, MoveRight } from 'lucide-react';
import { OrderStatus, PaymentMode, type OrderForm } from '@/types/order';
import { ReceiptText } from 'lucide-react';
import { useOrderStore } from '@/zustand/orderStore';
import { AnimatePresence, motion } from 'framer-motion';
import { formatVND, UNIT_PRICE } from '@/utils';
import QuantitySelector from '../quantitySelector';


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
        <div className="flex flex-col w-full h-full max-h-full">
            <header className="px-4 py-2">
                <h3 className="text-md font-semibold text-primary lg:text-lg">Đơn hàng</h3>
            </header>

            <section className="flex-1 overflow-auto min-h-[45%] max-h-[45%]">
                {(currentOrder?.length ?? 0) > 0 ? (
                    <div className="space-y-4 p-4">
                        {currentOrder?.map((item) => (
                            <div key={item._id}>
                                {/* 👉 Tablet (md) */}
                                <div >
                                    <QuantitySelector
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        onQuantityChange={(newQuantity: number) => {
                                            updateQuantityCurrentOrder(item._id, newQuantity);
                                        }}
                                        onRemove={() => removeCurrentOrderById(item._id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-16">
                        <ReceiptText className="mb-4 text-gray-300" size={50} />
                        <p className="font-bold text-gray-500 text-md">Đơn hàng trống</p>
                        <p className="text-xs text-gray-500">Chọn món từ menu bên phải</p>
                    </div>
                )}
            </section>

            <section className="flex flex-col gap-3 mt-2 border-t border-gray-200 lg:gap-2 p-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Số món</span>
                    <span className="text-lg font-semibold">{currentOrder?.length || 0} món</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="font-semibold text-md md:text-md lg:text-lg">Tổng cộng</span>
                    <span className="font-bold text-md text-primary md:text-lg lg:text-lg">
                        {formatVND(totalPrice)} {UNIT_PRICE}
                    </span>
                </div>

                {
                    statusOrder === OrderStatus.ORDER && (
                        <Button
                            className="w-full h-10 font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                            onClick={() => {
                                if (currentOrder) {
                                    const newOrderForm: OrderForm = {
                                        code: `payment-${Date.now()}`,
                                        timeOrder: new Date(),
                                        totalPrice: totalPrice.toString(),
                                        status: OrderStatus.PAYMENT,
                                        orders: currentOrder,
                                        paymentMethod: PaymentMode.CASH
                                    };
                                    setOrderForm(newOrderForm);
                                    setStatusOrder(OrderStatus.PAYMENT);
                                }
                            }}
                            disabled={currentOrder === null || currentOrder.length === 0}
                        >
                            Tiếp tục <MoveRight />
                        </Button>
                    )
                }

                {
                    statusOrder === OrderStatus.PAYMENT && (
                        <Button
                            className="w-full h-10 font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
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
                            className="space-y-2"
                        >
                            <Input
                                type="text"
                                placeholder="Ghi chú đơn tạm..."
                                value={draftNote}
                                onChange={(e) => setDraftNote(e.target.value)}
                                className="border-gray-300 rounded-md h-9"
                            />

                            <div className="flex gap-1">
                                <Button
                                    variant="outline"
                                    className="flex-1 gap-2 bg-white border-gray-300 lg:h-9 md:h-8"
                                    onClick={() => {
                                        const newDraft: OrderForm = {
                                            code: `draft-${Date.now()}`,
                                            timeOrder: new Date(),
                                            totalPrice: totalPrice.toString(),
                                            status: OrderStatus.DRAFT,
                                            orders: currentOrder || [],
                                            note: draftNote || "Không có ghi chú"
                                        };
                                        addDraftOrder(newDraft);
                                        removeAllCurrentOrder();
                                        setDraftNote("");
                                    }}
                                    disabled={currentOrder === null || currentOrder.length === 0}
                                >
                                    <Plus className="w-4 h-4" /> Lưu tạm
                                </Button>

                                <Button
                                    variant="outline"
                                    className="flex-1 gap-2 bg-white border-red-300 lg:h-9 md:h-8 text-destructive hover:bg-red-50 hover:text-destructive"
                                    onClick={removeAllCurrentOrder}
                                >
                                    <Trash2 className="w-4 h-4" /> Xóa tất cả
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}
