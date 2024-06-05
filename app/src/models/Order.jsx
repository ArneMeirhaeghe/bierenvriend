class Order {
  constructor(data) {
    this.id = data.id;
    this.userID = data.userID;
    this.OrderItemID = data.OrderItemID;
    this.total_amount = data.total_amount;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}
export default Order;
