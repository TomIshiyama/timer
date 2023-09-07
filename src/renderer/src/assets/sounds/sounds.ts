import breakPond from "./break_pond.mp3";
import breakRiver from "./break_river.mp3";
import turnoverAlarm from "./interval_alarm.mp3";
import turnoverBat from "./interval_bat.mp3";
import turnoverBell from "./interval_bell.mp3";
import turnoverChichen from "./interval_chichen.mp3";
import turnoverMicrowave from "./interval_microwave.mp3";
import turnoverPigeon from "./interval_pigeon.mp3";
import turnoverPigeon2 from "./interval_pigeon2.mp3";
import turnoverSword from "./interval_sword.mp3";
import workClockLight from "./work_clock_light.mp3";
import workClockTower from "./work_clock_tower.mp3";
import workClock1 from "./work_clock1.mp3";
import workOven from "./work_oven.mp3";
import workSwordsmith from "./work_swordsmith.mp3";
import workTimerHarry from "./work_timer_harry.mp3";
import workTimerNormal from "./work_timer_normal.mp3";
import finishApplause from "./finish_applause.mp3";
import finishFireworks from "./finish_fireworks.mp3";
import finishShoutsApplause from "./finish_shouts_applause.mp3";

// create audio on root for preload
// HACK: too much scripts.
const breakPondAudio = new Audio(breakPond);
const breakRiverAudio = new Audio(breakRiver);
const turnoverAlarmAudio = new Audio(turnoverAlarm);
const turnoverBatAudio = new Audio(turnoverBat);
const turnoverBellAudio = new Audio(turnoverBell);
const turnoverChichenAudio = new Audio(turnoverChichen);
const turnoverMicrowaveAudio = new Audio(turnoverMicrowave);
const turnoverPigeonAudio = new Audio(turnoverPigeon);
const turnoverPigeon2Audio = new Audio(turnoverPigeon2);
const turnoverSwordAudio = new Audio(turnoverSword);
const workClockLightAudio = new Audio(workClockLight);
const workClockTowerAudio = new Audio(workClockTower);
const workClock1Audio = new Audio(workClock1);
const workOvenAudio = new Audio(workOven);
const workSwordsmithAudio = new Audio(workSwordsmith);
const workTimerHarryAudio = new Audio(workTimerHarry);
const workTimerNormalAudio = new Audio(workTimerNormal);
const finishApplauseAudio = new Audio(finishApplause);
const finishFireworksAudio = new Audio(finishFireworks);
const finishShoutsApplauseAudio = new Audio(finishShoutsApplause);

export const BREAK_AUDIO = {
  pond: breakPondAudio,
  river: breakRiverAudio
} as const;

export const TURNOVER_AUDIO = {
  alarm: turnoverAlarmAudio,
  bat: turnoverBatAudio,
  bell: turnoverBellAudio,
  chichen: turnoverChichenAudio,
  microwave: turnoverMicrowaveAudio,
  pigeon: turnoverPigeonAudio,
  pigeon2: turnoverPigeon2Audio,
  sword: turnoverSwordAudio
} as const;

export const WORK_AUDIO = {
  clockLight: workClockLightAudio,
  clockTower: workClockTowerAudio,
  clock1: workClock1Audio,
  oven: workOvenAudio,
  swordsmith: workSwordsmithAudio,
  timerHarry: workTimerHarryAudio,
  timerNormal: workTimerNormalAudio
} as const;

export const ALMOST_DONE_AUDIO = {
  clockTower: workClockTowerAudio,
  oven: workOvenAudio,
  timerHarry: workTimerHarryAudio
} as const;

export const DONE_AUDIO = {
  applause: finishApplauseAudio,
  fireworks: finishFireworksAudio,
  shouts: finishShoutsApplauseAudio
};

const cloneAudio = (audio: HTMLAudioElement): HTMLAudioElement =>
  audio.cloneNode() as HTMLAudioElement;

export type TurnOver = keyof typeof TURNOVER_AUDIO;
export type Work = keyof typeof WORK_AUDIO;
export type AlmostDone = keyof typeof ALMOST_DONE_AUDIO;
export type Break = keyof typeof BREAK_AUDIO;
export type Done = keyof typeof DONE_AUDIO;

export const pauseAudioLoop = async (audio: HTMLAudioElement | undefined): Promise<void> => {
  if (audio == null) return;
  audio.pause();
};
export const playAudioLoop = async (audio: HTMLAudioElement): Promise<HTMLAudioElement> => {
  audio.loop = true;
  audio.play();
  return audio;
};

// HACK: use the partial adaptation of function
export const playTurnOver = async (audio: TurnOver, volume = 0.5): Promise<void> => {
  const clone = cloneAudio(TURNOVER_AUDIO[audio]);
  clone.volume = volume;
  clone.play();
};

export const playWork = async (audio: Work): Promise<void> => cloneAudio(WORK_AUDIO[audio]).play();
export const playBreak = async (audio: Break): Promise<void> =>
  cloneAudio(BREAK_AUDIO[audio]).play();

export const playDone = async (audio: Done): Promise<void> => cloneAudio(DONE_AUDIO[audio]).play();

export const playAlmostDone = async (_audio: AlmostDone): Promise<void> => {
  const audio = cloneAudio(ALMOST_DONE_AUDIO[_audio]);
  await audio.play();
  await new Promise((resolve) => setTimeout(resolve, 1750));
  await audio.pause();
};
