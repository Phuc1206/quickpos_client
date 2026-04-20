import { ImageIcon } from 'lucide-react';

interface OrderItemProps {
    name: string;
    price: number;
    image?: string;
    quantity?: number;
    isSelected?: boolean;
    onClick?: () => void;
}

export function OrderItem({ name, price, image, quantity = 0, isSelected, onClick }: OrderItemProps) {
    return (
        <div
            onClick={onClick}
            className={`
                relative w-full max-w-xs rounded-2xl overflow-hidden cursor-pointer transition-all duration-200
                ${isSelected
                    ? "border-2 border-[#e4621233] bg-amber-100 shadow-md"
                    : "border border-gray-100 bg-card shadow-sm hover:shadow-md"
                }
            `}
        >
            {quantity > 0 && (
                <div className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-lg animate-in zoom-in">
                    {quantity}
                </div>
            )}

            <div className={`w-full aspect-square flex items-center justify-center transition-colors ${isSelected ? "bg-amber-100" : "bg-amber-50"}`}>
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                )}
            </div>

            <div className="p-4 bg-white">
                <h3 className="text-base font-semibold text-foreground mb-1 line-clamp-1">{name}</h3>
                <p className={`text-lg font-bold text-primary`}>
                    {price.toLocaleString('vi-VN')} đ
                </p>
            </div>
        </div>
    );
}
