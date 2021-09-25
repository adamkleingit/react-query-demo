import { useState } from "react";
import { createStore } from "reusable";

export const useFilter = createStore(() => {
  return useState("");
});
