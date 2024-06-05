import React, { useEffect, useState, useRef } from "react";
import style from "./ChatMessages.module.css"; // Assuming you have a CSS module for styling
import { useMessages } from "../../contexts/MessageContext";

const ChatMessages = ({ product, user }) => {
  const { getMessagesByProductAndUser, sendMessage } = useMessages();
  const [replyContent, setReplyContent] = useState("");
  const [mess, setMess] = useState([]);
  const messagesEndRef = useRef(null);

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    await sendMessage(replyContent, product.id, user.id, product.UserID);
    await getMessages(product.id, user.id);
    setReplyContent("");
  };

  const getMessages = async (productID, userID) => {
    try {
      const messages = await getMessagesByProductAndUser(productID, userID);
      setMess(Array.isArray(messages) ? messages : [messages]);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMess([]);
    }
  };

  useEffect(() => {
    getMessages(product.id, user.id);
  }, [product.id, user.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mess]);

  // Sort messages by date created in ascending order
  const sortedMessages = mess.sort(
    (a, b) => new Date(a.created) - new Date(b.created)
  );

  return (
    <div className={style.container}>
      <h2>Chat Messages</h2>
      <div className={style.messages}>
        {sortedMessages.length > 0 ? (
          sortedMessages.map(
            (message) =>
              message && (
                <div
                  key={message.id}
                  className={`${style.message} ${
                    message.SenderID === user.id ? style.sender : style.receiver
                  }`}
                >
                  <p>{message.Content}</p>
                </div>
              )
          )
        ) : (
          <p>No messages yet</p>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleReplySubmit} className={style.messageForm}>
        <input
          type="text"
          value={replyContent}
          onChange={handleReplyChange}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatMessages;
