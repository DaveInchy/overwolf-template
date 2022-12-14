// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/index.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-window.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-listener.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-hotkeys.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-games.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-games-events.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-game-listener.d.ts"/>

import "core-js/web";
import "regenerator-runtime";

import React from "react"

import WindowManager from "../window";
import { wait } from "../utilities";

import debug from "../debug";

import {
  WindowNames,
} from "../global";


// React Components
import { mountRoot } from "../modules/owReact/mount";
import Component from "../components/@views/OverlayWindow";

// import owWindowState = overwolf.windows.WindowStateEx;
// import owEvents = overwolf.games.events;
// import owGames = overwolf.games;
// import owUtils = overwolf.utils;

class OverlayController extends WindowManager {

  private static _instance: any;
  public static _windowName = WindowNames.desktop;
  public _app: any;

  public constructor() {
    super(OverlayController._windowName);
    debug.log("window", "Initializing '" + OverlayController._windowName + "' instance");
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new OverlayController();
    }
    debug.log("window", "Instance '" + OverlayController._windowName + "' successfully initialized");
    return this._instance;
  }

  public async run() {
    this._app = mountRoot(Component);
    this.setWindowBehavior('Overlay Window Title');
    this.setHotkeyBehavior();
    this.selectDragHandle();
  }

  public async selectDragHandle() {
    var elem: Element | undefined = undefined;
    while (elem === undefined) {
      await wait(1000);
      elem = document.querySelector("#window_topbar") || undefined;
    }
    this.setDrag(elem as HTMLElement);
  }

}

OverlayController.instance().run();