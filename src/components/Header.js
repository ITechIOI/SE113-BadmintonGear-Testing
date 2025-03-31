'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Header = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [user, setUser] = useState(null); // State để lưu thông tin người dùng

    // Kiểm tra cookie khi component được mount
    useEffect(() => {
        const storedUser = Cookies.get("user"); // Lấy thông tin người dùng từ cookie
        if (storedUser) {
            setUser(storedUser); // Nếu có dữ liệu, cập nhật state `user`
        }
    }, []);

    const hancleLogoClick = () => {
        window.location.href = "/";
    };

    const visibleSearchBar = () => {
        setSearchVisible(!searchVisible);
    };

    return (
        <header>
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
                            <li><a className="hover:text-[#252B42]" href="/about">Chat</a></li>
                            <li><a className="hover:text-[#252B42]" href="/products">Contact</a></li>
                            <li><a className="hover:text-[#252B42]" href="/contact">About</a></li>
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
                    <button className="cursor-pointer">
                        <Image src="/icons/cartic.png" alt="search" height={25} width={25} />
                    </button>
                    <button className="cursor-pointer">
                        <Image src="/icons/wishlistic.png" alt="search" height={25} width={25} />
                    </button>
                    <div className="flex items-center gap-2 text-[#FF8200] font-montserrat font-bold">
                        {
                            user ? (<>
                                <Image src="/icons/accountic.png" alt="account" height={25} width={25}/>
                                <a id="account" href="/account">{user.username}</a>
                            </>):(<>
                                <Image src="/icons/accountic.png" alt="account" height={25} width={25}/>
                                <a id="login" href="/login">Register / Login</a>
                            </>)
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;