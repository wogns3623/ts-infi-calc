// Types witch are not exported from the module

declare const trueSymbol: unique symbol;
declare const errorSymbol: unique symbol;

export interface Pass {
  [trueSymbol]: true;
}

export interface Fail<Result = unknown, Expect = unknown, Message = unknown, child extends Fail[] = any[]> {
  message: Message;
  result: Result;
  Expect: Expect;
  child: child;
  [errorSymbol]: true;
}

export type TestResult = Pass | Fail;

export interface ReceiveAnyFail<Result = unknown, Expect = unknown> extends Fail<Result, Expect> {
  message: 'Any type is received, please check your type';
}

type GetFail<TArr extends TestResult[], TStored extends TestResult[]> = TArr extends [
  infer T,
  ...infer Rest extends TestResult[],
]
  ? T extends Fail
    ? GetFail<Rest, [...TStored, T]>
    : GetFail<Rest, TStored>
  : TStored;

export type MergeFail<TArr extends TestResult[]> = TArr extends Pass[]
  ? Pass
  : GetFail<TArr, []> extends infer TFails extends Fail[]
  ? TFails extends [infer TFail extends Fail]
    ? TFail
    : Fail<Pass[], TFails, 'TArr is not Pass[]', TFails>
  : never;

type TestMergeFail1 = [
  MergeFail<[Pass]>,
  MergeFail<[Pass, Pass]>,
  MergeFail<[Pass, Pass, Pass]>,
  MergeFail<[Fail<1, 2>]>,
  MergeFail<[Fail<1, 2>, Fail<2, 3>]>,
  MergeFail<[Pass, Fail, Fail]>,
  MergeFail<[Fail, Pass, Fail]>,
  MergeFail<[Fail, Fail, Pass]>,
];
