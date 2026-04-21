import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export function ResearchBillModal() {
    return (
        <DialogContent className="sm:max-w-150">
            <DialogHeader>
                <DialogTitle>Tra cứu bill</DialogTitle>
                <DialogDescription>
                    Nhập thông tin đơn hàng để tra cứu.
                </DialogDescription>
            </DialogHeader>

            <div className="py-4 max-h-[60vh] overflow-y-auto">
                <p className="text-center text-gray-500">Đang tải danh sách...</p>
            </div>
        </DialogContent>
    )
}
