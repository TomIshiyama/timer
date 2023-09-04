import { styled } from "solid-styled-components";

export const Container = styled("div")`
  padding: 16px;
  width: 90%;
`;

export const Wrapper = styled("div")<{ bgcolor?: string }>((props) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  ...(props.bgcolor ? { background: props.bgcolor } : null)
}));
