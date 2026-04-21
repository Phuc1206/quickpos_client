import OrderHeader from "@/components/section/header/OrderHeader";
import { Outlet } from "react-router";


const OrderLayout = () => {
    return (
        <div className="flex flex-col w-full h-screen bg-white">
            <header className="w-full shrink-0">
                <OrderHeader />
            </header>

            <main className="flex-1 w-full overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};


export default OrderLayout;