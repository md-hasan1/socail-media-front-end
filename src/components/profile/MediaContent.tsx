/* eslint-disable @typescript-eslint/no-explicit-any */

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Camera, Pencil, Video } from "lucide-react";

// import ProfileImage from "@/utils/images/profile.png";
import {  useGetMyPostQuery } from "@/redux/features/api/postApi";
import PostCard from "../card/PostCard";
import PublishPost from "../discover/PublishPost";

export default function MediaContent() {
  const { data, refetch } = useGetMyPostQuery(undefined);

  return (
    <div className="mx-auto max-w-7xl space-y-4 p-4">
      {/* Create Post Section */}
      {/* <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Image
              src={ProfileImage}
              alt="Profile picture"
              width={40}
              height={40}
              className="rounded-full"
            />
            <Input placeholder="What's on your mind?" className="bg-gray-100" />
          </div>
          <div className="mt-4 flex justify-between border-t pt-4">
            <Button variant="ghost" className="flex-1 text-gray-600">
              <Camera className="mr-2 h-4 w-4" />
              Photo
            </Button>
            <Button variant="ghost" className="flex-1 text-gray-600">
              <Video className="mr-2 h-4 w-4" />
              Video
            </Button>
            <Button variant="ghost" className="flex-1 text-gray-600">
              <Pencil className="mr-2 h-4 w-4" />
              Write an Article
            </Button>
          </div>
        </CardContent>
      </Card> */}
<PublishPost></PublishPost>
      {/* Posts */}

      {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[ 1, 2, 3 ,4,5,6,7,8].map((post) => (
                    <Card key={post} className="bg-white shadow-sm">
                        <CardHeader className="flex-row items-center space-y-0 p-4">
                            <div className="flex flex-1 items-center gap-3">
                                <Image
                                    src={ProfileImage}
                                    alt="Profile picture"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold">Wade Warren</span>
                                    <span className="text-xs text-gray-500">25 Nov at 12:24 PM</span>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-gray-500">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="px-4 pb-2 pt-0">
                            <p className="text-sm text-gray-600">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </CardContent>
                        <CardFooter className="p-0">
                            <Image
                                priority
                                src={MediaImage}
                                alt={`Post ${post} image`}
                                width={400}
                                height={200}
                                className="h-48 w-full object-cover"
                            />
                        </CardFooter>
                    </Card>
                ))}
            </div> */}

      <div className="mt-8 grid  gap-6">
        {data?.data?.map((item: { id: string; [key: string]: any }) => (
          <PostCard key={item.id} dataRefetch={refetch} data={item}  isFooter={true}  isUpdate={true}/>
        ))}
      </div>
    </div>
  );
}
