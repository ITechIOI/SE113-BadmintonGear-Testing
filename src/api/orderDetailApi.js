const getDetailByOrderId = async (orderId) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/order-details/order/${orderId}`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to fetch order details by ID");
      return [];
    }
    const data = await response.json();
    return data.data.content;
  } catch (error) {
    console.log("Error fetching order details:", error);
    return [];
  }
};

const createOrderDetail = async (orderDetail) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/order-details/new`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderDetail),
    });
    if (!response.ok) {
      console.log("Failed to create order detail");
      return null;
    }
    console.log("Order detail created successfully", response);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error creating order detail:", error);
    return null;
  }
};

export { getDetailByOrderId, createOrderDetail };
