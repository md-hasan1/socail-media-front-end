/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfilePage from '@/components/profile/ProfilePage';
import React from 'react'

const page = async ({ params }: { params: any }) => {
    
    const userid = await params?.userid || "";

    return (
        <div>
            <ProfilePage userid={userid} />
        </div>
    )
}

export default page

