'use client'

import { supabase } from "../server/subapase";

export default function Login() {
    
    return (
        <div className="h-screen w-screen relative">
            <img 
                src="miracle.jpg" 
                alt="Background"
                className="absolute top-0 left-0 object-cover h-full w-full"
            />
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="border border-gray-300 bg-black bg-opacity-50 h-1/3 w-[300px] flex flex-col rounded">
                <p className="text-bold text-center font-bold mt-4">LOGIN</p>
                    <div className="p-4">
                        <input className="text-xs p-2 w-full h-8 bg-gray-100 rounded mb-2 text-black"
                        placeholder="username">
                        </input>
                        <input className="text-xs p-2 w-full h-8 rounded bg-gray-100 mb-4 text-black"
                        placeholder="password">
                        </input>
                        <button className="rounded w-full bg-green-500 py-2 font-bold text-xs text text-center justify-center items-center"> Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
