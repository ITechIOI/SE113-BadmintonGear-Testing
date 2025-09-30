export const getAllPromotions = async (page = 0, limit = 10) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/discounts/all?page=${page}&limit=${limit}`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to fetch promotions");
      return null;
    }
    const data = await response.json();

    // API nên trả kiểu: { data: { content: [], totalPages, totalElements } }
    return {
      content: data?.data?.content ?? [],
      totalPages: data?.data?.totalPages ?? 1,
      totalElements: data?.data?.totalElements ?? 0,
    };
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return null;
  }
};

const getPromotionById = async (promotionId) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/discounts/id/${promotionId}`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to fetch promotion by ID");
      return null;
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching promotion by ID:", error);
    return null;
  }
};

const getPromotionByCode = async (code) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/discounts/code/${code}`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to fetch promotion by code");
      return null;
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching promotion by code:", error);
    return null;
  }
};

const deletePromotionById = async (promotionId) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/discounts/${promotionId}`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to delete promotion");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error deleting promotion:", error);
    return false;
  }
};

const addPromotion = async (promotionData) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/discounts/new`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promotionData),
    });
    if (!response.ok) {
      console.log("Failed to add promotion");
      return null;
    }
    alert("Promotion added successfully");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error adding promotion:", error);
    return null;
  }
};

const updatePromotion = async (promotionId, promotionData) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/discounts/${promotionId}`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promotionData),
    });
    if (!response.ok) {
      console.log("Failed to update promotion");
      return null;
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error updating promotion:", error);
    return null;
  }
};

export {
  getPromotionById,
  getPromotionByCode,
  deletePromotionById,
  addPromotion,
  updatePromotion,
};
