import type { Product } from "./types";

export function renderSearchControls(): string {
  return `
    <div class="mb-6 flex gap-4">
      <input
        id="search-input"
        type="text"
        placeholder="Search products..."
        class="flex-1 rounded border p-3"
      />

      <select
        id="sort-select"
        class="rounded border p-3"
      >
        <option value="asc">
          Price ↑
        </option>

        <option value="desc">
          Price ↓
        </option>
      </select>

      <select
        id="category-select"
        class="rounded border p-3"
      >
      </select>
    </div>
  `;
}

export function renderCategoryOptions(
  categories: string[]
): string {
  return `
    <option value="">
      All Categories
    </option>

    ${categories
      .map(
        (
          category: string
        ) => `
          <option value="${category}">
            ${category}
          </option>
        `
      )
      .join("")}
  `;
}

export function renderProducts(
  products: Product[]
): string {
  return `
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      ${products
        .map(
          (
            product: Product
          ) => `
            <div
              class="product-card cursor-pointer rounded-lg border p-4 shadow-sm"
              data-id="${product.id}"
            >
              <img
                src="${product.thumbnail}"
                alt="${product.title}"
                class="h-40 w-full rounded object-cover"
              />

              <h3 class="mt-3 font-semibold">
                ${product.title}
              </h3>

              <p class="text-gray-500">
                ${product.category}
              </p>

              <p class="font-bold">
                $${product.price}
              </p>

              <p>
                Stock:
                ${product.stock}
              </p>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

export function renderProductDetail(
  product: Product
): string {
  return `
    <div
      id="product-modal"
      class="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <div
        class="w-full max-w-lg rounded bg-white p-6"
      >
        <button
          id="close-modal"
          class="mb-4 rounded border px-3 py-1"
        >
          Close
        </button>

        <img
          src="${product.thumbnail}"
          alt="${product.title}"
          class="mb-4 h-60 w-full rounded object-cover"
        />

        <h2 class="text-2xl font-bold">
          ${product.title}
        </h2>

        <p class="mt-3">
          ${product.description}
        </p>

        <p class="mt-2">
          Category:
          ${product.category}
        </p>

        <p>
          Brand:
          ${product.brand}
        </p>

        <p>
          Price:
          $${product.price}
        </p>

        <p>
          Rating:
          ${product.rating}
        </p>

        <p>
          Stock:
          ${product.stock}
        </p>
      </div>
    </div>
  `;
}

export function renderLoading(): string {
  return `
    <div class="p-8 text-center">
      Loading products...
    </div>
  `;
}

export function renderError(
  message: string
): string {
  return `
    <div class="rounded border border-red-300 bg-red-50 p-4">
      <p class="font-bold text-red-600">
        Error
      </p>

      <p>${message}</p>
    </div>
  `;
}