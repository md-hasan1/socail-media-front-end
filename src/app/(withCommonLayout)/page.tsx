/* eslint-disable @typescript-eslint/no-explicit-any */

// import HeroSection from "@/components/home/HeroSection";
// import HowItWorks from "@/components/home/HowItWorks";
// import ShareTheirStory from "@/components/home/ShareTheirStory";
// import Testimonials from "@/components/home/Testimonials";


// export default function Home() {
//   return (
//     <div>
//       {/* <HeroSection /> */}
//       {/* <HowItWorks /> */}
//       {/* <ShareTheirStory /> */}
//       {/* <Featured productData={[{}]} gallery={false} /> */}
//       {/* <Testimonials /> */}
//     </div>
//   );
// }

"use client"
import PostCard from "@/components/card/PostCard";
import PublishPost from "@/components/discover/PublishPost";
import Sidebar from "@/components/discover/Sidebar";
import { useGetAllPostsQuery, useMyConnectionQuery, useSendRequestMutation } from "@/redux/features/api/postApi";
import React from "react";
const Home=()=>{
  const {data, refetch}=useGetAllPostsQuery(undefined)
  const [sendRequest] = useSendRequestMutation(undefined);
    const { data: myConnection } = useMyConnectionQuery(undefined);
  const handelConnect = async (id: string) => {
   
  await sendRequest({ followingId: id });
   
  };

  return(
        <section className="py-12 relative">
      <div className="grid grid-cols-3 gap-6 container">
        <div className="lg:col-span-2 col-span-3">
          <PublishPost />
          <div className="mt-8 grid gap-6">
      
            {data?.data?.map((item: { id: string; [key: string]: any }) => (
              <PostCard key={item.id} dataRefetch={refetch} data={item} handelConnect={handelConnect} myConnection={myConnection} isFooter={true}/>
            ))}
          </div>
        </div>
        <div className="col-span-1 lg:block hidden">
          <Sidebar   handelConnect={handelConnect} myConnection={myConnection}/>
        </div>
      </div>
    </section>
  )
}

export default Home;