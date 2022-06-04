import express, {Router} from "express";
import AuthRouter from "./Auth/Auth.route";
import ProducthRouter from "@routes/Product/Product.route";
const router: Router = express.Router();


router.use('/auth', AuthRouter);

router.use('/product', ProducthRouter)


export default router;