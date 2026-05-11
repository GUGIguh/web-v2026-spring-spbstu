import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import CartIcon from "../../icons/CartIcon";
import ProfileIcon from "../../icons/ProfileIcon";
import CatalogIcon from "../../icons/CatalogIcon";
import HeaderButton from "./HeaderButton";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const cartItems = useAppSelector((state) => state.cart.items);
    const cartCount = Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = async () => {
        await dispatch(logout());
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="flex justify-center">
            <div className="flex justify-between items-center w-[1300px] h-20">
                <div className="flex font-bold cursor-pointer text-2xl" onClick={() => navigate("/")}>
                    <h1 className="text-blue-def">Gadget </h1>
                    <h1>Hub</h1>
                </div>

                <div className="flex text-blue-def gap-2">

                    <HeaderButton
                        icon={<CatalogIcon />}
                        label="Каталог"
                        active={isActive("/catalog")}
                        onClick={() => navigate("/catalog")}
                    />

                    {isAuthenticated && (
                        <HeaderButton
                            icon={<CartIcon />}
                            label="Корзина"
                            active={isActive("/cart")}
                            onClick={() => navigate("/cart")}
                            count={cartCount}
                        />
                    )}

                    {isAuthenticated ? (
                        <HeaderButton
                            icon={<ProfileIcon />}
                            label="Выйти"
                            onClick={handleLogout}
                        />
                    ) : (
                        <HeaderButton
                            icon={<ProfileIcon />}
                            label="Войти"
                            active={isActive("/login")}
                            onClick={() => navigate("/login")}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}