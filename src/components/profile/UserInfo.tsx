

/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";
import QrCodeModal from "./QrCodeModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsBioEditMode } from "@/redux/features/slices/authSlice";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/userDataTypes";
import { useUpdateBannerImageMutation, useUpdateProfileImageMutation, useUpdateUserInfoMutation } from "@/redux/features/api/userApi";
import { Input } from "../ui/input";

function UserInfo({ user }: { user: Partial<IUser> }) {
    const dispatch = useAppDispatch();
    const [ isShowQrcode, setIsShowQrcode ] = useState(false);
    const [ profilePic, setProfilePic ] = useState<string | null>(user?.profilePic || null);
    const [ bannerPic, setBannerPic ] = useState<string | null>(user?.bannerPic || null);
    const [ isEditMode, setIsEditMode ] = useState(false);
    const [ firstName, setFirstName ] = useState(user?.firstName || '');
    const [ lastName, setLastName ] = useState(user?.lastName || '');

    const me = useAppSelector((state) => state.auth.user);
    const isLoggedInUser = me?.id === user?.id;

    const [ profileImageUpdateMutation, { isLoading: profileImageUpdateLoading } ] = useUpdateProfileImageMutation();
    const [ bannerImageUpdateMutation, { isLoading: bannerImageUpdateLoading } ] = useUpdateBannerImageMutation();
    const [ updateUserInfoMutation, { isLoading: updateUserInfoLoading } ] = useUpdateUserInfoMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'banner') => {
        const file = e.target.files?.[ 0 ];
        if (file) {
            const formData = new FormData();
            formData.append(type === 'profile' ? 'profilePic' : 'bannerPic', file);

            if (type === 'profile') {
                setProfilePic(URL.createObjectURL(file));
                profileImageUpdateMutation(formData);
            } else if (type === 'banner') {
                setBannerPic(URL.createObjectURL(file));
                bannerImageUpdateMutation(formData);
            }
        }
    };

    const handleSave = async () => {
        try {

            await updateUserInfoMutation({ firstName, lastName });
            setIsEditMode(false);
        } catch (error) {

        }
    };

    const handleCancel = () => {
        setFirstName(user?.firstName || '');
        setLastName(user?.lastName || '');
        setIsEditMode(false);
    };

    return (
        <div className="relative container">
            <div className="h-64 w-full overflow-hidden md:h-[25rem]">
                {bannerPic ? (
                    <Image
                        src={bannerPic}
                        alt="Profile Banner"
                        width={1024}
                        height={200}
                        className="h-full w-full object-cover rounded"
                    />
                ) : (
                    <div className="h-full flex justify-center items-center w-full rounded bg-gray-500 text-7xl text-primary font-bold uppercase">
                        <span className="p-8 bg-gray-300 rounded-full">{user?.firstName?.slice(0, 1)}</span>
                    </div>
                )}
                {isLoggedInUser && (
                    <>
                        <Button
                            disabled={bannerImageUpdateLoading}
                            loading={bannerImageUpdateLoading}
                            variant="outline"
                            className="absolute top-0 rounded bg-primary text-white right-4"
                            onClick={() => document.getElementById('banner-input')?.click()}
                        >
                            <Edit className="" />
                        </Button>
                        <input
                            type="file"
                            id="banner-input"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'banner')}
                        />
                    </>
                )}
            </div>
            <QrCodeModal isOpen={isShowQrcode} onClose={() => setIsShowQrcode(false)} />
            <div className="container mx-auto px-4">
                <div className="relative -mt-16 flex flex-col items-start space-y-3 sm:flex-row sm:items-end sm:space-x-4 sm:space-y-0">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white">
                        {profilePic ? (
                            <Image
                                src={profilePic}
                                alt="Profile Picture"
                                width={128}
                                height={128}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-400 text-primary flex justify-center items-center uppercase text-7xl font-bold border-4 border-primary">
                                {user?.firstName?.slice(0, 1)}
                            </div>
                        )}
                        {isLoggedInUser && (
                            <>
                                <Button
                                    size="sm"
                                    disabled={profileImageUpdateLoading}
                                    loading={profileImageUpdateLoading}
                                    className="absolute bg-primary text-white p-2 rounded-full bottom-2 right-2"
                                    onClick={() => document.getElementById('profile-input')?.click()}
                                >
                                    <Edit />
                                </Button>
                                <input
                                    type="file"
                                    id="profile-input"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'profile')}
                                />
                            </>
                        )}
                    </div>
                    <div className="flex-1">
                        {!isEditMode ? (
                            <h1 className="text-2xl font-bold">
                                {firstName} {lastName}
                                {isLoggedInUser && (
                                    <Button
                                        variant="link"
                                        onClick={() => setIsEditMode(true)}
                                        className="text-primary ml-2"
                                    >
                                        <Edit className="inline" />
                                    </Button>
                                )}
                            </h1>
                        ) : (
                            <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4">
                                {/* Input for First Name */}
                                <div className="flex-1">
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>
                                    <Input
                                        type="text"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="mt-1 block w-full border border-primary rounded p-2"
                                    />
                                </div>
                                {/* Input for Last Name */}
                                <div className="flex-1">
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <Input
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="mt-1 block w-full border border-primary rounded p-2"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex space-x-2 mt-4">
                        {isEditMode && (
                            <>
                                <Button disabled={updateUserInfoLoading} size={"sm"} onClick={handleCancel} className="border-primary text-white rounded">
                                    Cancel
                                </Button>
                                <Button
                                    size={"sm"}
                                    variant="default"
                                    onClick={handleSave}
                                    loading={updateUserInfoLoading}
                                    disabled={updateUserInfoLoading}
                                    className="bg-primary rounded text-white"
                                >
                                    Save
                                </Button>
                            </>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <Button className="rounded" onClick={() => setIsShowQrcode(true)}>
                            Share QR
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
