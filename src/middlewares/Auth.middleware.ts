import { validateJWT } from '@helpers/Auth.helper';
import { IAuthenticatedRequest } from '@mytypes/General.types';
import {Response, NextFunction} from 'express';


const AuthMiddelware = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
  
  if (!req.headers.authorization) {
    return res.status(401).json({error: "Authentication Error: AccessToken is required."});
  }
  
  let token = req.headers.authorization.replace(/Bearer\s+/i, '');

  try {
    const payload = await validateJWT(token);
    req.auth = payload;

  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ success: false, error: 'Expired token' });
      return;
    }

    return res.status(500).json({ success: false, error: 'Failed to authenticate user' });
  }

  // run the next middleware of the route ---
  next();
};

export default AuthMiddelware;