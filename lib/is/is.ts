// Unique symbols are always different
declare const symbol1: unique symbol;
type S1 = typeof symbol1;
declare const symbol2: unique symbol;
type S2 = typeof symbol2;

export type Any<T> = S1 extends S2 & T ? true : false;

type TestAnyPass = Any<any>;

type TestAnyFail = [
  //return false
  Any<never>,
  Any<unknown>,
  Any<{}>,
  Any<object>,
  Any<Record<any, any>>,
];

// Wrap types with array to prevent union type spread
export type Never<T> = [T] extends [never] ? true : false;

type TestNeverPass = Never<never>;
type TestNeverFail = [
  //return false
  Never<any>,
  Never<unknown>,
  Never<{}>,
  Never<object>,
  Never<Record<any, any>>,
];

export type True<T> = boolean extends T ? false : [true] extends [T] ? true : false;

type TestTruePass = True<true>;
type TestTrueFail = [
  True<any>,
  True<never>,
  True<unknown>,
  True<{}>,
  True<object>,
  True<Record<any, any>>,
  True<boolean>,
  True<true | false>,
];

export type False<T> = boolean extends T ? false : [false] extends [T] ? true : false;

type TestFalsePass = False<false>;
type TestFalseFail = [
  False<any>,
  False<never>,
  False<unknown>,
  False<{}>,
  False<object>,
  False<Record<any, any>>,
  False<boolean>,
  False<true | false>,
];

export type Array<T> = Never<T> extends true ? false : [T] extends [any[]] ? true : false;

type TestArrayPass = [
  Array<[]>,
  Array<any[]>,
  Array<never[]>,
  Array<unknown[]>,
  Array<{}[]>,
  Array<object[]>,
  Array<Record<any, any>[]>,
  Array<boolean[]>,
  Array<true[] | false[]>,
];
type TestArrayFail = [
  Array<never>,
  Array<unknown>,
  Array<{}>,
  Array<object>,
  Array<Record<any, any>>,
  Array<boolean>,
  Array<true | false>,
];

export type Superset<TSuper, TSub> = [TSub] extends [TSuper] ? true : false;

type TestSupersetFail = [
  Superset<true, boolean>,
  Superset<true, any>,
  Superset<never, any>,
  Superset<Record<string, any>, {}>,
  Superset<Record<string, any>, Record<number, any>>,
  Superset<{ [key: string]: any }, { [key: number]: any }>,
  Superset<() => string, (...args: any) => any>,
  Superset<(...args: any) => number, () => any>,

  Superset<() => string, (...args: any) => number>,
  Superset<(...args: any) => number, () => string>,
];
type TestSupersetPass = [
  Superset<boolean, true>,
  Superset<any, never>,
  Superset<any, true>,
  Superset<{}, Record<string, any>>,
  Superset<Record<number, any>, Record<string, any>>,
  Superset<{ [key: number]: any }, { [key: string]: any }>,
  Superset<(...args: any) => any, () => string>,
  Superset<() => any, (...args: any) => number>,
];

export type Subset<TSub, TSuper> = Superset<TSuper, TSub>;

type TestSubsetFail = [
  Subset<boolean, true>,
  Subset<any, true>,
  Subset<any, never>,
  Subset<{}, Record<string, any>>,
  Subset<Record<number, any>, Record<string, any>>,
  Subset<{ [key: number]: any }, { [key: string]: any }>,
  Subset<(...args: any) => any, () => string>,
  Subset<() => string, (...args: any) => number>,
  Subset<() => any, (...args: any) => number>,
];
type TestSubsetPass = [
  Subset<true, boolean>,
  Subset<true, any>,
  Subset<never, any>,
  Subset<Record<string, any>, {}>,
  Subset<Record<string, any>, Record<number, any>>,
  Subset<{ [key: string]: any }, { [key: number]: any }>,
  Subset<() => string, (...args: any) => any>,
  Subset<(...args: any) => number, () => string>,
  Subset<(...args: any) => number, () => any>,
];

export type Equal<T1, T2> = Superset<T1, T2> extends true ? Superset<T2, T1> : false;
