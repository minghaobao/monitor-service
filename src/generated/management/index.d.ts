
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ContractStatus
 * 
 */
export type ContractStatus = $Result.DefaultSelection<Prisma.$ContractStatusPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ContractStatuses
 * const contractStatuses = await prisma.contractStatus.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ContractStatuses
   * const contractStatuses = await prisma.contractStatus.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.contractStatus`: Exposes CRUD operations for the **ContractStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContractStatuses
    * const contractStatuses = await prisma.contractStatus.findMany()
    * ```
    */
  get contractStatus(): Prisma.ContractStatusDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.0
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ContractStatus: 'ContractStatus'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "contractStatus"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ContractStatus: {
        payload: Prisma.$ContractStatusPayload<ExtArgs>
        fields: Prisma.ContractStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContractStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContractStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractStatusPayload>
          }
          findFirst: {
            args: Prisma.ContractStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContractStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractStatusPayload>
          }
          findMany: {
            args: Prisma.ContractStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractStatusPayload>[]
          }
          create: {
            args: Prisma.ContractStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractStatusPayload>
          }
          createMany: {
            args: Prisma.ContractStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ContractStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractStatusPayload>
          }
          update: {
            args: Prisma.ContractStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractStatusPayload>
          }
          deleteMany: {
            args: Prisma.ContractStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContractStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContractStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractStatusPayload>
          }
          aggregate: {
            args: Prisma.ContractStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContractStatus>
          }
          groupBy: {
            args: Prisma.ContractStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContractStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContractStatusCountArgs<ExtArgs>
            result: $Utils.Optional<ContractStatusCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    contractStatus?: ContractStatusOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model ContractStatus
   */

  export type AggregateContractStatus = {
    _count: ContractStatusCountAggregateOutputType | null
    _avg: ContractStatusAvgAggregateOutputType | null
    _sum: ContractStatusSumAggregateOutputType | null
    _min: ContractStatusMinAggregateOutputType | null
    _max: ContractStatusMaxAggregateOutputType | null
  }

  export type ContractStatusAvgAggregateOutputType = {
    id: number | null
    last_block: number | null
  }

  export type ContractStatusSumAggregateOutputType = {
    id: number | null
    last_block: bigint | null
  }

  export type ContractStatusMinAggregateOutputType = {
    id: number | null
    contract_name: string | null
    contract_address: string | null
    network: string | null
    is_paused: boolean | null
    last_block: bigint | null
    last_updated: Date | null
    created_at: Date | null
  }

  export type ContractStatusMaxAggregateOutputType = {
    id: number | null
    contract_name: string | null
    contract_address: string | null
    network: string | null
    is_paused: boolean | null
    last_block: bigint | null
    last_updated: Date | null
    created_at: Date | null
  }

  export type ContractStatusCountAggregateOutputType = {
    id: number
    contract_name: number
    contract_address: number
    network: number
    is_paused: number
    last_block: number
    last_updated: number
    created_at: number
    _all: number
  }


  export type ContractStatusAvgAggregateInputType = {
    id?: true
    last_block?: true
  }

  export type ContractStatusSumAggregateInputType = {
    id?: true
    last_block?: true
  }

  export type ContractStatusMinAggregateInputType = {
    id?: true
    contract_name?: true
    contract_address?: true
    network?: true
    is_paused?: true
    last_block?: true
    last_updated?: true
    created_at?: true
  }

  export type ContractStatusMaxAggregateInputType = {
    id?: true
    contract_name?: true
    contract_address?: true
    network?: true
    is_paused?: true
    last_block?: true
    last_updated?: true
    created_at?: true
  }

  export type ContractStatusCountAggregateInputType = {
    id?: true
    contract_name?: true
    contract_address?: true
    network?: true
    is_paused?: true
    last_block?: true
    last_updated?: true
    created_at?: true
    _all?: true
  }

  export type ContractStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractStatus to aggregate.
     */
    where?: ContractStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractStatuses to fetch.
     */
    orderBy?: ContractStatusOrderByWithRelationInput | ContractStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContractStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContractStatuses
    **/
    _count?: true | ContractStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContractStatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContractStatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContractStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContractStatusMaxAggregateInputType
  }

  export type GetContractStatusAggregateType<T extends ContractStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateContractStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContractStatus[P]>
      : GetScalarType<T[P], AggregateContractStatus[P]>
  }




  export type ContractStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractStatusWhereInput
    orderBy?: ContractStatusOrderByWithAggregationInput | ContractStatusOrderByWithAggregationInput[]
    by: ContractStatusScalarFieldEnum[] | ContractStatusScalarFieldEnum
    having?: ContractStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContractStatusCountAggregateInputType | true
    _avg?: ContractStatusAvgAggregateInputType
    _sum?: ContractStatusSumAggregateInputType
    _min?: ContractStatusMinAggregateInputType
    _max?: ContractStatusMaxAggregateInputType
  }

  export type ContractStatusGroupByOutputType = {
    id: number
    contract_name: string
    contract_address: string
    network: string
    is_paused: boolean
    last_block: bigint | null
    last_updated: Date
    created_at: Date
    _count: ContractStatusCountAggregateOutputType | null
    _avg: ContractStatusAvgAggregateOutputType | null
    _sum: ContractStatusSumAggregateOutputType | null
    _min: ContractStatusMinAggregateOutputType | null
    _max: ContractStatusMaxAggregateOutputType | null
  }

  type GetContractStatusGroupByPayload<T extends ContractStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContractStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContractStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContractStatusGroupByOutputType[P]>
            : GetScalarType<T[P], ContractStatusGroupByOutputType[P]>
        }
      >
    >


  export type ContractStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contract_name?: boolean
    contract_address?: boolean
    network?: boolean
    is_paused?: boolean
    last_block?: boolean
    last_updated?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["contractStatus"]>



  export type ContractStatusSelectScalar = {
    id?: boolean
    contract_name?: boolean
    contract_address?: boolean
    network?: boolean
    is_paused?: boolean
    last_block?: boolean
    last_updated?: boolean
    created_at?: boolean
  }

  export type ContractStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "contract_name" | "contract_address" | "network" | "is_paused" | "last_block" | "last_updated" | "created_at", ExtArgs["result"]["contractStatus"]>

  export type $ContractStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContractStatus"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      contract_name: string
      contract_address: string
      network: string
      is_paused: boolean
      last_block: bigint | null
      last_updated: Date
      created_at: Date
    }, ExtArgs["result"]["contractStatus"]>
    composites: {}
  }

  type ContractStatusGetPayload<S extends boolean | null | undefined | ContractStatusDefaultArgs> = $Result.GetResult<Prisma.$ContractStatusPayload, S>

  type ContractStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContractStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContractStatusCountAggregateInputType | true
    }

  export interface ContractStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContractStatus'], meta: { name: 'ContractStatus' } }
    /**
     * Find zero or one ContractStatus that matches the filter.
     * @param {ContractStatusFindUniqueArgs} args - Arguments to find a ContractStatus
     * @example
     * // Get one ContractStatus
     * const contractStatus = await prisma.contractStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractStatusFindUniqueArgs>(args: SelectSubset<T, ContractStatusFindUniqueArgs<ExtArgs>>): Prisma__ContractStatusClient<$Result.GetResult<Prisma.$ContractStatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContractStatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContractStatusFindUniqueOrThrowArgs} args - Arguments to find a ContractStatus
     * @example
     * // Get one ContractStatus
     * const contractStatus = await prisma.contractStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, ContractStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContractStatusClient<$Result.GetResult<Prisma.$ContractStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContractStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractStatusFindFirstArgs} args - Arguments to find a ContractStatus
     * @example
     * // Get one ContractStatus
     * const contractStatus = await prisma.contractStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractStatusFindFirstArgs>(args?: SelectSubset<T, ContractStatusFindFirstArgs<ExtArgs>>): Prisma__ContractStatusClient<$Result.GetResult<Prisma.$ContractStatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContractStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractStatusFindFirstOrThrowArgs} args - Arguments to find a ContractStatus
     * @example
     * // Get one ContractStatus
     * const contractStatus = await prisma.contractStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, ContractStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContractStatusClient<$Result.GetResult<Prisma.$ContractStatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContractStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContractStatuses
     * const contractStatuses = await prisma.contractStatus.findMany()
     * 
     * // Get first 10 ContractStatuses
     * const contractStatuses = await prisma.contractStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractStatusWithIdOnly = await prisma.contractStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContractStatusFindManyArgs>(args?: SelectSubset<T, ContractStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContractStatus.
     * @param {ContractStatusCreateArgs} args - Arguments to create a ContractStatus.
     * @example
     * // Create one ContractStatus
     * const ContractStatus = await prisma.contractStatus.create({
     *   data: {
     *     // ... data to create a ContractStatus
     *   }
     * })
     * 
     */
    create<T extends ContractStatusCreateArgs>(args: SelectSubset<T, ContractStatusCreateArgs<ExtArgs>>): Prisma__ContractStatusClient<$Result.GetResult<Prisma.$ContractStatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContractStatuses.
     * @param {ContractStatusCreateManyArgs} args - Arguments to create many ContractStatuses.
     * @example
     * // Create many ContractStatuses
     * const contractStatus = await prisma.contractStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContractStatusCreateManyArgs>(args?: SelectSubset<T, ContractStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ContractStatus.
     * @param {ContractStatusDeleteArgs} args - Arguments to delete one ContractStatus.
     * @example
     * // Delete one ContractStatus
     * const ContractStatus = await prisma.contractStatus.delete({
     *   where: {
     *     // ... filter to delete one ContractStatus
     *   }
     * })
     * 
     */
    delete<T extends ContractStatusDeleteArgs>(args: SelectSubset<T, ContractStatusDeleteArgs<ExtArgs>>): Prisma__ContractStatusClient<$Result.GetResult<Prisma.$ContractStatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContractStatus.
     * @param {ContractStatusUpdateArgs} args - Arguments to update one ContractStatus.
     * @example
     * // Update one ContractStatus
     * const contractStatus = await prisma.contractStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContractStatusUpdateArgs>(args: SelectSubset<T, ContractStatusUpdateArgs<ExtArgs>>): Prisma__ContractStatusClient<$Result.GetResult<Prisma.$ContractStatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContractStatuses.
     * @param {ContractStatusDeleteManyArgs} args - Arguments to filter ContractStatuses to delete.
     * @example
     * // Delete a few ContractStatuses
     * const { count } = await prisma.contractStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContractStatusDeleteManyArgs>(args?: SelectSubset<T, ContractStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContractStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContractStatuses
     * const contractStatus = await prisma.contractStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContractStatusUpdateManyArgs>(args: SelectSubset<T, ContractStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContractStatus.
     * @param {ContractStatusUpsertArgs} args - Arguments to update or create a ContractStatus.
     * @example
     * // Update or create a ContractStatus
     * const contractStatus = await prisma.contractStatus.upsert({
     *   create: {
     *     // ... data to create a ContractStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContractStatus we want to update
     *   }
     * })
     */
    upsert<T extends ContractStatusUpsertArgs>(args: SelectSubset<T, ContractStatusUpsertArgs<ExtArgs>>): Prisma__ContractStatusClient<$Result.GetResult<Prisma.$ContractStatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContractStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractStatusCountArgs} args - Arguments to filter ContractStatuses to count.
     * @example
     * // Count the number of ContractStatuses
     * const count = await prisma.contractStatus.count({
     *   where: {
     *     // ... the filter for the ContractStatuses we want to count
     *   }
     * })
    **/
    count<T extends ContractStatusCountArgs>(
      args?: Subset<T, ContractStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContractStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContractStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContractStatusAggregateArgs>(args: Subset<T, ContractStatusAggregateArgs>): Prisma.PrismaPromise<GetContractStatusAggregateType<T>>

    /**
     * Group by ContractStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContractStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContractStatusGroupByArgs['orderBy'] }
        : { orderBy?: ContractStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContractStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContractStatus model
   */
  readonly fields: ContractStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContractStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContractStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContractStatus model
   */
  interface ContractStatusFieldRefs {
    readonly id: FieldRef<"ContractStatus", 'Int'>
    readonly contract_name: FieldRef<"ContractStatus", 'String'>
    readonly contract_address: FieldRef<"ContractStatus", 'String'>
    readonly network: FieldRef<"ContractStatus", 'String'>
    readonly is_paused: FieldRef<"ContractStatus", 'Boolean'>
    readonly last_block: FieldRef<"ContractStatus", 'BigInt'>
    readonly last_updated: FieldRef<"ContractStatus", 'DateTime'>
    readonly created_at: FieldRef<"ContractStatus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContractStatus findUnique
   */
  export type ContractStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractStatus
     */
    select?: ContractStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractStatus
     */
    omit?: ContractStatusOmit<ExtArgs> | null
    /**
     * Filter, which ContractStatus to fetch.
     */
    where: ContractStatusWhereUniqueInput
  }

  /**
   * ContractStatus findUniqueOrThrow
   */
  export type ContractStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractStatus
     */
    select?: ContractStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractStatus
     */
    omit?: ContractStatusOmit<ExtArgs> | null
    /**
     * Filter, which ContractStatus to fetch.
     */
    where: ContractStatusWhereUniqueInput
  }

  /**
   * ContractStatus findFirst
   */
  export type ContractStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractStatus
     */
    select?: ContractStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractStatus
     */
    omit?: ContractStatusOmit<ExtArgs> | null
    /**
     * Filter, which ContractStatus to fetch.
     */
    where?: ContractStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractStatuses to fetch.
     */
    orderBy?: ContractStatusOrderByWithRelationInput | ContractStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractStatuses.
     */
    cursor?: ContractStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractStatuses.
     */
    distinct?: ContractStatusScalarFieldEnum | ContractStatusScalarFieldEnum[]
  }

  /**
   * ContractStatus findFirstOrThrow
   */
  export type ContractStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractStatus
     */
    select?: ContractStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractStatus
     */
    omit?: ContractStatusOmit<ExtArgs> | null
    /**
     * Filter, which ContractStatus to fetch.
     */
    where?: ContractStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractStatuses to fetch.
     */
    orderBy?: ContractStatusOrderByWithRelationInput | ContractStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractStatuses.
     */
    cursor?: ContractStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractStatuses.
     */
    distinct?: ContractStatusScalarFieldEnum | ContractStatusScalarFieldEnum[]
  }

  /**
   * ContractStatus findMany
   */
  export type ContractStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractStatus
     */
    select?: ContractStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractStatus
     */
    omit?: ContractStatusOmit<ExtArgs> | null
    /**
     * Filter, which ContractStatuses to fetch.
     */
    where?: ContractStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractStatuses to fetch.
     */
    orderBy?: ContractStatusOrderByWithRelationInput | ContractStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContractStatuses.
     */
    cursor?: ContractStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractStatuses.
     */
    skip?: number
    distinct?: ContractStatusScalarFieldEnum | ContractStatusScalarFieldEnum[]
  }

  /**
   * ContractStatus create
   */
  export type ContractStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractStatus
     */
    select?: ContractStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractStatus
     */
    omit?: ContractStatusOmit<ExtArgs> | null
    /**
     * The data needed to create a ContractStatus.
     */
    data: XOR<ContractStatusCreateInput, ContractStatusUncheckedCreateInput>
  }

  /**
   * ContractStatus createMany
   */
  export type ContractStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContractStatuses.
     */
    data: ContractStatusCreateManyInput | ContractStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContractStatus update
   */
  export type ContractStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractStatus
     */
    select?: ContractStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractStatus
     */
    omit?: ContractStatusOmit<ExtArgs> | null
    /**
     * The data needed to update a ContractStatus.
     */
    data: XOR<ContractStatusUpdateInput, ContractStatusUncheckedUpdateInput>
    /**
     * Choose, which ContractStatus to update.
     */
    where: ContractStatusWhereUniqueInput
  }

  /**
   * ContractStatus updateMany
   */
  export type ContractStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContractStatuses.
     */
    data: XOR<ContractStatusUpdateManyMutationInput, ContractStatusUncheckedUpdateManyInput>
    /**
     * Filter which ContractStatuses to update
     */
    where?: ContractStatusWhereInput
    /**
     * Limit how many ContractStatuses to update.
     */
    limit?: number
  }

  /**
   * ContractStatus upsert
   */
  export type ContractStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractStatus
     */
    select?: ContractStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractStatus
     */
    omit?: ContractStatusOmit<ExtArgs> | null
    /**
     * The filter to search for the ContractStatus to update in case it exists.
     */
    where: ContractStatusWhereUniqueInput
    /**
     * In case the ContractStatus found by the `where` argument doesn't exist, create a new ContractStatus with this data.
     */
    create: XOR<ContractStatusCreateInput, ContractStatusUncheckedCreateInput>
    /**
     * In case the ContractStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContractStatusUpdateInput, ContractStatusUncheckedUpdateInput>
  }

  /**
   * ContractStatus delete
   */
  export type ContractStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractStatus
     */
    select?: ContractStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractStatus
     */
    omit?: ContractStatusOmit<ExtArgs> | null
    /**
     * Filter which ContractStatus to delete.
     */
    where: ContractStatusWhereUniqueInput
  }

  /**
   * ContractStatus deleteMany
   */
  export type ContractStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractStatuses to delete
     */
    where?: ContractStatusWhereInput
    /**
     * Limit how many ContractStatuses to delete.
     */
    limit?: number
  }

  /**
   * ContractStatus without action
   */
  export type ContractStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractStatus
     */
    select?: ContractStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractStatus
     */
    omit?: ContractStatusOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ContractStatusScalarFieldEnum: {
    id: 'id',
    contract_name: 'contract_name',
    contract_address: 'contract_address',
    network: 'network',
    is_paused: 'is_paused',
    last_block: 'last_block',
    last_updated: 'last_updated',
    created_at: 'created_at'
  };

  export type ContractStatusScalarFieldEnum = (typeof ContractStatusScalarFieldEnum)[keyof typeof ContractStatusScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const ContractStatusOrderByRelevanceFieldEnum: {
    contract_name: 'contract_name',
    contract_address: 'contract_address',
    network: 'network'
  };

  export type ContractStatusOrderByRelevanceFieldEnum = (typeof ContractStatusOrderByRelevanceFieldEnum)[keyof typeof ContractStatusOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ContractStatusWhereInput = {
    AND?: ContractStatusWhereInput | ContractStatusWhereInput[]
    OR?: ContractStatusWhereInput[]
    NOT?: ContractStatusWhereInput | ContractStatusWhereInput[]
    id?: IntFilter<"ContractStatus"> | number
    contract_name?: StringFilter<"ContractStatus"> | string
    contract_address?: StringFilter<"ContractStatus"> | string
    network?: StringFilter<"ContractStatus"> | string
    is_paused?: BoolFilter<"ContractStatus"> | boolean
    last_block?: BigIntNullableFilter<"ContractStatus"> | bigint | number | null
    last_updated?: DateTimeFilter<"ContractStatus"> | Date | string
    created_at?: DateTimeFilter<"ContractStatus"> | Date | string
  }

  export type ContractStatusOrderByWithRelationInput = {
    id?: SortOrder
    contract_name?: SortOrder
    contract_address?: SortOrder
    network?: SortOrder
    is_paused?: SortOrder
    last_block?: SortOrderInput | SortOrder
    last_updated?: SortOrder
    created_at?: SortOrder
    _relevance?: ContractStatusOrderByRelevanceInput
  }

  export type ContractStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    contract_address?: string
    AND?: ContractStatusWhereInput | ContractStatusWhereInput[]
    OR?: ContractStatusWhereInput[]
    NOT?: ContractStatusWhereInput | ContractStatusWhereInput[]
    contract_name?: StringFilter<"ContractStatus"> | string
    network?: StringFilter<"ContractStatus"> | string
    is_paused?: BoolFilter<"ContractStatus"> | boolean
    last_block?: BigIntNullableFilter<"ContractStatus"> | bigint | number | null
    last_updated?: DateTimeFilter<"ContractStatus"> | Date | string
    created_at?: DateTimeFilter<"ContractStatus"> | Date | string
  }, "id" | "contract_address">

  export type ContractStatusOrderByWithAggregationInput = {
    id?: SortOrder
    contract_name?: SortOrder
    contract_address?: SortOrder
    network?: SortOrder
    is_paused?: SortOrder
    last_block?: SortOrderInput | SortOrder
    last_updated?: SortOrder
    created_at?: SortOrder
    _count?: ContractStatusCountOrderByAggregateInput
    _avg?: ContractStatusAvgOrderByAggregateInput
    _max?: ContractStatusMaxOrderByAggregateInput
    _min?: ContractStatusMinOrderByAggregateInput
    _sum?: ContractStatusSumOrderByAggregateInput
  }

  export type ContractStatusScalarWhereWithAggregatesInput = {
    AND?: ContractStatusScalarWhereWithAggregatesInput | ContractStatusScalarWhereWithAggregatesInput[]
    OR?: ContractStatusScalarWhereWithAggregatesInput[]
    NOT?: ContractStatusScalarWhereWithAggregatesInput | ContractStatusScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ContractStatus"> | number
    contract_name?: StringWithAggregatesFilter<"ContractStatus"> | string
    contract_address?: StringWithAggregatesFilter<"ContractStatus"> | string
    network?: StringWithAggregatesFilter<"ContractStatus"> | string
    is_paused?: BoolWithAggregatesFilter<"ContractStatus"> | boolean
    last_block?: BigIntNullableWithAggregatesFilter<"ContractStatus"> | bigint | number | null
    last_updated?: DateTimeWithAggregatesFilter<"ContractStatus"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"ContractStatus"> | Date | string
  }

  export type ContractStatusCreateInput = {
    contract_name: string
    contract_address: string
    network: string
    is_paused?: boolean
    last_block?: bigint | number | null
    last_updated?: Date | string
    created_at?: Date | string
  }

  export type ContractStatusUncheckedCreateInput = {
    id?: number
    contract_name: string
    contract_address: string
    network: string
    is_paused?: boolean
    last_block?: bigint | number | null
    last_updated?: Date | string
    created_at?: Date | string
  }

  export type ContractStatusUpdateInput = {
    contract_name?: StringFieldUpdateOperationsInput | string
    contract_address?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    is_paused?: BoolFieldUpdateOperationsInput | boolean
    last_block?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    last_updated?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractStatusUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    contract_name?: StringFieldUpdateOperationsInput | string
    contract_address?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    is_paused?: BoolFieldUpdateOperationsInput | boolean
    last_block?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    last_updated?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractStatusCreateManyInput = {
    id?: number
    contract_name: string
    contract_address: string
    network: string
    is_paused?: boolean
    last_block?: bigint | number | null
    last_updated?: Date | string
    created_at?: Date | string
  }

  export type ContractStatusUpdateManyMutationInput = {
    contract_name?: StringFieldUpdateOperationsInput | string
    contract_address?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    is_paused?: BoolFieldUpdateOperationsInput | boolean
    last_block?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    last_updated?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractStatusUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    contract_name?: StringFieldUpdateOperationsInput | string
    contract_address?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    is_paused?: BoolFieldUpdateOperationsInput | boolean
    last_block?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    last_updated?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ContractStatusOrderByRelevanceInput = {
    fields: ContractStatusOrderByRelevanceFieldEnum | ContractStatusOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ContractStatusCountOrderByAggregateInput = {
    id?: SortOrder
    contract_name?: SortOrder
    contract_address?: SortOrder
    network?: SortOrder
    is_paused?: SortOrder
    last_block?: SortOrder
    last_updated?: SortOrder
    created_at?: SortOrder
  }

  export type ContractStatusAvgOrderByAggregateInput = {
    id?: SortOrder
    last_block?: SortOrder
  }

  export type ContractStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    contract_name?: SortOrder
    contract_address?: SortOrder
    network?: SortOrder
    is_paused?: SortOrder
    last_block?: SortOrder
    last_updated?: SortOrder
    created_at?: SortOrder
  }

  export type ContractStatusMinOrderByAggregateInput = {
    id?: SortOrder
    contract_name?: SortOrder
    contract_address?: SortOrder
    network?: SortOrder
    is_paused?: SortOrder
    last_block?: SortOrder
    last_updated?: SortOrder
    created_at?: SortOrder
  }

  export type ContractStatusSumOrderByAggregateInput = {
    id?: SortOrder
    last_block?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}