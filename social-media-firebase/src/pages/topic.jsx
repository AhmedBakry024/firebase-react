import React,  { useEffect, useState } from "react";
import Navbar from "./navbar";
// import { messaging } from "../connection";
import { requestPermission, subscribeToTopicMethod, unsubscribeFromTopicMethod } from "../repo";
import NotificationHandler from "./notificationHandler";


function Topic() {
    const [input,setInput] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        requestPermission();
    }, []);

    const handlesub = async () => {
        let out = await subscribeToTopicMethod(input);
        setInput('');
        setMsg(out);
    }

    const handleunsub = async () => {
        let out = await unsubscribeFromTopicMethod(input);
        setInput('');
        setMsg(out);
    }
    
    return (
        <>
        <div className="h-screen">
            <Navbar />
            <NotificationHandler />
            <div className="flex min-h-screen w-screen justify-center items-center bg-gray-900">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm px-7">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">Notification</h2>
                    {/* input for the topic the user want to subscribe or unsubscribe from */}
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter Topic"
                        className="w-full bg-gray-700 text-white p-2 rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <div className="border-t space-x-4 flex justify-center items-center mt-5">
                        <button
                            onClick={() => handlesub(input)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-500 mt-4"
                        >
                            Subscribe
                        </button>
                        <button
                            onClick={() => handleunsub(input)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-500 mt-4"
                        >
                            Unsubscribe
                        </button>
                        <br/>
                    </div>
                    <div className="flex justify-center items-center mt-5">
                       <p className="text-green-400"> {msg}</p>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default Topic;