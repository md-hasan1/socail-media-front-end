/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import { Button } from "../ui/button"
// import connectionImage from "@/utils/images/profile.png";
import { useAcceptRequestMutation, useDeclineRequestMutation, usePendingListQuery } from "@/redux/features/api/followApi";

import { profileFallback } from "@/utils/fallBack";
import { useEffect } from "react";


// type Connection = {
//     name: string;
//     role: string;
//     image: string | StaticImageData;
// };
export type ConnectionTab = 'RecentlyAdded' | 'RequestConnect' | 'All';

function RequestConnect() {
    // const connections: Connection[] = [
    //     { name: "Ralph Edwards", role: "UX Designer", image: connectionImage },
    //     { name: "Annette Black", role: "Assistant Backend Developer", image: connectionImage },
    //     { name: "Bessie Cooper", role: "Finance", image: connectionImage },
    //     // { name: "Jerome Bell", role: "Customer Service Manager", image: connectionImage },
    //     // { name: "Courtney Henry", role: "Human Resource Manager", image: connectionImage },
    //     // { name: "Eleanor Pena", role: "Chief Executive Officer", image: connectionImage },
    //     // { name: "Darlene Robertson", role: "Senior Developer", image: connectionImage },
    //     // { name: "Savannah Nguyen", role: "Front End Developer", image: connectionImage },
    //     // { name: "Savannah Nguyen", role: "Front End Developer", image: connectionImage },
    //     // { name: "Savannah Nguyen", role: "Front End Developer", image: connectionImage },
    // ];
const {data}=usePendingListQuery(undefined)
const [acceptRequest]=useAcceptRequestMutation()
const[declineRequest]=useDeclineRequestMutation()

useEffect(()=>{},[data?.data?.pendingRequests])

const handleAccept=async(id:number)=> {


   await acceptRequest({requestId:id}).unwrap()
}

const handleDecline=async(id:number)=> {
await declineRequest({requestId:id}).unwrap()
}
    return (
        <div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data?.data?.pendingRequests?.map((connection:any,index:number) => {
                    
                    return  <div
                    key={index}
                    className="flex flex-col items-center gap-4 rounded-lg border p-4 text-center"
                >
                    <Image
                        src={connection.follower.profilePic||profileFallback}
                        alt={connection.follower.firstName}
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                    <div>
                        <h3 className="font-semibold">{connection.follower.firstName + " "+ connection.follower.lastName }</h3>
                        <p className="text-sm text-gray-500">{connection.follower.designation||"No designation"}</p>
                    </div>
                    <div className="mt-2 flex w-full gap-2">
                        <Button onClick={()=>handleAccept(connection.id)} size="sm" className="w-full rounded">Accept Connect</Button>
                        <Button onClick={()=>handleDecline(connection.id)} size="sm" variant="outline" className="w-full  border-2 border-gray-400 rounded hover:bg-gray-100 hover:text-black">Decline Connect</Button>
                    </div>
                </div>
                })}
            </div>
        </div>
    )
}



export default RequestConnect;