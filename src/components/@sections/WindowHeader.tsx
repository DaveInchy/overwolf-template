import React from "react";

import '../../assets/css/tailwind.css';

import WindowActionButton from '../@ui/WindowActionButton';

export default function WindowHeader(): JSX.Element
{
    return (
        <div id={"window_topbar"} className={"max-h-[32px] bg-slate-900 w-[100vw] text-left flex flex-row justify-between items-center text-slate-500 text-lg"}>
            <span className={"w-[calc(100vw - 160px)] px-[10px] text-[13px]"}>{document.title}</span>
            <div className={"w-[160px] flex flex-row justify-evenly items-center"}>
                <WindowActionButton type={"support"} />
                <WindowActionButton type={"settings"} />
                <WindowActionButton type={"minimize"} />
                <WindowActionButton type={"restore"} />
                <WindowActionButton type={"close"} />
            </div>
        </div>
    );
}