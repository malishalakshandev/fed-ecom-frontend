import DashboardNavigation from "@/components/DashboardNavigation";
import { dashboardNavItems } from "@/lib/dashboard-nav-config";
import { useUser } from "@clerk/clerk-react";
import { Outlet } from "react-router";

function DashboardLayout() {

    const { user } = useUser();

    // Get role from Clerk
    const role = user?.publicMetadata?.role || "customer"; 

    // Get correct sidebar for that role
    const menu = dashboardNavItems[role] || dashboardNavItems["customer"];

    console.log('menu:',menu);

    return(
        <>
            <DashboardNavigation menu={menu} />
            <Outlet />
        </>
    );
}

export default DashboardLayout;