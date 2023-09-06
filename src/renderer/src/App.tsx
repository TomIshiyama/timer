import { Router, hashIntegration, useNavigate } from "@solidjs/router";
import { Component, createSignal, onMount, useContext } from "solid-js";
import { Routes } from "./components/utility/Routes";
import { StateContext, StateProvider } from "./components/utility/StateProvider/StateProvider";
import { TimeMovement } from "./components/utility/TimeMovement";
import { Menu } from "./components/ui/Menu/Menu";
import { COLOR } from "./utils/color";
import { styled } from "solid-styled-components";

const App: Component = () => {
  return (
    <StateProvider>
      <TimeMovement>
        <Router source={hashIntegration()}>
          <Content />
        </Router>
      </TimeMovement>
    </StateProvider>
  );
};

export default App;

// HACK: remove inline styles.
const Content: Component = () => {
  const navigate = useNavigate();
  const { state } = useContext(StateContext);
  const [getOpen, setOpen] = createSignal(false);
  onMount(() => {
    navigate("/pomodoro");
  });

  return (
    <ContentWrapper>
      <div style={{ display: "flex", opacity: 0.1 + state.preference.opacity ?? 1 * 0.9 }}>
        <Menu
          onClick={(): void => {
            setOpen((prev) => !prev);
          }}
          isOpen={getOpen()}
        />
        <main
          data-test={"main-content"}
          style={{
            width: "100%",
            background: `${COLOR.dark.base.background}`,
            "margin-left": getOpen() ? "88px" : "48px",
            transition: "all 0.2s ease-in-out 0s"
          }}
        >
          <Routes />
        </main>
      </div>
    </ContentWrapper>
  );
};

const ContentWrapper = styled("div")`
  background: ${COLOR.dark.base.backgroundWrapper};
`;
