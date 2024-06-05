class Message {
  constructor({
    id,
    Content,
    IsRead,
    SenderID,
    ReceiverID,
    ProductID,
    created,
    updated,
  }) {
    this.id = id;
    this.Content = Content;
    this.IsRead = IsRead;
    this.SenderID = SenderID;
    this.ReceiverID = ReceiverID;
    this.ProductID = ProductID;
    this.created = created;
    this.updated = updated;
  }
}

export default Message;
