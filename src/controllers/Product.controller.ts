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
      res.status(500).json({
        success: false,
        error: e.message
      })
    } 
  };


  async getProductDiscount(req: Request, res: Response) {
    try {
      const { productCode } = req.params;
      // if(!productCode) {
      //   res.status(400).json({success: false, error: '`productCode` should sent in url querystring.'});
      // }

      const discount = await productService.getProductDiscount(productCode);

      res.send(`${discount}`);

    } catch(e: any) {
      console.log('==== error', e);
      res.status(500).json({
        success: false,
        error: e.message
      })
    } 
  }

}

export default ProductController;