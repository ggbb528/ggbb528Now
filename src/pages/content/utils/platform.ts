import { AppError } from './error';

export enum PlatformTypes {
  TWITCH = 1,
  TWITCH_CLIPS = 2,
}

let platform: PlatformTypes;
export function getPlatform() {
  if (platform) {
    return platform;
  }

  const { hostname } = window.location;
  if (hostname === 'clips.twitch.tv') {
    platform = PlatformTypes.TWITCH_CLIPS;
  } else if (hostname.endsWith('.twitch.tv')) {
    platform = PlatformTypes.TWITCH;
  } else {
    throw new AppError(`unsupported platform ${hostname}`);
  }

  return platform;
}

export function isValidPlatform() {
  return [PlatformTypes.TWITCH, PlatformTypes.TWITCH_CLIPS].includes(
    getPlatform()
  );
}
