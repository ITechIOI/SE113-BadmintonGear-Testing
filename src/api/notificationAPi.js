const pushNotification = async (notification) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/send`;
    const token = localStorage.getItem('access_token');
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(notification)
    });
    if (!response.ok) {
        console.error('Failed to push notification');
        return null;
    }

    const data = await response.json();
    return data;
}

export {pushNotification}