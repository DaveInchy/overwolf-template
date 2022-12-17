const React = require('react');
const { useRef, useState, useEffect } = require('react');

import '../../assets/css/tailwind.css';

import WindowActionButton from '../@ui/WindowActionButton';

import OWIcon from './../../resources/branding/overwolf/overwolf-front.png';

export default function WindowHeader()
{
    return (
        <div id={"window_topbar"} className={"max-h-[32px] bg-stone-900 w-[100vw] text-left flex flex-row justify-between items-center text-slate-500 text-lg"}>
            <div className={"w-[160px] flex flex-row justify-start items-center"}>
                <img src={OWIcon} alt={document.title} className={"min-h-[50%] min-w-auto"} />
            </div>
            <span className={"w-[calc(100vw - calc(160px * 2))] px-[10px] text-[13px]"}>{document.title}</span>
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