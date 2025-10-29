
'use client'
import UserInfo from './UserInfo';
import ProfileTabs from './ProfileTabs';
import BioContent from './BioContent';
import MediaContent from './MediaContent';
import TributesContent from './TributesContent';
import ConnectionsContent from './ConnectionContent';
import { useSearchParams } from 'next/navigation';
import { useGetUserByIdQuery } from '@/redux/features/api/userApi';
import Loading from '../ui/shared/Loading';
import { IUser } from '@/types/userDataTypes';


export type Tab = 'Bio' | 'Media' | 'Tributes' | 'Connections';

export default function ProfilePage({ userid }: { userid: string }) {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "Bio"
    const { data: userData, isLoading: userDataLoading } = useGetUserByIdQuery(userid);

    if (userDataLoading) {
        return <Loading />
    }



    const user: Partial<IUser> = userData?.data;
    


    return (
        <div className="min-h-screen">
            <UserInfo user={user} />
            <div className=''>
                <ProfileTabs activeTab={activeTab as Tab} />
                <main className="container mx-auto px-4 py-8">
                    {activeTab === 'Bio' && <BioContent user={user as Partial<IUser>} />}
                    {activeTab === 'Media' && <MediaContent />}
                    {activeTab === 'Tributes' && <TributesContent />}
                    {activeTab === 'Connections' && <ConnectionsContent />}
                </main>
            </div>
        </div>
    )
}
