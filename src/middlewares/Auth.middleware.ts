import {Request, Response, NextFunction} from 'express';


const AuthMiddelware = (req: Request, res: Response, next: NextFunction) => {
  
  if (!req.headers.authorization) {
    return res.status(401).json({error: "Authentication Error: AccessToken is required."});
  }
  
  let token = req.headers.authorization.replace(/Bearer\s+/i, '');

};

export default AuthMiddelware;