import "../style.css";

import {
  getProducts,
  getCategories,
} from "./api";

import {
  renderProducts,
  renderLoading,
  renderError,
  renderSearchControls,
  renderCategoryOptions,
  renderProductDetail,
} from "./ui";

import { debounce } from "./utils";

import type { Product } from "./types";
import type { AppState } from "./state";

const appElement: HTMLElement | null =
  document.querySelector("#app");

if (appElement === null) {
  throw new Error(
    "App container not found"
  );
}

const app: HTMLElement =
  appElement;

function filterProducts(
  keyword: string,
  products: Product[]
): Product[] {
  return products.filter(
    (
      product: Product
    ): boolean =>
      product.title
        .toLowerCase()
        .includes(
          keyword.toLowerCase()
        )
  );
}

function filterByCategory(
  category: string,
  products: Product[]
): Product[] {
  if (category === "") {
    return products;
  }

  return products.filter(
    (
      product: Product
    ): boolean =>
      product.category ===
      category
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

function attachModalEvents(
  products: Product[]
): void {
  const cards =
    document.querySelectorAll<HTMLElement>(
      ".product-card"
    );

  cards.forEach(
    (
      card: HTMLElement
    ): void => {
      card.addEventListener(
        "click",
        (): void => {
          const id: number =
            Number(
              card.dataset.id
            );

          const product =
            products.find(
              (
                item: Product
              ): boolean =>
                item.id === id
            );

          if (
            product ===
            undefined
          ) {
            return;
          }

          document.body.insertAdjacentHTML(
            "beforeend",
            renderProductDetail(
              product
            )
          );

          const closeButton =
            document.querySelector<HTMLElement>(
              "#close-modal"
            );

          closeButton?.addEventListener(
            "click",
            (): void => {
              document
                .querySelector(
                  "#product-modal"
                )
                ?.remove();
            }
          );
        }
      );
    }
  );
}

function renderDashboard(
  products: Product[],
  categories: string[]
): void {
  const initialProducts =
    sortProducts(
      products,
      "asc"
    );

  app.innerHTML = `
    <div class="mx-auto max-w-7xl p-6">
      <h1 class="mb-6 text-3xl font-bold">
        Product Dashboard
      </h1>

      ${renderSearchControls()}

      <div id="product-list">
        ${renderProducts(
          initialProducts
        )}
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

  const categorySelect =
    document.querySelector<HTMLSelectElement>(
      "#category-select"
    );

  const productList =
    document.querySelector<HTMLElement>(
      "#product-list"
    );

  if (
    searchInput === null ||
    sortSelect === null ||
    categorySelect ===
      null ||
    productList === null
  ) {
    return;
  }

  categorySelect.innerHTML =
    renderCategoryOptions(
      categories
    );

  const updateProducts =
    (): void => {
      const keyword: string =
        searchInput.value;

      const category: string =
        categorySelect.value;

      const order:
        | "asc"
        | "desc" =
        sortSelect.value ===
        "desc"
          ? "desc"
          : "asc";

      const filteredBySearch =
        filterProducts(
          keyword,
          products
        );

      const filteredByCategory =
        filterByCategory(
          category,
          filteredBySearch
        );

      const sortedProducts =
        sortProducts(
          filteredByCategory,
          order
        );

      productList.innerHTML =
        renderProducts(
          sortedProducts
        );

      attachModalEvents(
        sortedProducts
      );
    };

  const handleSearch =
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

  categorySelect.addEventListener(
    "change",
    updateProducts
  );

  attachModalEvents(
    initialProducts
  );
}

async function initializeApp(): Promise<void> {
  let state: AppState = {
    status: "loading",
  };

  app.innerHTML =
    renderLoading();

  try {
    const [
      productResponse,
      categories,
    ] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);

    state = {
      status: "success",
      data:
        productResponse.products,
    };

    if (
      state.status ===
      "success"
    ) {
      renderDashboard(
        state.data,
        categories
      );
    }
  } catch (
    error: unknown
  ) {
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