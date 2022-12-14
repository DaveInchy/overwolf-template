
const React = require("react");
import { useLayoutEffect, useEffect, useRef, useState } from "react"
import { wait } from "../../utilities";

import '../../assets/css/tailwind.css';
import imageSrc from '../../resources/branding/react/react-native.svg';

export default function Component()
{
    const [rotation, setRotation] = useState(0);
    const [style, setStyle] = useState({});

    useEffect(() => {
        setStyle({
            object: {
                transition: ``,
                transform: `rotate(${rotation}deg)`,
            }
        })
        setRotation(rotation + 1);
    }, []);

    useEffect(() => {
        setStyle({
            object: {
                transition: ``,
                transform: `rotate(${rotation}deg)`,
            }
        })
    }, [rotation]);

    useLayoutEffect(() => {
        (async () => {
            await wait(10);
            setRotation(rotation + 1);
        })()
    }, [rotation]);

    return (<img style={style.object} src={imageSrc} />)
}