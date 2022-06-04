import AuthService from '@services/Auth.service';
import {Request, Response, NextFunction} from 'express';

const authService = new AuthService();


class AuthController {

  constructor() {

  }

  async login(req: Request, res: Response) {
    const {email, password} = req.body;

    if(!email || !password) {
      return res.status(401).json({success: false, message: "email and password should be passed."});
    }

    try {
      const token = await authService.loginUser(email, password);

      res.json({
        success: true,
        accessToken: token
      });

    } catch(e: any) {
      // console.log('=== error', e);
      res.status(401).json({
        success: false,
        error: e.message
      })
    } 
  };

}

export default AuthController;