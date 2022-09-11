export type ParseInt<Str extends string> = Str extends `${infer N extends number | bigint}`
  ? N
  : never;

export type Len<Str extends string> = Str['length'];

export type ToString<T extends string | number | bigint | boolean> = `${T}`;
