import Product, { IProduct } from "@models/Product/Product.model";

class ProductService {
  constructor() {}

  async getAllProducts(): Promise<IProduct[]> {
    const products = await Product.find().lean().exec();

    return products;
  }
}

export default ProductService;