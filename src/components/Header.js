"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getProductByImage } from "@/api/productApi";

const Header = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [user, setUser] = useState(null); // State để lưu thông tin người dùng
  const router = useRouter();
  const fileInputRef = useRef();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      localStorage.setItem("searchProduct", searchValue);
      setTimeout(() => {
        window.location.href = "/productlist";
      }, 50);
    }
  };

  // Kiểm tra cookie khi component được mount
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("user_profile"));
    if (profile) {
      setUser(profile);
    }
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("limit", 5);
      const response = await getProductByImage(formData);
      if (response && response.length > 0) {
        localStorage.setItem("productByImage", JSON.stringify(response));
      }
      router.push("/productlist");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Xóa token khỏi localStorage
    localStorage.removeItem("user_profile"); // Xóa thông tin người dùng khỏi localStorage
    Cookies.remove("role"); // Xóa cookie roles
    Cookies.remove("access_token"); // Xóa cookie access_token
    localStorage.removeItem("password"); // Xóa mật khẩu khỏi localStorage
    setUser(null); // Cập nhật state người dùng
    router.push("/"); // Chuyển hướng đến trang đăng nhập
  };

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
    <header className="fixed top-0 left-0 w-full bg-[#F5F5F5] z-50">
      <div className="flex justify-between items-center w-full p-4 ml-5">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          id="logo"
          onClick={hancleLogoClick}
        >
          <Image src="/images/logo.ico" alt="logo" width={50} height={50} />
          <h1 className="ml-2 text-2xl font-montserrat font-bold">
            BadmintonGear
          </h1>
        </div>

        {/* Navigation */}
        <div>
          <nav>
            <ul
              className="flex gap-4 text-lg font-montserrat font-bold text-[#737373] ml-auto"
              id="nav"
            >
              <li>
                <a className="hover:text-[#252B42]" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-[#252B42]" href="/productlist">
                  Product
                </a>
              </li>
              <li>
                <a className="hover:text-[#252B42]" href="/contact">
                  Contact
                </a>
              </li>
              <li>
                <a className="hover:text-[#252B42]" href="/about">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Account */}
        <div className={`flex items-center gap-5 mr-9 `} id="account">
          <div
            className={`flex items-center gap-2 rounded-md ${
              searchVisible ? "bg-white" : "bg-[#f5f5f5]"
            }`}
          >
            <input
              type="text"
              placeholder="What are you looking for?"
              className={`w-64 p-2 outline-none ${
                searchVisible ? "visible" : "invisible"
              }`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />

            <button
              onClick={visibleSearchBar}
              className="flex items-center justify-center cursor-pointer pr-4"
            >
              <Image
                src="/icons/searchic.png"
                alt="search"
                height={25}
                width={25}
              />
            </button>
          </div>
          <button
            className="cursor-pointer"
            onClick={() => fileInputRef.current.click()}
            title="Upload image"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8C11.0111 8 10.0444 8.29325 9.22216 8.84265C8.39991 9.39206 7.75905 10.173 7.38061 11.0866C7.00217 12.0002 6.90316 13.0055 7.09608 13.9755C7.28901 14.9454 7.76521 15.8363 8.46448 16.5355C9.16374 17.2348 10.0547 17.711 11.0246 17.9039C11.9945 18.0969 12.9998 17.9978 13.9134 17.6194C14.8271 17.241 15.608 16.6001 16.1574 15.7779C16.7068 14.9556 17 13.9889 17 13C17 11.6739 16.4732 10.4021 15.5355 9.46447C14.5979 8.52679 13.3261 8 12 8ZM12 16C11.4067 16 10.8266 15.8241 10.3333 15.4944C9.83995 15.1648 9.45543 14.6962 9.22837 14.1481C9.00131 13.5999 8.9419 12.9967 9.05765 12.4147C9.17341 11.8328 9.45913 11.2982 9.87869 10.8787C10.2982 10.4591 10.8328 10.1734 11.4147 10.0576C11.9967 9.94189 12.5999 10.0013 13.1481 10.2284C13.6962 10.4554 14.1648 10.8399 14.4944 11.3333C14.8241 11.8266 15 12.4067 15 13C15 13.7957 14.6839 14.5587 14.1213 15.1213C13.5587 15.6839 12.7957 16 12 16ZM21.14 6.1C20.866 5.80667 20.5347 5.57276 20.1666 5.41279C19.7985 5.25281 19.4014 5.17017 19 5.17H17.86C17.7229 5.16956 17.5873 5.14093 17.4617 5.08588C17.3362 5.03083 17.2232 4.95054 17.13 4.85L15.73 3.37C15.6359 3.27128 15.5226 3.19285 15.3971 3.13954C15.2715 3.08623 15.1364 3.05916 15 3.06H9.00001C8.86362 3.05916 8.7285 3.08623 8.60296 3.13954C8.47742 3.19285 8.36412 3.27128 8.27001 3.37L6.87001 4.85C6.77677 4.95054 6.66385 5.03083 6.53827 5.08588C6.41269 5.14093 6.27713 5.16956 6.14001 5.17H5.00001C4.59863 5.17017 4.20156 5.25281 3.83344 5.41279C3.46532 5.57276 3.13399 5.80667 2.86001 6.1C2.30275 6.68845 1.9946 7.46958 2.00001 8.28V18.83C1.99718 19.637 2.30515 20.4141 2.86001 21C3.13159 21.2971 3.46223 21.5341 3.83074 21.696C4.19925 21.8579 4.59751 21.941 5.00001 21.94H19C19.4025 21.941 19.8008 21.8579 20.1693 21.696C20.5378 21.5341 20.8684 21.2971 21.14 21C21.6949 20.4141 22.0028 19.637 22 18.83V8.28C22.0054 7.46958 21.6973 6.68845 21.14 6.1ZM20 18.83C20.0053 19.1299 19.8942 19.4202 19.69 19.64C19.6022 19.7353 19.4955 19.8112 19.3767 19.8629C19.2579 19.9146 19.1296 19.9408 19 19.94H5.00001C4.87044 19.9408 4.74214 19.9146 4.62332 19.8629C4.50449 19.8112 4.39778 19.7353 4.31001 19.64C4.10583 19.4202 3.99472 19.1299 4.00001 18.83V8.28C3.99472 7.98007 4.10583 7.68976 4.31001 7.47C4.39778 7.37469 4.50449 7.29877 4.62332 7.24711C4.74214 7.19545 4.87044 7.16918 5.00001 7.17H6.14001C6.54822 7.16988 6.9521 7.08645 7.32695 6.92482C7.70179 6.76319 8.03971 6.52676 8.32001 6.23L9.43001 5.06H14.57L15.68 6.23L16.41 5.54L15.68 6.23C15.9603 6.52676 16.2982 6.76319 16.6731 6.92482C17.0479 7.08645 17.4518 7.16988 17.86 7.17H19C19.1296 7.16918 19.2579 7.19545 19.3767 7.24711C19.4955 7.29877 19.6022 7.37469 19.69 7.47C19.8942 7.68976 20.0053 7.98007 20 8.28V18.83Z"
                fill="#FF8200"
              />
            </svg>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            className="cursor-pointer"
            onClick={() => (window.location.href = "/cart")}
          >
            <Image
              src="/icons/cartic.png"
              alt="search"
              height={25}
              width={25}
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => (window.location.href = "/wishlist")}
          >
            <Image
              src="/icons/wishlistic.png"
              alt="search"
              height={25}
              width={25}
            />
          </button>
          <div className="flex items-center gap-2 text-[#FF8200] font-montserrat font-bold">
            {user ? (
              <div className="flex items-center gap-2" onClick={visibleMennu}>
                <Image
                  src={
                    user && user.avatar
                      ? getAvatarLink(user.avatar)
                      : "/images/noavatar.png"
                  }
                  alt="account"
                  height={40}
                  width={40}
                  className="rounded-full"
                />
                <a id="account" href="/account">
                  {user.username}
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/accountic.png"
                  alt="account"
                  height={25}
                  width={25}
                />
                <a id="login" href="/login">
                  Register / Login
                </a>
              </div>
            )}
          </div>
          {menuVisible && (
            <div
              className="absolute right-8 top-15 px-5 py-5 bg-[#000000ee] rounded-md text-[#FF8200] cursor-pointer"
              onClick={visibleMennu}
            >
              <div className="mb-5 flex items-center gap-2">
                <Image
                  src="/icons/accountic.png"
                  alt="account"
                  height={25}
                  width={25}
                />
                <span>Manage My Account</span>
              </div>
              <div className="mb-5 flex items-center gap-2">
                <Image
                  src="/icons/orderic.png"
                  alt="order"
                  height={25}
                  width={25}
                />
                <span>My Orders</span>
              </div>
              <div className="flex items-center gap-2" onClick={handleLogout}>
                <Image
                  src="/icons/logoutic.png"
                  alt="logout"
                  height={25}
                  width={25}
                />
                <span>Log out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
