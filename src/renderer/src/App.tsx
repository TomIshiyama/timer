import { Router, hashIntegration } from "@solidjs/router";
import { Component } from "solid-js";
import { Routes } from "./components/utility/Routes";
import { StateProvider } from "./components/utility/StateProvider/StateProvider";
import { TimeMovement } from "./components/utility/TimeMovement";
import { Menu } from "./components/ui/Menu/Menu";
import { COLOR } from "./utils/color";

const App: Component = () => {
  return (
    <StateProvider>
      <TimeMovement>
        <Router source={hashIntegration()}>
          <div style={{ display: "flex" }}>
            <Menu />
            <main
              data-test={"main-content"}
              style={{
                width: "100%",
                background: `${COLOR.dark.base.background}`
              }}
            >
              <Routes />
            </main>
          </div>
        </Router>
      </TimeMovement>
    </StateProvider>
  );
};

export default App;
