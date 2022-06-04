import AuthController from "@controllers/Auth.controller";
import express, {Router} from "express";

const router: Router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);


export default router;