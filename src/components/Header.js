'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie"; // Sử dụng js-cookie để quản lý cookie

const Header = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [user, setUser] = useState(null); // State để lưu thông tin người dùng
    const router = useRouter();

    // Kiểm tra cookie khi component được mount
    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('user_profile'));
        if (profile) {
            setUser(profile);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Xóa token khỏi localStorage
        localStorage.removeItem('user_profile'); // Xóa thông tin người dùng khỏi localStorage
        Cookies.remove('role'); // Xóa cookie roles
        Cookies.remove('access_token'); // Xóa cookie access_token
        localStorage.removeItem('password'); // Xóa mật khẩu khỏi localStorage
        setUser(null); // Cập nhật state người dùng
        router.push('/'); // Chuyển hướng đến trang đăng nhập

    }

    const hancleLogoClick = () => {
        window.location.href = "/";
    };

    const visibleSearchBar = () => {
        setSearchVisible(!searchVisible);
    };

    function getAvatarLink(avatar) {
        if (!avatar) return "";
        return avatar.split(" ")[0];
    }

    const visibleMennu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <header className="">
            <div className="flex justify-between items-center w-full p-4 ml-5">
                {/* Logo */}
                <div className="flex items-center cursor-pointer" id="logo" onClick={hancleLogoClick}>
                    <Image src="/images/logo.ico" alt="logo" width={50} height={50} />
                    <h1 className="ml-2 text-2xl font-montserrat font-bold">BadmintonGear</h1>
                </div>

                {/* Navigation */}
                <div>
                    <nav>
                        <ul className="flex gap-4 text-lg font-montserrat font-bold text-[#737373] ml-auto" id="nav">
                            <li><a className="hover:text-[#252B42]" href="/">Home</a></li>
                            <li><a className="hover:text-[#252B42]" href="/chat">Chat</a></li>
                            <li><a className="hover:text-[#252B42]" href="/contact">Contact</a></li>
                            <li><a className="hover:text-[#252B42]" href="/about">About</a></li>
                        </ul>
                    </nav>
                </div>

                {/* Account */}
                <div className={`flex items-center gap-5 mr-9 `} id="account">
                    <div className={`flex items-center gap-2 rounded-md ${searchVisible ? "bg-white" : "bg-[#f5f5f5]"}`}>
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            className={`w-64 p-2 outline-none ${searchVisible ? "visible" : "invisible"
                                }`}
                        />

                        <button onClick={visibleSearchBar} className="flex items-center justify-center cursor-pointer pr-4">
                            <Image src="/icons/searchic.png" alt="search" height={25} width={25} />
                        </button>
                    </div>
                    <button className="cursor-pointer" onClick={() => window.location.href = "/cart"}>
                        <Image src="/icons/cartic.png" alt="search" height={25} width={25} />
                    </button>
                    <button className="cursor-pointer" onClick={() => window.location.href = "/wishlist"}>

                        <Image src="/icons/wishlistic.png" alt="search" height={25} width={25} />
                    </button>
                    <div className="flex items-center gap-2 text-[#FF8200] font-montserrat font-bold">
                        {
                            user ? (<div className="flex items-center gap-2"
                                onClick={visibleMennu}>
                                <Image src={user && user.avatar ? getAvatarLink(user.avatar) : "/images/noavatar.png"} alt="account" height={25} width={25} />
                                <a id="account" href="/account">{user.username}</a>
                            </div>) : (<div className="flex items-center gap-2">
                                <Image src="/icons/accountic.png" alt="account" height={25} width={25} />
                                <a id="login" href="/login">Register / Login</a>
                            </div>)
                        }
                    </div>
                    {menuVisible && (
                        <div className="absolute right-8 top-15 px-5 py-5 bg-[#000000ee] rounded-md text-[#FF8200] cursor-pointer" onClick={visibleMennu}>
                            <div className="mb-5 flex items-center gap-2">
                                <Image src="/icons/accountic.png" alt="account" height={25} width={25} />
                                <span>Manage My Account</span>
                            </div>
                            <div className="mb-5 flex items-center gap-2">
                                <Image src="/icons/orderic.png" alt="order" height={25} width={25} />
                                <span>My Orders</span>
                            </div>
                            <div className="flex items-center gap-2"
                                onClick={handleLogout}>
                                <Image src="/icons/logoutic.png" alt="logout" height={25} width={25} />
                                <span>Log out</span>
                            </div>
                        </div>)}
                </div>
            </div>
        </header>
    );
};

export default Header;