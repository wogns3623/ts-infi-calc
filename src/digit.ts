import { ToString } from './stringLiteral';

export type DecimalDigitNumberLiteral = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type DecimalDigitCharLiteral = ToString<DecimalDigitNumberLiteral>;

type DecimalDigitNumberToCharMap = {
  0: '0';
  1: '1';
  2: '2';
  3: '3';
  4: '4';
  5: '5';
  6: '6';
  7: '7';
  8: '8';
  9: '9';
};

export type IsDigitChar<C extends string> = C extends DecimalDigitCharLiteral ? true : false;

export type ToDigitChar<N extends DecimalDigitNumberLiteral> = DecimalDigitNumberToCharMap[N];
