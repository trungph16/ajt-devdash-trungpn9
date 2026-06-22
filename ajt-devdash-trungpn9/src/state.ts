import type { Product } from "./types";

export type AppState =
  | {
      status: "loading";
    }
  | {
      status: "success";
      data: Product[];
    }
  | {
      status: "error";
      message: string;
    };