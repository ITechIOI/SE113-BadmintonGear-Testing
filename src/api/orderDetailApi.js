const getDetailByOrderId = async (orderId) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/order-details/order/${orderId}`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            console.log('Failed to fetch order details by ID');
            return null;
        }
        const data = await response.json();
        console.log(data);
        return data.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        return null;
    }
}

export { getDetailByOrderId };