import { StaticImageData } from "next/image";

export type Person = {
  name: string;
  title: string;
  imageUrl?: string | StaticImageData;
  timestamp: string;
  designation?: string;

};

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  profilePic?: string;
  bannerPic?: string;
  summary?: string | null;
  birthday?: string | null;
  skills?: string[] | [] | null;
  phone?: string | null;
  address?: string | null;
  otp: string;
  OtpExpires: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
