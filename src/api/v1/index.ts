import express, {Router} from "express";
import AuthRouter from "./Auth/Auth.route";
import AuthMiddelware from "@middlewares/Auth.middleware";
const router: Router = express.Router();


router.use('/auth', AuthRouter);


/**
 * Authenticated Routes
 */
router.use(AuthMiddelware);


export default router;