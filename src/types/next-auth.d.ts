import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    email?: string;
    fullName?: string;
  }
  interface Session {
    user: {
      _id?: string;
      email?: string;
      fullName?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    _id?: string;
    email?: string;
    fullName?: string;
  }
}
