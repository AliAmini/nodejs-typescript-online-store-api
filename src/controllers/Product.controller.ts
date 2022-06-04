import ProductService from '@services/Product.service';
import {Request, Response, NextFunction} from 'express';

const productService = new ProductService();


class ProductController {

  constructor() {

  }

  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();

      res.json({
        success: true,
        products
      });

    } catch(e: any) {
      // console.log('=== error', e);
      res.status(500).json({
        success: false,
        error: e.message
      })
    } 
  };

}

export default ProductController;