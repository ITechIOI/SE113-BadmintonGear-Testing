"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { addReview } from "@/api/reviewApi";
import { getDetailByOrderId } from "@/api/orderDetailApi";
import { getProductById } from "@/api/productApi";

export default function ReviewPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [orderDetails, setOrderDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState({});
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Tách việc lấy userId vào useEffect riêng
  useEffect(() => {
    const userProfile = localStorage.getItem("user_profile");
    if (userProfile) {
      setUserId(JSON.parse(userProfile).id);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const details = await getDetailByOrderId(orderId);

      console.log("Order details fetched:", details);

      if (details) {
        setOrderDetails(details);
        const productPromises = details.map((detail) =>
          getProductById(detail.proudctId)
        );
        const productDetails = await Promise.all(productPromises);
        setProducts(productDetails);
      }
    };
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const handleRatingChange = (productId, rating) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], rating },
    }));
  };

  const handleCommentChange = (productId, comment) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], comment },
    }));
  };

  const handleSubmitReview = async (productId) => {
    if (!userId) {
      alert("Please login to submit review");
      return;
    }

    const reviewData = {
      productId,
      userId,
      rating: reviews[productId]?.rating || 5,
      comment: reviews[productId]?.comment || "",
      createdAt: new Date().toISOString(),
    };

    const response = await addReview(reviewData);
    if (response) {
      alert("Review submitted successfully!");
    } else {
      alert("Failed to submit review");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!userId) {
    return (
      <div className="p-8 text-center">Please login to review products</div>
    );
  }

  return (
    <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Review Your Products</h1>
      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start gap-4">
              <img
                src={
                  product.imageUrl?.split(" ")[0] || "/images/placeholder.png"
                }
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <div className="mt-4">
                  <p className="mb-2">Rating:</p>
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(product.id, star)}
                        className={`text-2xl ${
                          (reviews[product.id]?.rating || 5) >= star
                            ? "text-[#FFAD33]"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    placeholder="Write your review here..."
                    className="w-full p-3 border rounded-md"
                    rows="3"
                    value={reviews[product.id]?.comment || ""}
                    onChange={(e) =>
                      handleCommentChange(product.id, e.target.value)
                    }
                  ></textarea>
                  <button
                    onClick={() => handleSubmitReview(product.id)}
                    className="mt-4 bg-[#FF8200] text-white px-6 py-2 rounded-md hover:bg-[#e56f00] transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
