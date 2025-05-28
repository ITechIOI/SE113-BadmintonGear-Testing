"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { login } from "@/api/authApi";
import Cookies from "js-cookie";
import { getProfile } from "@/api/userApi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Login() {
    const [error, setError] = useState(null); // State để lưu thông báo lỗi
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await login(username, password);
            if (response.access_token) {
                // Handle successful login, e.g., redirect to dashboard
                localStorage.setItem('access_token', response.access_token);
                const profileResponse = await getProfile();
                localStorage.setItem('user_profile', JSON.stringify(profileResponse));
                Cookies.set('role', profileResponse.roles, { expires: 1 }); // Set roles in cookies
                Cookies.set('access_token', response.access_token, { expires: 1 }); // Set access token in cookies
                localStorage.setItem('password', password); // Store password in localStorage
                if (profileResponse.roles === "admin") {
                    router.push('/admin/dashboard');
                }
                else {
                    router.push('/');
                }
            } else {
                // Handle login failure
                setError("Email or password is incorrect");
            }
        }
        catch (err) {
            console.error("Login error:", err);
            setError("An error occurred during login. Please try again.");
        }
    };
    return (
        <div className="w-full h-full">
            <Header />
            <div className="flex items-center  m-auto my-20 h-auto w-fit bg-[#FFFFF6] rounded-xl text-montserrat">
                <Image src="/images/loginimage.jpg" alt="image" width={350} height={400} className="rounded-xl" />
                <div className="ml-10 mr-10 w-fit gap-5 ">
                    <form id="login-form" className="w-fit">
                        <h1 className="font-montserrat font-bold text-3xl w-fit">Log in to BadmintonGear</h1>
                        <p className="font-montserrat text-xs mt-3 w-fit">Welcome back! Please enter your details.</p>
                        <input id="username" type="text" placeholder="Username or email" className="w-4/5 p-2 mt-5 mr-5 border-b border-gray-400 focus:border-[#FF8200] outline-none" required />
                        <input id="password" type="password" placeholder="Password" className="w-4/5 p-2 mt-5 mr-5 border-b border-gray-400 focus:border-[#FF8200] outline-none" required />
                        {error && (<div className="text-red-500 text-sm mt-5">{error}</div>)}
                        <div className="flex items-center mt-10 w-4/5 relative">
                            <button type="submit" className="pl-10 pr-10 pt-2 pb-2 rounded-xs bg-[#FF8200] text-white font-montserrat"
                                onClick={handleLogin}>
                                Log in
                            </button>
                            <a className="absolute right-0 text-[#ff8200] text-xs">Forget Password?</a>
                        </div>
                    </form>
                    <div className="text-center mt-10 w-3/4">Don't you have an account?
                        <a href="/register" className="text-[#ff8200] font-bold ml-2">Register</a>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}
