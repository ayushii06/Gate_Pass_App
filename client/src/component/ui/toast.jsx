import React from 'react';

const Toast = ({ type, message }) => {
    console.log("toast", type, message);

    let toastStyles = {};
    let color = "";

    switch (type) {
        case "success":
            toastStyles = {
                bg: "bg-[#007c00]",
                border: "border-green-500 dark:border-green-700",
                text: "text-green-900 dark:text-green-100",
                icon: "text-green-600",
            };
            break;
        case "warning":
            toastStyles = {
                bg: "bg-yellow-100 dark:bg-yellow-900",
                border: "border-yellow-500 dark:border-yellow-700",
                text: "text-yellow-900 dark:text-yellow-100",
                icon: "text-yellow-600",
            };
            break;
        case "error":
            toastStyles = {
                bg: "bg-red-100 dark:bg-red-900",
                border: "border-red-500 dark:border-red-700",
                text: "text-red-900 dark:text-red-100",
                icon: "text-red-600",
            };
            break;
        case "info":
            toastStyles = {
                bg: "bg-blue-100 dark:bg-blue-900",
                border: "border-blue-500 dark:border-blue-700",
                text: "text-blue-900 dark:text-blue-100",
                icon: "text-blue-600",
            };
            break;
        default:
            return null;
    }

    return (
        <div className="w-72 fixed top-4 right-4 z-50 ">
            <div
                role="alert"
                className={`${toastStyles.bg} animate-right border-l-4 ${toastStyles.border} ${toastStyles.text} px-2 py-3 rounded-lg flex items-center transition duration-300 ease-in-out hover:brightness-105 transform hover:scale-105`}
            >
                <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`h-5 w-5 flex-shrink-0 mr-2 ${toastStyles.icon}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeWidth={2}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>
                <p className="text-sm font-semibold">{message}</p>
            </div>
        </div>
    );
};

export default Toast;
