export type DeepPartial<T> = {
  [K in keyof T]?: DeepPartial<T[K]>
};

type Primitive = string | number | boolean | bigint | symbol | null | undefined;
// eslint-disable-next-line ts/no-unsafe-function-type
type LeafTypes = Date | Function | RegExp;
export type DeepKeyOf<T>
  = T extends Primitive | LeafTypes ? never
    : T extends (infer U)[]
      ? `${number}` | `${number}.${DeepKeyOf<U>}`
      : {
          [K in keyof T & (string | number)]:
          T[K] extends Primitive | LeafTypes
            ? K
            : T[K] extends (infer U)[]
              ? K | `${K}.${DeepKeyOf<T[K]>}`
              : T[K] extends Record<string, any>
                ? K | `${K}.${DeepKeyOf<T[K]>}`
                : K
        }[keyof T & (string | number)];
