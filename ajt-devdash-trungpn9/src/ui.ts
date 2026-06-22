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
    </div>
  `;
}

export function renderProducts(
  products: Product[]
): string {
  return `
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      ${products
        .map(
          (product: Product) => `
            <div class="rounded-lg border p-4 shadow-sm">
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
                Stock: ${product.stock}
              </p>
            </div>
          `
        )
        .join("")}
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