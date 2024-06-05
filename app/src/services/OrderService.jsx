import pb from "./PocketbaseService";

class OrderService {
  constructor({ user, setOrder, error }) {
    this.db = pb;
    this.user = user;
    this.setOrder = setOrder;
    this.error = error;

    this.getAllOrderByUser = this.getAllOrderByUser.bind(this);
    this.addOrder = this.addOrder.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
    this.isOrder = this.isOrder.bind(this);
    this.getExistingOrder = this.getExistingOrder.bind(this);
    this.addOrderItem = this.addOrderItem.bind(this);
    this.updateOrderItemQuantity = this.updateOrderItemQuantity.bind(this);
    this.updateOrderStatus = this.updateOrderStatus.bind(this);
    this.updateOrderTotalAmount = this.updateOrderTotalAmount.bind(this);
  }

  async getAllOrderByUser(id) {
    try {
      const response = await this.db.collection("orders").getFullList({
        filter: `userID = "${id}"`,
      });
      const orderObj = {};
      response.forEach((res) => {
        orderObj[res.id] = res;
      });
      this.setOrder(Object.values(orderObj));
      return response;
    } catch (error) {
      this.error(error.message);
    }
  }

  async addOrder(userID, OrderItemID) {
    try {
      const newOrder = await this.db.collection("orders").create({
        userID,
        OrderItemID,
        total_amount: 0,
        status: "open",
      });
      return newOrder;
    } catch (error) {
      this.error(error.message);
    }
  }

  async removeOrder(orderID) {
    try {
      await this.db.collection("orders").delete(orderID);
    } catch (error) {
      this.error(error.message);
    }
  }

  async isOrder(userID, OrderItemID) {
    try {
      const response = await this.db.collection("orders").getFullList({
        filter: `userID = "${userID}" && OrderItemID = "${OrderItemID}"`,
      });
      return response.length > 0 ? response[0] : null;
    } catch (error) {
      this.error(error.message);
    }
  }

  async addOrderItem(orderID, productID, quantity) {
    try {
      const newOrderItem = await this.db.collection("Order_items").create({
        orderID,
        productID,
        quantity,
      });
      return newOrderItem;
    } catch (error) {
      this.error(error.message);
    }
  }

  async getExistingOrder(userID) {
    try {
      const response = await this.db.collection("orders").getFullList({
        filter: `userID = "${userID}" && status = "open"`,
      });
      return response.length > 0 ? response[0] : null;
    } catch (error) {
      this.error(error.message);
    }
  }

  async getOrderItemsByOrderID(orderID) {
    try {
      const response = await this.db.collection("Order_items").getFullList({
        filter: `orderID = "${orderID}"`,
      });
      return response;
    } catch (error) {
      this.error(error.message);
    }
  }

  async updateOrderItemQuantity(itemId, quantity) {
    try {
      const updatedOrderItem = await this.db
        .collection("Order_items")
        .update(itemId, { quantity });
      return updatedOrderItem;
    } catch (error) {
      this.error(error.message);
    }
  }

  async updateOrderStatus(orderID, status) {
    try {
      const updatedOrder = await this.db
        .collection("orders")
        .update(orderID, { status });
      return updatedOrder;
    } catch (error) {
      this.error(error.message);
    }
  }

  async updateOrderTotalAmount(orderID, total_amount) {
    try {
      const updatedOrder = await this.db
        .collection("orders")
        .update(orderID, { total_amount });
      return updatedOrder;
    } catch (error) {
      this.error(error.message);
    }
  }
}

export default OrderService;
