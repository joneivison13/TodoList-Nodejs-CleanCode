import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name: string;
        loggin_type: string;
        Todo: {
          id: number;
          title: string;
          content: string | null;
          index: number;
          initial_date: Date | null;
          final_date: Date | null;
          tag_color: string | null;
          authorId: number;
          created_at: Date;
          updated_at: Date;
        }[];
        _count: any;
      }; // ou qualquer outro tipo
    }
  }
}

export interface User extends Prisma.UserDelegate<ExtArgs> {}

export interface IUpdateTodo
  extends Prisma__TodoClient<
    $Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "update">,
    never,
    ExtArgs
  > {}
