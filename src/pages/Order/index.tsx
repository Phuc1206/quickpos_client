import { MenuSelector } from "@/components/section/order/menuSelector";
import { OrderItem } from "@/components/section/order/orderItem";
import PaymentSelector from "@/components/section/order/paymentSelector";
import { Spinner } from "@/components/ui/spinner";
import useDebounce from "@/hooks/useDebounce";
import { useGetProductList } from "@/services/productServices";
import { OrderStatus, type Order } from "@/types/order";
import { useOrderStore } from "@/zustand/orderStore";
import { motion, AnimatePresence } from "framer-motion";

const OrderPage = () => {
    const { searchQuery, currentOrder, addCurrentOrder, statusOrder } = useOrderStore();
    const { productsList, isLoading: isProductsLoading } = useGetProductList({
        page: 1,
        rows: 10,
        search: useDebounce(searchQuery, 1000),
    });

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:grid-cols-12">
            <section className="md:col-span-4 lg:col-span-3 h-screen border-r border-gray-200">
                <MenuSelector />
            </section>

            <section className="md:col-span-8 lg:col-span-9 overflow-auto h-screen pb-20">
                <AnimatePresence mode="wait">
                    {statusOrder === OrderStatus.ORDER && (
                        <motion.div
                            key="order"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="h-full overflow-auto"
                        >
                            {isProductsLoading ? (
                                <div className="flex items-center justify-center w-full h-full">
                                    <Spinner className="size-12" />
                                </div>
                            ) : (
                                <section className="h-full flex flex-col gap-2">
                                    <h3 className="text-md font-semibold text-primary lg:text-lg px-4 py-2">Danh sách món</h3>
                                    <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-5">
                                        {productsList?.map((product) => (
                                            <OrderItem
                                                key={product._id}
                                                name={product.name}
                                                price={product.price}
                                                image={product.image}
                                                isSelected={currentOrder?.some(item => item._id === product._id)}
                                                onClick={() => {
                                                    console.log("product selected: ", product);
                                                    const existingItem = currentOrder?.find(item => item._id === product._id);
                                                    if (!existingItem) {
                                                        const newOrder: Order = {
                                                            _id: product._id,
                                                            name: product.name,
                                                            price: product.price,
                                                            quantity: 1,
                                                        };
                                                        addCurrentOrder(newOrder);
                                                    }
                                                }}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </motion.div>
                    )}

                    {statusOrder === OrderStatus.PAYMENT && (
                        <motion.div
                            key="payment"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="h-full p-4"
                        >
                            <PaymentSelector />
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </div>
    );

}

export default OrderPage;