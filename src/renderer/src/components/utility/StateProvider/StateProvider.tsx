import { createContext, onCleanup, onMount } from "solid-js";
import { SetStoreFunction, Store, createStore } from "solid-js/store";
import { JSX } from "solid-js";
import { State } from "./types";
import {
  TIMER_RUNNING_STATUS,
  TIMER_STATE_TRANSITION
} from "@renderer/components/page/pomodoro/type";

type ContextType<T = object> = {
  state: Store<T>;
  setState: SetStoreFunction<T>;
};

// FIXME: should be able to manually set the following values.
export const mockPomodoroTimer = {
  work: 25 * 60 * 1000,
  shortBreak: 5 * 60 * 1000,
  longBreak: 15 * 60 * 1000,
  status: TIMER_RUNNING_STATUS.work,
  stateTransition: TIMER_STATE_TRANSITION.initial,
  remainingTime: 25 * 60 * 1000,
  setTime: 25 * 60 * 1000,
  longBreakInterval: 4,
  section: {
    current: 1,
    limit: 10
  },
  intervalId: undefined // HACK: I wanna use null property
};

const initialState: State = {
  pomodoro: JSON.parse(JSON.stringify(mockPomodoroTimer)),
  timer: { remainingTime: 0, isRunning: false, isFinished: false }
};

export const StateContext = createContext<ContextType<State>>({
  state: initialState,
  setState: () => {}
});

export function StateProvider(props: { children: JSX.Element }): JSX.Element {
  // FIXME: should be able to manually set the following values.
  const [state, setState] = createStore(initialState);

  return (
    <StateContext.Provider value={{ state, setState }}>{props.children}</StateContext.Provider>
  );
}
