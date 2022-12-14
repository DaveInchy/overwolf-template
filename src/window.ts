// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/index.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-window.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-listener.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-hotkeys.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-games.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-games-events.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-game-listener.d.ts"/>

import "core-js/web";
import "regenerator-runtime";

import { OWWindow, OWHotkeys } from "@overwolf/overwolf-api-ts";
import debug from './debug';
import { Hotkeys, AppWindows, WindowNames } from "./global";

export default class WindowManager {

  maximized: boolean;
  windowName: string;
  currWindow: OWWindow;
  mainWindow: OWWindow;

  constructor(windowName) {

    this.maximized = false;
    this.windowName = windowName;
    this.mainWindow = new OWWindow('service');
    this.currWindow = new OWWindow(windowName);

    this.setWindowBehavior()

    return this;
  }

  async setWindowBehavior(windowTitle: string = this.windowName) {
    try {

      document.title = windowTitle;

      if (!this.maximized) {
        this.currWindow.maximize();
      } else {
        this.currWindow.minimize();
      }
      this.maximized = !this.maximized;
    }
    catch (e) {
      debug.error('window', `setWindowBehaviour => ${e}`);
    }

    return true;
  }

  async getWindowState() {
    debug.log('window', `Getting window state for ${JSON.stringify(this.currWindow)}`);
    return await this.currWindow.getWindowState();
  }

  async setDrag(elem: HTMLElement) {
    this.currWindow.dragMove(elem);
  }

  async setHotkeyBehavior() {

    OWHotkeys.onHotkeyDown(Hotkeys.restart, async (): Promise<void> => {
      debug.log("hotkey", `pressed hotkey for ${Hotkeys.restart.toString()}`);
      window.location.href = window.location.href + "?restart=true";
      return;
    });

  }
}