// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/index.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-window.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-listener.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-hotkeys.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-games.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-games-events.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-game-listener.d.ts"/>

import "core-js/web";
import "regenerator-runtime";

import {
    IOWGamesEventsDelegate,
    OWGameListenerDelegate,
    OWGameListener,
    OWGames,
    OWGamesEvents,
    OWHotkeys,
    OWListenerDelegate,
    OWWindow,
} from "@overwolf/overwolf-api-ts";

import {
    Hotkeys,
    WindowNames,
    GamesFeatures,
    GameClassId,
    GameClassIds
} from "./global";

import debug from "./debug";

export function getTimeString() {
    var time = new Date();

    var hours: any = time.getUTCHours() + 0; // Yearly summer/winter time switch
    var minutes: any = time.getUTCMinutes();
    var seconds: any = time.getUTCSeconds();

    var ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours + 1 ? hours + 1 : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds;
    seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + " " + ampm;
}

export function getCircularReplacer()
{
    const seen = new WeakSet();
    return (k, v) => {
        if (typeof v === "object" && v !== null) {
            if (seen.has(v)) {
                return;
            }
            seen.add(v);
        }
        return v;
    };
};

export function wait(ms: number)
{
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function takeScreenshot(
    params?: any
): Promise<string> {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => reject(), 2000);
        overwolf.media.getScreenshotUrl({
            roundAwayFromZero: true,
            ...params,
        },(result) => {
            clearTimeout(timeoutId);
            if (result.url) {
                resolve(result.url);
            } else {
                reject(result.error);
            }
        });
    });
}

export function setupStream(
    params?: any
): Promise<MediaStream> {
    return new Promise(async (resolve, reject) => {
        var stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                mediaSource: 'desktop',
            },
        } as any).then(feed => {
            const { videoElement } = params;
            videoElement.srcObject = feed;
        }).catch(error => {
            debug.error(`utilities::setupStream`, `Caught Error: ${error.toString()}`);
        })
        return stream;
    });
}

export async function fetchGameData()
{
    try {
        var data: overwolf.games.GetRunningGameInfoResult = await new Promise<overwolf.games.GetRunningGameInfoResult>((resolve) => {
            overwolf.games.getRunningGameInfo((result) => resolve(result));
        });
        return data || await OWGames.getRunningGameInfo();
    } catch (e) {
        throw new Error(`fetchGameData => ${e}`);
    }
    return;
}

export async function fetchEventData()
{
    try {
        var data: overwolf.games.events.GetInfoResult<any> = await new Promise<overwolf.games.events.GetInfoResult<any>>((resolve) => {
            overwolf.games.events.getInfo((result) => resolve(result));
        });
        return data || await OWGamesEvents.prototype.getInfo();
    } catch (e) {
        throw new Error(`fetchEventData => ${e}`);
    }
    return;
}

export async function isSupportedGameRunning():
Promise <boolean>
{
    const info = await fetchGameData();
    return info && info.isRunning && await isSupportedGame() ? true : false;
}

  // Identify whether the RunningGameInfo object we have references a supported game
export async function isSupportedGame():
Promise<boolean>
{
    const info = await fetchGameData();
    return GameClassIds.includes(info ? info.classId : GameClassId);
}

export function getRequiredFeatures(): any {
    return GamesFeatures.get(GameClassId);
}

export async function initGameDataCollectors(
    onInfoUpdates: CallableFunction,
    onEventsUpdates: CallableFunction):
Promise<void>
{
    try {
        const gameFeatures = getRequiredFeatures();

        if (gameFeatures && gameFeatures.length) {
            var gameInfoUpdates = overwolf.games.events.onInfoUpdates2;
            var gameEventsUpdates = overwolf.games.events.onNewEvents;

            gameInfoUpdates.addListener((event) => {
                const info = event.info;
                onInfoUpdates(info);
            });

            gameEventsUpdates.addListener((event) => {
                const data: overwolf.games.events.GameEvent[] = event.events.map(item => item);
                onEventsUpdates(data);
            });
        }
    } catch (e) {
        throw new Error(`initGameDataCollectors => ${e}`);
    }
    return;
}

export async function initEventListeners(
    onInfoUpdates: CallableFunction,
    onNewEvents: CallableFunction,
    onGameStarted: CallableFunction,
    onGameEnded: CallableFunction
):Promise<{
    owGameEventsListener: OWGamesEvents | undefined,
    owGameStateListener: OWGameListener | undefined
}>
{
    var owGamesEventsDelegate: IOWGamesEventsDelegate;
    var owGameStateDelegate: OWGameListenerDelegate;

    var owGameEventsListener: OWGamesEvents | undefined = undefined;
    var owGameStateListener: OWGameListener | undefined = undefined;

    try {
        const gameFeatures = getRequiredFeatures();

        if (gameFeatures && gameFeatures.length) {

            owGamesEventsDelegate = {
                onNewEvents: (data) => {
                    onNewEvents(data)
                },
                onInfoUpdates: (info) => {
                    onInfoUpdates(info);
                },
            };

            owGameStateDelegate = {
                onGameStarted: (info) => {
                    onGameStarted(info);
                },
                onGameEnded: (info) => {
                    onGameEnded(info);
                },
            }

            owGameEventsListener = new OWGamesEvents(
                owGamesEventsDelegate, gameFeatures
            ) || undefined;

            owGameStateListener = new OWGameListener(
                owGameStateDelegate
            ) || undefined;

        }
    } catch (e) {
        throw new Error(`initEventListeners => ${e}`);
    }

    return {
        owGameEventsListener,
        owGameStateListener
    };
}