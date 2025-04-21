"use client"
import { ProductCard } from "@/components/ProductCard"
import TimeCountdown from "@/components/TimeCountdown"
import { Input } from "postcss"
import Image from "next/image"
import { useState, useRef } from "react"
export default function Page() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState("All");
  const listOfCategories = ["All", "Electronics", "Fashion", "Home", "Beauty", "Sports"];
  const listOfBrands = ["All", "Nike", "Adidas", "Puma", "Reebok", "Under Armour"];
  const scrollContainerRef = useRef(null);

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 250, // Cuộn sang phải 250px (bằng chiều rộng của ProductCard)
        behavior: "smooth",
      });
    }
  };

  const scrollPrevious = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -250, // Cuộn sang trái 250px
        behavior: "smooth",
      });
    }
  };
  return (
    <div>
      <div className="flex justify-center ">
        <div className="mr-10">
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
        </div>
        {/* --- Discount Banner --- */}
        <div>
          <Image src={"/images/banner.png"} alt={"Discount Banner"} width={1000} height={200} className="w-auto h-auto" />
        </div>
      </div>
      <div className="mx-20 border-b border-gray-300">
        <div className="flex items-center py-5">
          <div className="bg-[#FF8200] w-5 h-10 rounded-sm"></div>
          <div className="text-[#ff8200] ml-5 font-[600] text-xl">Today's</div>
        </div>
        <div className="flex items-end mb-5">
          <p className="text-3xl font-bold mr-20">Flash Sales</p>
          <TimeCountdown targetDate={new Date("2025-10-31T23:59:59")} />
          <div className="flex ml-auto">
            <Image onClick={scrollPrevious} src={"/icons/previousic.png"} alt="previous" width={25} height={25} />
            <Image onClick={scrollNext} src={"/icons/nextic.png"} alt="next" width={25} height={25} className="ml-5" />
          </div>
        </div>
        <div ref={scrollContainerRef} className="flex gap-5 my-10 overflow-x-auto w-full mx-auto scroll-snap-x snap-mandatory hide-scrollbar" >
          <ProductCard product={{ id: "pro001", name: "Product 1", image: "/images/product1.png", price: 166, rating: 4, discount: 40 }} className="min-w-[250px] flex-shrink-0" />
          <ProductCard product={{ id: "pro002", name: "Product 2", image: "/images/product1.png", price: 200, rating: 5, discount: 30 }} className="min-w-[250px] flex-shrink-0" />
          <ProductCard product={{ id: "pro003", name: "Product 3", image: "/images/product1.png", price: 120, rating: 3, discount: 20 }} className="min-w-[250px] flex-shrink-0" />
          <ProductCard product={{ id: "pro004", name: "Product 4", image: "/images/product1.png", price: 180, rating: 4, discount: 50 }} className="min-w-[250px] flex-shrink-0" />
          <ProductCard product={{ id: "pro005", name: "Product 5", image: "/images/product1.png", price: 150, rating: 4, discount: 10 }} className="min-w-[250px] flex-shrink-0" />
          <ProductCard product={{ id: "pro005", name: "Product 5", image: "/images/product1.png", price: 150, rating: 4, discount: 10 }} className="min-w-[250px] flex-shrink-0" />
          <ProductCard product={{ id: "pro005", name: "Product 5", image: "/images/product1.png", price: 150, rating: 4, discount: 10 }} className="min-w-[250px] flex-shrink-0" />
        </div>
        <button className="px-10 py-3 mx-auto flex mb-5 bg-[#ff8200] rounded-md text-white">View All Products</button>
      </div>
      <div className="mx-20 mb-5 border-b border-gray-300">
        <div className="flex items-center py-5">
          <div className="bg-[#FF8200] w-5 h-10 rounded-sm"></div>
          <div className="text-[#ff8200] ml-5 font-[600] text-xl">Categories</div>
        </div>
        <p className="text-3xl font-bold mr-20">Browse By Category</p>
        <div className="mb-5">

        </div>
      </div>
      <div className="mx-20 mb-5 border-b border-gray-300">
        <div className="flex items-center py-5">
          <div className="bg-[#FF8200] w-5 h-10 rounded-sm"></div>
          <div className="text-[#ff8200] ml-5 font-[600] text-xl">This Month</div>
        </div>
        <div className="flex justify-between w-full items-center mb-5">
          <p className="text-3xl font-bold mr-20">Best Selling Products</p>
          <button className=" px-10 py-3 bg-[#ff8200] rounded-md text-white">View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-10 w-full h-auto mx-auto justify-items-center" >
          <ProductCard product={{ id: "pro001", name: "Product 1", image: "/images/product1.png", price: 166, rating: 4, discount: 40 }} className="min-w-[250px] flex-shrink-0" />
          <ProductCard product={{ id: "pro002", name: "Product 2", image: "/images/product1.png", price: 200, rating: 5, discount: 30 }} className="min-w-[250px] flex-shrink-0" />
          <ProductCard product={{ id: "pro003", name: "Product 3", image: "/images/product1.png", price: 120, rating: 3, discount: 20 }} className="min-w-[250px] flex-shrink-0" />
          <ProductCard product={{ id: "pro004", name: "Product 4", image: "/images/product1.png", price: 180, rating: 4, discount: 50 }} className="min-w-[250px] flex-shrink-0" />
        </div>
      </div>
      <div className="mx-15">
        <Image src={"/images/banner2.png"} alt={"Discount Banner"} width={1000} height={200} className="w-full h-auto" />
      </div>
      <div className="mx-20 mb-5 border-b border-gray-300">
        <div className="flex items-center py-5">
          <div className="bg-[#FF8200] w-5 h-10 rounded-sm"></div>
          <div className="text-[#ff8200] ml-5 font-[600] text-xl">Our Products</div>
        </div>
        <div className="flex justify-between w-full items-center mb-5">
          <p className="text-3xl font-bold mr-20">Explore Our Products</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-10 w-full h-auto mx-auto justify-items-center" >
          <ProductCard product={{ id: "pro001", name: "Product 1", image: "/images/product1.png", price: 166, rating: 4, discount: 40 }} />
          <ProductCard product={{ id: "pro002", name: "Product 2", image: "/images/product1.png", price: 200, rating: 5, discount: 30 }} />
          <ProductCard product={{ id: "pro003", name: "Product 3", image: "/images/product1.png", price: 120, rating: 3, discount: 20 }} />
          <ProductCard product={{ id: "pro004", name: "Product 4", image: "/images/product1.png", price: 180, rating: 4, discount: 50 }} />
          <ProductCard product={{ id: "pro005", name: "Product 5", image: "/images/product1.png", price: 150, rating: 4, discount: 10 }} />
        </div>
      </div>
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
      {/* <ProductCard product={{id:"pro001", name: "Product 1", image: "/images/product1.png", price: 166, rating: 4 , discount: 40}} /> */}
    </div>
  )
}
