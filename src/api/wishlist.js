const getAllFavorites = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("user_profile")).id;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/behaviors/favorites/userId/${userId}`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to fetch favorites");
      return null;
    }
    const data = await response.json();
    return data.data.content;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return null;
  }
};

const addToFavorites = async (favoriteData) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/behaviors/favorites/new`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(favoriteData),
    });
    if (!response.ok) {
      console.log("Failed to add to favorites");
      return null;
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return null;
  }
};

const removeFromFavorites = async (favoriteId) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/behaviors/favorites/${favoriteId}`;
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("Failed to remove from favorites");
      return null;
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return null;
  }
};

export { getAllFavorites, addToFavorites, removeFromFavorites };
