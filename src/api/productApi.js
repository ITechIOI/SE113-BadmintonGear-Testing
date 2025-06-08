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

const deleteProductById = async (productId) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/products/products/${productId}`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            console.log('Failed to delete product by ID');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        return false;
    }
}

const addProduct = async (productData) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/products/products/new`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: productData,
        });
        if (!response.ok) {
            console.log('Failed to add product');
            return null;
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error adding product:', error);
        return null;
    }
}

const updateProduct = async (productId, productData) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/products/products/${productId}`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            console.log('Failed to update product');
            return null;
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
}

const uploadImage = async (imageData) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/products/cloudinary/upload`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: imageData,
        });
        if (!response.ok) {
            console.log('Failed to upload image');
            return null;
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}

const deleteImage = async (deleteData) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/products/cloudinary/delete`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: deleteData,
        });
        const data = await response.text();

        return (data.toString().trim());
    } catch (error) {
        console.log('Error deleting image:', error);
        return null;
    }
}

const getProductByImage = async (formData) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/recommend/predict/score`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        if (!response.ok) {
            console.log('Failed to fetch product by image');
            return [];
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product by image:', error);
        return [];
    }
}

export { getAllProducts, getProductById, deleteProductById, addProduct, updateProduct, uploadImage, deleteImage, getProductByImage };