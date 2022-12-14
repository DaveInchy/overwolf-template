import React from "react";

import '../../assets/css/tailwind.css';
import '../../assets/css/desktop.css';

import WindowHeader from '../@sections/WindowHeader';
import ProductShowcase from '../@sections/ProductShowcase';

export default function DesktopWindow(): JSX.Element
{
    return (
        <div className={"w-[100vw] h-[100vh]"}>
            <WindowHeader />
            <div className={"min-h-[calc(100vh - 32px)] min-w-[100vw] bg-stone-600"}>
                <ProductShowcase />
            </div>
        </div>
    );
}