import { Outlet } from "react-router";


const DefaultLayout = () => {
    return (
        <div className="w-full h-full min-h-screen">
            <Outlet />
        </div>
    );
};

export default DefaultLayout;