import React from "react"

import '../../assets/css/tailwind.css';
import '../../assets/css/overlay.css';

import GameVision from "../@modules/GameVision"

export default function OverlayWindow(): JSX.Element
{
    return (<div className={"flex flex-row justify-center items-center w-[100vw] h-[100vh]"}>
        <GameVision />
    </div>)
}