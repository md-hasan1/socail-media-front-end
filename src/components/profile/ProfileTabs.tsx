
"use client"
import { useParams } from "next/navigation";
import { Tab } from "./ProfilePage";
import { useRouter } from "next/navigation";

type ProfileTabsProps = {
    activeTab: Tab;
};

function ProfileTabs({ activeTab }: ProfileTabsProps) {
    const tabs: Tab[] = [ 'Bio', 'Media', 'Tributes', 'Connections' ];
    const params = useParams();
    const router = useRouter()

    const handleTabChange = (tab: Tab) => {
        router.push(`/profile/${params.userid}?tab=${tab}`)
    }

    return (
        <div className=" mt-8 ml-6">
            <div className="container mx-auto px-4">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`border-b-2 px-1 pb-4 pt-2 text-sm font-medium ${activeTab === tab
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default ProfileTabs;