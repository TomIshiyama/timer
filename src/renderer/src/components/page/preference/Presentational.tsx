import { Input } from "@renderer/components/ui/form/Input";
import { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { PreferenceProps } from "./type";
import { Container } from "../../ui/Container/Container";

const Wrapper = styled("div")`
  width: 100%;
  display: flex;
`;

export const Presentational: Component<PreferenceProps> = (props) => {
  return (
    <Wrapper>
      <Container>
        <h2>Preference</h2>

        <Input
          label="work time"
          placeholder="work time e.g. 25"
          onChange={props.onChangeWork}
          name="work"
          type="number"
          defaultValue={props.defaultValues.work}
          max={100}
          min={0}
        />
        <Input
          label="short break time"
          placeholder="short break time"
          onChange={props.onChangeShortBreak}
          name="shortBreak"
          type="number"
          defaultValue={props.defaultValues.shortBreak}
          max={60}
          min={0}
        />
        <Input
          label="long break time"
          placeholder="long break time"
          onChange={props.onChangeLongBreak}
          name="longBreak"
          type="number"
          defaultValue={props.defaultValues.longBreak}
          max={60}
          min={0}
        />
        <Input
          label="long break interval"
          placeholder="long break interval"
          onChange={props.onChangeLongBreakInterval}
          name="longBreakInterval"
          type="number"
          defaultValue={props.defaultValues.longBreakInterval}
          max={60}
          min={0}
        />
        <Input
          label="section limit"
          placeholder="section limit"
          onChange={props.onChangeSectionLimit}
          name="sectionLimit"
          type="number"
          defaultValue={props.defaultValues.sectionLimit}
          max={60}
          min={0}
        />

        <Input
          label="opacity"
          placeholder="opacity"
          onChange={props.onChangeOpacity}
          name="opacity"
          type="number"
          defaultValue={props.defaultValues.opacity}
          max={1.0}
          min={0}
          step={0.01}
        />
      </Container>
    </Wrapper>
  );
};
