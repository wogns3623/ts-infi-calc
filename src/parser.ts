import T from '@test';
import { ParseInt, ToString } from './stringLiteral';

// 49 digits
type MaxPossibleInteger = 1234567890123456789012345678901234567890123456789n;
type MaxPossibleIntegerString = '1234567890123456789012345678901234567890123456789';
// prettier-ignore
type MaxPossibleIntegerStringArray =  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

type StringToCharArray<S extends string> = S extends `${infer C}${infer R}`
  ? [C, ...StringToCharArray<R>]
  : [];

type TestStringToArray = T.Test.All<
  [
    T.Eq<['1', '2', '3'], StringToCharArray<'123'>>,
    T.Eq<MaxPossibleIntegerStringArray, StringToCharArray<MaxPossibleIntegerString>>,
  ]
>;

// Check maximum
type TestStringToArrayMax = StringToCharArray<'1234567890123456789012345678901234567890123456789'>;
type TestStringToArrayOver =
  StringToCharArray<'12345678901234567890123456789012345678901234567890'>;

type CharArrayToString<A extends string[]> = A extends [
  infer C extends string,
  ...infer R extends string[],
]
  ? `${C}${CharArrayToString<R>}`
  : '';

type TestCharArrayToString = T.Test.All<
  [
    T.Eq<'123', CharArrayToString<['1', '2', '3']>>,
    T.Eq<MaxPossibleIntegerString, CharArrayToString<MaxPossibleIntegerStringArray>>,
  ]
>;

export type NumberToCharArray<N extends number | bigint> = StringToCharArray<ToString<N>>;

type TestNumberToCharArray = T.Test.All<
  [
    T.Eq<['1', '2', '3'], NumberToCharArray<123>>,
    T.Eq<MaxPossibleIntegerStringArray, NumberToCharArray<MaxPossibleInteger>>,
  ]
>;

export type CharArrayToNumber<A extends string[]> = ParseInt<CharArrayToString<A>>;

type TestCharArrayToNumber = T.Test.All<
  [
    T.Eq<123, CharArrayToNumber<['1', '2', '3']>>,
    T.Eq<MaxPossibleInteger, CharArrayToNumber<MaxPossibleIntegerStringArray>>,
    T.Eq<MaxPossibleInteger, CharArrayToNumber<NumberToCharArray<MaxPossibleInteger>>>,
  ]
>;

// // it loop through object keys
// type ForLoop<I extends Record<string, string>> = {
//   // do something with K
//   [K in keyof I]: DeserializeWC<I[K]>;
// };

// type A = {
//   1: '1:1';
//   2: '2:3';
//   3: '5:7';
//   5: '11:13';
//   4: '17:19';
// };

// type B = ForLoop<A>;
