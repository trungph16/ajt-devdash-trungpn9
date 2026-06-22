export function debounce(
  callback: () => void,
  delay: number
): () => void {
  let timeoutId: number;

  return (): void => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback();
    }, delay);
  };
}

export class Repository<
  T extends { id: number }
> {
  private readonly items: T[];

  constructor(
    items: T[]
  ) {
    this.items = items;
  }

  public findById(
    id: number
  ): T | undefined {
    return this.items.find(
      (
        item: T
      ): boolean =>
        item.id === id
    );
  }

  public getAll(): T[] {
    return this.items;
  }
}