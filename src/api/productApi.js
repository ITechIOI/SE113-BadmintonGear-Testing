const getAllProducts = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/products/products/all`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            console.log('Failed to fetch products');
            return null;
        }
        const data = await response.json();
        return data.data.content;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
}

const getProductById = async (productId) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/products/products/id/${productId}`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            console.log('Failed to fetch product by ID');
            return null;
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return null;
    }
}

export { getAllProducts, getProductById };