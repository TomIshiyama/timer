import { StateContext } from "@renderer/components/utility/StateProvider/StateProvider";
import { getTimeLiteral, getTimeWithoutHours } from "@renderer/utils/time";
import { Component, useContext } from "solid-js";
import { TIMER_RUNNING_STATUS, TIMER_STATE_TRANSITION } from "../pomodoro/type";

export const Home: Component = () => {
  const { state, setState } = useContext(StateContext);

  console.log(state.pomodoro.remainingTime);

  return (
    <div>
      <h1>hello home</h1>
      <button
        onClick={(): void => {
          console.log("on click");
          setState("pomodoro", {
            stateTransition: TIMER_STATE_TRANSITION.running,
            status: TIMER_RUNNING_STATUS.work
          });
        }}
      >
        start
      </button>

      <button
        onClick={(): void => {
          const time = getTimeWithoutHours(state.pomodoro.remainingTime);
          const title = getTimeLiteral(time);
          console.log("click ipc");
          window.electronAPI.setTrayTitle(title);
        }}
      >
        IPC Time
      </button>
    </div>
  );
};
