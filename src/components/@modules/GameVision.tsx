
import { takeScreenshot, fetchGameData, fetchEventData, wait } from '../../utilities';
import * as tf from "@tensorflow/tfjs";
//import * as tensorFlow from '@tensorflow/tfjs-node';
import * as coco from "@tensorflow-models/coco-ssd";
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
// import * as ML5 from 'ml5';
// import * as tensorCore from '@tensorflow/tfjs-core';

const React = require('react');
const { useRef, useState, useEffect } = require('react');




/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
 * This is a react component that takes the screen shot  *
 * and applies some version of tensorflow algo's to tag  *
 * frames and draw boxes of recognized items in the game *
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import '../../assets/css/tailwind.css';

export default function Component()
{

    const [loopTime, setLoopTime] = useState(new Object as Number)
    const containerRef = useRef(new Object() as HTMLDivElement);

    const getInfo = async () => await fetchGameData();

    const getConfig = async () => ({
        crop: {
            x: 320,
            y: 240,
            width: await getInfo().then(gep => {
                if (gep === undefined) return 0;
                return gep.logicalWidth - (320 * 2);
            }),
            height: await getInfo().then(gep => {
                if (gep === undefined) return 0;
                return gep.logicalHeight - (240 * 2);
            }),
        }
    })

    const getSrc = async () => await takeScreenshot({
        crop: (await getConfig()).crop,
    });

    const drawRectangle = async (res, detector) => {

        if (!detector) {
            console.error("no detector");
            return;
        }

        for (let i = 0; i < res.length; i++) {

            const { label, confidence, bbox } = res[i];
            const [x, y, width, height] = bbox;

            const ObjectLabel = new HTMLDivElement();

            ObjectLabel.innerHTML = `${label.toLowerCase()}`;

            const ObjectBox = new HTMLDivElement();

            ObjectBox.appendChild(ObjectLabel);
            ObjectBox.classList.add("absolute", "border-2", "border-rose-700", `left-[${x + (await getConfig()).crop.x}px]`, `top-[${y + (await getConfig()).crop.y}px]`, `w-[${width}px]`, `h-[${height}px]`);

            containerRef.current.appendChild(ObjectBox);
        }

        await wait(loopTime as number);
        containerRef.current.childNodes.forEach(child => {
            containerRef.current.removeChild(child);
        });
    }

    useEffect(() => {

        coco.load().then(detector => {
            setInterval(async () => {
                const image = new Image();

                image.width = (await getConfig()).crop.width
                image.height = (await getConfig()).crop.height

                image.src = await getSrc();

                image.classList.add("fixed", `left-[${(await getConfig()).crop.x}px]`, `top-[${(await getConfig()).crop.y}px]`, `w-[${(await getConfig()).crop.width}px]`, `h-[${(await getConfig()).crop.height}px]`);

                const child = containerRef.current.appendChild(image);
                const result = await detector.detect(image);

                console.log(JSON.stringify(result));

                // drawRectangle(result, detector);

            }, loopTime as number);
        }).catch(e => console.error(e));
    }, []);

    return (
        <div ref={containerRef} className={ "relative invisible w-[100vw] h-[100vh]"}>

        </div>
    )
}