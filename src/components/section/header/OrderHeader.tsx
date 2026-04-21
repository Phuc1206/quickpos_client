import { Search, Receipt, LogOut, NotepadText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/zustand/authStore'
import { useLogout } from '@/services/authServices'
import { Spinner } from '@/components/ui/spinner'
import { useOrderStore } from '@/zustand/orderStore'

export default function OrderHeader() {
    const user = useAuthStore((state) => state.user);
    const { searchQuery, setSearchQuery } = useOrderStore();
    const { mutateAsync: logoutMutation, isPending: isLoggingOut } = useLogout();

    const handleLogout = async () => {
        try {
            await logoutMutation();
        }
        catch (error) {
            console.error("Logout failed:", error);
        }
    };


    return (
        <header className="w-full border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">

                <div className="flex items-center shrink-0">
                    <div className="flex flex-col">
                        <span className="text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Mã đơn hàng
                        </span>
                        <span className="text-lg md:text-2xl font-bold text-primary">DH533793</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 md:gap-6 flex-1 justify-end ml-4">

                    <section className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="relative gap-2 h-10 border-gray-300 hover:bg-primary-hover hover:text-white px-3"
                        >
                            <NotepadText className="h-4 w-4 shrink-0" />
                            <p className="hidden lg:inline text-sm">Đơn tạm</p>
                            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm border-2 border-white">
                                5
                            </span>
                        </Button>

                        <Button
                            variant="outline"
                            className="relative gap-2 h-10 border-gray-300 hover:bg-primary-hover hover:text-white px-3"
                        >
                            <Receipt className="h-4 w-4 shrink-0" />
                            <p className="hidden lg:inline text-sm">Tra cứu bill</p>
                            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm border-2 border-white">
                                12
                            </span>
                        </Button>
                    </section>

                    <div className="max-w-37.5 md:max-w-xs flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Tìm món ăn..."
                                className="pl-9 h-10 rounded-lg border-gray-300 bg-gray-50 text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pl-3 border-l border-gray-200">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm font-semibold text-gray-900 line-clamp-1">{user?.name}</span>
                            <span className="text-[13px] text-gray-500 -mt-1 ">Nhân viên</span>
                        </div>
                        {/* <Avatar className="h-8 w-8 shrink-0">
                            <AvatarImage src="" />
                            <AvatarFallback className="text-xs">
                                {user?.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar> */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 shrink-0 hover:bg-red-100 hover:text-destructive transition-colors"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? <Spinner /> : <LogOut className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
