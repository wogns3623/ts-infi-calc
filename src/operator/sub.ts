import Is from '@is';
import T from '@test';
import { Tuple } from '../common';
import { DecimalDigitCharLiteral as D } from '../digit';
import { CharArrayToNumber, NumberToCharArray } from '../parser';
import { Add } from './add';

type AddMap = [
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
  ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
  ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
  ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
  ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
  ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
];

type GraterMap = [
  [false, false, false, false, false, false, false, false, false, false],
  [true, false, false, false, false, false, false, false, false, false],
  [true, true, false, false, false, false, false, false, false, false],
  [true, true, true, false, false, false, false, false, false, false],
  [true, true, true, true, false, false, false, false, false, false],
  [true, true, true, true, true, false, false, false, false, false],
  [true, true, true, true, true, true, false, false, false, false],
  [true, true, true, true, true, true, true, false, false, false],
  [true, true, true, true, true, true, true, true, false, false],
  [true, true, true, true, true, true, true, true, true, false],
];

type SubMap = [
  ['0', '9', '8', '7', '6', '5', '4', '3', '2', '1'],
  ['1', '0', '9', '8', '7', '6', '5', '4', '3', '2'],
  ['2', '1', '0', '9', '8', '7', '6', '5', '4', '3'],
  ['3', '2', '1', '0', '9', '8', '7', '6', '5', '4'],
  ['4', '3', '2', '1', '0', '9', '8', '7', '6', '5'],
  ['5', '4', '3', '2', '1', '0', '9', '8', '7', '6'],
  ['6', '5', '4', '3', '2', '1', '0', '9', '8', '7'],
  ['7', '6', '5', '4', '3', '2', '1', '0', '9', '8'],
  ['8', '7', '6', '5', '4', '3', '2', '1', '0', '9'],
  ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
];

type Abs<T extends number | bigint> = `${T}` extends `-${infer R extends number | bigint}` ? R : T;

type ToNegative<T extends number | bigint> = Is.Negative<T> extends true
  ? Abs<T>
  : `-${T}` extends infer R
  ? R extends `${infer N extends number | bigint}`
    ? N
    : never
  : never;

type GraterOne<GN extends D, SN extends D> = GraterMap[GN][SN];

type TestGraterOne = T.Test.All<
  [
    T.Eq<true, GraterOne<'1', '0'>>,
    T.Eq<false, GraterOne<'0', '0'>>,
    T.Eq<false, GraterOne<'0', '1'>>,
  ]
>;

/**
 * @description S를 채워넣어 두 배열의 길이를 동일하게 만들어주는 함수
 */
type Fill<Arr1 extends any[], Arr2 extends any[], S extends any> = Arr1 extends [
  ...infer R1 extends any[],
  infer T1 extends any,
]
  ? Arr2 extends [...infer R2 extends any[], infer T2 extends any]
    ? Fill<R1, R2, S> extends [infer F1 extends any[], infer F2 extends any[]]
      ? [[...F1, T1], [...F2, T2]]
      : [[], []]
    : [Arr1, Tuple<S, Arr1['length']>]
  : [Tuple<S, Arr2['length']>, Arr2];

type TestFill = T.Test.All<
  [
    T.Eq<[[], []], Fill<[], [], ''>>,
    T.Eq<[['0'], ['1']], Fill<[], ['1'], '0'>>,
    T.Eq<[['5', '2'], ['0', '0']], Fill<['5', '2'], [], '0'>>,
    T.Eq<[['0', '1'], ['9', '1']], Fill<['1'], ['9', '1'], '0'>>,
    T.Eq<[['1', '4'], ['9', '1']], Fill<['1', '4'], ['9', '1'], '0'>>,
  ]
>;

type _Grater<GArr extends string[], SArr extends string[]> = GArr extends [
  infer GN extends D,
  ...infer GRest extends any[],
]
  ? SArr extends [infer SN extends D, ...infer SRest extends any[]]
    ? Is.Equal<GN, SN> extends true
      ? _Grater<GRest, SRest>
      : GraterOne<GN, SN>
    : false
  : 'equal';

type Grater<GArr extends string[], SArr extends string[]> = _Grater<GArr, SArr> extends true
  ? true
  : false;

type GraterOrEqual<GArr extends string[], SArr extends string[]> = _Grater<GArr, SArr> extends false
  ? false
  : true;

type TestGrater = T.Test.All<
  [
    T.Eq<true, Grater<['1'], ['0']>>,
    T.Eq<false, Grater<['0'], ['0']>>,
    T.Eq<false, Grater<['0'], ['1']>>,
    T.Eq<true, Grater<['1', '0'], ['0', '9']>>,
    T.Eq<false, Grater<['0', '9'], ['1', '0']>>,
    T.Eq<true, Grater<['3', '1'], ['3', '0']>>,
    T.Eq<false, Grater<['3', '1'], ['3', '1']>>,
  ]
>;

// Sub

type SubOne<N1 extends D, N2 extends D, Barrow extends boolean = false> = Barrow extends false
  ? SubMap[N1][N2]
  : SubMap[SubMap[N1][N2]]['1'];

type TestSubOne = T.Test.All<
  [
    T.Eq<'0', SubOne<'0', '0'>>,
    T.Eq<'1', SubOne<'1', '0'>>,
    T.Eq<'0', SubOne<'5', '5'>>,
    T.Eq<'9', SubOne<'1', '2'>>,
    T.Eq<'9', SubOne<'0', '1'>>,
    T.Eq<'8', SubOne<'0', '2'>>,
    T.Eq<'9', SubOne<'0', '0', true>>,
  ]
>;

type _Sub2<
  GArr extends string[],
  SArr extends string[],
  Barrow extends boolean = false,
> = GArr extends [...infer GRest extends any[], infer GN extends D]
  ? SArr extends [...infer SRest extends any[], infer SN extends D]
    ? Is.Equal<GN, SN> extends true
      ? [..._Sub2<GRest, SRest, Barrow>, SubOne<GN, SN, Barrow>]
      : GraterOne<GN, SN> extends true
      ? [..._Sub2<GRest, SRest>, SubOne<GN, SN, Barrow>]
      : [..._Sub2<GRest, SRest, true>, SubOne<GN, SN, Barrow>]
    : []
  : [];

type TestSub2 = T.Test.All<
  [
    T.Eq<[], _Sub2<[], []>>,
    T.Eq<['0'], _Sub2<['0'], ['0']>>,
    T.Eq<['1'], _Sub2<['1'], ['0']>>,
    T.Eq<['4'], _Sub2<['5'], ['1']>>,
    T.Eq<['0', '0'], _Sub2<['0', '0'], ['0', '0']>>,
    T.Eq<['0', '0'], _Sub2<['4', '0'], ['4', '0']>>,
    T.Eq<['0', '0'], _Sub2<['0', '2'], ['0', '2']>>,
    T.Eq<['0', '2'], _Sub2<['1', '1'], ['0', '9']>>,
  ]
>;

type _Sub1<GN extends number | bigint, SN extends number | bigint> = Fill<
  NumberToCharArray<GN>,
  NumberToCharArray<SN>,
  '0'
> extends [infer A1 extends string[], infer A2 extends string[]]
  ? GraterOrEqual<A1, A2> extends true
    ? CharArrayToNumber<_Sub2<A1, A2>>
    : ToNegative<CharArrayToNumber<_Sub2<A2, A1>>>
  : never;

type TestSub1 = T.Test.All<
  [
    T.Eq<0, _Sub1<0, 0>>,
    T.Eq<0, _Sub1<4, 4>>,
    T.Eq<1, _Sub1<1, 0>>,
    T.Eq<4, _Sub1<5, 1>>,
    T.Eq<-2, _Sub1<2, 4>>,
    T.Eq<8, _Sub1<10, 2>>,
  ]
>;

/**
 * N1 - N2
 */
type Sub<N1 extends number | bigint, N2 extends number | bigint> = Is.Negative<N1> extends true
  ? Is.Negative<N2> extends true
    ? _Sub1<Abs<N2>, Abs<N1>> // (-N1) - (-N2) = N2 - N1
    : ToNegative<Add<Abs<N1>, N2>> // (-N1) - N2 = -(N1 + N2)
  : Is.Negative<N2> extends true
  ? Add<N1, Abs<N2>> // N1 - (-N2) = N1 + N2
  : _Sub1<N1, N2>; // N1 - N2

type TestSub = T.Test.All<
  [
    T.Eq<0, Sub<0, 0>>,
    T.Eq<0, Sub<5, 5>>,
    T.Eq<1, Sub<1, 0>>,
    T.Eq<-1, Sub<1, 2>>,
    T.Eq<-1, Sub<0, 1>>,
    T.Eq<-2, Sub<0, 2>>,
    T.Eq<99, Sub<100, 1>>,
    T.Eq<-82, Sub<9, 91>>,
  ]
>;
