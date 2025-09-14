const getCart = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("user_profile")).id;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/behaviors/carts/user/${userId}`;
    const token = localStorage.getItem("access_token");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to fetch products");
      return null;
    }
    const data = await response.json();
    return data.data.content;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

const addToCart = async (cartData) => {
  console.log("Cart Data:", cartData); // Log the cart data for debugging

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/behaviors/carts/new`;
    const token = localStorage.getItem("access_token");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cartData),
    });

    console.log("Response status:", response); // Log the response status for debugging

    if (!response.ok) {
      console.log("Failed to add to Cart");
      alert("Failed to add to cart");
      return null;
    }
    const data = await response.json();
    alert("Add to cart successfully");
    return data.data;
  } catch (error) {
    console.error("Error adding cart: ", error);
    return null;
  }
};

const updateCart = async (id, cartData) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/behaviors/carts/${id}`;
    const token = localStorage.getItem("access_token");

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cartData),
    });
    if (!response.ok) {
      console.log("Failed to update product");
      return null;
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

const deleteCart = async (id) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/behaviors/carts/${id}`;
    const token = localStorage.getItem("access_token");

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to delete product");
      alert("Failed to delete product");
      return false;
    }
    const data = await response.json();
    return true;
  } catch (error) {
    console.error("Error updating product:", error);
    alert("Failed to delete product");
    return false;
  }
};

export { getCart, addToCart, updateCart, deleteCart };
