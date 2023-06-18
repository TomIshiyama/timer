import { createContext, onCleanup, onMount } from "solid-js";
import { SetStoreFunction, Store, createStore } from "solid-js/store";
import { JSX } from "solid-js";
import { State } from "./StateProvider/types";

type ContextType<T = object> = {
  state: Store<T>;
  setState: SetStoreFunction<T>;
};

const initialState: State = {
  pomodoro: {
    remainingTime: 0,
    isRunning: false,
    isFinished: false,
    isPaused: false,
    round: {
      current: 0,
      limit: 0
    }
  },
  timer: { remainingTime: 0, isRunning: false, isFinished: false }
};

export const StateContext = createContext<ContextType<State>>({
  state: initialState,
  setState: () => {}
});

export function StateProvider(props: { children: JSX.Element }): JSX.Element {
  // TODO: 記録設定された値から、pomodoro の初期値を設定する
  const [state, setState] = createStore(initialState);

  console.log("state provider");

  // Refactor: count down
  let id = null;
  onMount(() => {
    id = setInterval(() => {
      if (!state.pomodoro.isRunning) return;
      console.log("count down", state.pomodoro.remainingTime);
      setState("pomodoro", "remainingTime", (prev) => prev - 1000);
      // 0秒以下になったらタイマーを止める
      if (state.pomodoro.remainingTime <= 0) {
        clearInterval(id);
        setState("pomodoro", {
          remainingTime: 0,
          isRunning: false,
          isFinished: true
        });
      }
    }, 1000);
  });
  onCleanup(() => clearInterval(id));

  return (
    <StateContext.Provider value={{ state, setState }}>{props.children}</StateContext.Provider>
  );
}
