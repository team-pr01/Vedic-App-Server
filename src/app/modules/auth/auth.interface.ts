export type TLoginAuth = {
  email: string;
  password: string;
};

import { Model } from "mongoose";
import { UserRole } from "./auth.constannts";

export type TUser= {
  _id:string;
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
  role: "user" | "admin" | "moderator" | "super-admin";
  assignedPages? : string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  isDeleted : boolean;
  isSuspended : boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof UserRole;
