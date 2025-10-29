// import { StaticImageData } from "next/image";

type PostDataType = {
  id?: string;
  text?: string;
  video?: { url: string }[];
  image?: { url: string }[];
  shareCount?: number;
  likeCount?: number;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    profilePic?: string;
  };
  comments?: [
    {
      id?: string;
      text?: string;
      userId?: string;
      createdAt?: string;
      postId?: string;
      updatedAt?: string;
    }
   
  ];
  _count?: {
    likes?: number;
    comments?: number;
    shares?: number;
    Favorite?: number;
  }
};

export default PostDataType;
