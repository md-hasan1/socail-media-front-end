"use client";
import { useState } from "react";
import ConnectionTabs from "./ConnectionTabs";
import RecentlyAdded from "./RecentlyAdded";
import RequestConnect from "./RequestConnect";
import AllConnection from "./AllConnection";



export type ConnectionTab = 'RecentlyAdded' | 'RequestConnect' | 'All';

function ConnectionsContent() {
    const [ activeTab, setActiveTab ] = useState<ConnectionTab>('RecentlyAdded')

    return (
        <div>
            <div className="mb-8 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                <ConnectionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {activeTab === 'RecentlyAdded' && <RecentlyAdded />}
            {activeTab === 'RequestConnect' && <RequestConnect />}
            {activeTab === 'All' && <AllConnection />}
        </div>
    )
}



export default ConnectionsContent;