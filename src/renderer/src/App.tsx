import { Component, useContext } from "solid-js";

import { StateContext } from "./components/utility/StateProvider";
import { Pomodoro } from "./components/page/pomodoro";

const App: Component = () => {
  const { state, setState } = useContext(StateContext);

  console.log(state.pomodoro.remainingTime);
  console.log(state.pomodoro.isRunning);

  return (
    <div>
      <button
        onClick={(): void => {
          console.log("on click");
          setState("pomodoro", "remainingTime", 1000 * 20);
          setState("pomodoro", "isRunning", true);
        }}
      >
        start
      </button>

      <Pomodoro
        remainingTime={state.pomodoro.remainingTime}
        isRunning={state.pomodoro.isRunning}
        isFinished={state.pomodoro.isFinished}
        isPaused={state.pomodoro.isPaused}
        round={state.pomodoro.round}
      />
    </div>
  );
};

export default App;
