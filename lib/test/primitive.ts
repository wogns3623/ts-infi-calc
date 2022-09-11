import Is from '@is';
import { Fail, Pass } from './base';

export type Any<T> = Is.Any<T> extends true ? Pass : Fail<T, any, 'Result is not "any" type'>;

export type Never<T> = Is.Never<T> extends true ? Pass : Fail<T, never, 'Result is not "never" type'>;

export type True<T> = Is.True<T> extends true ? Pass : Fail<T, never, 'Result is not "true" type'>;

export type False<T> = Is.False<T> extends true ? Pass : Fail<T, false, 'Result is not "false" type'>;
