import React, { useState } from "react";
import Navbar from "./navbar";
import NotificationHandler from "./notificationHandler";
import { getNotificationData } from "../repo";

function Notification() {
    const [notificationData, setNotificationData] = useState([]);

    return (
        <>
            <Navbar />
            <NotificationHandler />
            <div className="flex min-h-screen w-screen justify-center items-center bg-gray-900">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">Notification History</h2>
                    <div className="flex justify-center">
                        <button
                            onClick={async () => {
                                const data = await getNotificationData();
                                setNotificationData(data);
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-500 mb-6"
                        >
                            Fetch Notifications
                        </button>
                    </div>
                    <div className="space-y-4">
                        {notificationData.map((data, index) => (
                            <div key={index} className="bg-gray-700 p-4 rounded-md shadow">
                                <p className="text-white" style={{whiteSpace: 'pre-wrapm', wordWrap: 'break-word'}}>
                                    <span className="font-bold">Data Payload:</span> {JSON.stringify(data.dataPayload)}
                                </p>
                                <p className="text-white">
                                    <span className="font-bold">Notification Payload:</span> {JSON.stringify(data.notificationPayload)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Notification;