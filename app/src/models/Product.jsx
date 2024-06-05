class Product {
  constructor(data) {
    this.id = data.id;
    this.name = data.Name;
    this.description = data.Description;
    this.category = data.Category;
    this.price = data.Price;
    this.stock = data.Stock;
    this.image = data.Images;
    this.region = data.Region;
    this.packaging = data.Packaging;
    this.type = data.Type;
    this.producer = data.Producer;
    this.alcoholPercentage = data.AlcoholPercentage;
    this.userId = data.UserID;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}

export default Product;
