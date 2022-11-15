import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import Checkout from "../../features/checkout/Checkout";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync, setBasket } from "../../features/basket/basketSlice";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Orders from "../../features/orders/Orders";
import Inventory from "../../features/admin/Inventory";



function App() {
  // const { setBasket } = useStoreContext();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      dispatch(fetchCurrentUser());
      dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => {
      setLoading(false);
    });
  }, [initApp]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initialising app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path={"*"}
          element={
            <Container sx={{ mt: 4 }}>
              {/* <Route path="/" element={<HomePage />} /> */}
              <Routes>
                <Route path="catalog" element={<Catalog />} />
                <Route path="catalog/:id" element={<ProductDetails />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="server-error" element={<ServerError />} />
                <Route path="basket" element={<BasketPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="orders" element={<Orders />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          }
        />
      </Routes>
      {/* <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:id" element={<ProductDetails />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="server-error" element={<ServerError />} />
          <Route path="basket" element={<BasketPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container> */}
    </ThemeProvider>
  );
}

export default App;
