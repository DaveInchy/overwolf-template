import debug from './debug';
import { Config } from './global';

export async function fetchCache() {
    var res = await fetch(`https://www.new-world-map.com/markers.json`, {
        method: 'GET',
    })
    return await res.json();
}