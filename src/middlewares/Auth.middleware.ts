import { validateJWT } from '@helpers/Auth.helper';
// import { IAuthenticatedRequest } from '@mytypes/General.types';
import {Response, Request, NextFunction} from 'express';


const AuthMiddelware =  (req: Request, res: Response, next: NextFunction) => {  
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).json({success: false, error: "Authentication Error: AccessToken is required."});
    return;
  }
  
  let token = authorization.replace(/Bearer\s+/i, '');

  try {
    validateJWT(token).then(payload => {
      req.auth = payload;
      
      
      // run the next middleware of the route ---
      next();
    });

  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ success: false, error: 'Expired token' });
      return;
    }

    res.status(500).json({ success: false, error: 'Failed to authenticate user' });
    return;
  }

  
};

export default AuthMiddelware;