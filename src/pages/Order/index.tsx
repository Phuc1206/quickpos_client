import { MenuSelector } from "@/components/section/order/menuSelector";
import { OrderItem } from "@/components/section/order/orderItem";
import { useGetProductList } from "@/services/productServices";
import { type Order } from "@/types/order";
import { useOrderStore } from "@/zustand/orderStore";

const OrderPage = () => {
    const { searchQuery, currentOrder, addCurrentOrder } = useOrderStore();
    const { productsList } = useGetProductList({
        page: 1,
        rows: 10,
        search: searchQuery,
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-10 lg:grid-cols-10 p-6 gap-4">
            <section className="md:col-span-4 lg:col-span-4">
                <MenuSelector />
            </section>

            <section className="md:col-span-6 lg:col-span-6 max-h-[calc(100vh-150px)] overflow-auto">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {productsList?.map((product) => (
                        <OrderItem
                            key={product._id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            isSelected={currentOrder?.some(item => item._id === product._id)}
                            onClick={() => {
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
        </div>
    );

}

export default OrderPage;