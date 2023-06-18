import { render } from "solid-js/web";
import "./assets/index.css";
import App from "./App";
import { StateProvider } from "./components/utility/StateProvider";

render(
  () => (
    <StateProvider>
      <App />
    </StateProvider>
  ),
  document.getElementById("root") as HTMLElement
);
