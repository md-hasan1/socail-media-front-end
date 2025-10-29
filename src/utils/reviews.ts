import { reviewTypes, TestimonialType } from "@/types/globalTyps";
import userImage from "@/assets/user.png";

const reviews: reviewTypes[] = [
  { id: 1, rating: 5 },
  { id: 2, rating: 5 },
  { id: 3, rating: 5 },
  { id: 4, rating: 5 },
  { id: 5, rating: 5 },
];

export default reviews;

const commentsData =
  "I gave this to my siblings as a Christmas gift to honor our parents. It’s a meaningful way to remember them each time we visit their resting place. This product is perfect, and we’re truly grateful. Thank you.";

export const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: "John Doe",
    comments: commentsData,
    image: userImage,
    reviews: [
      {
        id: 1,
        rating: 5,
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    comments: commentsData,
    image: userImage,
    reviews: [
      {
        id: 1,
        rating: 5,
      },
    ],
  },
  {
    id: 3,
    name: "Michael Brown",
    comments: commentsData,
    image: userImage,
    reviews: [
      {
        id: 1,
        rating: 5,
      },
    ],
  },
  {
    id: 4,
    name: "Sarah Wilson",
    comments: commentsData,
    image: userImage,
    reviews: [
      {
        id: 1,
        rating: 5,
      },
    ],
  },
  {
    id: 5,
    name: "Sarah Wilson",
    comments: commentsData,
    image: userImage,
    reviews: [
      {
        id: 1,
        rating: 5,
      },
    ],
  },
  {
    id: 6,
    name: "Sarah Wilson",
    comments: commentsData,
    image: userImage,
    reviews: [
      {
        id: 1,
        rating: 5,
      },
    ],
  },
];
