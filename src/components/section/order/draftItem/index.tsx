import { Button } from '@/components/ui/button';
import { Trash2, RotateCcw } from 'lucide-react';

interface DraftItemProps {
    name: string;
    itemCount: number;
    totalPrice: number;
    timestamp: Date;
    onResume?: () => void;
    onDelete?: () => void;
}

export function DraftItem({
    name,
    itemCount,
    totalPrice,
    timestamp,
    onResume,
    onDelete,
}: DraftItemProps) {
    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN');
    };

    const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    };

    return (
        <div className="w-full bg-white rounded-lg border border-gray-200 p-4 hover:border-primary">
            <div className="flex items-center justify-between gap-4">
                {/* Left Section - Info */}
                <div className="flex-1 flex flex-col gap-1">
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                        {itemCount} món • {formatPrice(totalPrice)} đ • {formatTime(timestamp)}
                    </p>
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center gap-2">
                    <Button
                        onClick={onResume}
                        size="sm"
                        className="gap-2 bg-amber-50 text-primary border border-amber-200 hover:bg-amber-100 hover:text-primary hover:border-primary"
                        variant="outline"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Tải lại
                    </Button>

                    <Button
                        onClick={onDelete}
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 text-destructive hover:text-destructive hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
