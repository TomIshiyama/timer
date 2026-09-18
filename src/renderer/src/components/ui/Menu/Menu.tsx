import { useLocation, useNavigate } from "@solidjs/router";
import { Component, Show, createEffect, createSignal, on, onCleanup, JSX } from "solid-js";
import { styled } from "solid-styled-components";
import { IconGearSVG } from "../../../assets/IconGearSVG";
import { IconTomatoSVG } from "../../../assets/IconTomatoSVG";
import { COLOR } from "../../../utils/color";
import { Tab } from "../Tab/Tab";
import { routes } from "@renderer/components/utility/Routes/routes";

type Props = {
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  isOpen?: boolean;
};

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
    label: <IconTomatoSVG />
  },
  {
    value: routes.preference.path,
    label: <IconGearSVG />
  }
];

// サイドバー幅のトランジション時間に合わせる。
const TRANSITION_MS = 200;

export const Menu: Component<Props> = (props) => {
  const navigate = useNavigate();

  const location = useLocation();

  // Kobalte の Indicator は選択タブの寸法を測って位置を決めるが、測り直すのは
  // 選択が変わったときだけで、ラベルを入れ替えて高さが変わっても追従しない。
  // そこで Tab ごと作り直して初期化からやり直させる。
  // 入れ替えは幅の変化を待ってから行う。途中で測ると animation 中の値を拾う。
  // 畳むときは即座でよい。アイコンのみの高さは幅に依らないため。
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

  const renderTab = (tabList: typeof tabListWithIcon): JSX.Element => (
    <Tab
      disableBorder
      tabList={tabList}
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
        width: props.isOpen ? "88px" : "48px",
        transition: `all ${TRANSITION_MS}ms ease-in-out 0s`
      }}
    >
      <Show when={showLabel()}>{renderTab(tabListWithIcon)}</Show>
      <Show when={!showLabel()}>{renderTab(tabListOnlyIcon)}</Show>
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
