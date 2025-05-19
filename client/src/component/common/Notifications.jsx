import React, { useState } from 'react';
import { useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ACCOUNT_TYPE } from '../../utils/constants';
import { Button } from '../ui/button';
import NotificationContent from '../ui/alert';
import Notification from '../ui/notification'; // Assuming this is your icon/component

function Notifications({ userType,updates }) {
    // const [notifications, setNotifications] = useState([
    //     { id: 1, message: "Your gate pass request #REQ003 has been approved", read: false, date: "2025-05-10" },
    //     { id: 2, message: "Your gate pass request #REQ004 is pending approval", read: false, date: "2025-05-11" },
    //     { id: 3, message: "Your leave request #REQ005 has been rejected", read: true, date: "2025-05-12" },
    //     { id: 4, message: "Your leave request #REQ006 is pending approval", read: false, date: "2025-05-13" },
    //     { id: 5, message: "Your gate pass request #REQ007 has been approved", read: false, date: "2025-05-14" },
    //     { id: 6, message: "Your gate pass request #REQ008 is pending approval", read: false, date: "2025-05-15" },
    // ]);

    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState(updates);
   
    useEffect(() => {
    setNotificationCount(updates.length);
    setNotifications(updates);
}, [updates]);
   
    const unreadCount = 0;

    // const unreadCount = notifications.filter(notification => !notification.read).length;

    // const handleOpenChange = (open) => {
    //     console.log("Sidebar opened:", open);
    //     if (open) {
    //         // Mark all notifications as read when the sidebar opens
    //         setNotifications(notifications.map(n => ({ ...n, read: true })));
    //     }
    // };

    const handleNotificationClick = (id) => {
        console.log("Notification clicked:", id);
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
        ));
    };

    const handleOpenChange = (open) => {
        console.log("Sidebar opened:", open);
        if (open) {
            // Mark all notifications as read when the sidebar opens
            setNotifications(notifications.map(notification => ({ ...notification, read: true })));
        }
    }

    return (
        <div className="">
            <Sheet className='bg-white' onOpenChange={handleOpenChange}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative bg-transparent hover:bg-college-gold/20">
                        <Notification className="h-5 w-5 text-college-gold" count={unreadCount} />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-80 bg-white sm:w-96">
                    <SheetHeader>
                        <SheetTitle className="text-lg font-semibold">Notifications</SheetTitle>
                        <SheetDescription>
                            {userType === ACCOUNT_TYPE.HOD ? 'Stay updated with your leave requests' : 'Stay updated with your gate pass requests'}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4 bg-gray-200">
                        {notifications.length > 0 ? (
                            notifications.map(notification => (
                                <NotificationContent
                                    key={notification.id}
                                    id={notification.id}
                                    type={notification.status== "approved" ? "success" : notification.status === "pending" ? "warning" : "error"}
                                   
                                    onClick={() => handleNotificationClick(notification.id)} // Mark as read on click
                                />
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground">No new notifications</p>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default Notifications;
