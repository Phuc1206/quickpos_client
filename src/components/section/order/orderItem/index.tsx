import { formatVND, UNIT_PRICE } from '@/utils';
import { ImageIcon } from 'lucide-react';

interface OrderItemProps {
    name: string;
    price: number;
    image?: string;
    isSelected?: boolean;
    onClick?: () => void;
}

export function OrderItem({ name, price, image, isSelected, onClick }: OrderItemProps) {
    return (
        <div
            onClick={onClick}
            className={`
                relative w-full max-w-xs rounded-2xl overflow-hidden cursor-pointer
                transition-all duration-200 ease-out
                transform
            ${isSelected
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-white shadow-xl scale-[1.03]"
                    : "border border-gray-100 bg-card shadow-sm hover:shadow-md hover:-translate-y-1"
                }
    `}
        >

            <div className="relative w-full aspect-square">
                {image ? (
                    <img src={image} alt={name} className="object-cover w-full h-full" />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                )}

                <div
                    className={`absolute px-2 py-1 text-sm font-semibold text-white rounded-md top-2 left-2 backdrop-blur-sm transition-all duration-200
                    ${isSelected
                            ? "bg-primary shadow-md"
                            : "bg-black/60"
                        }
                `}
                >
                    {formatVND(price)} {UNIT_PRICE}
                </div>

                <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-black/90 via-black/60 to-transparent" />

                <div className="absolute bottom-0 w-full p-3">
                    <h3 className="text-sm font-semibold leading-tight text-white drop-shadow-sm">
                        {name}
                    </h3>
                </div>
            </div>

            {/* <div className="relative w-full aspect-square">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                )}

                <div className="absolute px-2 py-1 text-sm font-semibold text-white rounded-md top-2 left-2 bg-black/60 backdrop-blur-sm">
                    {formatVND(price)} {UNIT_PRICE}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 w-full p-3">
                    <h3 className="text-base font-semibold text-white line-clamp-2">
                        {name}
                    </h3>
                </div>
            </div> */}
        </div>
    );
}