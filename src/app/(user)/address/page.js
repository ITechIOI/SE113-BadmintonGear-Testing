"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AddressItem from "@/components/AddressItem";

export default function AddressPage() {
  const [address, setAddress] = useState([
    {
      id: "1",
      name: "John Doe",
      address: "123 Main St",
      phone: "123-456-7890",
      email: "user@gmail.com",
    },
    {
      id: "2",
      name: "Jane Smith",
      address: "456 Elm St",
      phone: "987-654-3210",
      email: "user#gmail.com",
    },
  ]); // Khởi tạo state cho danh sách địa chỉ
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = Cookies.get("user"); // Lấy thông tin người dùng từ cookie
    if (storedUser) {
      setUser(storedUser); // Nếu có dữ liệu, cập nhật state `user`
    }
  }, []);
  return (
    <div>
      <div className="flex justify-between mr-20 mt-10 ">
        <div id="roadmap" className="flex items-center ml-15">
          <a className="text-gray-500" href="/">
            Home
          </a>
          <label className="ml-3 mr-3">/</label>
          <a className="text-black" href="/cart">
            Cart
          </a>
        </div>
        <div>
          Welcome!{" "}
          <span className="text-[#ff8200]">
            {user ? `${user.username} !` : ""}
          </span>
        </div>
      </div>
      <div className="mx-20 grid grid-cols-[20%_1fr] gap-5 mt-10">
        <div className="flex flex-col gap-3 font-medium">
          <a href="/account">Manage My Account</a>
          <div className="text-gray-500 font-normal ml-3 flex flex-col gap-2">
            <a href="/account">My Profile</a>
            <a href="address" className="text-[#ff8200]">
              Address Book
            </a>
          </div>
          <a href="/order">My Orders</a>
          <div className="text-gray-500 font-normal ml-3 flex flex-col gap-2">
            <a href="/completion">My Completions</a>
            <a href="/cancellation">My Cancellations</a>
          </div>
          <a href="/wishlist">My WishList</a>
          <a href="/promotion">My Promotions</a>
        </div>
        <div className="w-full bg-white pb-10">
          <p className="text-[#ff8200] text-xl mt-10 w-4/5 mx-auto">
            Address Book
          </p>

          <table className="w-full mt-5 border-separate border-spacing-y-5">
            <thead>
              <tr className="bg-[#efefef] shadow-md rounded-md">
                <th className="font-medium py-3">Name</th>
                <th className="font-medium">Address</th>
                <th className="font-medium">Phone</th>
                <th className="font-medium">Email</th>
                <th className="font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="w-full text-center">
              {address.map((item) => (
                <AddressItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-5 items-center mt-5 mr-5">
            <button className="px-4 py-2 rounded-xs">Cancel</button>
            <button className="bg-[#ff8200] text-white px-4 py-2 rounded-xs">
              Add New Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
