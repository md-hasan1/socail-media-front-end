
import { ConnectionTab } from "./ConnectionContent";

type ConnectionTabsProps = {
    activeTab: ConnectionTab;
    setActiveTab: (tab: ConnectionTab) => void;
};

function ConnectionTabs({ activeTab, setActiveTab }: ConnectionTabsProps) {
    const tabs: ConnectionTab[] = [ 'RecentlyAdded', 'RequestConnect', 'All' ];

    return (
        <div className=" w-full">
            <div className="container px-4">
                <nav className=" flex space-x-8 justify-end" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
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

export default ConnectionTabs;