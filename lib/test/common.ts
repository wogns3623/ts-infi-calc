import { Fail, MergeFail, Pass, ReceiveAnyFail, TestResult } from './base';

export interface TestOptions {
  disableAnyWarning?: boolean;
}

type GetResultConstraint<O extends TestOptions> = O['disableAnyWarning'] extends true ? Pass | ReceiveAnyFail : Pass;

export type Test<T extends GetResultConstraint<O>, O extends TestOptions = {}> = T;

export namespace Test {
  type _Any<TArr extends TestResult[], TOrig extends TestResult[]> = TArr['length'] extends 0
    ? TOrig
    : TArr extends [infer T, ...infer Rest extends TestResult[]]
    ? T extends Pass
      ? T
      : _Any<Rest, TOrig>
    : any;
  export type Any<TArr extends TestResult[]> = _Any<TArr, TArr>;

  type TestAnyPass = [
    Test.Any<[Pass]>,
    Test.Any<[Pass, Pass, Pass]>,
    Test.Any<[Pass, Fail, Fail]>,
    Test.Any<[Fail, Pass, Fail]>,
    Test.Any<[Fail, Fail, Pass]>,
  ];
  type TestAnyFail = [
    //all fail
    Test.Any<[Fail]>,
    Test.Any<[Fail, Fail]>,
    Test.Any<[Fail, Fail, Fail]>,
  ];

  export type All<TArr extends Pass[]> = MergeFail<TArr>;

  export type AllFail<TArr extends Fail[]> = TArr extends Fail[] ? Pass : MergeFail<TArr>;
}
