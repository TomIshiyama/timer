import { useLocation, useNavigate } from "@solidjs/router";
import { Component, Show, createEffect, createSignal, on, onCleanup, onMount, JSX } from "solid-js";
import { styled } from "solid-styled-components";
import { IconGearSVG } from "../../../assets/IconGearSVG";
import { IconTomatoSVG } from "../../../assets/IconTomatoSVG";
import { COLOR, GRID } from "../../../utils/color";
import { Tab } from "../Tab/Tab";
import { routes } from "@renderer/components/utility/Routes/routes";

type Props = {
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  isOpen?: boolean;
};

const ICON_SIZE = "clamp(16px, 6vh, 32px)";

export const SIDEBAR_WIDTH = {
  collapsed: `calc(${ICON_SIZE} + ${GRID.base}px)`,
  expanded: "88px"
} as const;

const tabListWithIcon = [
  // { value: "/", label: "Home" },
  {
    value: routes.pomodoro.path,
    label: (
      <>
        <IconTomatoSVG /> Pomodoro
      </>
    ) // should use icon
  },
  {
    value: routes.preference.path,
    label: (
      <>
        <IconGearSVG /> Preference
      </>
    )
  }
];

const tabListOnlyIcon = [
  // { value: "/", label: "Home" },
  {
    value: routes.pomodoro.path,
    label: <IconTomatoSVG size={ICON_SIZE} />
  },
  {
    value: routes.preference.path,
    label: <IconGearSVG size={ICON_SIZE} />
  }
];

const TRANSITION_MS = 200;
const RESIZE_DEBOUNCE_MS = 200;

export const Menu: Component<Props> = (props) => {
  const navigate = useNavigate();

  const location = useLocation();

  const [showLabel, setShowLabel] = createSignal(props.isOpen ?? false);
  createEffect(
    on(
      () => props.isOpen,
      (isOpen) => {
        if (!isOpen) {
          setShowLabel(false);
          return;
        }
        const id = setTimeout(() => setShowLabel(true), TRANSITION_MS);
        onCleanup(() => clearTimeout(id));
      },
      { defer: true }
    )
  );

  const [resizeTick, setResizeTick] = createSignal(0);
  onMount(() => {
    let id: ReturnType<typeof setTimeout>;
    const onResize = (): void => {
      if (showLabel()) return;
      clearTimeout(id);
      id = setTimeout(() => setResizeTick((n) => n + 1), RESIZE_DEBOUNCE_MS);
    };
    window.addEventListener("resize", onResize);
    onCleanup(() => {
      window.removeEventListener("resize", onResize);
      clearTimeout(id);
    });
  });

  const tabRemountKey = (): string => `${showLabel()}-${resizeTick()}`;

  const renderTab = (): JSX.Element => (
    <Tab
      disableBorder
      tabList={showLabel() ? tabListWithIcon : tabListOnlyIcon}
      orientation={"vertical"}
      onChange={(path): void => navigate(path)}
      defaultValue={location.pathname}
    />
  );

  return (
    <div
      style={{
        position: "fixed",
        background: `${COLOR.dark.base.background}`,
        "border-right": `1px solid ${COLOR.dark.footer.border}`,
        width: props.isOpen ? SIDEBAR_WIDTH.expanded : SIDEBAR_WIDTH.collapsed,
        transition: `all ${TRANSITION_MS}ms ease-in-out 0s`
      }}
    >
      <Show when={tabRemountKey()} keyed>
        {renderTab()}
      </Show>
      <Button onClick={props.onClick}>{props.isOpen ? "<" : ">"}</Button>
    </div>
  );
};

const Button = styled("button")((props) => ({
  background: "transparent",
  position: "absolute",
  bottom: 0,
  padding: "8px",
  color: "white",
  border: "none",
  cursor: "pointer",
  right: 0,
  "&:hover": {
    backgroundColor: COLOR.dark.tab.hover
  }
}));
