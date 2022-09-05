/**
 * @hidden
 */
export type JsonVisitor = (value: any) => any;

/**
 * @hidden
 */
export class JsonTree {
  public static visit(
    data: any,
    visitor: JsonVisitor,
    depth: number = 0,
  ): void {
    if (depth > 1000) {
      throw new Error(
        'Tree depth exceeded maximum of 1000, verify the data is not self-referential',
      );
    }

    if (data == null) {
      return;
    } else if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        JsonTree.visit(item, visitor, depth + 1);
        const newValue = visitor(item);

        if (newValue !== undefined) {
          data[i] = newValue;
        }
      }
    } else if (typeof data === 'object') {
      const keys = Object.keys(data);
      for (const key of keys) {
        JsonTree.visit(data[key], visitor, depth + 1);
        const newValue = visitor(data[key]);
        if (newValue !== undefined) {
          data[key] = newValue;
        }
      }
    }
  }

  public static async asyncVisit(
    data: any,
    visitor: (value: any) => Promise<any>,
    depth: number = 0,
  ): Promise<void> {
    if (depth > 1000) {
      throw new Error(
        'Tree depth exceeded maximum of 1000, verify the data is not self-referential',
      );
    }

    if (data == null) {
      return;
    } else if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        await JsonTree.asyncVisit(item, visitor, depth + 1);
        await visitor(item);
      }
    } else if (typeof data === 'object') {
      const keys = Object.keys(data);
      for (const key of keys) {
        await JsonTree.asyncVisit(data[key], visitor, depth + 1);
        await visitor(data[key]);
      }
    }
  }
}
