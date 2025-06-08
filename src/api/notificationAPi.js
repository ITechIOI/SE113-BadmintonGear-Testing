const pushNotification = async (notification) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/send-email`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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