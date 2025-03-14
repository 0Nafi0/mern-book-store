import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser, HiOutlineHeart } from "react-icons/hi2";
import avatarImage from "../assets/avatar.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { fetchCart } from "../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Orders",
    href: "/orders",
  },
  {
    name: "Cart Page",
    href: "/cart",
  },
  {
    name: "Checkout",
    href: "/checkout",
  },
  {
    name: "Rented Books",
    href: "/rented-books",
  },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const { currentUser, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCart());
    }
  }, [currentUser, dispatch]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        <div className="flex items-center md:gap-16 gap-4">
          <Link to={"/"}>
            <HiMiniBars3CenterLeft className="size-6" />
          </Link>
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearchOutline className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="relative flex items-center md:space-x-3 space-x-2">
          {currentUser && (
            <Link
              to="/add-book"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
            >
              Add a Book
            </Link>
          )}

          <Link
            to="/donation"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Donate
          </Link>

          <div>
            {currentUser ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen((prevState) => !prevState)}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={avatarImage}
                    alt="Avatar"
                    className="size-7 rounded-full ring-2 ring-blue-500"
                  />
                  <span className="hidden md:block">
                    {currentUser.username}
                  </span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-2">
                <HiOutlineUser className="size-6" />
                <span className="hidden md:block">Login</span>
              </Link>
            )}
          </div>

          <button className="hidden sm:block">
            <HiOutlineHeart className="size-6" />
          </button>

          <Link
            to={"/cart"}
            className="bg-primary p-1 sm:px-6 py-2 flex items-center rounded-sm"
          >
            <HiOutlineShoppingCart />
            <span className="text-sm font-semibold sm:ml-1">
              {Array.isArray(cartItems) ? cartItems.length : 0}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
