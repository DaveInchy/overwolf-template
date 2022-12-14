
import "core-js/web";
import "regenerator-runtime";

export const GameClassId = 21816; // New world

export const Config = {
  package: require('../package.json'),
  metadata: require('../app/manifest.json').meta,
  server: {
    domain: "new-world-buddy.vercel.app",
    ssl: true,
  },
  debug: {
    standalone: true,
    start: "/bin/bash npm run debug",
    host: "0.0.0.0",
    port: 8080,
    ssl: false,
  },
  build: {
    standalone: true,
    start: "/bin/bash npm run build",
  },
  games: [GameClassId],
}

export const WindowNames = {
  desktop: 'desktop',
  overlay: 'overlay',
  service: 'service',
};

export const AppWindows = [
  WindowNames.desktop,
  WindowNames.overlay,
];

export const Hotkeys = {
  restart: 'restart',
};

export const GamesFeatures = new Map<number, string[]>([
  [
    GameClassId,
    [
      "gep_internal", // Events that are registered by the game
      "game_info", // Basic info about the game and installation
    ]
  ]
]);

export const GameClassIds = Array.from(GamesFeatures.keys());

