

import { RxAvatar } from "react-icons/rx";
import { Button } from "../../button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLogOutUserMutation } from "../../../../redux/features/api/authApi";
import { clearUser } from "../../../../redux/features/slices/authSlice";
import { useRouter } from "next/navigation";
// import { clearUser } from "@/redux/features/slices/authSlice";
// import { useLogOutUserMutation } from "@/redux/features/api/authApi";

const User = () => {
  const user = useAppSelector((state) => state.auth.user);
  const router=useRouter()
  const dispatch = useAppDispatch();
  const [ logOutMutation ] = useLogOutUserMutation()

  const handleLogOut = async () => {
    await logOutMutation("");
    dispatch(clearUser());
    router.push("/") // Redirect to home page after logout
  };

  return (
    <div className="flex items-center gap-4">
      {user ? (
        // Logged-in state
        <div className="flex items-center gap-4">

          <div className="relative">
            <Button
              onClick={handleLogOut}
              className="text-white rounded"
            >
              Logout
            </Button>
          </div>

          {/* User Avatar */}
          <Link href={`/profile/${user?.id}`} className="ml-12 flex justify-center items-center gap-4 font-bold">
            <div className="relative rounded-full border-4 border-primary flex items-center cursor-pointer">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <RxAvatar className="text-gray-600 w-6 h-6" />
              </div>
            </div>
            {/* <div className="hidden md:block text-lg text-gray-800 font-medium">
              {user?.firstName}
            </div> */}
          </Link>


        </div>
      ) : (
        // Logged-out state
        <Link className="bg-primary text-white rounded" href="/auth/login">
          <Button
            variant="link"
            className=" bg-primary text-white rounded"
          >
            <RxAvatar className="w-6 h-6 text-white" />
            <span className="text-lg font-medium">Login</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default User;
