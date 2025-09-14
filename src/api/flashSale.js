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

export { getFlashSaleInformation, getLatestSaleProducts };
