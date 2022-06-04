import { comparePassword, createJWT, validateJWT } from "@helpers/Auth.helper";
import User, { IUser } from "@models/User/User.model";

class AuthService {
  constructor() {}

  async loginUser(email: string, password: string): Promise<string> {
    const foundUser = await User.findOne({email: email}).lean().exec();
    if(!foundUser) {
      throw new Error("User is not found");
    } else {
      console.log('Password, hash', password, foundUser.password);
    }

    const isCorrectPassword = await comparePassword(password, foundUser.password);
    if(!isCorrectPassword) {
      throw new Error("Entered email or password is not correct.");
    }


    let token: string = createJWT(foundUser);

    return token;
  }
}

export default AuthService;