"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  updateUser,
  getProfile,
  uploadImage,
  deleteImage,
} from "@/api/userApi";

export default function Account() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [updatedUser, setUpdatedUser] = useState(null);
  const [password, setPassword] = useState("");
  const [imageMenu, setImageMenu] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef();
  const menuRef = useRef();

  const handleUploadAvatar = async () => {
    setImageMenu(false); // Ẩn menu khi click vào upload
    fileInputRef.current.click();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setImageMenu(false);
      }
    }
    if (imageMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [imageMenu]);

  const avatarClick = () => {
    if (user && user.avatar) {
      // Nếu đã có avatar, hiển thị menu để thay đổi hoặc xóa
      setImageMenu(!imageMenu);
    } else {
      handleUploadAvatar();
    }
  };

  const getPublicIdFromAvatar = (avatarUrl) => {
    if (!avatarUrl) return "";
    const parts = avatarUrl.split(" ");
    return parts[parts.length - 1];
  };

  function getAvatarLink(avatar) {
    if (!avatar) return "";
    return avatar.split(" ")[0];
  }

  const handleDeleteImage = async () => {
    const publicId = getPublicIdFromAvatar(user.avatar);
    if (publicId) {
      try {
        const deleteData = new FormData();
        deleteData.append("publicId", publicId);
        deleteData.append("type", "image");

        // Thêm return ở đây
        return await deleteImage(deleteData);
      } catch (err) {
        console.error("Error deleting image:", err);
        return null;
      }
    }
    return null;
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // Hiển thị preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function isValidEmail(email) {
    // Regex kiểm tra định dạng email cơ bản
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function splitFullName(fullName) {
    if (!fullName) return { firstName: "", lastName: "" };
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: "" };
    }
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");
    return { firstName, lastName };
  }

  const checkValidInput = () => {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const { firstName, lastName } = splitFullName(name);
    const phonenumber = document.getElementById("phonenumber").value;
    setUpdatedUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phonenumber,
    });
    if (name === "" || phonenumber === "") {
      setError("Please fill in all fields");
    } else if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  const handleChangePassword = async () => {
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const password = document.getElementById("password").value;
    setPassword(newPassword);
    if (password !== "" && password !== localStorage.getItem("password")) {
      setError("Current password is incorrect");
    } else if (newPassword.length < 6 && newPassword !== "") {
      setError("New password must be at least 6 characters long");
    } else if (confirmPassword !== newPassword) {
      setError("Confirm password does not match new password");
    } else {
      setError("");
      setUpdatedUser({
        ...updatedUser,
        password: newPassword, // Cập nhật mật khẩu mới
      });
    }
  };

  const handleCancel = () => {
    setUser(user);
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("password").value = "";
    setUpdatedUser(null);
    setError("");
  };

  const handleSaveChanges = async () => {
    const newPassword = document.getElementById("newPassword").value;
    let response = null;
    let uploadRes = null;

    if (avatarPreview && fileInputRef.current.files[0]) {
      try {
        if (user && user.avatar) {
          await handleDeleteImage();
        }
        const file = fileInputRef.current.files[0];
        uploadRes = await uploadImage(file);
        setUpdatedUser({ ...updatedUser, avatar: uploadRes });
      } catch (err) {
        alert("Failed to upload avatar. Please try again.");
        return;
      }
    }

    if (
      updatedUser !== null &&
      (updatedUser.firstName + " " + updatedUser.lastName !== user.name ||
        updatedUser.email !== user.email ||
        updatedUser.phone !== user.phone ||
        uploadRes !== user.avatar)
    ) {
      try {
        response = await updateUser(updatedUser);
        if (response) {
          const profile = await getProfile();
          localStorage.setItem("password", newPassword); // Lưu mật khẩu mới vào localStorage
          setUser(profile);
          document.getElementById("newPassword").value = "";
          document.getElementById("confirmPassword").value = "";
          document.getElementById("password").value = "";
          setUpdatedUser(null);
          localStorage.setItem("user_profile", JSON.stringify(profile)); // Cập nhật dữ liệu người dùng trong localStorage
          window.location.reload(); // Tải lại trang để cập nhật thông tin người dùng
        } else {
          alert("Failed to update user information. Please try again.");
          console.error("Error updating user:", response);
          setError("Failed to update user information. Please try again.");
          return;
        }
      } catch (err) {
        alert("Failed to update user information. Please try again.");
        console.error("Error updating user:", err);
        setError("Failed to update user information. Please try again.");
        return;
      }
    }
  };

  const handleRemoveAvatar = async (e) => {
    const res = await handleDeleteImage();
    if (res === "Image deleted successfully") {
      setAvatarPreview(null); // Xóa preview
      setImageMenu(false); // Ẩn menu
      const updated = { avatar: "" };
      console.log(updated);
      const response = await updateUser(updated);
      if (response) {
        setUser({ ...user, avatar: "" });
        localStorage.setItem(
          "user_profile",
          JSON.stringify({ ...user, avatar: "" })
        );
        window.location.reload();
      }
    } else {
      alert("Failed to remove avatar");
    }
    setImageMenu(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user_profile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <div>
      <div className="mx-20 grid grid-cols-[20%_1fr] gap-5 mt-10">
        <div className="flex flex-col gap-3 font-medium">
          <a href="/account">Manage My Account</a>
          <div className="text-gray-500 font-normal ml-3 flex flex-col gap-2">
            <a href="/account" className="text-[#ff8200]">
              My Profile
            </a>
            <a href="address">Address Book</a>
          </div>
          <a href="/order">My Orders</a>
          <div className="text-gray-500 font-normal ml-3 flex flex-col gap-2">
            <a href="/completion">My Completions</a>
            <a href="/cancellation">My Cancellations</a>
          </div>
          <a href="/wishlist">My WishList</a>
          <a href="/promotion">My Promotions</a>
        </div>
        <div>
          <div className="flex justify-between mr-20 mt-10 ">
            <div id="roadmap" className="flex items-center ml-15">
              <a className="text-gray-500" href="/">
                Home
              </a>
              <label className="ml-3 mr-3">/</label>
              <a className="text-black" href="/account">
                My Profile
              </a>
            </div>
            <div>
              Welcome!{" "}
              <span className="text-[#ff8200]">
                {user ? `${user.username} !` : ""}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-[20%_1fr] gap-5 mt-10">
            <div className="flex flex-col gap-3 font-medium">
              <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full p-1">
                <div className="bg-[#ff8200] h-35 w-full rounded-sm"></div>
                <div className="flex flex-col gap-3 items-center -mt-20">
                  <div>
                    <Image
                      src={
                        avatarPreview ||
                        (user && user.avatar && getAvatarLink(user.avatar)) ||
                        "/images/noavatar.png"
                      }
                      alt="user"
                      width={150}
                      height={150}
                      className="rounded-full border-4 border-white"
                      onClick={avatarClick}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      id="avatarInput"
                      onChange={handleAvatarChange} // Sửa lại ở đây
                    />
                  </div>
                  {imageMenu && (
                    <div
                      ref={menuRef}
                      className="absolute bg-white shadow-lg rounded-md p-2 mt-2"
                    >
                      <button
                        className="block w-full text-left text-gray-700 hover:bg-gray-100 px-4 py-2"
                        onClick={handleUploadAvatar}
                      >
                        Change Avatar
                      </button>
                      <button
                        className="block w-full text-left text-gray-700 hover:bg-gray-100 px-4 py-2 disabled-bg-black"
                        disabled={!user || !user.avatar}
                        onClick={handleRemoveAvatar}
                      >
                        {user && user.avatar
                          ? "Remove Avatar"
                          : "Upload Avatar"}
                      </button>
                    </div>
                  )}
                  <h2 className="mt-2 text-xl font-semibold text-gray-800">
                    {user ? user.name : ""}
                  </h2>
                  <p className="text-lg text-gray-500">
                    {user ? user.username : ""}
                  </p>
                  <p className="text-md text-gray-500">
                    {user ? user.roles : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full bg-white pb-10">
              <div className="mt-10 mx-auto w-4/5">
                <p className="text-[#ff8200] text-xl">Edit Your Profile</p>
                <div className="flex flex-col gap-1 mt-5">
                  <label className="text-gray-500">Name</label>
                  <input
                    id="name"
                    type="text"
                    className="bg-gray-100 rounded-xs p-2"
                    defaultValue={user ? user.name : ""}
                    onChange={checkValidInput}
                  />
                </div>
                <div className="flex w-full gap-5 mt-5 justify-between">
                  <div className="flex flex-col gap-1 w-3/7">
                    <label className="text-gray-500 ">Email</label>
                    <input
                      id="email"
                      type="text"
                      className="bg-gray-100 rounded-xs p-2"
                      defaultValue={user ? user.email : ""}
                      onChange={checkValidInput}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-3/7">
                    <label className="text-gray-500">Phone Number</label>
                    <input
                      id="phonenumber"
                      type="text"
                      className="bg-gray-100 rounded-xs p-2"
                      defaultValue={user ? user.phone : ""}
                      onChange={checkValidInput}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-5">
                  <label className="text-gray-500">Password Change</label>
                  <input
                    id="password"
                    type="password"
                    className="bg-gray-100 rounded-xs p-2"
                    placeholder="Current Password"
                    onChange={handleChangePassword}
                  />
                  <input
                    id="newPassword"
                    type="password"
                    className="bg-gray-100 rounded-xs p-2"
                    placeholder="New Password"
                    onChange={handleChangePassword}
                  />
                  <input
                    id="confirmPassword"
                    type="password"
                    className="bg-gray-100 rounded-xs p-2"
                    placeholder="Confirm New Password"
                    onChange={handleChangePassword}
                  />
                  <div className="text-sm text-red">{error}</div>
                </div>
                <div className="flex justify-end gap-5 items-center mt-5 mr-5">
                  <button
                    className="px-4 py-2 rounded-xs cursor-pointer"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className={`bg-[#ff8200] text-white px-4 py-2 rounded-xs ${
                      !(
                        error === "" &&
                        (avatarPreview ||
                          (user &&
                            updatedUser &&
                            updatedUser.firstName +
                              " " +
                              updatedUser.lastName !==
                              user.name) ||
                          (updatedUser && updatedUser.email !== user.email) ||
                          (updatedUser && updatedUser.phone !== user.phone) ||
                          (updatedUser && updatedUser.password))
                      )
                        ? " bg-gray-700 cursor-not-allowed"
                        : "cursor-pointer "
                    }`}
                    disabled={
                      !(
                        error === "" &&
                        (avatarPreview ||
                          (user &&
                            updatedUser &&
                            updatedUser.firstName +
                              " " +
                              updatedUser.lastName !==
                              user.name) ||
                          (updatedUser && updatedUser.email !== user.email) ||
                          (updatedUser && updatedUser.phone !== user.phone) ||
                          (updatedUser && updatedUser.password))
                      )
                    }
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
