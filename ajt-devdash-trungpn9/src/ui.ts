import type { Product } from "./types";
import type { AppState } from "./state";

export function renderState(
  state: AppState
): string {
  switch (state.status) {
    case "loading":
      return `
        <div class="flex justify-center py-10">
          <p class="text-lg">Loading products...</p>
        </div>
      `;

    case "error":
      return `
        <div class="max-w-md mx-auto mt-10 rounded border border-red-300 bg-red-50 p-4">
          <p class="font-semibold text-red-600">
            Failed to load products
          </p>
          <p class="text-red-500">
            ${state.message}
          </p>
        </div>
      `;

    case "success":
      return `
        <div class="max-w-7xl mx-auto p-6">
          <h1 class="mb-6 text-3xl font-bold">
            Product Dashboard
          </h1>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            ${state.data
              .map(
                (product: Product) => `
                  <div class="rounded-lg border p-4 shadow-sm">
                    <img
                      src="${product.thumbnail}"
                      alt="${product.title}"
                      class="h-40 w-full object-cover rounded"
                    />

                    <h3 class="mt-3 font-semibold">
                      ${product.title}
                    </h3>

                    <p class="mt-2 text-gray-600">
                      ${product.category}
                    </p>

                    <p class="mt-2 font-bold">
                      $${product.price}
                    </p>

                    <p class="text-sm text-gray-500">
                      Stock: ${product.stock}
                    </p>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      `;
  }
}