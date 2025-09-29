const getAllReviews = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/reviews/all`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to fetch reviews");
      return null;
    }
    const data = await response.json();
    return data.data.content;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
};
const getReviews = async (productId) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/reviews/product/${productId}`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to fetch reviews");
      return null;
    }
    const data = await response.json();
    return data.data.content;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
};

const addReview = async (reviewData) => {
  console.log("Review Data:", reviewData); // Debugging line
  const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/reviews/new`;
  const token = localStorage.getItem("access_token");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });
  if (response.status !== 200) {
    alert("Failed to create review");
    return null;
  }
  const data = await response.json();
  alert("Review created successfully");
  return data.data;
};

export { getAllReviews, getReviews, addReview };
