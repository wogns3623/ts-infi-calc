import { MergeFail } from './base';
import { Test } from './common';
import { Subset, Superset } from './set';

/** @description wrap types with array to prevent union type spread */
export type Eq<Expected, Result> = MergeFail<[Superset<Expected, Result>, Subset<Expected, Result>]>;

// TODO: any 타입이 들어오면 알리기
type TestEqPass = Test.All<
  [
    Eq<never, never>,
    Eq<unknown, unknown>,
    Eq<{}, {}>,
    Eq<object, object>,
    Eq<Record<any, any>, Record<any, any>>,
    Eq<any[], any[]>,
    Eq<never[], never[]>,
    Eq<unknown[], unknown[]>,
    Eq<{}[], {}[]>,
    Eq<object[], object[]>,
    Eq<Record<any, any>[], Record<any, any>[]>,
    Eq<boolean[], boolean[]>,
    Eq<true, true>,
    Eq<false, false>,
    Eq<true | false, true | false>,
  ]
>;

type TestEqFail = Test.AllFail<
  [
    // Eq<undefined, null>,
    Eq<true, false>,
    Eq<string, number>,
    Eq<1, 2>,
    Eq<never, any>,
    Eq<never, unknown>,
    Eq<never, {}>,
    Eq<never, object>,
    Eq<never, Record<any, any>>,
    Eq<never, boolean>,
    Eq<boolean, true>,
    Eq<true | false, true>,
  ]
>;
