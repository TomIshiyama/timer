import { minutesToUnix, unixToMinutes } from "@renderer/utils/helper";
import { Component, JSX, createSignal, onMount, useContext } from "solid-js";
import { db } from "../../../utils/dexie";
import { omit } from "../../../utils/util";
import { StateContext } from "../../utility/StateProvider/StateProvider";
import { Presentational } from "./Presentational";
import { DEFAULT_VALUES } from "./const";
import { PreferenceProps, PreferenceState, Values } from "./type";

const pickValue: (keyof PreferenceState)[] = ["work", "shortBreak", "longBreak"];

const INIT_VALUES = unixToMinutes(DEFAULT_VALUES, pickValue);

export const PreferenceContainer: Component<PreferenceProps> = (props) => {
  const [getValues, setValues] = createSignal<Values>(INIT_VALUES);
  const { state, setState } = useContext(StateContext);

  // HACK: type definition.
  const onChangeTimeValue: JSX.ChangeEventHandler<HTMLInputElement, Event> = async (e) => {
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
    db.preference.update("preference", minutesToUnix(getValues(), pickValue));
    setState("preference", minutesToUnix(getValues(), pickValue));
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

  const onChangeSoundsValue: JSX.ChangeEventHandler<HTMLInputElement, Event> = async (e) => {
    let parsed: string | number = Number.parseFloat(e.target.value);
    console.log("sound", getValues(), e.target.name, e.target.value, parsed);
    if (Number.isNaN(parsed)) {
      parsed = e.target.value;
    }

    setValues(
      (prev) =>
        ({
          ...prev,
          sounds: {
            ...prev.sounds,
            [e.target.name]: parsed
          }
        } as Values)
    );
    console.log("sound", getValues());

    db.preference.update("preference", {
      sounds: getValues().sounds
    });
    setState("preference", "sounds", getValues().sounds);
  };

  // TODO:  this is base change hander.
  // HACK:
  const onChangeValue: JSX.ChangeEventHandler<HTMLInputElement, Event> = async (e) => {
    setValues(
      (prev) =>
        ({
          ...prev,
          [e.target.name]: Number(e.target.value)
        } as Values)
    );
    db.preference.update("preference", { [e.target.name]: Number(e.target.value) });
    setState("preference", { [e.target.name]: Number(e.target.value) });
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
        initialValues == null ? DEFAULT_VALUES : unixToMinutes(omit(initialValues, "id"), pickValue)
      );
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <Presentational
      defaultValues={{ ...getValues() }}
      getValues={getValues}
      onChangeWork={onChangeTimeValue}
      onChangeShortBreak={onChangeTimeValue}
      onChangeLongBreak={onChangeTimeValue}
      onChangeLongBreakInterval={onChangeValue} //FIXME: should use onChangeValue?
      onChangeSectionLimit={onChangeSectionValue}
      // Tired of increasing by the number of Inputs
      onChangeOpacity={onChangeValue}
      onChangeSoundsParams={onChangeSoundsValue}
    />
  );
};
