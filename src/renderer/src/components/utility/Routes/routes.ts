import { Component } from "solid-js";
import { Pomodoro } from "../../page/pomodoro";
import { Home } from "../../page/home/index";
import { Preference } from "../../page/preference";

type Route = {
  path: string;
  component: Component;
  children?: Route;
};

type Routes = {
  [key: string]: Route;
};

export const routes = {
  // home: { path: "/", component: Home },
  pomodoro: { path: "/pomodoro", component: Pomodoro as Component },
  preference: { path: "/preference", component: Preference as Component }
  //   alarm:{ path: "/alarm", component={}} ,
  //   counter:{ path: "/counter", component={}},
  //   stopwatch:{ path: "/stopwatch", component={}},
  //   worldclock:{ path: "/worldclock", component={}}
} as const;
