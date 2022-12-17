// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/index.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-window.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-listener.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-hotkeys.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-games.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-games-events.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-game-listener.d.ts"/>

import "core-js/stable";
import "regenerator-runtime";

import WindowManager from "../window";
import { wait } from "../utilities";

import debug from "../debug";

import {
    WindowNames,
} from "../global";


// React Components
import { mountRoot } from "../modules/owReact/mount";
import Component from "../components/@views/DesktopWindow";

// import owWindowState = overwolf.windows.WindowStateEx;
// import owEvents = overwolf.games.events;
// import owGames = overwolf.games;
// import owUtils = overwolf.utils;

class DesktopController extends WindowManager {
    private static _instance: any;
    public static _windowName = WindowNames.desktop;
    public _app: any;

    private constructor() {
        super(DesktopController._windowName);
        debug.log("window", "Initializing '" + DesktopController._windowName + "' instance");
    }

    public static instance() {
        if (!this._instance) {
            this._instance = new DesktopController();
        }
        debug.log("window", "Instance '" + DesktopController._windowName + "' successfully initialized");
        return this._instance;
    }

    public async run() {
        this._app = mountRoot(Component);
        this.setWindowBehavior('Overwolf Desktop Window');
        this.setHotkeyBehavior();
        this.selectDragHandle();
    }

    public async selectDragHandle() {
        var elem: Element | undefined = undefined;
        while (!elem) {
            await wait(1000);
            elem = document.querySelector("#window_topbar") || undefined;
        }
        this.setDrag(elem as HTMLElement);
    }

}

DesktopController.instance().run();