
interface CustomerItemProps {
    name: string;
    phoneNumber: string;
}

export function CustomerItem({
    name,
    phoneNumber,
}: CustomerItemProps) {

    return (
        <div className="w-full bg-gray-50 rounded-lg border border-gray-200 px-4 py-2 hover:border-primary">
            <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm font-semibold text-gray-900">{name}</p>
                <p className="text-xs text-gray-500">
                    {phoneNumber}
                </p>
            </div>
        </div>
    );
}
