import pb from "./PocketbaseService";
import Message from "../models/Message";

class MessageService {
  constructor({ error, setMessages }) {
    this.db = pb;
    this.error = error;
    this.setMessages = setMessages;
  }

  async getAllMessagesBySellerId(sellerId) {
    console.log(sellerId);
    try {
      const messages = await this.db.collection("Messages").getFullList({
        filter: `ReceiverID = "${sellerId}"`,
        sort: "-created",
      });
      return messages.map((message) => new Message(message));
    } catch (error) {
      this.error(error.message);
    }
  }

  async getMessagesByProductAndUser(productId, userId) {
    try {
      const filterQuery = `ProductID = "${productId}" && (SenderID = "${userId}" || ReceiverID = "${userId}")`;
      const messages = await this.db.collection("Messages").getFullList({
        filter: filterQuery,
        sort: "-created",
      });
      console.log(messages);
      return messages.map((message) => new Message(message));
    } catch (error) {
      this.error(error.message);
    }
  }

  async sendMessage(Content, productID, SenderID, ReceiverID) {
    console.log("test");
    console.log(Content, productID, SenderID, ReceiverID);
    try {
      const newMessage = {
        Content: Content,
        IsRead: false,
        ProductID: productID,
        SenderID: SenderID,
        ReceiverID: ReceiverID,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      };
      const createdMessage = await this.db
        .collection("Messages")
        .create(newMessage);
      this.setMessages((prevMessages) => [createdMessage, ...prevMessages]);
    } catch (error) {
      this.error(error.message);
    }
  }

  async markAsRead(messageIds) {
    console.log(messageIds);
    try {
      for (const id of messageIds) {
        await this.db.collection("Messages").update(id, { IsRead: true });
      }
    } catch (error) {
      this.error(error.message);
    }
  }
}

export default MessageService;
