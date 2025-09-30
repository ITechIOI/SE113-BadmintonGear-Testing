"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import OrderDetailItem from "@/components/Detail";
import Image from "next/image";

export default function OrderDetailPage(id) {
  const [order, setOrder] = useState({ id: "1", total: 345, state: "Done" });
  const [details, setDetails] = useState([
    {
      id: "1",
      product: "Product 1",
      image: "/images/product1.png",
      price: 100,
      quantity: 1,
      discount: 10,
    },
    {
      id: "2",
      product: "Product 1",
      image: "/images/product1.png",
      price: 100,
      quantity: 2,
      discount: 10,
    },
  ]); // Khởi tạo state cho danh sách chi tiết dơn hàng
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
          <a className="text-black" href="/order">
            My Orders
          </a>
        </div>
      </div>
      <div className="mx-20 grid grid-cols-[20%_1fr] gap-5 mt-10">
        <div className="flex flex-col gap-3 font-medium">
          <a href="/account">Manage My Account</a>
          <div className="text-gray-500 font-normal ml-3 flex flex-col gap-2">
            <a href="/account">My Profile</a>
            <a href="address">Address Book</a>
          </div>
          <a href="/order" className="text-[#ff8200]">
            My Orders
          </a>
          <div className="text-gray-500 font-normal ml-3 flex flex-col gap-2">
            <a href="/completion">My Completions</a>
            <a href="/cancellation">My Cancellations</a>
          </div>
          <a href="/wishlist">My WishList</a>
          <a href="/promotion">My Promotions</a>
        </div>
        <div className="w-full bg-white pb-10">
          <div
            className="flex justify-between w-4/5 mx-auto mt-10"
            onClick={() => window.history.back()}
          >
            <div className="flex gap-3 w-1/2 items-center">
              <Image
                src={"/icons/backic.png"}
                alt="back"
                width={10}
                height={15}
                className="cursor-pointer object-contain"
              />
              <p className="text-xl w-4/5 ">Back</p>
            </div>
            <div>
              ID: {order ? order.id : ""} |{" "}
              <span
                className={
                  order.state === "On Delivery"
                    ? "text-[#ff8200]"
                    : order.state === "Done"
                    ? "text-[#08AC45]"
                    : "text-[#EA4335]"
                }
              >
                {order.state}
              </span>
            </div>
          </div>

          <table className="w-full mt-5 border-separate border-spacing-y-5">
            <thead>
              <tr className="bg-[#efefef] shadow-md rounded-md">
                <th className="font-medium py-3">Product</th>
                <th className="font-medium">Price</th>
                <th className="font-medium">Quantity</th>
                <th className="font-medium">Subtotal</th>
              </tr>
            </thead>
            <tbody className="w-full text-center">
              {details.map((item) => (
                <OrderDetailItem key={item.id} item={item} />
              ))}
              <tr className="bg-[#efefef] shadow-md rounded-md font-semibold">
                <td>Total</td>
                <td></td>
                <td></td>
                <td className="text-[#ff8200] py-3 ">${order.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
