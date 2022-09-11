import { DecimalDigitNumberLiteral as DN } from './digit';
import { ToString } from './stringLiteral';

export type NumberData<N extends number | bigint> = { original: N; string: ToString<N> };

export type WithCarry<C extends DN, V extends DN> = { c: C; v: V };

export type SerializeWC<T extends WithCarry<any, any>> = T extends WithCarry<infer W, infer C>
  ? `${W}:${C}`
  : never;

export type DeserializeWC<T extends string> =
  T extends `${infer W extends number}:${infer C extends number}` ? { w: W; c: C } : never;

const a = Number.MAX_SAFE_INTEGER;
