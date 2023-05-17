import { Component } from "solid-js";

const menus = {
  pomodoro: "pomodoro",
  timer: "timer",
  stopwatch: "stopwatch",
  alarm: "alarm",
  worldClock: "worldClock"
} as const;

export const Tab: Component = () => {
  // state どのタブなのか

  return (
    <div>
      {/* <Tabs>
        <TabsContent>hoge</TabsContent>
      </Tabs> */}
      hoge
    </div>
  );
};
