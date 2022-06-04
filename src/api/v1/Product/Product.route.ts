import ProductController from "@controllers/Product.controller";
import AuthMiddelware from "@middlewares/Auth.middleware";
import express, {Router, Express} from "express";

const router = express.Router();
const productController = new ProductController();

router.post('/products', AuthMiddelware, productController.getAllProducts);
// router.get('/products', (req, res, next) => {
//   AuthMiddelware(req, res, next)
// });


export default router;