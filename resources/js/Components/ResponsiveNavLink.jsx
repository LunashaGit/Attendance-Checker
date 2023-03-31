import { Link } from "@inertiajs/react";

export default function ResponsiveNavLink({
    method = "get",
    as = "a",
    href,
    active = false,
    children,
}) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${
                active
                    ? "border-indigo-400 border-indigo-600 text-indigo-700 text-indigo-300 bg-indigo-50 bg-indigo-900/50 focus:text-indigo-800 focus:text-indigo-200 focus:bg-indigo-100 focus:bg-indigo-900 focus:border-indigo-700 focus:border-indigo-300"
                    : "border-transparent text-gray-600 text-gray-400 hover:text-gray-800 hover:text-gray-200 hover:bg-gray-50 hover:bg-gray-700 hover:border-gray-300 hover:border-gray-600 focus:text-gray-800 focus:text-gray-200 focus:bg-gray-50 focus:bg-gray-700 focus:border-gray-300 focus:border-gray-600"
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out`}
        >
            {children}
        </Link>
    );
}
