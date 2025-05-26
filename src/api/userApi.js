
const getAllUsers = async (page) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/users/all?page=${page}&limit=10`;
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
    }

    const data = await response;
    return data;
}

const getProfile = async()=>{
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
        console.error('Failed to fetch profile');
    }

    const data = await response.json();
    return data;
}

export { getAllUsers, getProfile };