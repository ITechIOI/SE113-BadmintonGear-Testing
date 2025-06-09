"use client"
import { ProductCard } from "@/components/ProductCard"
import TimeCountdown from "@/components/TimeCountdown"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { getAllProducts } from "@/api/productApi"
import toast from "react-hot-toast";

const registerServiceWorker = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.error("❌ Notification permission denied");
    return;
  }
  if ("serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" });

      // Đợi cho đến khi service worker ở trạng thái "active"
      if (reg.installing) {
        await new Promise((resolve) => {
          reg.installing.addEventListener("statechange", function (e) {
            if (e.target.state === "activated") resolve();
          });
        });
      } else if (reg.waiting) {
        await new Promise((resolve) => {
          reg.waiting.addEventListener("statechange", function (e) {
            if (e.target.state === "activated") resolve();
          });
        });
      } else if (reg.active) {
        // Đã active, không cần chờ
      }

      console.log("✅ Service worker registered & active!");
      return reg;
    } catch (err) {
      console.error("❌ SW registration failed", err);
    }
  } else {
    console.warn("⚠️ Service worker not supported.");
  }
};

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
};

const subscribeToPush = async (registration) => {
  const PUBLIC_VAPID_KEY = "BOJ494ZGAa4HcRV3eoaJmnRjMKx208iXeolTXCb3m8Q6lbXuYimDBHz71M_fVZuKe_ecjsm1grUmPFaw78CaDug";
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });
  const subscriptionJson = subscription.toJSON();
  console.log("📦 Subscription:", subscription);
  const body = {
    endpoint: subscriptionJson.endpoint,
    p256dh: subscriptionJson.keys.p256dh,
    auth: subscriptionJson.keys.auth,
  }
  console.log("📦 Subscription body:", body);
  await fetch("http://localhost:8222/users/subscriptions/subscript", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ localStorage.getItem("access_token"),
    },
    body: JSON.stringify(body),
  });
  alert("🚀 Subscribed to push notifications!");
};

export default function Page() {
  const [products, setProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState("All");
  const listOfCategories = ["All", "Rackets", "Shuttlecock", "Shoes", "Clothes", "Bags", "Others"];
  const listOfBrands = ["All", "Nike", "Adidas", "Puma", "Reebok", "Under Armour"];
  const scrollContainerRef = useRef(null);
  const exploreRef = useRef(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        const msg = event.data;
        if (msg?.type === "PUSH_EVENT") {
          const { title, body } = msg.payload;
          toast(`${title}: ${body}`, {
            icon: "🔔",
            duration: 8000,
          });
        }
      });
    }
    if (Notification.permission !== "granted") {
      enablePush();
    }
  }, []);

  const fetchProducts = async () => {
    const response = await getAllProducts();
    if (response) {
      setProducts(response);
      const productsWithDiscount = response.map(product => ({
        ...product,
        discount: product.discount ?? 10 // hoặc giá trị discount bạn muốn
      }));
      setFlashSaleProducts(productsWithDiscount);
      setBestSellingProducts(productsWithDiscount);
    }
    else { setProducts([]); }
  }

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 500, // Cuộn sang phải 250px (bằng chiều rộng của ProductCard)
        behavior: "smooth",
      });
    }
  };

  const scrollPrevious = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -500, // Cuộn sang trái 250px
        behavior: "smooth",
      });
    }
  };

  const handleScrollToExplore = () => {
    if (exploreRef.current) {
      exploreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
    }
    fetchData();
  }, []);
  const enablePush = async () => {
    const reg = await registerServiceWorker();
    if (reg) await subscribeToPush(reg);
  };

  return (
    <div className="max-w-[1800px] mx-auto">
      <div className="flex justify-center ">
        {/* <div className="mr-10">
          <div className="py-3 border-t border-dashed border-gray-300">
            <div className="flex">Availability</div>
            <div>
              <label className="block">
                <input type="checkbox" className="mr-2" /> Availability
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> Out of Stock
              </label>
            </div>
          </div>
          <div className="py-3 border-t border-dashed border-gray-300">
            <div>Category</div>
            <div>
              {listOfCategories.map((cat) => (
                <label key={cat} className="block">
                  <input type="checkbox" className="mr-2" /> {cat}
                </label>
              ))}
            </div>
          </div>
          <div className="py-3 border-t border-dashed border-gray-300">
            <div>Price Range</div>
            <div>
              <div>
                <label>Min</label>
                <input type="range"
                  min={0} max={999}
                  value={minPrice}
                  onChange={(e) => { setMinPrice(e.target.value) }} />
              </div>
              <div>
                <label>Max</label>
                <input
                  type="range"
                  min={0}
                  max={999}
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(e.target.value) }} />
              </div>
            </div>
          </div>
          <div className="py-3 border-t border-dashed border-gray-300">
            <div>Brands</div>
            <div>
              {listOfBrands.map((brand) => (
                <label key={brand} className="block">
                  <input type="checkbox" className="mr-2" /> {brand}
                </label>
              ))}
            </div>
          </div>
          <div className="py-3 border-t border-b border-dashed border-gray-300">
            <div>Rating
              <Image src={"/icons/dropdownic.png"} alt={"dropdown"} width={8} height={8} className="inline-block ml-2" />
            </div>
            <div>
              {Array.from({ length: 5 }, (_, index) => (
                <label key={index} className="block">
                  <input type="checkbox" className="mr-2" /> {index + 1} ★
                </label>
              ))}
            </div>

          </div>
        </div> */}

        {/* --- Discount Banner --- */}
        <div>
          <Image src={"/images/banner.png"} alt={"Discount Banner"} width={1000} height={200} className="w-auto h-auto" />
        </div>
      </div>

      {/* --- Flash Sale --- */}
      <div className="mx-20 border-b border-gray-300">
        <div className="flex items-center py-5">
          <div className="bg-[#FF8200] w-5 h-10 rounded-sm"></div>
          <div className="text-[#ff8200] ml-5 font-[600] text-xl">Today's</div>
        </div>
        <div className="flex items-end mb-5">
          <p className="text-3xl font-bold mr-20">Flash Sales </p>
          <TimeCountdown targetDate={"2025-06-10T23:59:59"} />
          <div className="flex ml-auto">
            <Image onClick={scrollPrevious} src={"/icons/previousic.png"} alt="previous" width={25} height={25} />
            <Image onClick={scrollNext} src={"/icons/nextic.png"} alt="next" width={25} height={25} className="ml-5" />
          </div>
        </div>
        <span className="text-2xl text-[#ff8200]">Flash Sales Summer 2025</span>
        <div ref={scrollContainerRef} className="flex gap-5 my-10 overflow-x-auto w-full mx-auto scroll-snap-x snap-mandatory hide-scrollbar" >
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} className="min-w-[250px] flex-shrink-0" />
          ))}
        </div>
        <button className="px-10 py-3 mx-auto flex mb-5 bg-[#ff8200] rounded-md text-white"
          onClick={handleScrollToExplore}>View All Products</button>
      </div>

      {/* ---Filter Product --- */}
      {/* <div className="mx-20 mb-5 border-b border-gray-300 mt-10">
        <div className="flex justify-between w-full items-center mb-5">
          <p className="text-3xl font-bold mr-20">Filtered Products</p>
          <button className=" px-10 py-3 bg-[#ff8200] rounded-md text-white"
            onClick={handleScrollToExplore}>View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 my-10 w-full h-auto mx-auto justify-items-center" >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} className="min-w-[250px] flex-shrink-0" />
          ))}
        </div>
      </div> */}

      {/* --- Category --- */}
      <div className="mx-20 mb-5 border-b border-gray-300">
        <div className="flex items-center py-5">
          <div className="bg-[#FF8200] w-5 h-10 rounded-sm"></div>
          <div className="text-[#ff8200] ml-5 font-[600] text-xl">Categories</div>
        </div>
        <p className="text-3xl font-bold mr-20">Browse By Category</p>
        <div className=" flex flex-wrap h-auto mx-auto justify-between my-10 " >
          <div className="border flex flex-col items-center justify-center px-14 mr-5 py-10 h-auto rounded-md hover:shadow-lg cursor-pointer"
            onClick={() => window.location.href = "/category?id=1"}>
            <Image src={"/icons/racketic.png"} alt="racket" width={100} height={100} className="mb-5" />
            <p>Rackets</p>
          </div>
          <div className="border flex flex-col items-center justify-center mr-5 px-15 py-10 h-auto rounded-md hover:shadow-lg cursor-pointer"
            onClick={() => window.location.href = "/category?id=2"}>
            <Image src={"/icons/shuttlecockic.png"} alt="shuttlecock" width={80} height={80} className="mb-5" />
            <p>Shuttlecock</p>
          </div>
          <div className="border flex flex-col items-center justify-center mr-5 px-15 py-10 h-auto rounded-md hover:shadow-lg cursor-pointer"
            onClick={() => window.location.href = "/category?id=3"}>
            <Image src={"/icons/shoesic.png"} alt="shoes" width={80} height={80} className="mb-5" />
            <p>Shoes</p>
          </div>
          <div className="border flex flex-col items-center justify-center mr-5 px-15 py-10 h-auto rounded-md hover:shadow-lg cursor-pointer"
            onClick={() => window.location.href = "/category?id=4"}>
            <Image src={"/icons/clotheic.png"} alt="clothes" width={80} height={80} className="mb-5" />
            <p>Clothes</p>
          </div>
          <div className="border flex flex-col items-center justify-center mr-5 px-15 py-10 h-auto rounded-md hover:shadow-lg cursor-pointer"
            onClick={() => window.location.href = "/category?id=5"}>
            <Image src={"/icons/bagic.png"} alt="bags" width={80} height={80} className="mb-5" />
            <p>Bags</p>
          </div>
          <div className="border flex flex-col items-center justify-center px-15 py-10 h-auto rounded-md hover:shadow-lg cursor-pointer"
            onClick={() => window.location.href = "/category?id=6"}>
            <Image src={"/icons/otheric.png"} alt="others" width={80} height={80} className="mb-5" />
            <p>Others</p>
          </div>
        </div>
      </div>

      {/* --- Best Selling Product --- */}
      <div className="mx-20 mb-5 border-b border-gray-300">
        <div className="flex items-center py-5">
          <div className="bg-[#FF8200] w-5 h-10 rounded-sm"></div>
          <div className="text-[#ff8200] ml-5 font-[600] text-xl">This Month</div>
        </div>
        <div className="flex justify-between w-full items-center mb-5">
          <p className="text-3xl font-bold mr-20">Best Selling Products</p>
          <button className=" px-10 py-3 bg-[#ff8200] rounded-md text-white"
            onClick={handleScrollToExplore}>View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-10 w-full h-auto mx-auto justify-items-center" >
          {bestSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} className="min-w-[250px] flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* --- Banner2 --- */}
      <div className="mx-15">
        <Image src={"/images/banner2.png"} alt={"Discount Banner"} width={1000} height={200} className="w-full h-auto" />
      </div>

      {/* --- Our Products --- */}
      <div ref={exploreRef} className="mx-20 mb-5 border-b border-gray-300">
        <div className="flex items-center py-5">
          <div className="bg-[#FF8200] w-5 h-10 rounded-sm"></div>
          <div className="text-[#ff8200] ml-5 font-[600] text-xl">Our Products</div>
        </div>
        <div className="flex justify-between w-full items-center mb-5">
          <p className="text-3xl font-bold mr-20">Explore Our Products</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-10 w-full h-auto mx-auto justify-items-center" >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} className="min-w-[250px] flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* --- Service --- */}
      <div className="mt-10 ml-30 mr-30 gap-auto flex items-center justify-center">
        <div id="item" className="w-1/3 p-5 flex flex-col items-center justify-center rounded-sm gap-4 ">
          <Image src="/icons/deliveryic.png" alt="image" width={70} height={70} className="mt-5" />
          <p className="font-bold text-2xl">FREE AND FAST DELIVERY</p>
          <p className="text-center">Free delivery for all orders over $140</p>
        </div>
        <div id="item" className=" w-1/3 p-5 flex flex-col items-center justify-center rounded-sm gap-4 ">
          <Image src="/icons/customerserviceic.png" alt="image" width={70} height={70} className="mt-5" />
          <p className="font-bold text-xl">24/7 CUSTOMER SERVICE</p>
          <p className="text-center">Friendly 24/7 customer support</p>
        </div>
      </div>
    </div>
  )
}
