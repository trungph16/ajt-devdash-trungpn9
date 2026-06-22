import { getProducts } from "./api";

import {
  renderLoading,
  renderProducts,
  renderError,
} from "./ui";

const appElement: HTMLElement | null =
  document.querySelector("#app");

if (appElement === null) {
  throw new Error("App container not found");
}

const app: HTMLElement = appElement;

async function initializeApp(): Promise<void> {
  try {
    app.innerHTML = renderLoading();

    const result = await getProducts();

    app.innerHTML = renderProducts(
      result.products
    );
  } catch (error: unknown) {
    const message: string =
      error instanceof Error
        ? error.message
        : "Unknown error";

    app.innerHTML = renderError(message);
  }
}

void initializeApp();