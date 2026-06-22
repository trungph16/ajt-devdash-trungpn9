import type { ProductResponse } from "./types";

const BASE_URL: string = "https://dummyjson.com";

export async function fetchJson<T>(
  url: string
): Promise<T> {
  try {
    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status}`
      );
    }

    const data: T = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Unknown error");
  }
}

export async function getProducts(): Promise<ProductResponse> {
  return fetchJson<ProductResponse>(
    `${BASE_URL}/products`
  );
}