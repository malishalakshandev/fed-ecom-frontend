import { useState } from "react";
import { Link } from "react-router";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { SignedIn, UserButton, SignedOut } from "@clerk/clerk-react";
import ProductSearchForm from "./ProductSearchForm";
import { useGetAllCategoriesQuery } from "@/lib/api";

function Navigation(){

    const cartItems = useSelector((state) => state.cart.cartItems);
    const { data: categories, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const cartItems = useSelector((state) => state.cart.value);

  // Calculate total quantity of items in cart
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Function href close mobile menu
  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white border-b border-gray-200 px-5 md:px-[64px] lg:px-[64px]">
      <div>

        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl">
            Logo
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-x-[20px]">
            {
              (categories || []).map((category) => {
                return (
                  <Link
                    key={ category._id }
                    to={`/shop/${category.slug}`}
                    className="font-medium hover:text-gray-600"
                    >
                    { category.name }
                  </Link>
                );
              })
            }
          </nav>
          {/* <div className="bg-black py-[6px] px-[11px] rounded-[20px] text-white">
            <Link to="/admin/products/create">Create Product</Link>
          </div> */}

          
          {/* Icons */}
          <div className="flex items-center space-x-4">

            <div>
              {/* Search Form */}
              <ProductSearchForm />
            </div>
            
            <Link
              to="/shop/cart"
              aria-label="Shopping Bag"
              className="p-1 relative"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            </Link>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <div className="hidden md:block">
              <SignedOut>
              <div className="flex items-center gap-4">
                <Link to="/sign-in">Sign In</Link>
                <Link to="/sign-up">Sign Up</Link>
              </div>
              </SignedOut>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            {[
              { path: "/shop/shoes", label: "Shoes" },
              { path: "/shop/tshirts", label: "T-Shirt" },
              { path: "/shop/shorts", label: "Shorts" },
              { path: "/shop/pants", label: "Pants" },
              { path: "/shop/socks", label: "Socks" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="block md:hidden px-4">
            {/* <SignedOut> */}
            <div className="flex items-center gap-4">
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </div>
            {/* </SignedOut> */}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navigation;