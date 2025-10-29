"use client" 
 
 import React, { ChangeEvent } from "react";
import userImage from "@/assets/user.png";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { EditIcon, PhotoIcon, YoutubeIcon } from "@/utils/Icons";
import { useState } from 'react';
import { useCreatePostMutation } from "@/redux/features/api/postApi";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { useGetUserByIdQuery } from "@/redux/features/api/userApi";


const PublishPost = ({category}:{category?:string,id?:string}) => {
  const [postContent, setPostContent] = useState<string>('');
  const [photos, setPhotos] = useState<File[]>([]); // For multiple image files
  const [videos, setVideos] = useState<File[]>([]); // For multiple video files
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]); // For image previews
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]); // For video previews

  const [createPost, {isLoading}] = useCreatePostMutation();




  // Handle text input change
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  // Handle photo input change (with multiple selection and preview)
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files);
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

      const newPhotoPreviews = newPhotos.map((file) => URL.createObjectURL(file));
      setPhotoPreviews((prevPreviews) => [...prevPreviews, ...newPhotoPreviews]);
    }
  };

  // Handle video input change (with multiple selection and preview)
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newVideos = Array.from(files);
      setVideos((prevVideos) => [...prevVideos, ...newVideos]);

      const newVideoPreviews = newVideos.map((file) => URL.createObjectURL(file));
      setVideoPreviews((prevPreviews) => [...prevPreviews, ...newVideoPreviews]);
    }
  };
  

  const user = useAppSelector((state) => state.auth.user)

  const { data: userData, } = useGetUserByIdQuery(user?.id);
// if(userDataLoading){
//   return <p>Loading User Data...</p>
// }
  // Handle form submission
  const handleSubmit = async () => {
    const formData = new FormData();

    const data = {
      text: postContent,
      userId: user?.id,
      category:category
    }
  
    formData.append('data', JSON.stringify(data));


    photos.forEach((photo) => {
      formData.append('photos', photo);
    });

   
    videos.forEach((video) => {
      formData.append('videos', video);
    });
   
    const res = await createPost(formData);
 
    if (res.data?.success) {
      toast.success(res?.data?.message)
    } else if (res.data?.error) {
      toast.error(res?.data?.error.message)
    }
    // Reset the form after submission
    setPostContent('');
    setPhotos([]);
    setVideos([]);
    setPhotoPreviews([]);
    setVideoPreviews([]);
  };
  return (
    <div className="shadow-lg p-6">
      <div className="w-full flex items-center gap-6 border-b pb-4">
        <div className="size-[56px] flex rounded-full overflow-hidden shadow-md">
          <Image className="size-full" src={userData?.data?.profilePic || userImage} width={500} height={500} alt="user image" />
        </div>
        <div className="flex-1">
          <Textarea
            className="focus-visible:ring-0 border-0 shadow-none"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={handleTextareaChange}
          />
        </div>
      </div>

      {/* Image Previews */}
      <div className="mt-4 flex gap-4">
        {photoPreviews.map((preview, index) => (
          <Image
            width={300}
            height={250}
            key={index}
            src={preview ?? " "}
            alt={`Image Preview ${index + 1}`}
            className="w-32 h-32 object-cover rounded-md shadow-lg"
          />
        ))}
      </div>

      {/* Video Previews */}
      <div className="mt-4 flex gap-4">
        {videoPreviews.map((preview, index) => (
          <video
            key={index}
            src={preview ?? " "}
            controls
            className="w-32 h-32 object-cover rounded-md shadow-lg"
          />
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

export default PublishPost;
