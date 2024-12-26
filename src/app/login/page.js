"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Navigasi halaman
import { supabase } from "../server/subapase";
import Image from 'next/image';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
      e.preventDefault();
      setError(null);

      try {
        const { user, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        router.push('/admin'); 
      } catch (error) {
        setError(error.message);
      }
    };

    return (
        <div className="h-screen w-screen relative">
            <Image
                src="miracle.jpg"
                alt="Background"
                className="absolute top-0 left-0 object-cover h-full w-full"
            />
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="border border-gray-300 bg-black bg-opacity-50 h-1/3 w-[300px] flex flex-col rounded">
                    <p className="text-bold text-center font-bold mt-4 text-white">LOGIN</p>
                    <div className="p-4">
                        <input
                            className="text-xs p-2 w-full h-8 bg-gray-100 rounded mb-2 text-black"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="text-xs p-2 w-full h-8 rounded bg-gray-100 mb-4 text-black"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="rounded w-full bg-green-500 py-2 font-bold text-xs text text-center justify-center items-center"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
