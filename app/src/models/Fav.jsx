class Fav {
  constructor(data) {
    this.id = data.id;
    this.productID = data.productID;
    this.userID = data.userID;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}

export default Fav;
