

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OrderStatus } from '@/types/order';
import { formatVND, UNIT_PRICE } from '@/utils';
import { useOrderStore } from '@/zustand/orderStore';
import { Minus, Plus, X } from 'lucide-react';

interface QuantitySelectorProps {
    name: string;
    price: number;
    quantity?: number;
    onQuantityChange?: (newQuantity: number) => void;
    onRemove?: () => void;
}

const QuantitySelector = ({
    name,
    price,
    quantity = 1,
    onQuantityChange,
    onRemove,
}: QuantitySelectorProps) => {
    const { statusOrder } = useOrderStore();

    const totalPrice = price * quantity;

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity > 0) {
            onQuantityChange?.(newQuantity);
        }
    };

    return (
        <div className="w-full px-4 py-2 space-y-2 transition-all duration-300 ease-out border border-gray-200 rounded-xl bg-gray-50 hover:shadow-lg hover:border-gray-300">
            <div className="flex items-center justify-between py-2">
                <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
                {
                    statusOrder === OrderStatus.ORDER && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-6 h-6 p-0 text-gray-400 hover:text-gray-600"
                            onClick={onRemove}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    )
                }
            </div>

            {/* Main content row */}
            {/* Quantity controls */}
            <div className="flex items-center justify-between flex-1 h-8 gap-2 pb-3 border-b border-primary">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 text-white transition-shadow duration-200 shadow-md bg-primary hover:bg-primary/90 hover:text-white hover:shadow-lg"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={statusOrder !== OrderStatus.ORDER}
                >
                    <Minus className="size-4 " />
                </Button>


                <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="h-8 w-8 text-center border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                    min="1"
                    disabled={statusOrder !== OrderStatus.ORDER}
                />

                <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 text-white transition-shadow duration-200 shadow-md bg-primary hover:bg-primary/90 hover:text-white hover:shadow-lg"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={statusOrder !== OrderStatus.ORDER}
                >
                    <Plus className="size-4" />
                </Button>

            </div>

            {/* Footer with unit price × quantity and total */}
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                    {formatVND(price)} × {quantity}
                </span>
                <span className="font-semibold text-primary">
                    {formatVND(totalPrice)} {UNIT_PRICE}
                </span>
            </div>
        </div>
    )
}

export default QuantitySelector;
