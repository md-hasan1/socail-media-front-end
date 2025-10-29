import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Your custom dialog components

// Utility function to check if a URL is an image (based on file extension)
const isImage = (url: string) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

// Utility function to check if a URL is a video (based on file extension)
const isVideo = (url: string) => {
  const videoExtensions = [".mp4", ".webm", ".avi", ".mov"];
  return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

const PostMedia = ({
 
  photos,
  videos,
  fallbackImage,

}: {
  id?: string;
  photos: (string | { url: string })[]; // Photo array can have either string or object with 'url' key
  videos: (string | { url: string })[];
  fallbackImage: StaticImageData;
}) => {
  // console.log( videos)
  const [showModal, setShowModal] = useState(false); // Track if the modal is open
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false); // State to toggle between showing 4 or all items

  // Handle opening the video dialog
  const openVideoDialog = (url: string) => {
    setVideoUrl(url);
  };

  // Handle closing the video dialog
  const closeVideoDialog = () => {
    setVideoUrl(null);
  };

  // Combine photos and videos for display
  const allMedia = [...photos, ...videos];
  // console.log({photos, videos});
  const visibleMedia = showAll ? allMedia : allMedia.slice(0, 4); // Show 4 items or all based on 'showAll'

  // Determine whether to show the 'Show More' button
  const shouldShowShowMoreButton = allMedia.length > 4;

  // Helper to get media URL
  const getUrl = (media: string | { url: string }) => {
    return typeof media === "string" ? media : media.url;
  };

  return (
    <div className="relative w-full h-full">
      {/* Display Media Grid with Show More Button */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Display Media */}
        {visibleMedia?.map((media, index) => {
          const isLastImage = index === visibleMedia.length - 1; // Check if it's the last image
          return (
            <div
              key={index}
              className={`relative w-full ${visibleMedia.length === 1 ? 'col-span-2 h-[500px]' : ''} ${
                visibleMedia.length === 2 ? 'h-[500px]' : ''} ${
                visibleMedia.length === 3 && index === 2 ? 'col-span-2 h-[300px]' : ''}`} // Adjust grid behavior based on number of media
            >
              {isImage(getUrl(media)) ? (
                <div className="relative w-full h-full">
                  {/* Image with overlay */}
                  <Image
                    className="w-full h-full object-cover rounded-md" // Removed hover effect
                    width={500}
                    height={300}
                    src={getUrl(media) || fallbackImage}
                    alt={`Image ${index}`}
                  />
                  {isLastImage && shouldShowShowMoreButton && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                      <button
                        onClick={() => setShowModal(true)}
                        className="text-white text-xl py-2 px-4  transition-all duration-200"
                      >
                        + {allMedia.length - 4} more
                      </button>
                    </div>
                  )}
                </div>
              ) : isVideo(getUrl(media)) ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative cursor-pointer group w-full h-full">
                      <video
                        className="w-full h-full object-cover rounded-md"
                        poster={`https://img.youtube.com/vi/${getUrl(media)
                          .split("/")[1]
                          .split(".")[0]}/hqdefault.jpg`}
                        onClick={() => openVideoDialog(getUrl(media))}
                      >
                        <source src={getUrl(media)} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-4xl">🎥</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Video</DialogTitle>
                    </DialogHeader>
                    <video controls className="w-full h-full">
                      <source src={getUrl(media)} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <DialogFooter>
                      <button className="btn" onClick={closeVideoDialog}>
                        Close
                      </button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Modal for Showing All Photos and Videos */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>All Photos & Videos</DialogTitle>
          </DialogHeader>

          {/* Scrollable Content */}
          <div
            className="grid grid-cols-1 gap-4 mt-4 max-h-[70vh] overflow-y-auto"
            style={{ maxHeight: "70vh" }} // Adjust the height as needed
          >
            {/* Display All Media */}
            {allMedia?.map((media, index) => (
              <div
                key={index}
                className="relative group border-4 border-gray-300 p-2 rounded-md shadow-md transition-all duration-300"
              >
                {isImage(getUrl(media)) ? (
                  <Image
                    className="w-full h-[300px] object-cover rounded-md" // Fixed height for images
                    width={500}
                    height={300} // Fixed height for images
                    src={getUrl(media) || fallbackImage}
                    alt={`Image ${index}`}
                  />
                ) : isVideo(getUrl(media)) ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative cursor-pointer group">
                        <video
                          className="w-full h-[300px] object-cover rounded-md" // Fixed height for videos
                          width={500}
                          height={300} // Fixed height for videos
                          poster={`https://img.youtube.com/vi/${getUrl(media)
                            .split("/")[1]
                            .split(".")[0]}/hqdefault.jpg`} // Thumbnail logic for YouTube videos (if external)
                          onClick={() => openVideoDialog(getUrl(media))}
                        >
                          <source src={getUrl(media)} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Video</DialogTitle>
                      </DialogHeader>
                      <video controls className="w-full h-full">
                        <source src={getUrl(media)} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <DialogFooter>
                        <button className="btn" onClick={closeVideoDialog}>
                          Close
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : null}
              </div>
            ))}
          </div>

          <DialogFooter>
            <button className="btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostMedia;