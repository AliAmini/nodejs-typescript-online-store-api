import Category from "@models/Category/Category.model";
import Product, { IProduct } from "@models/Product/Product.model";

class ProductService {
  constructor() {}

  async getAllProducts(): Promise<IProduct[]> {
    const products = await Product.find().lean().exec();

    return products;
  }

  async getProductDiscount(productCode: string): Promise<number> {
    const product = await Product.findOne({code: productCode});
    if(!product) {
      throw new Error('Product is not found!');
    }

    // # product discount 
    if(product.discountPercent) {
      return product.discountPercent;
    }

    // # find category
    if(product.category) {
      let category = await Category.findById(product.category);
      
      // # search through all category and its parents for discount
      while(category) {
        if(category.discountPercent) {
          return category.discountPercent;
        } 

        category = category.parent? 
          await Category.findById(category.parent) : 
          null;
      }
    }


    return -1;
  }
}

export default ProductService;