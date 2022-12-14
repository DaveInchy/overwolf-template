import React from 'react';

export default function RenderCanvas(): JSX.Element
{
    return (<div className={"w-[100%] h-[100%] flex flex-row justify-center items-center"}>
        <canvas className={"min-w-full min-h-full bg-stone-200/20"} />
    </div>)
}