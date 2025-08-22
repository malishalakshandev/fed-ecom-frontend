import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const DashboardNavigation = ({ menu }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <header className="bg-gray-200 rounded-[25px] mx-[15px] mt-[10px] px-5 md:px-[40px] lg:px-[40px]">
            
            <div>

                <div className="flex items-center justify-between h-16">
                
                    {/* Logo */}
                    <Link to="/" className="font-bold text-2xl">
                        Logo
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-x-[20px] items-center">
                        {menu.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="font-medium hover:text-gray-600"
                            >
                            {item.label}
                            </Link>
                        ))}

                        <Link
                            to="/"
                            className="flex font-medium text-[14px] gap-x-2 bg-black px-[15px] py-[8px] rounded-[22px] text-white hover:bg-[#202020] hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLineCap="round" strokeLineJoin="round" className="lucide lucide-forward-icon lucide-forward"><path d="m15 17 5-5-5-5"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg>
                            Website
                        </Link>
                    </nav>
                    {/* <div className="bg-black py-[6px] px-[11px] rounded-[20px] text-white">
                        <Link to="/admin/products/create">Create Product</Link>
                    </div> */}

                
                    {/* Icons */}
                    <div className="flex items-center">

                        <SignedIn>
                            <UserButton />
                        </SignedIn>

                        {/* Mobile menu button */}
                        <button
                        className="md:hidden p-1 ml-3"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                </div>

            </div>

        </header>
    );
}

export default DashboardNavigation;