import Database from "../infra/db";

class UserRepository {
  async findById(id: number) {
    const user = await Database.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        _count: true,
        id: true,
        loggin_type: true,
        name: true,
        password: false,
        Todo: true,
      },
    });

    return user;
  }

  async findByEmailAndPassword(email: string) {
    const user = await Database.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        _count: true,
        id: true,
        loggin_type: true,
        name: true,
        password: true,
        Todo: true,
      },
    });

    return user;
  }

  async findByEmail(email?: string) {
    const user = await Database.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        _count: true,
        id: true,
        loggin_type: true,
        name: true,
        password: false,
        Todo: true,
      },
    });
    return user;
  }

  async createUser(email: string, name: string, password: string) {
    return await Database.user.create({ data: { email, name, password } });
  }
}

export default UserRepository;
