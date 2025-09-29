"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getLatestSaleProducts,
  addProductToFlashSale,
  removeProductFromFlashSale,
} from "@/api/flashSale";
import { getAllProducts } from "@/api/productApi";

export default function FlashSaleDetail() {
  const searchParams = useSearchParams();
  const flashSaleId = searchParams.get("id");
  const [mode, setMode] = useState(searchParams.get("mode") || "view");
  const [flashSale, setFlashSale] = useState(null);
  const [inputFS, setInputFS] = useState(null);

  // products in this flash sale
  const [fsProducts, setFsProducts] = useState([]);
  const [loadingFsProducts, setLoadingFsProducts] = useState(false);

  // catalog products to add
  const [allProducts, setAllProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const formatDateToJava = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    const pad = (n) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  const toInputDateTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const pad = (n) => n.toString().padStart(2, "0");
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const fetchFlashSaleById = async (id) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/products/flash-sale/id/${id}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      setFlashSale(data?.data ?? null);
    } catch (e) {
      console.error("Error fetching flash sale:", e);
    }
  };

  const addFlashSale = async (payload) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/flash-sale/new`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (res.status !== 200) {
      alert("Failed to create flash sale");
      return null;
    }
    const data = await res.json();
    alert("Flash sale created successfully");
    return data?.data ?? null;
  };

  const updateFlashSale = async (id, payload) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/flash-sale/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (res.status !== 200) {
      alert("Failed to update flash sale");
      return null;
    }
    const data = await res.json();
    alert("Flash sale updated successfully");
    return data?.data ?? null;
  };

  const handleInputChange = () => {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    let status = "expired";
    const now = new Date();
    const s = new Date(start);
    const e = new Date(end);
    if (s <= now && e >= now) status = "active";
    else if (s > now) status = "upcoming";

    setInputFS({
      name,
      description,
      startTime: start ? formatDateToJava(start) : null,
      endTime: end ? formatDateToJava(end) : null,
      status,
    });
  };

  const handleCancel = () => {
    if (mode === "add") {
      window.location.href = "/admin/flashsale";
    } else if (flashSale) {
      document.getElementById("name").value = flashSale.name ?? "";
      document.getElementById("description").value =
        flashSale.description ?? "";
      document.getElementById("start").value = flashSale.startTime
        ? new Date(flashSale.startTime).toISOString().slice(0, 16)
        : "";
      document.getElementById("end").value = flashSale.endTime
        ? new Date(flashSale.endTime).toISOString().slice(0, 16)
        : "";
      setInputFS(null);
      setMode("view");
    }
  };

  const doSave = async () => {
    if (!inputFS || !inputFS.name || !inputFS.startTime || !inputFS.endTime) {
      alert("Please fill in Name, Start Time, End Time.");
      return;
    }
    if (mode === "add") {
      const created = await addFlashSale(inputFS);
      if (created) window.location.href = "/admin/flashsale";
    } else if (mode === "edit" && flashSaleId) {
      const updated = await updateFlashSale(flashSaleId, inputFS);
      if (updated) {
        setFlashSale(updated);
        setMode("view");
      }
    }
  };

  // fetch products inside this flash sale
  const loadFsProducts = async () => {
    if (!flashSaleId) return;
    setLoadingFsProducts(true);
    try {
      const list = await getLatestSaleProducts(flashSaleId);
      // API on homepage used this shape: item.salePrice, item.product (with product info)
      setFsProducts(Array.isArray(list) ? list : list?.data ?? []);
    } finally {
      setLoadingFsProducts(false);
    }
  };

  // fetch catalog products for adding
  const loadAllProducts = async () => {
    try {
      const res = await getAllProducts();
      setAllProducts(Array.isArray(res) ? res : res?.data ?? []);
    } catch (e) {
      console.error("Error loading products:", e);
    }
  };

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return allProducts;
    return allProducts.filter((p) => {
      const name = (p.name ?? p.product?.name ?? "").toLowerCase();
      const idStr = String(p.id ?? p.product?.id ?? "");
      return name.includes(term) || idStr.includes(term);
    });
  }, [allProducts, searchTerm]);

  const onOpenAdd = () => {
    setSelectedProductId("");
    setSalePrice("");
    setQuantity("");
    setShowAddModal(true);
    if (!allProducts.length) loadAllProducts();
  };

  const onConfirmAdd = async () => {
    if (!flashSaleId) {
      alert("Missing flash sale id");
      return;
    }
    if (!selectedProductId || !salePrice || Number(salePrice) <= 0) {
      alert("Please select product and enter valid sale price");
      return;
    }
    const payload = {
      flashSaleId: Number(flashSaleId),
      productId: Number(selectedProductId),
      salePrice: Number(salePrice),
      quantity: quantity ? Number(quantity) : 0,
    };
    const res = await addProductToFlashSale(payload);
    if (res) {
      setShowAddModal(false);
      await loadFsProducts();
    }
  };

  const onRemove = async (detailId) => {
    if (!window.confirm("Remove this product from flash sale?")) return;
    const ok = await removeProductFromFlashSale(detailId);
    if (ok) loadFsProducts();
  };

  useEffect(() => {
    if (mode !== "add" && flashSaleId) {
      fetchFlashSaleById(flashSaleId);
      loadFsProducts();
    }
  }, []);

  return (
    <div className="px-2 py-5">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Flash Sale Details</h1>
          <div id="roadmap" className="flex items-center mt-2">
            <a className="text-[#ff8200]" href="/admin/dashboard">
              Dashboard
            </a>
            <label className="ml-3 mr-3">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.59467 3.96967C6.30178 4.26256 6.30178 4.73744 6.59467 5.03033L10.5643 9L6.59467 12.9697C6.30178 13.2626 6.30178 13.7374 6.59467 14.0303C6.88756 14.3232 7.36244 14.3232 7.65533 14.0303L12.4205 9.26516C12.5669 9.11872 12.5669 8.88128 12.4205 8.73484L7.65533 3.96967C7.36244 3.67678 6.88756 3.67678 6.59467 3.96967Z"
                  fill="#A3A9B6"
                />
              </svg>
            </label>
            <a className="text-[#ff8200]" href="/admin/flashsale">
              Flash Sale List
            </a>
            <label className="ml-3 mr-3">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.59467 3.96967C6.30178 4.26256 6.30178 4.73744 6.59467 5.03033L10.5643 9L6.59467 12.9697C6.30178 13.2626 6.30178 13.7374 6.59467 14.0303C6.88756 14.3232 7.36244 14.3232 7.65533 14.0303L12.4205 9.26516C12.5669 9.11872 12.5669 8.88128 12.4205 8.73484L7.65533 3.96967C7.36244 3.67678 6.88756 3.67678 6.59467 3.96967Z"
                  fill="#A3A9B6"
                />
              </svg>
            </label>
            <a
              className="text-[#667085]"
              href={
                flashSaleId
                  ? `/admin/flashsaledetail?id=${flashSaleId}&&mode=${mode}`
                  : "/admin/flashsaledetail?mode=add"
              }
            >
              Flash Sale Details
            </a>
          </div>
        </div>

        {mode === "view" && flashSale && (
          <div>
            <button
              className={`bg-[#ff8200] text-white px-4 py-2 rounded-md flex gap-2 items-center cursor-pointer`}
              onClick={() => setMode("edit")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.3047 6.81991C18.281 5.8436 18.281 4.26069 17.3047 3.28438L16.7155 2.69512C15.7391 1.71881 14.1562 1.71881 13.1799 2.69512L3.69097 12.1841C3.34624 12.5288 3.10982 12.9668 3.01082 13.4442L2.34111 16.6735C2.21932 17.2607 2.73906 17.7805 3.32629 17.6587L6.55565 16.989C7.03302 16.89 7.47103 16.6536 7.81577 16.3089L17.3047 6.81991ZM16.1262 4.46289L15.5369 3.87363C15.2115 3.5482 14.6839 3.5482 14.3584 3.87363L13.4745 4.75755L15.2423 6.52531L16.1262 5.6414C16.4516 5.31596 16.4516 4.78833 16.1262 4.46289ZM14.0638 7.70382L12.296 5.93606L4.86948 13.3626C4.75457 13.4775 4.67577 13.6235 4.64277 13.7826L4.23082 15.769L6.21721 15.3571C6.37634 15.3241 6.52234 15.2453 6.63726 15.1303L14.0638 7.70382Z"
                  fill="#ffffff"
                />
              </svg>
              Edit Flash Sale
            </button>
          </div>
        )}

        {mode !== "view" && (
          <div className="flex gap-3">
            <button
              className="border border-[#858D9D] text-[#858D9D] px-4 py-2 rounded-md flex gap-2 items-center"
              onClick={handleCancel}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.1728 13.9941C15.4982 14.3195 15.4982 14.8472 15.1728 15.1726C14.8473 15.498 14.3197 15.498 13.9942 15.1726L10.0002 11.1786L6.00626 15.1726C5.68082 15.4981 5.15318 15.4981 4.82774 15.1726C4.5023 14.8472 4.5023 14.3195 4.82773 13.9941L8.82167 10.0001L4.82758 6.00607C4.50214 5.68064 4.50214 5.15301 4.82758 4.82757C5.15302 4.50214 5.68066 4.50214 6.0061 4.82757L10.0002 8.82158L13.9941 4.82759C14.3195 4.50215 14.8472 4.50214 15.1726 4.82758C15.498 5.15301 15.4981 5.68065 15.1726 6.00609L11.1787 10.0001L15.1728 13.9941Z"
                  fill="#858D9D"
                />
              </svg>
              Cancel
            </button>
            <button
              className="bg-[#ff8200] text-white px-4 py-2 rounded-md flex gap-2 items-center disabled:opacity-65"
              disabled={
                !inputFS ||
                !inputFS.name ||
                !inputFS.startTime ||
                !inputFS.endTime
              }
              onClick={doSave}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 2.5C3.61929 2.5 2.5 3.61929 2.5 5V15C2.5 16.3807 3.61929 17.5 5 17.5H15C16.3807 17.5 17.5 16.3807 17.5 15V7.47072C17.5 6.80768 17.2366 6.17179 16.7678 5.70295L14.297 3.23223C13.8282 2.76339 13.1923 2.5 12.5293 2.5H5ZM12.5293 4.16667H12.5V5.83333C12.5 6.75381 11.7538 7.5 10.8333 7.5H7.5C6.57953 7.5 5.83333 6.75381 5.83333 5.83333V4.16667H5C4.53976 4.16667 4.16667 4.53976 4.16667 5V15C4.16667 15.4602 4.53976 15.8333 5 15.8333H5.83333V10.8333C5.83333 9.91286 6.57953 9.16667 7.5 9.16667H12.5C13.4205 9.16667 14.1667 9.91286 14.1667 10.8333V15.8333H15C15.4602 15.8333 15.8333 15.4602 15.8333 15V7.47072C15.8333 7.24971 15.7455 7.03774 15.5893 6.88146L13.1185 4.41074C12.9623 4.25446 12.7503 4.16667 12.5293 4.16667ZM12.5 15.8333V10.8333H7.5V15.8333H12.5ZM7.5 4.16667H10.8333V5.83333H7.5V4.16667Z"
                  fill="white"
                />
              </svg>
              Save Flash Sale
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 flex justify-center items-center gap-5">
        <div className="w-2/3 ">
          <div className="bg-white shadow-md rounded-lg p-5">
            <h2 className="text-xl font-semibold">General Information</h2>
            <div className="mt-2 gap-1">
              <label className="text-sm font-medium ml-2">Name</label>
              <input
                id="name"
                type="text"
                className="border border-[#E0E2E7] bg-[#F9F9FC] rounded-md w-full px-3 py-2  outline-none"
                placeholder="Type flash sale name here..."
                defaultValue={flashSale ? flashSale.name : ""}
                onChange={handleInputChange}
                disabled={mode === "view"}
              />
            </div>
            <div className="mt-2 gap-1">
              <label className="text-sm font-medium ml-2">Description</label>
              <textarea
                id="description"
                className="border border-[#E0E2E7] bg-[#F9F9FC] rounded-md w-full px-3 py-2 resize-none  outline-none"
                placeholder="Type description here..."
                rows="6"
                defaultValue={flashSale ? flashSale.description : ""}
                onChange={handleInputChange}
                disabled={mode === "view"}
              />
            </div>
            {mode !== "add" && flashSale && (
              <div className="mt-2 gap-2 flex items-center">
                <label className="text-sm font-medium ml-2">Status</label>
                <div className={`py-1 px-2 rounded-full`}>
                  {flashSale.status ?? "-"}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white shadow-md rounded-lg p-5 mt-5">
            <h2 className="text-xl font-semibold">Time</h2>
            <div className="flex justify-start gap-10 items-center w-full">
              <div className="mt-2 gap-1 flex flex-col w-full">
                <label className="text-sm font-medium ml-2">Start Time</label>
                <input
                  id="start"
                  type="datetime-local"
                  className="border border-[#E0E2E7] bg-[#F9F9FC] rounded-md w-full px-3 py-2 outline-none"
                  placeholder="Enter start time..."
                  value={
                    flashSale?.startTime
                      ? toInputDateTime(flashSale.startTime)
                      : ""
                  }
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                />
              </div>
              <div className="mt-2 gap-1 flex flex-col w-full">
                <label className="text-sm font-medium ml-2">End Time</label>
                <input
                  id="end"
                  type="datetime-local"
                  className="border border-[#E0E2E7] bg-[#F9F9FC] rounded-md w-full px-3 py-2  outline-none"
                  placeholder="Enter end time..."
                  value={
                    flashSale?.endTime ? toInputDateTime(flashSale.endTime) : ""
                  }
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                />
              </div>
            </div>
          </div>

          {/* Products in this flash sale */}
          {mode !== "add" && (
            <div className="bg-white shadow-md rounded-lg p-5 mt-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Products in this Flash Sale
                </h2>
                <button
                  className="bg-[#ff8200] text-white px-4 py-2 rounded-md flex gap-2 items-center"
                  onClick={onOpenAdd}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.16667 15.4167C9.16667 15.8769 9.53976 16.25 10 16.25C10.4602 16.25 10.8333 15.8769 10.8333 15.4167V10.8333H15.4167C15.8769 10.8333 16.25 10.4602 16.25 10C16.25 9.53976 15.8769 9.16667 15.4167 9.16667H10.8333V4.58333C10.8333 4.1231 10.4602 3.75 10 3.75C9.53976 3.75 9.16667 4.1231 9.16667 4.58333V9.16667H4.58333C4.1231 9.16667 3.75 9.53976 3.75 10C3.75 10.4602 4.1231 10.8333 4.58333 10.8333H9.16667V15.4167Z"
                      fill="white"
                    />
                  </svg>
                  Add Product
                </button>
              </div>

              <div className="mt-4 border border-[#E0E2E7] rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#F9F9FC] font-medium border-b border-[#F0F1F3]">
                    <tr className="text-center text-[#344054] font-semibold">
                      <th className="py-2 px-4">Product</th>
                      <th className="py-2 px-4">Base Price</th>
                      <th className="py-2 px-4">Sale Price</th>
                      <th className="py-2 px-4">Quantity</th>
                      <th className="py-2 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#344054] font-normal text-center">
                    {loadingFsProducts && (
                      <tr>
                        <td colSpan={5} className="py-4">
                          Loading...
                        </td>
                      </tr>
                    )}
                    {!loadingFsProducts && fsProducts?.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-4">
                          No products in this flash sale
                        </td>
                      </tr>
                    )}
                    {!loadingFsProducts &&
                      fsProducts?.map((item) => {
                        // Expected shape: { id, salePrice, quantity?, product: { id, name, price, image, ... } }
                        const p = item.product ?? {};
                        return (
                          <tr
                            key={item.id}
                            className="border-b border-[#F0F1F3]"
                          >
                            <td className="py-2 px-4 text-left">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {p.name ?? `#${p.id}`}
                                </span>
                                <span className="text-[#667085]">({p.id})</span>
                              </div>
                            </td>
                            <td className="py-2 px-4">
                              {p.price != null
                                ? Number(p.price).toLocaleString()
                                : "-"}
                            </td>
                            <td className="py-2 px-4 text-[#ff8200] font-semibold">
                              {item.salePrice != null
                                ? Number(item.salePrice).toLocaleString()
                                : "-"}
                            </td>
                            <td className="py-2 px-4">
                              {item.quantity != null ? item.quantity : "-"}
                            </td>
                            <td className="py-2 px-4">
                              <button
                                className="text-[#F04438]"
                                onClick={() => onRemove(item.id)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                Add Product to Flash Sale
              </h3>
              <button
                className="text-[#667085]"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="px-3 py-2 border border-[#E0E2E7] rounded-md w-full outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="px-3 py-2 border border-[#E0E2E7] rounded-md text-[#667085]"
                  onClick={loadAllProducts}
                >
                  Reload
                </button>
              </div>

              <div className="mt-3">
                <label className="text-sm font-medium ml-1">
                  Select Product
                </label>
                <select
                  className="mt-1 w-full px-3 py-2 border border-[#E0E2E7] rounded-md outline-none bg-[#F9F9FC]"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                >
                  <option value="">-- Choose product --</option>
                  {filteredProducts.map((p) => {
                    const id = p.id ?? p.product?.id;
                    const name = p.name ?? p.product?.name ?? `#${id}`;
                    return (
                      <option key={id} value={id}>
                        {name} (#{id})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium ml-1">Sale Price</label>
                  <input
                    type="number"
                    min={0}
                    className="mt-1 w-full px-3 py-2 border border-[#E0E2E7] rounded-md outline-none bg-[#F9F9FC]"
                    placeholder="Enter sale price..."
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium ml-1">
                    Quantity (optional)
                  </label>
                  <input
                    type="number"
                    min={0}
                    className="mt-1 w-full px-3 py-2 border border-[#E0E2E7] rounded-md outline-none bg-[#F9F9FC]"
                    placeholder="Enter quantity..."
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                className="border border-[#858D9D] text-[#858D9D] px-4 py-2 rounded-md"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#ff8200] text-white px-4 py-2 rounded-md disabled:opacity-65"
                disabled={
                  !selectedProductId || !salePrice || Number(salePrice) <= 0
                }
                onClick={onConfirmAdd}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
