import Is from '@is';
import { Fail, Pass } from './base';

export type Superset<TSuper, TSub> = Is.Superset<TSuper, TSub> extends true
  ? Pass
  : Fail<TSuper, TSub, 'Expect(TSuper) is not superset of Result(TSub) is not  type'>;

export type Subset<TSub, TSuper> = Is.Subset<TSub, TSuper> extends true
  ? Pass
  : Fail<TSub, TSuper, 'Expect(TSub) is not subset of Result(TSuper) is not  type'>;
