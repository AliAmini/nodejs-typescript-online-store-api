import ProductController from "@controllers/Product.controller";
import AuthMiddelware from "@middlewares/Auth.middleware";
import express, {Router, Express} from "express";

const router = express.Router();
const productController = new ProductController();

/**
 * @protect routes with authentication middleware
 */
router.use(AuthMiddelware);


router.post('/products', productController.getAllProducts);


router.get('/discount/:productCode', productController.getProductDiscount);

export default router;