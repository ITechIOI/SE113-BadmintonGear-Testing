const getAllOrders = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/orders/all`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'AuthorizatiAuthorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            console.log('Failed to fetch user by ID');
            return null;
        }
        const data = await response.json();
        return data.data.content;
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
}

const getOrderByUserId = async (userId) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/orders/user/${userId}`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            console.log('Failed to fetch orders by user ID');
            return null;
        }
        const data = await response.json();
        return data.data.content;
    }
    catch (error) {
        console.error('Error fetching orders by user ID:', error);
        return null;
    }
}

const getOrderById = async (orderId) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/orders/id/${orderId}`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            console.log('Failed to fetch order by ID');
            return null;
        }
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error('Error fetching order by ID:', error);
        return null;
    }
}

export { getAllOrders, getOrderByUserId, getOrderById };