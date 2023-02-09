import React from "react";

export default function MobileWarning() {
    return (
        <div
            className="dark:bg-gray-900 text-white px-4 py-3 relative h-[100vh]  flex flex-col items-center justify-center"
            role="alert"
        >
            <strong className="font-bold">
                This website isn't available in mobile
            </strong>
            <span className="block sm:inline">
                The mobile version is in construction
            </span>
        </div>
    );
}
