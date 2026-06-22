import "../style.css";

import { getProducts } from "./api";

import {
  renderProducts,
  renderLoading,
  renderError,
  renderSearchControls,
} from "./ui";

import { debounce } from "./utils";

import type { Product } from "./types";
import type { AppState } from "./state";

const appElement: HTMLElement | null =
  document.querySelector("#app");

if (appElement === null) {
  throw new Error("App container not found");
}

const app: HTMLElement = appElement;

function filterProducts(
  keyword: string,
  products: Product[]
): Product[] {
  const normalizedKeyword: string =
    keyword.toLowerCase();

  return products.filter(
    (product: Product): boolean =>
      product.title
        .toLowerCase()
        .includes(normalizedKeyword)
  );
}

function sortProducts(
  products: Product[],
  order: "asc" | "desc"
): Product[] {
  return [...products].sort(
    (
      a: Product,
      b: Product
    ): number =>
      order === "asc"
        ? a.price - b.price
        : b.price - a.price
  );
}

function renderDashboard(
  products: Product[]
): void {
  const initialProducts: Product[] =
    sortProducts(products, "asc");

  app.innerHTML = `
    <div class="mx-auto max-w-7xl p-6">
      <h1 class="mb-6 text-3xl font-bold">
        Product Dashboard
      </h1>

      ${renderSearchControls()}

      <div id="product-list">
        ${renderProducts(initialProducts)}
      </div>
    </div>
  `;

  const searchInput =
    document.querySelector<HTMLInputElement>(
      "#search-input"
    );

  const sortSelect =
    document.querySelector<HTMLSelectElement>(
      "#sort-select"
    );

  const productList =
    document.querySelector<HTMLElement>(
      "#product-list"
    );

  if (
    searchInput === null ||
    sortSelect === null ||
    productList === null
  ) {
    return;
  }

  const updateProducts =
    (): void => {
      const keyword: string =
        searchInput.value;

      const order: "asc" | "desc" =
        sortSelect.value === "desc"
          ? "desc"
          : "asc";

      const filteredProducts: Product[] =
        filterProducts(
          keyword,
          products
        );

      const sortedProducts: Product[] =
        sortProducts(
          filteredProducts,
          order
        );

      productList.innerHTML =
        renderProducts(
          sortedProducts
        );
    };

  const handleSearch: () => void =
    debounce(
      updateProducts,
      300
    );

  searchInput.addEventListener(
    "input",
    handleSearch
  );

  sortSelect.addEventListener(
    "change",
    updateProducts
  );
}

async function initializeApp(): Promise<void> {
  let state: AppState = {
    status: "loading",
  };

  app.innerHTML = renderLoading();

  try {
    const result = await getProducts();

    state = {
      status: "success",
      data: result.products,
    };

    if (state.status === "success") {
      renderDashboard(
        state.data
      );
    }
  } catch (error: unknown) {
    const message: string =
      error instanceof Error
        ? error.message
        : "Unknown error";

    state = {
      status: "error",
      message,
    };

    app.innerHTML =
      renderError(
        state.message
      );
  }
}

void initializeApp();