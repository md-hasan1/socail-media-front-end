import { StaticImageData } from "next/image";

export type ShareTheStoryDataType = {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
};
