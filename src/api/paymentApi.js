const getPaymentByOrderId = async (id) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/payment/orderId/${id}`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            console.log('Failed to fetch payment by ID');
            return null;
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching payment by ID:', error);
        return null;
    }
}

const createPayment = async (payment) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/payment/create/paypal`;
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payment),
        });
        if (!response.ok) {
            alert('Failed to create payment. Please try again.');
            return null;
        }
        const data = await response.text();
        if (data) {
            window.location.href = data;
            return;
        }
        return data;
    } catch (error) {
        console.error('Error creating payment:', error);
        return null;
    }
};

export { getPaymentByOrderId, createPayment };