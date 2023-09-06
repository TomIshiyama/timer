import { createContext, onMount } from "solid-js";
import { SetStoreFunction, Store, createStore } from "solid-js/store";
import { JSX } from "solid-js";
import { State } from "./types";
import {
  TIMER_RUNNING_STATUS,
  TIMER_STATE_TRANSITION
} from "@renderer/components/page/pomodoro/type";
import { omit } from "@renderer/utils/util";
import { db } from "../../../utils/dexie";
import { DEFAULT_VALUES } from "../../page/preference/const";

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
  timer: { remainingTime: 0, isRunning: false, isFinished: false },
  preference: { ...DEFAULT_VALUES }
};

// This mounting is for setting initial state with indexedDB
export async function fetchState(): Promise<State> {
  // get setting data from indexedDB
  const initPreference = await db.preference.get({ id: "preference" });

  if (initPreference == null) {
    await db.preference.add({
      ...DEFAULT_VALUES,
      id: "preference"
    });
  }
  const { sectionLimit, ...preference } =
    initPreference == null ? DEFAULT_VALUES : omit(initPreference, "id");

  console.log("pre", preference);
  return {
    pomodoro: {
      ...mockPomodoroTimer,
      work: preference.work,
      shortBreak: preference.shortBreak,
      longBreak: preference.longBreak,
      longBreakInterval: preference.longBreakInterval,
      remainingTime: preference.work,
      setTime: preference.work,
      futureTime: 0,
      section: {
        current: 1,
        limit: sectionLimit
      }
    },
    timer: {
      remainingTime: 0,
      isFinished: false,
      isRunning: false
    },
    preference: { ...preference, sectionLimit }
  };
}

export const StateContext = createContext<ContextType<State>>({
  state: initialState,
  setState: () => {}
});

export function StateProvider(props: { children: JSX.Element }): JSX.Element {
  // FIXME: should be able to manually set the following values.
  const [state, setState] = createStore(initialState);

  onMount(async () => {
    const tmp = await fetchState();
    setState(tmp);
  });

  return (
    <StateContext.Provider value={{ state, setState }}>{props.children}</StateContext.Provider>
  );
}
