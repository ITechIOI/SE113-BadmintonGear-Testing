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

const createOrder = async (orderData) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/orders/new`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) {
            console.log('Failed to create order');
            return null;
        }
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error('Error creating order:', error);
        return null;
    }
}

const updateOrder = async (orderId, orderData) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/orders/${orderId}`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) {
            console.log('Failed to update order');
            return null;
        }
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error('Error updating order:', error);
        return null;
    }
}

const cancelOrder = async (orderId) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/orders/cancel/${orderId}`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            console.log('Failed to cancel order');
            return null;
        }
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error('Error cancelling order:', error);
        return null;
    }
}

export { getAllOrders, getOrderByUserId, getOrderById, createOrder, updateOrder, cancelOrder };