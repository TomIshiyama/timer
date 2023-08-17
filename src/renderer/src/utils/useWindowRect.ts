import { Accessor, createSignal, onCleanup, onMount } from "solid-js";

type Rect = {
  height: number;
  width: number;
};

type UseWindowRectType = () => { getRect: Accessor<Rect> };

// thinking: add a optional parameter for adding/removing eventlistener.
export const useWindowRect: UseWindowRectType = () => {
  const [getRect, setRect] = createSignal<Rect>({
    height: window.innerHeight,
    width: window.innerWidth
  });

  const handler = (): void => {
    setRect({
      //   height: event.currentTarget.innerHeight,
      //   width: event.currentTarget.innerWidth
      height: window.innerHeight,
      width: window.innerWidth
    });
  };

  onMount(() => {
    window.addEventListener("resize", handler);
  });

  onCleanup(() => {
    window.removeEventListener("resize", handler);
  });

  return { getRect };
};
