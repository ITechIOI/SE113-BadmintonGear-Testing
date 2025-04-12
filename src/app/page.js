"use client"
import { ProductCard } from "@/components/ProductCard"
export default function Page() {
  return (
    <div>
      <ProductCard product={{id:"pro001", name: "Product 1", image: "/images/product1.png", price: 166, rating: 4 , discount: 40}} />
    </div>
  )
}
