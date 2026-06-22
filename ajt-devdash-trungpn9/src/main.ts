import "../style.css";

import { getProducts } from "./api";
import { renderState } from "./ui";

import type { AppState } from "./state";

const appElement: HTMLElement | null =
  document.querySelector("#app");

if (appElement === null) {
  throw new Error("App container not found");
}

const app: HTMLElement = appElement;

async function initializeApp(): Promise<void> {
  let state: AppState = {
    status: "loading",
  };

  app.innerHTML = renderState(state);

  try {
    const result = await getProducts();

    state = {
      status: "success",
      data: result.products,
    };

    app.innerHTML = renderState(state);
  } catch (error: unknown) {
    const message: string =
      error instanceof Error
        ? error.message
        : "Unknown error";

    state = {
      status: "error",
      message,
    };

    app.innerHTML = renderState(state);
  }
}

void initializeApp();