const getAllUsers = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/users/all`;
    const token = localStorage.getItem('access_token');
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        console.error('Failed to fetch users:');
        return null;
    }
    const data = await response.json();
    return data.data.content;
}

const getProfile = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/users/profile`;
    const token = localStorage.getItem('access_token');
    console.log(token);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        console.log('Failed to fetch profile');
        return null;
    }

    const data = await response.json();
    return data;
}

const createUser = async (userData) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/users/new`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        console.error('Failed to create user');
    }

    const data = await response.json();
    return data;
}

const updateUser = async (userData) => {
    console.log(userData);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/users`;
    const token = localStorage.getItem('access_token');
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });
    if (!response.ok) {
        alert('Failed to update user');
        console.log('Failed to update user');
        return null;
    }
    const data = await response;
    console.log(data);
    alert('User updated successfully');
    return data;
}

const uploadImage = async (file) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/cloudinary/upload`;
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    if (!response.ok) {
        alert('Failed to upload image');
        return null;
    }
    const data = await response.text();
    return data;
}

const deleteImage = async (deleteData) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/cloudinary/delete`;
    const token = localStorage.getItem('access_token');
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: deleteData
    });
    const data = await response.text();

    return (data.toString().trim());

}

const getUserById = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/users/id/${id}`;
    const token = localStorage.getItem('access_token');
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        console.log('Failed to fetch user by ID');
        return null;
    }
    const data = await response.json();
    return data;
}

export { getAllUsers, getProfile, updateUser, createUser, uploadImage, deleteImage, getUserById };
