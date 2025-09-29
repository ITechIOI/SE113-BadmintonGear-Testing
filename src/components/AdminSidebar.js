"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  return (
    <aside className="w-7/30 bg-white min-h-screen p-5 z-60">
      <div
        className="flex items-center gap-2 mb-10 cursor-pointer"
        id="logo"
        onClick={() => (window.location.href = "/admin/dashboard")}
      >
        <Image src={"/images/logo.ico"} alt="logo" width={40} height={40} />
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          BadmintonGear
        </h1>
      </div>
      <nav className="flex flex-col gap-4 text-lg font-[500]">
        <a
          href="/admin/dashboard"
          className={`flex gap-2 py-2 px-2 ${
            pathname === "/admin/dashboard"
              ? "bg-[#ff8200] rounded-md text-white"
              : "text-gray-600"
          } hover:bg-[#ff8200] hover:text-white transition duration-300 rounded-md`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 5.5C3 4.11929 4.11929 3 5.5 3H8.5C9.88071 3 11 4.11929 11 5.5V8.5C11 9.88071 9.88071 11 8.5 11H5.5C4.11929 11 3 9.88071 3 8.5V5.5ZM5.5 5H8.5C8.77614 5 9 5.22386 9 5.5V8.5C9 8.77614 8.77614 9 8.5 9H5.5C5.22386 9 5 8.77614 5 8.5V5.5C5 5.22386 5.22386 5 5.5 5Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13 5.5C13 4.11929 14.1193 3 15.5 3H18.5C19.8807 3 21 4.11929 21 5.5V8.5C21 9.88071 19.8807 11 18.5 11H15.5C14.1193 11 13 9.88071 13 8.5V5.5ZM15.5 5H18.5C18.7761 5 19 5.22386 19 5.5V8.5C19 8.77614 18.7761 9 18.5 9H15.5C15.2239 9 15 8.77614 15 8.5V5.5C15 5.22386 15.2239 5 15.5 5Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.5 13C14.1193 13 13 14.1193 13 15.5V18.5C13 19.8807 14.1193 21 15.5 21H18.5C19.8807 21 21 19.8807 21 18.5V15.5C21 14.1193 19.8807 13 18.5 13H15.5ZM18.5 15H15.5C15.2239 15 15 15.2239 15 15.5V18.5C15 18.7761 15.2239 19 15.5 19H18.5C18.7761 19 19 18.7761 19 18.5V15.5C19 15.2239 18.7761 15 18.5 15Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 15.5C3 14.1193 4.11929 13 5.5 13H8.5C9.88071 13 11 14.1193 11 15.5V18.5C11 19.8807 9.88071 21 8.5 21H5.5C4.11929 21 3 19.8807 3 18.5V15.5ZM5.5 15H8.5C8.77614 15 9 15.2239 9 15.5V18.5C9 18.7761 8.77614 19 8.5 19H5.5C5.22386 19 5 18.7761 5 18.5V15.5C5 15.2239 5.22386 15 5.5 15Z"
              fill="currentColor"
            />
          </svg>
          Dashboard
        </a>
        <div>
          <div
            className={`flex justify-between items-center px-2 py-2
                        ${
                          pathname.startsWith("/admin/product")
                            ? "rounded-md text-[#ff8200] bg-[#FBE3CA]"
                            : pathname === "/admin/product"
                            ? "bg-[#ff8200] rounded-md text-white"
                            : "text-gray-600"
                        } hover:bg-[#ff8200] hover:text-white transition duration-300 rounded-md *:${
              pathname.startsWith("/admin/product") ? "text-[#ff8200] " : ""
            } 
                        ${pathname === "/admin/product" ? "text-white" : ""}`}
          >
            <a href="/admin/productlist" className={`w-full flex gap-2  }`}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6H17C18.6569 6 20 7.34315 20 9V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V9C4 7.34315 5.34315 6 7 6H8ZM10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6H10ZM8 8V8.5C8 9.05228 8.44772 9.5 9 9.5C9.55228 9.5 10 9.05228 10 8.5V8H14V8.5C14 9.05228 14.4477 9.5 15 9.5C15.5523 9.5 16 9.05228 16 8.5V8H17C17.5523 8 18 8.44772 18 9V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V9C6 8.44772 6.44772 8 7 8H8Z"
                  fill="currentColor"
                />
              </svg>
              Products
            </a>
            <svg
              onClick={toggleProductDropdown}
              className={`transform transition-transform duration-300
                                ${
                                  isProductDropdownOpen
                                    ? "rotate-180"
                                    : "rotate-0"
                                } `}
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.1481 7.60198C16.7901 7.244 16.2097 7.244 15.8517 7.60198L10.9999 12.4538L6.1481 7.60198C5.79012 7.244 5.20972 7.244 4.85174 7.60198C4.49376 7.95996 4.49376 8.54036 4.85174 8.89834L10.6758 14.7224C10.8548 14.9014 11.145 14.9014 11.324 14.7224L17.1481 8.89834C17.5061 8.54036 17.5061 7.95996 17.1481 7.60198Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {isProductDropdownOpen && (
            <div className="ml-6 mt-2 flex flex-col gap-2">
              <a
                href="/admin/productlist"
                className={`pl-2 py-2 ${
                  pathname === "/admin/productlist"
                    ? "bg-[#ff8200] rounded-md text-white"
                    : "text-gray-600"
                }`}
              >
                Product List
              </a>
              <a
                href="/admin/productcategory"
                className={`pl-2 py-2 ${
                  pathname === "/admin/productcategory"
                    ? "bg-[#ff8200] rounded-md text-white"
                    : "text-gray-600"
                }`}
              >
                Categories
              </a>
            </div>
          )}
        </div>

        <a
          href="/admin/promotion"
          className={`flex gap-2 py-2 px-2 ${
            pathname === "/admin/promotion"
              ? "bg-[#ff8200] rounded-md text-white"
              : "text-gray-600"
          } hover:bg-[#ff8200] hover:text-white transition duration-300 rounded-md items-center`}
        >
          <svg
            width="29"
            height="21"
            viewBox="0 0 29 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.948 16.9652C27.4844 16.9652 27.0398 16.781 26.712 16.4532C26.3842 16.1254 26.2 15.6807 26.2 15.2171C26.2 14.7535 26.3842 14.3089 26.712 13.9811C27.0398 13.6533 27.4844 13.4691 27.948 13.4691H28V9.05687H27.948C27.502 9.02969 27.0832 8.83335 26.7769 8.50791C26.4707 8.18247 26.3002 7.75245 26.3002 7.3056C26.3002 6.85875 26.4707 6.42873 26.7769 6.10329C27.0832 5.77785 27.502 5.58151 27.948 5.55433H28V1.34998H1V5.55433C1.44433 5.58146 1.86158 5.77708 2.16661 6.10131C2.47165 6.42553 2.64148 6.85393 2.64148 7.29909C2.64148 7.74425 2.47165 8.17266 2.16661 8.49688C1.86158 8.82111 1.44433 9.01673 1 9.04386V13.4691C1.44433 13.4963 1.86158 13.6919 2.16661 14.0161C2.47165 14.3403 2.64148 14.7687 2.64148 15.2139C2.64148 15.6591 2.47165 16.0875 2.16661 16.4117C1.86158 16.7359 1.44433 16.9315 1 16.9587V19.9673H28V16.9652H27.948Z"
              stroke="currentColor"
              strokeWidth="1.29964"
              strokeLinejoin="round"
            />
            <path
              d="M8.70036 9.7976C8.19263 9.18453 7.91479 8.41349 7.91479 7.61747C7.91479 6.82146 8.19263 6.05041 8.70036 5.43734C9.26862 4.91074 10.0148 4.61816 10.7895 4.61816C11.5643 4.61816 12.3104 4.91074 12.8787 5.43734C13.3864 6.05041 13.6643 6.82146 13.6643 7.61747C13.6643 8.41349 13.3864 9.18453 12.8787 9.7976C12.3126 10.3285 11.5656 10.624 10.7895 10.624C10.0134 10.624 9.26647 10.3285 8.70036 9.7976ZM10.7018 16.3543C10.3444 16.3543 10.2079 16.1074 10.3964 15.802L13.3661 11.0128C13.6019 10.645 13.8188 10.2655 14.0159 9.87558L16.0693 5.50231C16.1609 5.3327 16.2944 5.18935 16.4571 5.08586C16.6197 4.98236 16.8061 4.92216 16.9985 4.91099H18.5451C18.9025 4.91099 19.0325 5.1579 18.844 5.45681L15.6859 10.3825C15.4582 10.7503 15.2542 11.1323 15.0751 11.5261L13.2036 15.763C13.1156 15.9328 12.9848 16.0767 12.8241 16.1804C12.6634 16.2841 12.4783 16.3441 12.2874 16.3543H10.7018ZM11.3061 8.45898C11.4442 8.19961 11.5093 7.90767 11.4946 7.61422C11.5124 7.31712 11.4495 7.02074 11.3126 6.75645C11.2604 6.66457 11.1849 6.58818 11.0935 6.53502C11.0022 6.48186 10.8984 6.45383 10.7928 6.45383C10.6871 6.45383 10.5833 6.48186 10.492 6.53502C10.4007 6.58818 10.3251 6.66457 10.2729 6.75645C10.1401 7.02433 10.0796 7.32227 10.0975 7.62072C10.0837 7.91409 10.1488 8.20578 10.2859 8.46548C10.3347 8.55951 10.4084 8.63836 10.4989 8.69338C10.5894 8.7484 10.6933 8.7775 10.7993 8.7775C10.9052 8.7775 11.0091 8.7484 11.0996 8.69338C11.1902 8.63836 11.2638 8.55951 11.3126 8.46548L11.3061 8.45898ZM16.1928 15.8539C15.6845 15.2398 15.4065 14.4677 15.4065 13.6705C15.4065 12.8734 15.6845 12.1013 16.1928 11.4872C16.76 10.961 17.505 10.6686 18.2787 10.6686C19.0523 10.6686 19.7974 10.961 20.3646 11.4872C20.8693 12.1029 21.1452 12.8744 21.1452 13.6705C21.1452 14.4667 20.8693 15.2382 20.3646 15.8539C19.7974 16.3801 19.0523 16.6725 18.2787 16.6725C17.505 16.6725 16.76 16.3801 16.1928 15.8539V15.8539ZM18.7921 14.5088C18.9317 14.25 18.9969 13.9576 18.9805 13.664C18.999 13.3669 18.9361 13.0703 18.7986 12.8063C18.7497 12.7132 18.6757 12.6358 18.5849 12.583C18.4941 12.5301 18.3902 12.5039 18.2852 12.5074C18.1788 12.5056 18.074 12.5331 17.9823 12.587C17.8906 12.6409 17.8155 12.719 17.7653 12.8128C17.6258 13.0739 17.5606 13.3684 17.5769 13.664C17.5631 13.9574 17.6282 14.2491 17.7653 14.5088C17.8157 14.601 17.8899 14.678 17.9802 14.7316C18.0705 14.7852 18.1737 14.8135 18.2787 14.8135C18.3837 14.8135 18.4868 14.7852 18.5772 14.7316C18.6675 14.678 18.7417 14.601 18.7921 14.5088Z"
              fill="currentColor"
            />
          </svg>
          Promotions
        </a>
        <a
          href="/admin/flashsale"
          className={`flex gap-2 py-2 px-2 ${
            pathname === "/admin/flashsale"
              ? "bg-[#ff8200] rounded-md text-white"
              : "text-gray-600"
          } hover:bg-[#ff8200] hover:text-white transition duration-300 rounded-md`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 2L10 11H14L11 22L20 9H15L18 2H13Z"
              fill="currentColor"
            />
          </svg>
          Flash Sales
        </a>
        <a
          href="/admin/order"
          className={`flex gap-2 py-2 px-2 ${
            pathname === "/admin/order"
              ? "bg-[#ff8200] rounded-md text-white"
              : "text-gray-600"
          } hover:bg-[#ff8200] hover:text-white transition duration-300 rounded-md`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.638 4.12231C6.45691 3.18063 5.63292 2.5 4.67398 2.5H3C2.44772 2.5 2 2.94772 2 3.5C2 4.05228 2.44772 4.5 3 4.5L4.67398 4.5L6.55002 14.2554C6.91221 16.1388 8.56018 17.5 10.478 17.5H16.6873C18.5044 17.5 20.0932 16.2752 20.5556 14.518L21.8068 9.76348C22.3074 7.86122 20.8726 6 18.9056 6H6.99909L6.638 4.12231ZM7.38371 8L8.51403 13.8777C8.69513 14.8194 9.51911 15.5 10.478 15.5H16.6873C17.5959 15.5 18.3903 14.8876 18.6215 14.009L19.8727 9.25449C20.0395 8.62041 19.5613 8 18.9056 8H7.38371Z"
              fill="currentColor"
            />
            <path
              d="M8.74997 21.5C7.92154 21.5 7.24997 20.8284 7.24997 20C7.24997 19.1716 7.92154 18.5 8.74997 18.5C9.5784 18.5 10.25 19.1716 10.25 20C10.25 20.8284 9.5784 21.5 8.74997 21.5Z"
              fill="currentColor"
            />
            <path
              d="M17.5 21.5C16.6715 21.5 16 20.8284 16 20C16 19.1716 16.6715 18.5 17.5 18.5C18.3284 18.5 19 19.1716 19 20C19 20.8284 18.3284 21.5 17.5 21.5Z"
              fill="currentColor"
            />
          </svg>
          Orders
        </a>
        <a
          href="/admin/customer"
          className={`flex gap-2 py-2 px-2 ${
            pathname === "/admin/customer"
              ? "bg-[#ff8200] rounded-md text-white"
              : "text-gray-600"
          } hover:bg-[#ff8200] hover:text-white transition duration-300 rounded-md`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.5 6.5C14.5 8.98528 12.4853 11 10 11C7.51472 11 5.5 8.98528 5.5 6.5C5.5 4.01472 7.51472 2 10 2C12.4853 2 14.5 4.01472 14.5 6.5ZM12.5 6.5C12.5 7.88071 11.3807 9 10 9C8.61929 9 7.5 7.88071 7.5 6.5C7.5 5.11929 8.61929 4 10 4C11.3807 4 12.5 5.11929 12.5 6.5Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 18.9231C2 15.0996 5.09957 12 8.92308 12H11.0769C14.9004 12 18 15.0996 18 18.9231C18 20.0701 17.0701 21 15.9231 21H4.07692C2.92987 21 2 20.0701 2 18.9231ZM4 18.9231C4 16.2041 6.20414 14 8.92308 14H11.0769C13.7959 14 16 16.2041 16 18.9231C16 18.9656 15.9656 19 15.9231 19H4.07692C4.03444 19 4 18.9656 4 18.9231Z"
              fill="currentColor"
            />
            <path
              d="M18.9198 20.0973C18.8164 20.4981 19.0774 21 19.4913 21H19.9231C21.0701 21 22 20.0701 22 18.9231C22 15.0996 18.9004 12 15.0769 12C14.9347 12 14.8829 12.1975 15.0036 12.2727C15.9494 12.8614 16.7705 13.6314 17.4182 14.5343C17.4621 14.5955 17.5187 14.6466 17.5835 14.685C19.0301 15.5424 20 17.1195 20 18.9231C20 18.9656 19.9656 19 19.9231 19H19.4494C19.1985 19 19 19.2106 19 19.4615C19 19.6811 18.9721 19.8941 18.9198 20.0973Z"
              fill="currentColor"
            />
            <path
              d="M14.919 8.96308C14.974 8.85341 15.0645 8.76601 15.1729 8.70836C15.9624 8.28814 16.5 7.45685 16.5 6.5C16.5 5.54315 15.9624 4.71186 15.1729 4.29164C15.0645 4.23399 14.974 4.14659 14.919 4.03692C14.6396 3.48001 14.2684 2.97712 13.8252 2.5481C13.623 2.35231 13.7185 2 14 2C16.4853 2 18.5 4.01472 18.5 6.5C18.5 8.98528 16.4853 11 14 11C13.7185 11 13.623 10.6477 13.8252 10.4519C14.2684 10.0229 14.6396 9.51999 14.919 8.96308Z"
              fill="currentColor"
            />
          </svg>
          Customers
        </a>
      </nav>
    </aside>
  );
}
