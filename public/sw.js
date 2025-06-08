self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());

// Giữ worker active
self.addEventListener("fetch", () => { });

// Khi có push notification được gửi từ server
self.addEventListener("push", (event) => {
    event.waitUntil(
        (async () => {
            let data = { title: "No payload", body: "" };
            try {
                data = event.data.json();
            } catch (e) {
                /* fallback nếu ko parse được */
            }

            // Hiển thị notification
            await self.registration.showNotification(data.title, {
                body: data.body,
                icon: "/b4.svg",
                badge: "/b5.svg",
            });

            // Gửi payload về tất cả các page/clients đang mở
            const allClients = await self.clients.matchAll({
                type: "window",
                includeUncontrolled: true,
            });
            for (const client of allClients) {
                client.postMessage({
                    type: "PUSH_EVENT",
                    payload: data,
                });
            }
        })()
    );
});

