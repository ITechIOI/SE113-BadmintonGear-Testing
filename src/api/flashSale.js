const getFlashSaleInformation = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/flash-sale/all`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log("Failed to fetch flash sale information");
      return null;
    }
    const data = await response.json();

    const timeNow = Date.now();

    console.log("Latest Flash Sale:", data.data.content);

    for (let i = 0; i < data.data.content.length; i++) {
      if (
        timeNow >= new Date(data.data.content[i].startTime).getTime() &&
        timeNow <= new Date(data.data.content[i].endTime).getTime()
      ) {
        return data.data.content[i];
      }
    }

    return latestFlashSale[0];
  } catch (error) {
    console.error("Error fetching flash sale information:", error);
    return null;
  }
};

const getLatestSaleProducts = async (idFlashSale) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/flash-sale-detail/flash-sale-id/${idFlashSale}`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to fetch latest sale products");
      return null;
    }
    const data = await response.json();
    console.log("Latest Sale Products:", data);
    return data;
  } catch (error) {
    console.error("Error fetching latest sale products:", error);
    return null;
  }
};

const addFlashSale = async (flashSaleData) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products/flash-sale/new`;
  const token = localStorage.getItem("access_token");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flashSaleData),
  });
  if (response.status !== 200) {
    alert("Failed to create flash sale");
    return null;
  }
  const data = await response.json();
  alert("Flash sale created successfully");
  return data.data;
};

const deleteFlashSale = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products/flash-sale/${id}`;
  const token = localStorage.getItem("access_token");
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    alert("Failed to delete flash sale");
    return false;
  }
  alert("Flash sale deleted successfully");
  return true;
};

const updateFlashSale = async (id, flashSaleData) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products/flash-sale/${id}`;
  const token = localStorage.getItem("access_token");
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flashSaleData),
  });
  if (response.status !== 200) {
    alert("Failed to update flash sale");
    return null;
  }
  const data = await response.json();
  alert("Flash sale updated successfully");
  return data.data;
};

const addProductToFlashSale = async (details) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/flash-sale-detail/new`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(details),
    });
    if (!response.ok) {
      console.log("Failed to add product to flash sale");
      return null;
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error adding product to flash sale:", error);
    return null;
  }
};

const removeProductFromFlashSale = async (id) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/flash-sale-detail/${id}`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to remove product from flash sale");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error removing product from flash sale:", error);
    return false;
  }
};

export {
  getFlashSaleInformation,
  getLatestSaleProducts,
  addFlashSale,
  updateFlashSale,
  deleteFlashSale,
  addProductToFlashSale,
  removeProductFromFlashSale,
};
