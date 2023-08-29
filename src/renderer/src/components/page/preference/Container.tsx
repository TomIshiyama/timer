import { minutesToUnix, unixToMinutes } from "@renderer/utils/helper";
import { Component, JSX, createSignal, onMount, useContext } from "solid-js";
import { db } from "../../../utils/dexie";
import { omit } from "../../../utils/util";
import { StateContext } from "../../utility/StateProvider/StateProvider";
import { Presentational } from "./Presentational";
import { DEFAULT_VALUES } from "./const";
import { PreferenceProps, Values } from "./type";

const INIT_VALUES = unixToMinutes(DEFAULT_VALUES, ["sectionLimit", "longBreakInterval"]);

export const PreferenceContainer: Component<PreferenceProps> = (props) => {
  const [getValues, setValues] = createSignal<Values>(INIT_VALUES);
  const { state, setState } = useContext(StateContext);

  // HACK: type definition.
  const onChangeValue: JSX.ChangeEventHandler<HTMLInputElement, Event> = async (e) => {
    console.log(getValues());
    setValues(
      (prev) =>
        ({
          ...prev,
          [e.target.name]: Number(e.target.value)
        } as Values)
    );
    console.log(getValues());
    //
    db.preference.update(
      "preference",
      minutesToUnix(getValues(), ["sectionLimit", "longBreakInterval"])
    );
    setState("preference", minutesToUnix(getValues(), ["sectionLimit", "longBreakInterval"]));
  };

  const onChangeSectionValue: JSX.ChangeEventHandler<HTMLInputElement, Event> = async (e) => {
    setValues(
      (prev) =>
        ({
          ...prev,
          sectionLimit: Number(e.target.value)
        } as Values)
    );
    db.preference.update("preference", { sectionLimit: Number(e.target.value) });
    setState("preference", "sectionLimit", Number(e.target.value));
  };

  onMount(async () => {
    try {
      console.log("state", state);
      const initialValues = await db.preference.get({ id: "preference" });
      if (initialValues == null) {
        await db.preference.add({
          ...DEFAULT_VALUES,
          id: "preference"
        });
      }
      setValues(
        initialValues == null
          ? DEFAULT_VALUES
          : unixToMinutes(omit(initialValues, "id"), ["sectionLimit", "longBreakInterval"])
      );
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <Presentational
      defaultValues={{ ...getValues() }}
      getValues={getValues}
      onChangeWork={onChangeValue}
      onChangeShortBreak={onChangeValue}
      onChangeLongBreak={onChangeValue}
      onChangeLongBreakInterval={onChangeSectionValue}
      onChangeSectionLimit={onChangeSectionValue}
    />
  );
};
