// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/index.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-window.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-listener.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-hotkeys.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-games.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-games-events.d.ts"/>
// <reference path="../node_modules/@overwolf/overwolf-api-ts/dist/ow-game-listener.d.ts"/>

import "core-js/web";
import "regenerator-runtime";

import { OWWindow } from '@overwolf/overwolf-api-ts';
import { isSupportedGameRunning } from "../utilities";
import { AppWindows, GameClassId } from "../global";
import debug from "../debug";

import AppLaunchTriggeredEvent = overwolf.extensions.AppLaunchTriggeredEvent;

class BackgroundController {
  private static _instance: BackgroundController;
  private _windows: Record<string, OWWindow> = {};

  public constructor() {
    for (let i = 0; i < AppWindows.length; i++) {
      this._windows[AppWindows[i]] = new OWWindow(AppWindows[i]);
      debug.log("background", `Populating window dictionairy with "${AppWindows[i].toLowerCase()}"`);
    }

    overwolf.extensions.onAppLaunchTriggered.addListener(
      e => this.onAppLaunchTriggered(e)
    );
  };

  public static instance(): BackgroundController {
    if (!BackgroundController._instance) {
      BackgroundController._instance = new BackgroundController();
    }
    return BackgroundController._instance;
  }

  public async run() {
    this.toggleWindows();
  }

  private async onAppLaunchTriggered(e: AppLaunchTriggeredEvent) {
    debug.log("background", `Game (${GameClassId}) has been launched.`);

    if (!e) {
      return;
    }

    this.toggleWindows();

    if (e.origin.includes('gamelaunchevent')) {
      this.toggleWindows(true)
    }
  }

  private async toggleWindows(forceOpen: boolean = false) {
    try {
      if (await isSupportedGameRunning() || forceOpen) {
        debug.log("background", "The supported game (" + String(GameClassId) + ") is running");
        for (let i = 0; i < AppWindows.length; i++) {
          const window = this._windows[AppWindows[i]];
          const getWindowState = () => window.getWindowState().then(v => v.window_state);
          window.restore();
          window.maximize();
          debug.log("background", `${AppWindows[i].toLowerCase()} window restored or ${getWindowState()}`);
        }
      } else {
        debug.log("background", "The supported game (" + String(GameClassId) + ") stopped running");
        for (let i = 0; i < AppWindows.length; i++) {
          const window = this._windows[AppWindows[i]];
          const getWindowState = () => window.getWindowState().then(v => v.window_state);
          window.minimize();
          window.hide();
          debug.log("background", `${AppWindows[i].toLowerCase()} window hidden or ${JSON.stringify(getWindowState())}`);
        }
      }
    } catch (e) {
      debug.error("background", `toggleWindows => ${e}`);
    }
  }


}

BackgroundController.instance().run();
