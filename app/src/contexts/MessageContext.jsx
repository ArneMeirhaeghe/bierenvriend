import React, { createContext, useContext, useEffect, useState } from "react";
import MessageService from "../services/MessageService";
import AuthService from "../services/AuthService";
import ProductService from "../services/ProductService";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [senderNames, setSenderNames] = useState({});
  const [productNames, setProductNames] = useState({});

  const messageService = new MessageService({
    error: setError,
    setMessages,
  });

  const productService = new ProductService({
    user,
    error: setError,
    setProducts: () => {},
  });

  const authService = new AuthService({
    user,
    error: setError,
  });

  const fetchMessages = async (userID) => {
    console.log("test");
    try {
      const fetchedMessages = await messageService.getAllMessagesBySellerId(
        userID
      );
      setMessages(fetchedMessages || []);
      await fetchSenderNames(fetchedMessages || []);
      await fetchProductNames(fetchedMessages || []);
    } catch (err) {
      setError("Failed to fetch messages");
    }
  };

  const fetchSenderNames = async (messages) => {
    console.log("test");

    const senderIds = [...new Set(messages.map((msg) => msg.SenderID))];
    const names = {};
    for (const id of senderIds) {
      const sender = await authService.getUserById(id);
      names[id] = sender ? sender.username : "Unknown";
    }
    setSenderNames(names);
  };

  const fetchProductNames = async (messages) => {
    console.log("test");

    const productIds = [...new Set(messages.map((msg) => msg.ProductID))];
    const names = {};
    for (const id of productIds) {
      const product = await productService.getProductById(id);
      names[id] = product ? product.Name : "Unknown";
    }
    setProductNames(names);
  };

  const getMessagesByProductAndUser = async (productID, userid) => {
    console.log("test");

    try {
      const fetchedChatMessagess =
        await messageService.getMessagesByProductAndUser(productID, userid);
      setChatMessages(fetchedChatMessagess || []);
      console.log(fetchedChatMessagess);
      return fetchedChatMessagess;
    } catch (err) {
      setError("Failed to fetch chat messages");
    }
  };

  const sendMessage = async (Content, productID, SenderID, ReceiverID) => {
    console.log(Content, productID, SenderID, ReceiverID);
    try {
      await messageService.sendMessage(
        Content,
        productID,
        SenderID,
        ReceiverID
      );
    } catch (err) {
      setError("Failed to send message");
    }
  };

  const markAsRead = async (messageIds) => {
    console.log("test");

    try {
      await messageService.markAsRead(messageIds);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          messageIds.includes(msg.id) ? { ...msg, IsRead: true } : msg
        )
      );
    } catch (err) {
      setError("Failed to mark messages as read");
    }
  };

  useEffect(() => {
    if (user) {
      fetchMessages(user.id);
    }
  }, [user]);

  return (
    <MessageContext.Provider
      value={{
        messages,
        error,
        chatMessages,
        senderNames,
        productNames,
        fetchMessages,
        getMessagesByProductAndUser,
        sendMessage,
        markAsRead,
        setUser,
        setChatMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
