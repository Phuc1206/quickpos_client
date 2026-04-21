import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, X } from 'lucide-react';

interface QuantitySelectorProps {
    name: string;
    price: number;
    initialQuantity?: number;
    onQuantityChange?: (newQuantity: number) => void;
    onDelete?: () => void;
}

function QuantitySelector({
    name,
    price = 0,
    initialQuantity = 1,
    onQuantityChange,
    onDelete,
}: QuantitySelectorProps) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const totalPrice = price * quantity;
    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity > 0) {
            setQuantity(newQuantity);
            onQuantityChange?.(newQuantity);
        }
    };

    return (
        <div className="w-full rounded-lg border border-gray-300 p-4 space-y-3">
            {/* Main Item Row */}
            <div className="flex items-center justify-between">
                {/* Product Info */}
                <section className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-600 uppercase">{name}</p>
                    <p className="text-xs text-gray-500">
                        {price.toLocaleString('vi-VN')} đ
                    </p>
                </section>

                {/* Quantity Controls */}
                <section className="flex-1 flex items-center justify-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleQuantityChange(quantity - 1)}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>

                    <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="h-8 w-10 text-center border-0 border-b border-gray-300 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" min="1"
                    />

                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleQuantityChange(quantity + 1)}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </section>

                {/* Total Price */}
                <section className="flex-1 flex items-center justify-end gap-2">
                    <div className="w-20 text-right shrink-0">
                        <p className="text-lg font-bold text-primary whitespace-nowrap md:text-sm">
                            {totalPrice.toLocaleString('vi-VN')} đ
                        </p>
                    </div>

                    {/* Delete Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={onDelete}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </section>
            </div>
        </div>
    );
}

const QuantitySelectorTablet = ({
    name,
    price,
    initialQuantity = 1,
    onQuantityChange,
    onDelete,
}: QuantitySelectorProps) => {
    const [quantity, setQuantity] = useState(initialQuantity);
    const totalPrice = price * quantity;
    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity > 0) {
            setQuantity(newQuantity);
            onQuantityChange?.(newQuantity);
        }
    };

    return (
        <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
            {/* Header with name and close button */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    onClick={onDelete}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Main content row */}
            {/* Quantity controls */}
            <div className="flex flex-1 items-center justify-between gap-2 border border-gray-200 rounded-lg px-3 py-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => handleQuantityChange(quantity - 1)}
                >
                    <Minus className="h-3 w-3" />
                </Button>

                <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="h-6 w-8 text-center border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                    min="1"
                />

                <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => handleQuantityChange(quantity + 1)}
                >
                    <Plus className="h-3 w-3" />
                </Button>
            </div>

            {/* Footer with unit price × quantity and total */}
            <div className="flex items-center justify-between mt-3 text-sm">
                <span className="text-gray-500">
                    {price.toLocaleString('vi-VN')} đ × {quantity}
                </span>
                <span className="font-semibold text-amber-500">
                    {totalPrice.toLocaleString('vi-VN')} đ
                </span>
            </div>
        </div>
    )
}

QuantitySelector.Tablet = QuantitySelectorTablet;

export default QuantitySelector;
