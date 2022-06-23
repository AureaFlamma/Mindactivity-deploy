import React from "react";
import { render, screen } from "@testing-library/react";
import MyTimer from "./index.js";

test("testing whether the start/pause button renders", async () => {
  render(<MyTimer />);
  let testTimer = screen.getByLabelText("startPauseButton");
  expect(testTimer).toBeInTheDocument();
});