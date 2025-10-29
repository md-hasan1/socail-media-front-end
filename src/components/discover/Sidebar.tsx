/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { useGetAllUsersQuery } from "@/redux/features/api/userApi";
// import { people } from "@/utils/discover";
import { LockIcon } from "@/utils/Icons";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import fallbackImage from "@/assets/default-fallback-image.png";
import { useAppSelector } from "@/redux/hooks";
import { FollowRequest } from "../card/PostCard";
import { useState } from "react";

export default function Sidebar({ handelConnect, myConnection }: any) {
  console.log(
    myConnection,
    "fgkfsdhkjhdfkasasasasasasasasasasasasasasasasasasasasasasasj"
  );
  const { data: user } = useGetAllUsersQuery(undefined);
  //  const {data:getAllMyFavorite}=useGetAllMyFavoritesQuery(undefined)
  const [visibleUsersCount, setVisibleUsersCount] = useState(10);
  const currentData = useAppSelector((state) => state.auth.user);
  return (
    <div className="sticky top-0 left-0 w-full min-h-[600px]">
      {/* {currentData?.email && (
        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-white border shadow-sm p-4">
            <h2 className="text-xl font-semibold leading-[130%]">569</h2>
            <p className="text-sm leading-[160%] font-inter text-paragraph">
              People viewed your profile in the past 7 days
            </p>
          </div>
          <div className="flex-1 bg-white border shadow-sm p-4">
            <h2 className="text-xl font-semibold leading-[130%]">32</h2>
            <p className="text-sm leading-[160%] font-inter text-paragraph">
              Connections grow your network
            </p>
          </div>
        </div>
      )} */}
      {currentData?.email && (
        <Card className="bg-white rounded-sm">
          <CardHeader className="font-semibold border-b p-4">
            People you might know
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {user &&
                user?.data?.data
                  ?.slice(0, visibleUsersCount) // Display only the visible users
                  .map(
                    (
                      person: {
                        id: string;
                        profilePic: string;
                        name: string;
                        firstName: string;
                        lastName: string;
                        designation: string;
                        timestamp: string;
                      },
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 flex-shrink-0">
                            <Image
                              src={person.profilePic || fallbackImage}
                              alt={`${person.name}'s profile picture`}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">
                              {person.firstName + ` ` + person.lastName}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium">
                              {person.designation || "Back End Developer"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {person.timestamp}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          className="border border-gray-400 text-black px-4 py-2 rounded transition duration-150"
                          onClick={() =>
                            !myConnection?.data?.data?.pendingRequests?.some(
                              (connect: FollowRequest) =>
                                connect.followingId === person.id &&
                                connect.status === "ACCEPTED"
                            ) && handelConnect(person.id)
                          }
                        >
                          {myConnection?.data?.data?.pendingRequests?.some(
                            (connect: FollowRequest) =>
                              connect.followingId === person.id &&
                              connect.status === "PENDING"
                          ) ? (
                            "Cancel Connect"
                          ) : myConnection?.data?.data?.pendingRequests?.some(
                              (connect: FollowRequest) =>
                                connect.followingId === person.id &&
                                connect.status === "ACCEPTED"
                            ) ? (
                            <p className="text-black">Connected</p>
                          ) : (
                            "+ Connect"
                          )}
                        </Button>
                      </div>
                    )
                  )}
            </div>
          </CardContent>
          {visibleUsersCount < user?.data?.data?.length && ( // Show "Show More" button if more users are available
            <CardFooter className="p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-between text-sm font-medium"
                onClick={() => setVisibleUsersCount(visibleUsersCount + 20)} // Increase visible users by 20
              >
                Show more
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
      {!currentData?.email && (
        <div className="absolute size-full bg-gray-100/60 backdrop-blur-md grid place-items-center">
          <div className="flex flex-col justify-center items-center">
            <LockIcon />
            <p className="text-2xl font-semibold leading-[130%] text-center mt-4 mb-6">
              Unlock the feature <br /> after Log in
            </p>
            <div className="flex items-center gap-6">
              <Link href={"/auth/register"} className={buttonVariants()}>
                Register
              </Link>
              <Link
                href={"/auth/login"}
                className={buttonVariants({ variant: "outline" })}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
