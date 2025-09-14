import React from "react";
import Image from "next/image";
import { getLinkImage } from "@/api/splitService";

export default function CheckOutItem({ item }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <Image
          src={
            item.product.imageUrl
              ? getLinkImage(item.product.imageUrl)
              : "/images/placeholder.png"
          }
          alt={item.product.name}
          width={50}
          height={50}
          className="rounded-md mr-3"
        />
        <p>{item.product.name}</p>
      </div>
      <div>{Number(item.subtotal).toLocaleString()} $</div>
    </div>
  );
}
