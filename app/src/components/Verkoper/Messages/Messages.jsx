import React, { useEffect, useState, useRef } from "react";
import { useMessages } from "../../../contexts/MessageContext";
import style from "./Messages.module.css"; // Assuming you have a CSS module for styling

const Messages = ({ user }) => {
  const {
    messages,
    error,
    chatMessages,
    senderNames,
    productNames,
    fetchMessages,
    getMessagesByProductAndUser,
    sendMessage,
    markAsRead,
    setChatMessages,
  } = useMessages();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchMessages(user.id);
    }
  }, [user]);

  const handleOpenMessage = async (message) => {
    try {
      const fetchedChatMessages = await getMessagesByProductAndUser(
        message.ProductID,
        user.id
      );
      console.log(fetchedChatMessages);
      setSelectedConversation(message);
      setShowModal(true);
      if (fetchedChatMessages.some((msg) => !msg.IsRead)) {
        await markAsRead(fetchedChatMessages.map((msg) => msg.id));
      }
      scrollToBottom();
    } catch (error) {
      console.error("Failed to open chat", error);
    }
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMessage({
        Content: replyContent,
        ReceiverID: selectedConversation.SenderID,
        ProductID: selectedConversation.ProductID,
      });
      setReplyContent("");
      const fetchedChatMessages = await getMessagesByProductAndUser(
        selectedConversation.ProductID
      );
      setChatMessages(fetchedChatMessages || []);
      scrollToBottom();
    } catch (error) {
      console.error("Failed to send reply", error);
    }
  };

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div className={style.container}>
      <h2>Your Messages</h2>
      {error && <p className={style.error}>{error}</p>}
      <table className={style.messageTable}>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Product</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((message) => (
              <tr
                key={message.id}
                className={message.IsRead ? style.read : style.unread}
              >
                <td>{senderNames[message.SenderID] || "Loading..."}</td>
                <td>{productNames[message.ProductID] || "Loading..."}</td>
                <td>
                  <button onClick={() => handleOpenMessage(message)}>
                    Open Chat
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No messages found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && selectedConversation && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h2>Chat with {senderNames[selectedConversation.SenderID]}</h2>
            <div className={style.chatWindow} ref={chatWindowRef}>
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg.SenderID === user.id
                      ? style.sellerMessage
                      : style.userMessage
                  }
                >
                  <p>{msg.Content}</p>
                </div>
              ))}
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
              <button
                type="button"
                className={style.cancelButton}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
