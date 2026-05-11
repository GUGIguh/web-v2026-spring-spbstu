import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { checkAuth } from "./store/authSlice";
import Header from "./components/HeaderComponent/Header";
import Footer from "./components/common/Footer";
import CatalogPage from "./pages/CatalogPage";
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, initializing } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (initializing) {
        return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
    }

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/catalog"
                    element={isAuthenticated ? <CatalogPage /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/cart"
                    element={isAuthenticated ? <CartPage /> : <Navigate to="/login" replace />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;