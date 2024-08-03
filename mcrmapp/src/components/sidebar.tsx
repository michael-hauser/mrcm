"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true); // Set the default state to open
    const [selectedLink, setSelectedLink] = useState(''); // Track the selected link

    useEffect(() => {
            const loc = document.location.href.split("/");
            setSelectedLink(`/${loc[loc.length - 1]}`);
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const renderLinks = () => {
        const links = [
            { link: '/', name: 'Home' },
            { link: '/users', name: 'Users' },
            { link: '/customers', name: 'Customers' },
        ];

        return links.map((link, idx) => (
            <Link 
                key={idx} 
                href={link.link}
                onClick={() => setSelectedLink(link.link)}
                className={`p-2 pl-4 pr-4 rounded w-full hover:bg-[rgba(0,0,0,0.05)] ${selectedLink === link.link ? 'bg-neutral-200' : ''}`}
            >
                {link.name}
            </Link>
        ));
    };

    const renderButton = (onClick: any, iconPath: any, additionalClasses = '') => (
        <button 
            className={`bg-transparent hover:bg-[rgba(0,0,0,0.05)] font-bold py-2 px-2 rounded ${additionalClasses}`}
            onClick={onClick}
        >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
            </svg>
        </button>
    );

    const renderSidebar = () => (
        <div className="flex">
            <div className="bg-neutral-300 border text-black h-screen flex flex-col flex-shrink-0 overflow-hidden w-64">
                <div className="flex w-full justify-between items-center pl-8 pr-4 py-4">
                    <h1 className="text-xl font-bold">MCRM</h1>
                    {renderButton(toggleSidebar, "M6 18L18 6M6 6l12 12")}
                </div>
                <div className="flex flex-col pl-4 pr-8 mt-6 gap-2 w-full">
                    {renderLinks()}
                </div>
            </div>
        </div>
    );

    const renderOpenButton = () => renderButton(toggleSidebar, "M4 5h16M4 12h16M4 19h16", "fixed mt-8 ml-8");

    return isOpen ? renderSidebar() : renderOpenButton();
};

export default Sidebar;
