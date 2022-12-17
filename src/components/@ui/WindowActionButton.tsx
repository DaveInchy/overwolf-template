const React = require('react');
const { useRef, useState, useEffect } = require('react');

import debug from "../../debug";

import '../../assets/css/tailwind.css';

import imgClose from "../../resources/ui/buttons/window_close.svg";
import imgRestore from "../../resources/ui/buttons/window_restore.svg";
import imgMax from "../../resources/ui/buttons/window_maximize.svg";
import imgMin from "../../resources/ui/buttons/window_minimize.svg";
import imgSupport from "../../resources/ui/buttons/window_support.svg";
import imgSettings from "../../resources/ui/buttons/window_settings.svg";

const padding = "0px";

const actionImage = {
    "close": imgClose,
    "restore": imgRestore,
    "minimize": imgMin,
    "maximize": imgMax,
    "support": imgSupport,
    "settings": imgSettings,
}

const actionHover = {
    "close": "hover:bg-rose-900",
    "restore": "hover:bg-slate-700",
    "minimize": "hover:bg-stone-700",
    "maximize": "hover:bg-stone-700",
    "support": "hover:bg-stone-600",
    "settings": "hover:bg-stone-600",
}

const actionFunction = {
    "close": () => overwolf.windows.getCurrentWindow((result) => {
        overwolf.windows.close(result.window.id);
    }),
    "restore": () => overwolf.windows.getCurrentWindow((result) => {
        overwolf.windows.restore(result.window.id);
    }),
    "minimize": () => overwolf.windows.getCurrentWindow((result) => {
        overwolf.windows.minimize(result.window.id);
    }),
    "maximize": () => overwolf.windows.getCurrentWindow((result) => {
        overwolf.windows.maximize(result.window.id);
    }),
    "support": () => overwolf.windows.getCurrentWindow((result) => {
        return;
    }),
    "settings": () => overwolf.windows.getCurrentWindow((result) => {
        return;
    }),
}

export default function WindowActionButton({type})
{

    if (!type) throw new Error("Button has no type");

    return (
        <div onClick={() => actionFunction[`${type}`]()} className={"w-[32px] h-[32px] bg-stone-900 flex flex-col justify-center items-center " + actionHover[`${type}`].toString()}>
            <img alt={`${type}`} className={`w-full h-full`} src={actionImage[`${type}`]} />
        </div>
    );
}