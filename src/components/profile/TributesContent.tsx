/* eslint-disable @typescript-eslint/no-explicit-any */
import PublishPost from "../discover/PublishPost";
import { useGetAllTributesPostsQuery } from "@/redux/features/api/postApi";
import PostCard from "../card/PostCard";

function TributesContent() {
    const{data,refetch}=useGetAllTributesPostsQuery('')
   
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
                            <Camera className="mr-2 size-4" />
                            Photo
                        </Button>
                        <Button variant="ghost" className="flex-1 text-gray-600">
                            <Video className="mr-2 size-4" />
                            Video
                        </Button>

                    </div>
                </CardContent>
            </Card> */}
      <PublishPost category="TRIBUTES"></PublishPost>
      {/* Posts */}
  <div className="mt-8 grid  gap-6">
        {data?.data?.map((item: { id: string; [key: string]: any }) => (
          <PostCard key={item.id} dataRefetch={refetch} data={item}  isFooter={true} isUpdate={true} />
        ))}
      </div>
    </div>
  );
}

export default TributesContent;
