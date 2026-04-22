import { Button } from '@/components/ui/button';
import { formatTime, formatVND, UNIT_PRICE } from '@/utils';
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

    return (
        <div className="w-full bg-gray-50 rounded-lg border border-gray-200 p-4 hover:border-primary">
            <div className="flex items-center justify-between gap-4">
                {/* Left Section - Info */}
                <div className="flex-1 flex flex-col gap-1">
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">
                        {itemCount} món • {formatVND(totalPrice)} {UNIT_PRICE} • {formatTime(timestamp)}
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
