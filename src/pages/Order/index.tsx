import OrderHeader from "@/components/section/header/OrderHeader";
import { DraftItem } from "@/components/section/order/draftItem";
import { OrderItem } from "@/components/section/order/orderItem";
import { QuantitySelector } from "@/components/section/order/quantitySelector";
import { useState } from "react";

const OrderPage = () => {
    const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});

    const [items, setItems] = useState([
        { id: 1, name: 'Hà Cào Mini 85K', unitPrice: 65000, quantity: 1, note: '' },
        { id: 2, name: 'Phở Bò', unitPrice: 45000, quantity: 2, note: '' },
    ])

    const handleDelete = (id: number) => {
        setItems(items.filter(item => item.id !== id))
    }

    const handleItemClick = (itemName: string) => {
        setSelectedItems((prev) => {
            const currentQuantity = prev[itemName] || 0;
            return {
                ...prev,
                [itemName]: currentQuantity + 1, // Tăng số lượng lên 1 mỗi khi click
            };
        });
    };
    return (
        <div>
            <OrderHeader />

            {/* Draft Orders Section */}
            <div className="max-w-2xl">
                <h2 className="text-lg font-semibold mb-4">Đơn tạm</h2>
                <div className="space-y-3">
                    <DraftItem
                        name="Đơn lưu tạm"
                        itemCount={2}
                        totalPrice={85000}
                        timestamp={new Date('2026-04-20T21:14:33')}
                        onResume={() => console.log('Resume draft')}
                        onDelete={() => console.log('Delete draft')}
                    />
                </div>
            </div>


            <div className="max-w-2xl">
                <h2 className="text-lg font-semibold mb-4">Các món đã chọn</h2>
                <div className="space-y-4">
                    {items.map(item => (
                        <QuantitySelector
                            key={item.id}
                            name={item.name}
                            unitPrice={item.unitPrice}
                            initialQuantity={item.quantity}
                            onDelete={() => handleDelete(item.id)}
                        />
                    ))}
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    <OrderItem name="Há cảo hấp tôm thịt" price={45000}
                        onClick={() => handleItemClick("Há cảo hấp tôm thịt")}
                        quantity={selectedItems["Há cảo hấp tôm thịt"] || 0}
                        isSelected={!!selectedItems["Há cảo hấp tôm thịt"]}
                    />
                    <OrderItem name="Há cảo tôm nguyên chất" price={38000}
                        onClick={() => handleItemClick("Há cảo tôm nguyên chất")}
                        quantity={selectedItems["Há cảo tôm nguyên chất"] || 0}
                        isSelected={!!selectedItems["Há cảo tôm nguyên chất"]}
                    />
                    <OrderItem name="Bún Chả" price={42000}
                        onClick={() => handleItemClick("Bún Chả")}
                        quantity={selectedItems["Bún Chả"] || 0}
                        isSelected={!!selectedItems["Bún Chả"]}
                    />
                    <OrderItem name="Bún măng vịt" price={42000} onClick={() => handleItemClick("Bún măng vịt")}
                        quantity={selectedItems["Bún măng vịt"] || 0}
                        isSelected={!!selectedItems["Bún măng vịt"]}
                    />
                    <OrderItem name="Bún Chả Cá nguyên chất" price={42000} onClick={() => handleItemClick("Bún Chả Cá nguyên chất")}
                        quantity={selectedItems["Bún Chả Cá nguyên chất"] || 0}
                        isSelected={!!selectedItems["Bún Chả Cá nguyên chất"]}
                    />
                    <OrderItem name="Mì Xào" price={35000} onClick={() => handleItemClick("Mì Xào")}
                        quantity={selectedItems["Mì Xào"] || 0}
                        isSelected={!!selectedItems["Mì Xào"]}
                    />
                </div>
            </div>
        </div>
    );

}

export default OrderPage;