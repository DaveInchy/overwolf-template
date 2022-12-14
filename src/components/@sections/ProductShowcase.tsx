import React from 'react';

import '../../assets/css/tailwind.css';

import ReactAnim from '../@modules/ReactAnim';

export default function ProductShowcase(): JSX.Element
{
    return (
        <div className={"flex flex-auto justify-center items-center p-6 w-full bg-slate-700"}>
            <div className={"display-block w-full min-h-[100vh] p-6"}>
                <h1 className={"text-4xl text-slate-300 text-center my-8 uppercase"}>Overwolf Application build w/ React & Typescript</h1>
                <div className={ "flex flex-row justify-center items-center"}>
                    <ReactAnim/>
                </div>
            </div>
        </div>
    );
}