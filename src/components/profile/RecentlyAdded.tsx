/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { useFollowersListQuery } from "@/redux/features/api/followApi";
import Loading from "../ui/shared/Loading";
// import { IUser } from "@/types/userDataTypes";
import { profileFallback } from "@/utils/fallBack";

export enum RequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

// Interface for Follower relationship
type User = {
  id: string; // User's unique ID
  firstName: string; // User's first name
  lastName: string; // User's last name
  profilePic: string | null; // User's profile picture (can be empty or null)
  designation: string | null; // User's designation (can be null)
};

type IConnection = {
  id: string; // Connection ID
  user: User; // The user object
};

export type ConnectionTab = "RecentlyAdded" | "RequestConnect" | "All";

function RecentlyAdded() {
  const { data: allFollowersData, isLoading: allFollowerLoading } =
    useFollowersListQuery("");

  if (allFollowerLoading) {
    return <Loading />;
  }

  const allFollowrs: IConnection[] = allFollowersData?.data?.followers;

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {allFollowrs?.length > 0 &&
          allFollowrs?.slice(0, 10)?.map((follower) => (
            <div
              key={follower?.user.id}
              className="flex flex-col items-center gap-4 rounded-lg border p-4 text-center"
            >
              <div>
                <Image
                  src={
                    (follower?.user?.profilePic as string) || profileFallback
                  }
                  alt={follower?.user?.firstName}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <div className=" size-12 flex justify-center items-center font-bold text-xl">
                {follower?.user?.firstName}
              </div>
              <div className=" flex justify-center items-center text-xl">
                {follower?.user?.designation || "No designation"}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecentlyAdded;
