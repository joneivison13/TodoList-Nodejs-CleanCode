import UserRepository from "../repositories/UserRepository";
import UserService from "../services/User";
import { USER_ALREADY_CREATED } from "../utils/errors";

class GetUserUseCase {
  userRepository: UserRepository;
  userService: UserService;
  constructor(userRepository: UserRepository, userService: UserService) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  async createUser(
    email: string,
    name: string,
    password: string,
    confirm_password: string
  ) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      return USER_ALREADY_CREATED(user);
    }

    const new_user = this.userService.createUser(email, name, password);

    return new_user;
  }
}

export default GetUserUseCase;
