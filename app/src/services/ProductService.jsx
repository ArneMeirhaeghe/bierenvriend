import pb from "./PocketbaseService";
import Product from "../models/Product";
import seedData from "./seedData.json";

class ProductService {
  constructor({ user, error, setProducts }) {
    this.db = pb;
    this.user = user;
    this.error = error;
    this.setProducts = setProducts;

    this.getAllProducts = this.getAllProducts.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.liveUpdate = this.liveUpdate.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.getAllProductsBySellerId = this.getAllProductsBySellerId.bind(this);
  }

  async getAllProducts(loading) {
    loading(true);
    try {
      const products = await this.db.collection("products").getFullList();
      const productsObj = {};
      products.forEach((res) => {
        productsObj[res.id] = new Product({ ...res, service: this });
      });
      this.setProducts(productsObj);
      loading(false);
      return products;
    } catch (error) {
      this.error(error.message);
      loading(false);
    }
  }

  async deleteProduct(product) {
    try {
      const response = await this.db.collection("products").delete(product.id);
      if (response) {
        this.db.collection("products").unsubscribe(`${product.id}`);
        this.setProducts((prevProducts) => {
          const updatedProducts = { ...prevProducts };
          delete updatedProducts[product.id];
          return updatedProducts;
        });
        return true;
      } else {
        this.error("Something went wrong");
        return false;
      }
    } catch (error) {
      this.error(error.message);
    }
  }

  async updateProduct(updatedProductData) {
    try {
      delete updatedProductData.productService;
      const response = await this.db
        .collection("products")
        .update(updatedProductData.id, updatedProductData);
      if (response) {
        this.setProducts((prevProducts) => ({
          ...prevProducts,
          [response.id]: new Product({ ...response, service: this }),
        }));
        return true;
      } else {
        this.error("Something went wrong");
        return false;
      }
    } catch (error) {
      this.error(error.message);
    }
  }

  async createProduct(productData) {
    console.log(productData);
    try {
      await this.db.collection("products").create(productData);
      window.location.reload();
    } catch (error) {
      this.error(error.message);
    }
  }

  liveUpdate(products) {
    Object.values(products).forEach((product) => {
      this.db
        .collection("products")
        .subscribe(`${product.id}`, (changesProduct) => {
          if (product[product.id]) {
            this.setProducts((prevProducts) => ({
              ...prevProducts,
              [changesProduct.record.id]: new Product({
                ...changesProduct.record,
                service: this,
              }),
            }));
          }
        });
    });
  }

  async getProductById(productId) {
    try {
      const product = await this.db.collection("products").getOne(productId);
      return product;
    } catch (error) {
      this.error(error.message);
      throw error;
    }
  }

  seedProducts() {
    seedData.forEach(async (product) => {
      delete product.id;
      await this.db
        .collection("products")
        .create({ ...product }, { $autoCancel: false });
    });
  }

  async getAllProductsBySellerId(SellerID) {
    try {
      const products = await this.db.collection("products").getFullList({
        filter: `UserID = "${SellerID}"`,
      });
      return products;
    } catch (error) {
      this.error(error.message);
    }
  }
}

export default ProductService;
