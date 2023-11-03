import UserRepository from "../repositories/UserRepository";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { ACCESS_DENIED, INVALID_TOKEN } from "../utils/errors";
import { User } from "../types/types";

class UserService extends UserRepository {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    super();
    this.userRepository = userRepository;
  }

  async createUser(
    email: string,
    name: string,
    password: string
  ): Promise<{
    id: number;
    name: string;
    email: string;
    loggin_type: string;
    password: string;
    created_at: Date;
    updated_at: Date;
  }> {
    const salt = await bcryptjs.genSalt(10);
    const password_encripted = await bcryptjs.hash(password, salt);

    const user_data = await this.userRepository.createUser(
      email,
      name,
      password_encripted
    );
    user_data.password = "";

    return user_data;
  }

  async createJsonWebToken(data: { id: number; email: string }) {
    const jwt_expires = process.env.JWT_EXPIRES || "1h";
    const jwt_refresh_expires = process.env.JWT_REFRESH_EXPIRES || "7d";
    const token = jwt.sign(data, String(process.env.JWT_KEY), {
      expiresIn: jwt_expires,
    });
    const refresh_token = jwt.sign(
      { ...data, type: "refresh" },
      String(process.env.JWT_REFRESH_KEY)
    );
    return {
      token,
      tokenExpiresIn: jwt_expires,
      refresh_token,
      refreshExpiresIn: jwt_refresh_expires,
    };
  }

  async refreshJsonWebToken(refreshToken: string) {
    try {
      if (!refreshToken) return ACCESS_DENIED;

      return jwt.verify(
        refreshToken,
        String(process.env.JWT_REFRESH_KEY),
        async (err, new_jwt) => {
          if (err) return INVALID_TOKEN;
          const newjwt = new_jwt as { id: number; email: string };

          return {
            auth: await this.createJsonWebToken({
              email: newjwt.email,
              id: newjwt.id,
            }),
          };
        }
      );
    } catch (error) {
      console.log(error);
      return INVALID_TOKEN;
    }
  }

  async validateUserCredentials(email: string, password: string) {
    const results = await this.userRepository.findByEmailAndPassword(email);

    if (!results) {
      return null;
    }
    const { password: user_password, ...user }: any = results;
    const passwordMatch = await bcryptjs.compare(password || "", user_password);

    if (!passwordMatch) {
      return null;
    }
    return user;
  }
}

export default UserService;
