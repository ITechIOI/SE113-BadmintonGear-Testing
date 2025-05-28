const getAllCategories = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/categories/all`;
    const token = localStorage.getItem('access_token');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (response.status !== 200) {
        console.error('Failed to fetch categories:');
        return [];
    }

    const data = await response.json();
    return data;
}

const createCategory = async (categoryData) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/categories/new`;
    const token = localStorage.getItem('access_token');

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
    });

    if (response.status !== 200) {
        alert('Failed to create category');
        return null;
    }

    const data = await response.json();
    alert('Category created successfully');
    return data.data;
}

const updateCategory = async (id, categoryData) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/categories/${id}`;
    const token = localStorage.getItem('access_token');

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
    });

    if (response.status !== 200) {
        alert('Failed to update category');
        return null;
    }

    const data = await response.data.json();
    alert('Category updated successfully');
    return data;
}

const deleteCategory = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/categories/${id}`;
    const token = localStorage.getItem('access_token');

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (response.status !== 200) {
        alert('Failed to delete category');
        return false;
    }

    alert('Category deleted successfully');
    return true;
}

export {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
}