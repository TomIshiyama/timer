import { Routes as OriginRoutes, Route } from "@solidjs/router";
import { For, JSX } from "solid-js";
import { routes } from "./routes";

export const Routes = (): JSX.Element => {
  return (
    <OriginRoutes>
      <For each={Object.values(routes)}>
        {(item, idx): JSX.Element => <Route path={item.path} component={item.component} />}
      </For>
    </OriginRoutes>
  );
};
