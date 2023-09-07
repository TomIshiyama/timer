import { Component, JSX, createEffect, createMemo, onCleanup, onMount, useContext } from "solid-js";
import {
  PomodoroRunningStatus,
  TIMER_RUNNING_STATUS,
  TIMER_STATE_TRANSITION
} from "../../page/pomodoro/type";
import { StateContext } from "../StateProvider/StateProvider";
import { useTimeMovement } from "./useTimeMovement";
import {
  playAudioLoop,
  WORK_AUDIO,
  pauseAudioLoop,
  BREAK_AUDIO,
  Break,
  Work
} from "@renderer/assets/sounds/sounds";
import { getTimeWithoutHours, getTimeLiteral } from "@renderer/utils/time";

const INTERVAL_DELAY = 1000;

type Props = {
  children: JSX.Element;
};

export const TimeMovement: Component<Props> = (props) => {
  // HACK: 呼び出すWrapper を設けても良い
  const { state, setState } = useContext(StateContext);

  const { getNextPomodoroParameters, isNextFinish, clear, playTurnOverAudio } = useTimeMovement();

  let id: number | undefined = undefined;
  createEffect(() => {
    const futureTime = Date.now() + state.pomodoro.setTime;
    setState("pomodoro", "futureTime", futureTime);
    if (state.pomodoro.stateTransition !== TIMER_STATE_TRANSITION.running) {
      clearInterval(state.pomodoro.intervalId);
      clear(id);
      return;
    }
    // NOTE: window オブジェクトを明示することで NodeJS.Timer を防止する
    id = window.setInterval(() => {
      if (state.pomodoro.stateTransition !== TIMER_STATE_TRANSITION.running) {
        clearInterval(state.pomodoro.intervalId);
        // setState("pomodoro", "intervalId", undefined);
        // clearInterval(id);
        // pauseAudioLoop(state.pomodoro.currentAudio);
        // setState("pomodoro", "currentAudio", undefined);
        clear(id);

        return;
      }
      const currentTime = Date.now();
      const remainingTime = state.pomodoro.futureTime - currentTime;
      setState("pomodoro", { remainingTime });
      sendTimetoTray(state.pomodoro.remainingTime);
      if (state.pomodoro.futureTime < currentTime) {
        pauseAudioLoop(state.pomodoro.currentAudio);
        playTurnOverAudio();
        const params = getNextPomodoroParameters();
        setState("pomodoro", {
          ...params,
          ...(isNextFinish() && {
            stateTransition: TIMER_STATE_TRANSITION.done
          }),
          ...(state.pomodoro.status !== TIMER_RUNNING_STATUS.work && {
            section: {
              ...state.pomodoro.section,
              current: state.pomodoro.section.current + 1
            }
          })
        });
        console.log("intervalId", id, state.pomodoro.intervalId);
        clearInterval(id);
        return;
      }
    }, INTERVAL_DELAY);

    setState("pomodoro", "intervalId", id);
    console.log("useeffect final ", state, id);
  });

  onCleanup(() => {
    console.log("onCleanup");
    clear(id);
  });

  const sendTimetoTray = async (time: number): Promise<void> => {
    const title = getTimeLiteral(getTimeWithoutHours(time));
    window.electronAPI.setTrayTitle(title);
  };

  const getAudio = (
    status: PomodoroRunningStatus,
    sounds: { workSound: Work; shortBreak: Break; longBreak: Break }
  ): HTMLAudioElement => {
    switch (status) {
      case TIMER_RUNNING_STATUS.work:
        return WORK_AUDIO[sounds.workSound];
      case TIMER_RUNNING_STATUS.shortBreak:
        return BREAK_AUDIO[sounds.shortBreak];
      case TIMER_RUNNING_STATUS.longBreak:
        return BREAK_AUDIO[sounds.longBreak];
    }
  };
  /**
   *  Audio settings
   */

  const isRunning = createMemo(
    () => state.pomodoro.stateTransition === TIMER_STATE_TRANSITION.running
  );
  createEffect(() => {
    console.log("onchange playAudio");
    if (!state.pomodoro.currentAudio) return;
    playAudioLoop(state.pomodoro.currentAudio);
  });

  // NOTE: On the only pomodoro page,
  // user can hear the sound while counting down .
  createEffect(() => {
    if (!state.pomodoro.currentAudio) return;
    state.pomodoro.currentAudio.volume = state.preference.sounds.volume;
  });

  return props.children;
};
