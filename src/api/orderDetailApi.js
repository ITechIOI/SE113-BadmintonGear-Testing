import { getProductById } from "./productApi";

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

const getTotalRevenueByTime = async (year, month, day) => {
  try {
    var url = "";
    if (day) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/orders/order-details/revenue?year=${year}&month=${month}&day=${day}`;
    } else if (month) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/orders/order-details/revenue?year=${year}&month=${month}`;
    } else if (year) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/orders/order-details/revenue?year=${year}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/orders/order-details/revenue`;
    }
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to fetch total revenue by time");
      return null;
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log("Error fetching total revenue by time:", error);
    return null;
  }
};

const getBestSellingProducts = async (year, month, day) => {
  try {
    var url = "";
    if (day) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/orders/order-details/best-selling?year=${year}&month=${month}&day=${day}`;
    } else if (month) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/orders/order-details/best-selling?year=${year}&month=${month}`;
    } else if (year) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/orders/order-details/best-selling?year=${year}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/orders/order-details/best-selling`;
    }
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to fetch best selling products");
      return null;
    }
    const data = await response.json();

    // Chuyển thành format mong muốn
    //  id: "pro001",
    //   name: "Product 1",
    //   image: "/images/product1.png",
    //   price: 166,
    //   quantity: 50,
    //   discount: 40,
    //   stock: 100,

    const formattedData = await Promise.all(
      data.data.map(async (item) => {
        var product = await getProductById(item.productId);
        var item = {
          id: item.productId,
          name: product ? product.name : "Unknown Product",
          image: product.image_url,
          price: product.price,
          quantity: item.totalQuantity,
          discount: null,
          stock: product.quantity,
        };
        return item;
      })
    );
    return formattedData;
  } catch (error) {
    console.log("Error fetching best selling products:", error);
    return null;
  }
};

export {
  getDetailByOrderId,
  createOrderDetail,
  getTotalRevenueByTime,
  getBestSellingProducts,
};
