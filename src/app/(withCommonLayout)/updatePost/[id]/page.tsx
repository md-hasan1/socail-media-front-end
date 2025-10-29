"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import userImage from "@/assets/user.png";
import Image from "next/image";
import { EditIcon, PhotoIcon, YoutubeIcon } from "@/utils/Icons";
import {
  useGetSinglePostQuery,
  useUpdatePostByIdMutation,
} from "@/redux/features/api/postApi";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { useGetUserByIdQuery } from "@/redux/features/api/userApi";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";


const UpdatePost = () => {
  const params = useParams();
  const id = params?.id;

  const [postContent, setPostContent] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);

  const { data: postData, isLoading: isPostLoading } = useGetSinglePostQuery(
    id,
    { skip: !id }
  );
  const [updatePostById, { isLoading }] = useUpdatePostByIdMutation();

  const user = useAppSelector((state) => state.auth.user);
  const { data: userData } = useGetUserByIdQuery(user?.id);

  useEffect(() => {
    if (postData) {
      setPostContent(postData?.data?.text || "");
      setPhotoPreviews(postData?.data?.photos || []);
      setVideoPreviews(postData?.data?.videos || []);
    }
  }, [postData]);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFileState: React.Dispatch<React.SetStateAction<File[]>>,
    setPreviewState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setFileState((prev) => [...prev, ...newFiles]);
      setPreviewState((prev) => [
        ...prev,
        ...newFiles.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, setPhotos, setPhotoPreviews);
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, setVideos, setVideoPreviews);
  };

  const handleSubmit = async () => {
    if (!postContent.trim() && photos.length === 0 && videos.length === 0) {
      toast.error("Please add content, photos, or videos to update the post.");
      return;
    }

    const formData = new FormData();
    const data = {
      text: postContent,
      userId: user?.id,
    };

    formData.append("data", JSON.stringify(data));
    photos.forEach((photo) => formData.append("photos", photo));
    videos.forEach((video) => formData.append("videos", video));

    const res = await updatePostById({ id, formData });
  

    if (res.data?.success) {
      toast.success(res?.data?.message);
    } else if (res.data?.error) {
      toast.error(res?.data?.error.message);
    }

    setPostContent("");
    setPhotos([]);
    setVideos([]);
    setPhotoPreviews([]);
    setVideoPreviews([]);
  };

  if (isPostLoading) return <p>Loading post...</p>;

  return (
    <div className="shadow-lg p-6">
      <div className="w-full flex items-center gap-6 border-b pb-4">
        <div className="size-[56px] flex rounded-full overflow-hidden shadow-md">
          <Image
            className="size-full"
            src={userData?.data?.profilePic || userImage}
            width={500}
            height={500}
            alt="user image"
          />
        </div>
        <div className="flex-1">
          <Textarea
            className="focus-visible:ring-0 border-0 shadow-none"
            placeholder="Update your post"
            value={postContent}
            onChange={handleTextareaChange}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-4 flex-wrap">
        {photoPreviews.map((preview, index) => (
          <div key={index} className="relative">
            <Image
              src={
                typeof preview === "string"
                  ? preview
                  : (preview as { url: string }).url
              }
              width={100}
              height={100}
              alt={`Image Preview ${index + 1}`}
              className="w-32 h-32 object-cover rounded-md shadow-lg"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-4 flex-wrap">
        {videoPreviews.map((preview, index) => (
          <div key={index} className="relative">
            <Image
              src={
                typeof preview === "string"
                  ? preview
                  : (preview as { url: string }).url
              }
              width={100}
              height={100}
              alt={`Video Preview ${index + 1}`}
              className="w-32 h-32 object-cover rounded-md shadow-lg"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button
          variant={"ghost"}
          className="text-sm font-medium text-paragraph leading-6 flex items-center gap-2"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange} // Handle multiple photo selection
            className="hidden"
            id="photo-input"
            multiple
          />
          <label htmlFor="photo-input" className="flex items-center gap-2">
            <PhotoIcon />
            <span className="sm:block hidden">Photo</span>
          </label>
        </Button>

        <Button
          variant={"ghost"}
          className="text-sm font-medium text-paragraph leading-6 flex items-center gap-2"
        >
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange} // Handle multiple video file selection
            className="hidden"
            id="video-input"
            multiple
          />
          <label htmlFor="video-input" className="flex items-center gap-2">
            <YoutubeIcon />
            <span className="sm:block hidden">Video</span>
          </label>
        </Button>

        <Button
          loading={isLoading}
          variant={"ghost"}
          className="text-sm font-medium text-paragraph leading-6 flex items-center gap-2"
          onClick={handleSubmit}
        >
          <EditIcon />
          <span className="sm:block hidden">Submit</span>
        </Button>
      </div>
    </div>
  );
};

export default UpdatePost;
