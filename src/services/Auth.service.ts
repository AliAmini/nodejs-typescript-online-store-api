class AuthService {
  constructor() {}

  async loginUser(email: string, password: string): Promise<{token: string}> {

    let token: string = '';
    return {
      token
    }
  }
}

export default AuthService;