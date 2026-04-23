import { MenuSelector } from "@/components/section/order/menuSelector";
import { OrderItem } from "@/components/section/order/orderItem";
import { OrderListSkeleton } from "@/components/section/order/orderItemSkeleton";
import PaymentSelector from "@/components/section/order/paymentSelector";
import { PaymentSuccess } from "@/components/section/order/paymentSuccess";
import { Spinner } from "@/components/ui/spinner";
import useDebounce from "@/hooks/useDebounce";
import { useGetInfiniteProducts } from "@/services/productServices";
import { OrderStatus, type Order } from "@/types/order";
import { useOrderStore } from "@/zustand/orderStore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const OrderPage = () => {
    const { ref, inView } = useInView();
    const { searchQuery, currentOrder, addCurrentOrder, statusOrder, setStatusOrder, bill, } = useOrderStore();
    const {
        productsList,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isProductsLoading,
    } = useGetInfiniteProducts({
        rows: 10,
        search: useDebounce(searchQuery, 1000),
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
            <AnimatePresence>
                {statusOrder !== OrderStatus.PAYMENT_SUCCESS && (
                    <motion.section
                        key="menu"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:col-span-4 lg:col-span-3 h-screen border-r border-gray-200"
                    >
                        <MenuSelector />
                    </motion.section>
                )}
            </AnimatePresence>

            <section
                className={`h-screen overflow-auto pb-20 transition-all duration-300 
                    ${statusOrder === OrderStatus.PAYMENT_SUCCESS
                        ? "col-span-12"
                        : "md:col-span-8 lg:col-span-9"
                    }`}
            >
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
                                <OrderListSkeleton />
                            ) : (
                                <section className="h-full flex flex-col gap-2">
                                    <h3 className="text-md font-semibold text-primary lg:text-lg px-4 py-2">
                                        Danh sách món
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-5">
                                        {productsList?.map((product) => (
                                            <OrderItem
                                                key={product._id}
                                                name={product.name}
                                                price={product.price}
                                                image={product.image}
                                                isSelected={currentOrder?.some(
                                                    (item) => item._id === product._id
                                                )}
                                                onClick={() => {
                                                    const existingItem = currentOrder?.find(
                                                        (item) => item._id === product._id
                                                    );

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

                                    <div ref={ref} className="w-full py-6 flex justify-center">
                                        {isFetchingNextPage && (
                                            <Spinner className="size-8" />
                                        )}
                                        {!hasNextPage && productsList.length > 0 && (
                                            <p className="text-gray-400 text-sm">Hết danh sách sản phẩm</p>
                                        )}
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

                    {statusOrder === OrderStatus.PAYMENT_SUCCESS && (
                        <motion.div
                            key="payment-success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="h-full w-full flex items-center justify-center"
                        >
                            <PaymentSuccess
                                invoiceCode={bill?.code || "Chưa cập nhật"}
                                onPrintBill={() => { }}
                                onNewOrder={() => setStatusOrder(OrderStatus.ORDER)}
                            />
                        </motion.div>
                    )}

                </AnimatePresence>
            </section>
        </div>
    );
};

export default OrderPage;