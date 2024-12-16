import React,  { useEffect } from "react";
import Navbar from "./navbar";
// import { messaging } from "../connection";
import { requestPermission,  } from "../repo";

function Notification() {

    useEffect(() => {
        requestPermission();
        // subscribeToTopicMethod('all');
        // getTokenMethod();
    }, []);
    
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen w-screen justify-center items-center bg-gray-900">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">Notification</h2>
                </div>
            </div>
        </>
    );
}

export default Notification;