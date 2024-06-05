import React, { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import ProductService from "../services/ProductService";
import FavService from "../services/FavService";
import OrderService from "../services/OrderService";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fav, setFav] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  const orderService = new OrderService({
    user: user,
    setOrder: setOrders,
    error: (message) => console.error(message),
  });

  const authService = new AuthService({
    user: { user, setUser },
    error: setError,
  });

  const productService = new ProductService({
    user,
    error: setError,
    setProducts,
  });

  const favService = new FavService({
    user: { user },
    error: setError,
    setFav,
  });

  useEffect(() => {
    if (user) {
      orderService.getAllOrderByUser(user.id);
      favService.getAllFavByUser(user.id);
    }
  }, [user]);

  useEffect(() => {
    productService.getAllProducts(setIsLoading);
  }, []);

  useEffect(() => {
    if (products) productService.liveUpdate(products);
  }, [products]);

  useEffect(() => {
    if (!user && authService.isLoggedIn) authService.loginFromCookies();
  }, [user, authService]);

  useEffect(() => {
    let isActive = true;
    if (isActive && error) setTimeout(() => setError(null), 5000);
    return () => {
      isActive = false;
    };
  }, [error]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      if (orders.length > 0) {
        const openOrders = orders.filter((order) => order.status === "open");
        const allOrderItems = [];
        for (const order of openOrders) {
          const items = await orderService.getOrderItemsByOrderID(order.id);
          allOrderItems.push(...items);
        }
        setOrderItems(allOrderItems);

        // Initialize quantities state
        const quantitiesObj = {};
        allOrderItems.forEach((item) => {
          quantitiesObj[item.id] = item.quantity;
        });
        setQuantities(quantitiesObj);
      }
    };

    fetchOrderItems();
  }, [orders]);

  useEffect(() => {
    const updateDatabase = async () => {
      for (const id in quantities) {
        const quantity = quantities[id];
        await orderService.updateOrderItemQuantity(id, quantity);
      }
    };

    if (user) {
      updateDatabase();
    }
  }, [quantities, user, orderService]);

  const updateOrderStatusAndTotalAmount = async (
    orderID,
    status,
    totalAmount
  ) => {
    try {
      await orderService.updateOrderStatus(orderID, status);
      await orderService.updateOrderTotalAmount(orderID, totalAmount);
      // Refresh orders after update
      await orderService.getAllOrderByUser(user.id);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFavoriteToggle = async (productId) => {
    const favorite = fav.find((f) => f.productID === productId);
    if (favorite) {
      await favService.removeFavorite(favorite.id);
      setFav((prevFav) => prevFav.filter((fav) => fav.id !== favorite.id));
    } else {
      const newFav = await favService.addFavorite(user.id, productId);
      setFav((prevFav) => [...prevFav, newFav]);
    }
  };

  const handleBestelClick = async (productId, quantity) => {
    const existingOrder = await orderService.getExistingOrder(user.id);
    let orderID;
    if (existingOrder) {
      orderID = existingOrder.id;
    } else {
      const newOrder = await orderService.addOrder(user.id);
      orderID = newOrder.id;
    }
    const newOrderItem = await orderService.addOrderItem(
      orderID,
      productId,
      quantity
    );
    setOrders((prevOrders) => [...prevOrders, newOrderItem]);
  };

  const fetchAllUsers = async () => {
    console.log("Fetching all users");
    try {
      const users = await authService.getAllUsers();
      console.log("Users", users);
      setAllUsers(users);
    } catch (err) {
      setError(err.message);
    }
  };

  const editUser = async (user, edit) => {
    console.log(user);
    console.log(edit);
    const update = authService.updateUser(user, edit);
    console.log(update);
  };
  const deleteUser = async (id) => {
    const delet = authService.deleteUser(id);
  };
  const addProduct = async (product) => {
    const add = productService.createProduct(product);
    console.log(add);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        error,
        user,
        authService,
        productService,
        fav,
        orders,
        orderItems,
        quantities,
        setQuantities,
        setUser,
        updateOrderStatusAndTotalAmount,
        handleFavoriteToggle,
        handleBestelClick,
        allUsers,
        editUser,
        deleteUser,
        addProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
export const useProducts = () => useContext(ProductContext);
