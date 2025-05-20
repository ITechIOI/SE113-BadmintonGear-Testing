'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
const Footer = () => {
    const [user, setUser] = useState(null); // State để lưu thông tin người dùng
    
        // Kiểm tra cookie khi component được mount
        useEffect(() => {
            const storedUser = Cookies.get("user"); // Lấy thông tin người dùng từ cookie
            if (storedUser) {
                setUser(storedUser); // Nếu có dữ liệu, cập nhật state `user`
            }
        }, []);
    return (
        <footer className="bg-[#FF8200] text-white py-4 mt-15 relative bottom-0 w-full">
            <div className="container flex justify-center mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 m-10">
                    {/* Cột 1 */}
                    <div>
                        <h1 className="font-bold text-2xl mb-4">BadmintonGear</h1>
                        <h3 className="font-medium text-lg mb-4">Subcribe</h3>
                        <p className="text-sm">Get 10% off your first order</p>
                        <div className="flex items-center border border-white rounded-md mt-2 ">
                            <input type="text" placeholder="Enter your email" className=" rounded-md w-full p-3 outline-none" />
                            <button>
                                <Image src="/icons/sendic.png" alt="send" height={25} width={25} className="cursor-pointer mr-4" />
                            </button>
                        </div>
                    </div>

                    {/* Cột 2 */}
                    <div>
                        <h3 className="font-medium text-lg mb-4">Support</h3>
                        <ul className="space-y-4 text-sm">
                            <li>123 Pham Van Dong, Hiep Binh Chanh, Thu Duc, Viet Nam</li>
                            <li>badminton.gear@gmail.com</li>
                            <li>0123456789</li>
                        </ul>
                    </div>

                    {/* Cột 3 */}
                    <div>
                        <h3 className="font-medium text-lg mb-4">Account</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="/account" className=" hover:underline">My Account</a></li>
                            <li><a href="/login" className={`hover:underline ${user?"hidden":""}`}>Login / Register</a></li>
                            <li><a href="/cart" className="hover:underline">Cart</a></li>
                            <li><a href="/wishlist" className="hover:underline">Wishlist</a></li>
                        </ul>
                    </div>

                    {/* Cột 4 */}
                    <div>
                        <h3 className="font-medium text-lg mb-4">Quick Link</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="" className="hover:underline">Terms of Use</a></li>
                            <li><a href="" className="hover:underline">Shipping Policy</a></li>
                            <li><a href="" className="hover:underline">Contact</a></li>

                        </ul>
                    </div>

                    {/* Cột 5 */}
                    <div>
                        <h3 className="font-medium text-lg mb-4">Follow Us</h3>
                        <ul className="flex gap-4">
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                <Image src="/icons/fbic.png" alt="fb" height={25} width={25} className="cursor-pointer" />
                            </a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                <Image src="/icons/instagramic.png" alt="ig" height={25} width={25} className="cursor-pointer" />
                            </a></li>
                            <li><a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                <Image src="/icons/xic.png" alt="x" height={25} width={25} className="cursor-pointer" />
                            </a></li>
                            <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                <Image src="/icons/linkedinic.png" alt="yt" height={25} width={25} className="cursor-pointer" />
                            </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;