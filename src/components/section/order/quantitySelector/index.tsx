import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface QuantitySelectorProps {
    name: string;
    unitPrice: number;
    initialQuantity?: number;
    onQuantityChange?: (quantity: number) => void;
    onDelete?: () => void;
}

export function QuantitySelector({
    name,
    unitPrice,
    initialQuantity = 1,
    onQuantityChange,
    onDelete,

}: QuantitySelectorProps) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const totalPrice = unitPrice * quantity;
    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity > 0) {
            setQuantity(newQuantity);
            onQuantityChange?.(newQuantity);
        }
    };

    return (
        <div className="w-full bg-white rounded-lg border border-gray-200 p-4 space-y-3">
            {/* Main Item Row */}
            <div className="flex items-center justify-between">
                {/* Product Info */}
                <section className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-600 uppercase">{name}</p>
                    <p className="text-xs text-gray-500">
                        {unitPrice.toLocaleString('vi-VN')} đ
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
                <section className="flex-1 flex items-center justify-end gap-4">
                    <div className="w-25 md:w-30 text-right shrink-0">
                        <p className="text-lg font-bold text-primary whitespace-nowrap">
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

            {/* Note Section */}
            {/* <div>
                <Input
                    type="text"
                    placeholder="Thêm ghi chú cho món này..."
                    value={note}
                    onChange={(e) => handleNoteChange(e.target.value)}
                    className="border-0 border-b rounded- text-sm px-0 py-2 focus:ring-0 focus:border-b"
                />
            </div> */}
        </div>
    );
}
