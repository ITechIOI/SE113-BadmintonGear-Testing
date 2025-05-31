import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { getProductById } from '@/api/productApi'
import { getLinkImage } from '@/api/splitService';

export default function OrderDetailItem({ item }) {
    const [product, setProduct] = useState(null);
    const fetchProduct = async () => {
        console.log('Fetching product with ID:', item.proudctId);
        try {
            const productData = await getProductById(item.proudctId);
            setProduct(productData);
        } catch (error) {
            console.log('Error fetching product:', error);
        }
    };

    useEffect(() => {
        if (item.proudctId) {
            fetchProduct();
        }
    }, []);

    return (
        
        <tr>
            <td>
                <div className='flex items-center gap-2'>
                    <Image
                        src={getLinkImage(product ? product.imageUrl : "/images/placeholder.png")}
                        alt={product ? product.name : "product"}
                        width={50}
                        height={50}
                        className="rounded-md"
                    />
                    <div>{product ? product.name : ""}</div>
                </div>
            </td>
            <td className='py-4'>{item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.quantity * item.price}</td>
        </tr>
    )
}
