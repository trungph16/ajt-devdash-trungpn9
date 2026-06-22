import type { Product } from "./types";

export type LoadingState = {
  kind: "loading";
};

export type SuccessState = {
  kind: "success";
  data: Product[];
};

export type ErrorState = {
  kind: "error";
  message: string;
};

export type AppState =
  | LoadingState
  | SuccessState
  | ErrorState;

export function assertNever(
  value: never
): never {
  throw new Error(
    `Unexpected state: ${JSON.stringify(
      value
    )}`
  );
}