import { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import React from "react";
import { Auth } from "@/Types/Auth";
import MobileWarning from "@/Components/Custom/MobileWarning";
type Props = {
    auth: Auth;
    children: JSX.Element;
    errors: Object;
};

export default function Authenticated({ auth, children }: Props) {
    const [showMobileWarning, setShowMobileWarning] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);

    window.addEventListener("resize", () => {
        if (window.innerWidth < 950) {
            setShowMobileWarning(true);
        } else {
            setShowMobileWarning(false);
        }
    });

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <>
            <section
                className={
                    showSideBar ? "fixed w-[250px] h-full top-0 bg-gray-900 shadow-inner shadow-[-6px_2px_500px_21px_rgba(0,0,0,0.75)]" : "hidden"
                }
            >
                {/* text nav: #00bc8c */}
                <ul>
                    <li>

                        Dashboard
                    </li>
                    <li>
                        <span></span>
                        Who's who
                    </li>
                    <li>
                        <span></span>
                        Tech Talks
                    </li>
                </ul>
            </section>
            <div className={
                showSideBar ? "ml-[250px] min-h-screen bg-gray-100 bg-gray-900" : "min-h-screen bg-gray-100 bg-gray-900"
            }
            >
                {showMobileWarning && <MobileWarning />}
                <nav className="bg-white bg-gray-800 border-b border-gray-100 border-gray-700">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center pt-2">
                                <svg onClick={() => setShowSideBar(!showSideBar)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="pb-2 mr-5 cursor-pointer block w-8 h-8 w-auto fill-current text-gray-800 text-gray-200">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <div className="shrink-0 flex items-center">
                                    <Link href="/dashboard">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 text-gray-200" />
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative">
                                </div>
                            </div>

                            <div className="-mr-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 text-gray-500 hover:text-gray-500 hover:text-gray-400 hover:bg-gray-100 hover:bg-gray-900 focus:outline-none focus:bg-gray-100 focus:bg-gray-900 focus:text-gray-500 focus:text-gray-400 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
                <main>{children}</main>
            </div>
        </>
    );
}
