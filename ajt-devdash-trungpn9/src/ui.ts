import type { Product } from "./types";

export function renderLoading(): string {
  return "<p>Loading...</p>";
}

export function renderError(
  message: string
): string {
  return `
    <div class="error">
      ${message}
    </div>
  `;
}

export function renderProducts(
  products: Product[]
): string {
  return `
    <div class="products">
      ${products
        .map(
          (product: Product) => `
            <div class="card">
              <img
                src="${product.thumbnail}"
                alt="${product.title}"
              />

              <h3>${product.title}</h3>

              <p>$${product.price}</p>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}