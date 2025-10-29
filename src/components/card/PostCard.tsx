/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"; // Import useState and useEffect
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudFog, Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import { X } from "lucide-react"; // Import Lucide React icon for the close button
import { AiOutlineLike } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import fallbackImage from "@/assets/default-fallback-image.png";
import PostMedia from "../postMedia/PostMedia";
import moment from "moment";
import { AiFillLike } from "react-icons/ai";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import {
  useAddCommentMutation,
  useDeletePostMutation,
  useGetAllCommentBaseOnPostQuery,
  useGetAllMyFavoritesQuery,
  useGetAllMyLikeIdsQuery,
  useMyConnectionQuery,
  useSendRequestMutation,
  useShearMutation,
  useToggleFavoriteMutation,
  useToggleLikeMutation,
} from "@/redux/features/api/postApi";
import { useAppSelector } from "@/redux/hooks";
import { profileFallback } from "@/utils/fallBack";
import { useRouter } from "next/navigation";

// import UpdatePost from "../discover/UpdatePost";
// import Modal from "../modal/Modal";

export type FollowRequest = {
  id: string; // Unique identifier for the follow request
  followerId: string; // ID of the user who initiated the follow request
  followingId: string; // ID of the user being followed
  status: "PENDING" | "ACCEPTED" | "DECLINED"; // Status of the follow request
  createdAt: string; // ISO date string for when the follow request was created
  updatedAt: string; // ISO date string for when the follow request was last updated
};
export default function PostCard({
  data,
  dataRefetch,
  handelConnect,
  myConnection,
  isFooter,
  isUpdate,
}: any) {
  const { data: likeIds, refetch } = useGetAllMyLikeIdsQuery(undefined);
  const [ToggleLike] = useToggleLikeMutation();
  const [addComment] = useAddCommentMutation(undefined);
  const router=useRouter()
  const [visibleReplies, setVisibleReplies] = useState<Record<string, number>>(
    {}
  );
  const [Shear] = useShearMutation();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [toggleFavorite] = useToggleFavoriteMutation(undefined);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // State to toggle UpdatePost visibility

  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true); // Open the UpdatePost component
  };

  const handleUpdateClose = () => {
    setIsUpdateModalOpen(false); // Close the UpdatePost component
  };
  const currentUser = useAppSelector((state) => state.auth.user);

  const { data: getAllMyFavorite } = useGetAllMyFavoritesQuery(
    { id: currentUser?.id },
    { skip: !currentUser }
  );

  const {
    createdAt,
    likeCount,
    id,
    photos,
    shareCount,
    text,
    videos,
    user,
    userId,
  } = data;

  const myFavoriteIds = getAllMyFavorite?.data?.map((favorite: any) => {
    return {
      postId: favorite.postId,
      userId: favorite.userId,
    };
  });

  // Fetch comments based on postId
  const { data: allCommentBaseOnPost, refetch: commentRefetch } =
    useGetAllCommentBaseOnPostQuery(id);
const [deletePost]=useDeletePostMutation()
  const [isCommentVisible, setIsCommentVisible] = useState(false); // State for comment section visibility
  const [commentText, setCommentText] = useState(""); // State for the comment text
  const [showAllComments, setShowAllComments] = useState(false); // State to track whether all comments are shown

  const handleLike = async (id: string) => {
    const res = await ToggleLike(id);
    if (res?.data) {
      refetch();
      dataRefetch();
    }
  };

  const showMoreReplies = (commentId: string) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 5) + 5,
    }));
  };

  const handleFavorite = async (id: string) => {
    const res = await toggleFavorite({ postId: id });
    if (res.data) {
      refetch();
      dataRefetch();
    }
  };

  useEffect(() => {}, [
    getAllMyFavorite,
    currentUser,
    myConnection,
    photos,
    videos,
  ]);

  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null); // Tracks which comment is being replied to

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    if (replyToCommentId) {
      const commentData = {
        postId: id,
        text: commentText,
        parentId: replyToCommentId,
      };
      const res = await addComment(commentData);
    } else {
      if (commentText.trim()) {
        const commentData = {
          postId: id,
          text: commentText,
        };
        const res = await addComment(commentData);

        setCommentText("");
        setIsCommentVisible(false);
        commentRefetch();
      }
    }

    setCommentText("");
    setReplyToCommentId(null);
  };

  const handleReplyClick = (commentId: string) => {
    setReplyToCommentId(commentId);
    setCommentText("");
  };

  const handleShear = async (id: number) => {
    await Shear({ postId: id });
  };
  const handleDelete=async()=>{
await deletePost(id)

  }
  const handleUpdate=()=>{
router.push(`/updatePost/${id}`)
  }
  // Recursive function to render comments and replies
  const renderComment = (
    comment: any,
    isFirstReply = true,
    imag: number = 40
  ) => {
    const visibleCount = visibleReplies[comment.id] || 5; // Default to showing 5 replies
    const hasMoreReplies =
      comment.replies && comment.replies.length > visibleCount;

    return (
      <div key={comment.id} className="mb-4">
        {/* Comment Block */}
        <div className={`flex gap-4 ${isFirstReply ? "ml-0" : "ml-8"}`}>
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <Image
              src={comment.user.profilePic || profileFallback}
              alt={`Profile image of ${comment.user.firstName}`}
              height={imag}
              width={imag}
              className="rounded-full"
            />
          </div>

          {/* Comment Content */}
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <p className="font-bold text-sm">
                {comment.user.firstName} {comment.user.lastName}
              </p>
              <p className="text-xs text-gray-500">
                {moment(comment.createdAt).fromNow()}
              </p>
            </div>
            <p className="text-sm text-gray-700">{comment.text}</p>
            <div className="flex gap-4 mt-2 text-sm text-blue-600">
              <button className="hover:underline"></button>
              <button
                className="hover:underline"
                onClick={() => handleReplyClick(comment.id)}
              >
                Reply
              </button>
            </div>
          </div>
        </div>

        {/* Render Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.slice(0, visibleCount).map((reply: any) => (
              <div key={reply.id}>{renderComment(reply, false, 30)}</div>
            ))}

            {/* View More Replies Button */}
            {hasMoreReplies && (
              <button
                onClick={() => showMoreReplies(comment.id)}
                className="text-blue-600 hover:underline mt-2 ml-8"
              >
                View More Replies
              </button>
            )}
          </div>
        )}
      </div>
    );
  };
  //  console.log({photos},{videos})

  return (
    <div>
      {data ? (
        <Card className="rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
          <CardContent className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 justify-between">
                <div className="relative h-12 w-12">
                  <Image
                    src={user.profilePic || fallbackImage}
                    alt={`image of ${user.firstName}`}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-lg">
                      {user.firstName + " " + user.lastName}
                    </h2>
                    {userId === currentUser?.id
                      ? ""
                      : isFooter && (
                          <Button
                            variant="link"
                            className="text-blue-900 p-0 h-auto font-semibold"
                            onClick={() =>
                              !myConnection?.data?.some(
                                (connect: FollowRequest) =>
                                  connect.followingId === user.id &&
                                  connect.status === "ACCEPTED"
                              ) && handelConnect(user.id)
                            }
                          >
                            {myConnection?.data?.some(
                              (connect: FollowRequest) =>
                                connect.followingId === user.id &&
                                connect.status === "PENDING"
                            )
                              ? "Cancel Connect"
                              : myConnection?.data?.some(
                                  (connect: FollowRequest) =>
                                    connect.followingId === user.id &&
                                    connect.status === "ACCEPTED"
                                )
                              ? "Connected"
                              : "+ Connect"}
                          </Button>
                        )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {user.designation || "Back-end Developer"}
                  </p>
                  <p className="text-sm text-gray-500">{createdAt}</p>
                </div>
              </div>
              {isUpdate && (
                <Button
                  variant={"ghost"}
                  onClick={() => handleUpdateClick()} // Open UpdatePost when clicked
                  className=""
                >
                  <PiDotsThreeOutlineVerticalBold />
                </Button>
              )}
            </div>

            {/* Post Content */}
            <p className="text-gray-600 text-lg">{text}</p>

            {/* Post Image */}

            {photos.length > 0 || videos.length > 0 ? (
              <div className="relative  w-full overflow-hidden rounded-lg">
                {
                  <PostMedia
                    photos={photos}
                    videos={videos}
                    fallbackImage={fallbackImage}
                  />
                }
              </div>
            ) : (
              ""
            )}
          </CardContent>

          {/* Footer */}
          {isFooter && (
            <CardFooter className="px-6 py-4 border-t flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Button
                  onClick={() => handleLike(id)}
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:text-red-600 transition duration-200 ease-in-out"
                >
                  {likeIds?.data?.some((likeId: string) => likeId === id) ? (
                    <AiFillLike className="h-8 w-8 text-blue-600" />
                  ) : (
                    <AiOutlineLike className="h-5 w-5" />
                  )}
                  <span>{likeCount}</span>
                </Button>
                <Button
                  onClick={() => setIsCommentVisible(!isCommentVisible)}
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:text-blue-600 transition duration-200 ease-in-out"
                >
                  <MessageCircle className="h-5 w-5 " />
                  <div className="flex items-center gap-2">
                    <div>Comments</div>
                    <div>{allCommentBaseOnPost?.data.totalComments}</div>
                  </div>
                </Button>
                <Button
                  // onClick={() => setIsOpenModal(true)}
                  onClick={() => {
                    handleShear(id);
                  }}
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:text-green-600 transition duration-200 ease-in-out"
                >
                  <Share2 className="h-5 w-5 " />
                  <span>{shareCount}</span>
                </Button>
              </div>

              {
                <Button variant={"ghost"} onClick={() => handleFavorite(id)}>
                  {/* {myFavoriteIds?<FaHeart className="h-6 text-red-800 w-6"/>:<Heart className="h-6 w-6"/>}  */}
                  {myFavoriteIds?.some(
                    (likeId: any) => likeId.postId === id
                  ) ? (
                    <FaHeart className="h-6 text-red-800 w-6" />
                  ) : (
                    <Heart className="h-5 w-5" />
                  )}
                </Button>
              }
            </CardFooter>
          )}

          {/* Comment Section (conditionally rendered) */}
          {isCommentVisible && (
            <div className="relative h-[700px] overflow-y-scroll overflow-x-hidden px-6 py-4 border-t">
              {/* Show existing comments */}
              {allCommentBaseOnPost &&
              allCommentBaseOnPost.data.comments.length > 0 ? (
                <div className="space-y-6">
                  {allCommentBaseOnPost?.data.comments
                    .slice(
                      0,
                      showAllComments
                        ? allCommentBaseOnPost.data.comments.length
                        : 5
                    )
                    .map((comment: any) => (
                      <div key={comment.id}>{renderComment(comment)}</div>
                    ))}

                  {/* Show More / Show Less Button */}
                  {!showAllComments &&
                    allCommentBaseOnPost.data.comments.length > 5 && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => setShowAllComments(true)}
                          className="text-blue-600 hover:underline"
                        >
                          Show More
                        </button>
                      </div>
                    )}
                  {showAllComments && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => setShowAllComments(false)}
                        className="text-blue-600 hover:underline"
                      >
                        Show Less
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}

              {/* Input for New Comment */}
              <div className="sticky -bottom-5 bg-white py-4 border-t">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                  placeholder={
                    replyToCommentId ? "Write a reply..." : "Write a comment..."
                  }
                />
                <button
                  onClick={handleCommentSubmit}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
                >
                  {replyToCommentId ? "Reply" : "Comment"}
                </button>
              </div>
            </div>
          )}
        </Card>
      ) : (
        <div>Loading...</div>
      )}

      {/* Render UpdatePost Component */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-end bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white max-w-2xl p-6 rounded-lg shadow-lg relative">
            {/* Close Icon */}
            <button
              onClick={handleUpdateClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Update and Delete Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
     
      )}
    </div>
  );
}
