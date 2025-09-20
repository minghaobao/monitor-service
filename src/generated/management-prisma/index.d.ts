
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model MeshClaim
 * 
 */
export type MeshClaim = $Result.DefaultSelection<Prisma.$MeshClaimPayload>
/**
 * Model Mesh
 * 
 */
export type Mesh = $Result.DefaultSelection<Prisma.$MeshPayload>
/**
 * Model ContractStatus
 * 
 */
export type ContractStatus = $Result.DefaultSelection<Prisma.$ContractStatusPayload>
/**
 * Model SystemEvent
 * 
 */
export type SystemEvent = $Result.DefaultSelection<Prisma.$SystemEventPayload>
/**
 * Model EventLog
 * 
 */
export type EventLog = $Result.DefaultSelection<Prisma.$EventLogPayload>
/**
 * Model SafeConfig
 * 
 */
export type SafeConfig = $Result.DefaultSelection<Prisma.$SafeConfigPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meshClaim`: Exposes CRUD operations for the **MeshClaim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MeshClaims
    * const meshClaims = await prisma.meshClaim.findMany()
    * ```
    */
  get meshClaim(): Prisma.MeshClaimDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mesh`: Exposes CRUD operations for the **Mesh** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Meshes
    * const meshes = await prisma.mesh.findMany()
    * ```
    */
  get mesh(): Prisma.MeshDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contractStatus`: Exposes CRUD operations for the **ContractStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContractStatuses
    * const contractStatuses = await prisma.contractStatus.findMany()
    * ```
    */
  get contractStatus(): Prisma.ContractStatusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemEvent`: Exposes CRUD operations for the **SystemEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemEvents
    * const systemEvents = await prisma.systemEvent.findMany()
    * ```
    */
  get systemEvent(): Prisma.SystemEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventLog`: Exposes CRUD operations for the **EventLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventLogs
    * const eventLogs = await prisma.eventLog.findMany()
    * ```
    */
  get eventLog(): Prisma.EventLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.safeConfig`: Exposes CRUD operations for the **SafeConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SafeConfigs
    * const safeConfigs = await prisma.safeConfig.findMany()
    * ```
    */
  get safeConfig(): Prisma.SafeConfigDelegate<ExtArgs, ClientOptions>;
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
    User: 'User',
    MeshClaim: 'MeshClaim',
    Mesh: 'Mesh',
    ContractStatus: 'ContractStatus',
    SystemEvent: 'SystemEvent',
    EventLog: 'EventLog',
    SafeConfig: 'SafeConfig'
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
      modelProps: "user" | "meshClaim" | "mesh" | "contractStatus" | "systemEvent" | "eventLog" | "safeConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      MeshClaim: {
        payload: Prisma.$MeshClaimPayload<ExtArgs>
        fields: Prisma.MeshClaimFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MeshClaimFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshClaimPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeshClaimFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshClaimPayload>
          }
          findFirst: {
            args: Prisma.MeshClaimFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshClaimPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeshClaimFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshClaimPayload>
          }
          findMany: {
            args: Prisma.MeshClaimFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshClaimPayload>[]
          }
          create: {
            args: Prisma.MeshClaimCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshClaimPayload>
          }
          createMany: {
            args: Prisma.MeshClaimCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MeshClaimDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshClaimPayload>
          }
          update: {
            args: Prisma.MeshClaimUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshClaimPayload>
          }
          deleteMany: {
            args: Prisma.MeshClaimDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MeshClaimUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MeshClaimUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshClaimPayload>
          }
          aggregate: {
            args: Prisma.MeshClaimAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeshClaim>
          }
          groupBy: {
            args: Prisma.MeshClaimGroupByArgs<ExtArgs>
            result: $Utils.Optional<MeshClaimGroupByOutputType>[]
          }
          count: {
            args: Prisma.MeshClaimCountArgs<ExtArgs>
            result: $Utils.Optional<MeshClaimCountAggregateOutputType> | number
          }
        }
      }
      Mesh: {
        payload: Prisma.$MeshPayload<ExtArgs>
        fields: Prisma.MeshFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MeshFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeshFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshPayload>
          }
          findFirst: {
            args: Prisma.MeshFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeshFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshPayload>
          }
          findMany: {
            args: Prisma.MeshFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshPayload>[]
          }
          create: {
            args: Prisma.MeshCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshPayload>
          }
          createMany: {
            args: Prisma.MeshCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MeshDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshPayload>
          }
          update: {
            args: Prisma.MeshUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshPayload>
          }
          deleteMany: {
            args: Prisma.MeshDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MeshUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MeshUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeshPayload>
          }
          aggregate: {
            args: Prisma.MeshAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMesh>
          }
          groupBy: {
            args: Prisma.MeshGroupByArgs<ExtArgs>
            result: $Utils.Optional<MeshGroupByOutputType>[]
          }
          count: {
            args: Prisma.MeshCountArgs<ExtArgs>
            result: $Utils.Optional<MeshCountAggregateOutputType> | number
          }
        }
      }
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
      SystemEvent: {
        payload: Prisma.$SystemEventPayload<ExtArgs>
        fields: Prisma.SystemEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>
          }
          findFirst: {
            args: Prisma.SystemEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>
          }
          findMany: {
            args: Prisma.SystemEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>[]
          }
          create: {
            args: Prisma.SystemEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>
          }
          createMany: {
            args: Prisma.SystemEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SystemEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>
          }
          update: {
            args: Prisma.SystemEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>
          }
          deleteMany: {
            args: Prisma.SystemEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SystemEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>
          }
          aggregate: {
            args: Prisma.SystemEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemEvent>
          }
          groupBy: {
            args: Prisma.SystemEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemEventCountArgs<ExtArgs>
            result: $Utils.Optional<SystemEventCountAggregateOutputType> | number
          }
        }
      }
      EventLog: {
        payload: Prisma.$EventLogPayload<ExtArgs>
        fields: Prisma.EventLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>
          }
          findFirst: {
            args: Prisma.EventLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>
          }
          findMany: {
            args: Prisma.EventLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>[]
          }
          create: {
            args: Prisma.EventLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>
          }
          createMany: {
            args: Prisma.EventLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EventLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>
          }
          update: {
            args: Prisma.EventLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>
          }
          deleteMany: {
            args: Prisma.EventLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EventLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventLogPayload>
          }
          aggregate: {
            args: Prisma.EventLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventLog>
          }
          groupBy: {
            args: Prisma.EventLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventLogCountArgs<ExtArgs>
            result: $Utils.Optional<EventLogCountAggregateOutputType> | number
          }
        }
      }
      SafeConfig: {
        payload: Prisma.$SafeConfigPayload<ExtArgs>
        fields: Prisma.SafeConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SafeConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafeConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SafeConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafeConfigPayload>
          }
          findFirst: {
            args: Prisma.SafeConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafeConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SafeConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafeConfigPayload>
          }
          findMany: {
            args: Prisma.SafeConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafeConfigPayload>[]
          }
          create: {
            args: Prisma.SafeConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafeConfigPayload>
          }
          createMany: {
            args: Prisma.SafeConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SafeConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafeConfigPayload>
          }
          update: {
            args: Prisma.SafeConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafeConfigPayload>
          }
          deleteMany: {
            args: Prisma.SafeConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SafeConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SafeConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafeConfigPayload>
          }
          aggregate: {
            args: Prisma.SafeConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSafeConfig>
          }
          groupBy: {
            args: Prisma.SafeConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<SafeConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.SafeConfigCountArgs<ExtArgs>
            result: $Utils.Optional<SafeConfigCountAggregateOutputType> | number
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
    user?: UserOmit
    meshClaim?: MeshClaimOmit
    mesh?: MeshOmit
    contractStatus?: ContractStatusOmit
    systemEvent?: SystemEventOmit
    eventLog?: EventLogOmit
    safeConfig?: SafeConfigOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    meshClaims: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meshClaims?: boolean | UserCountOutputTypeCountMeshClaimsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMeshClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeshClaimWhereInput
  }


  /**
   * Count Type MeshCountOutputType
   */

  export type MeshCountOutputType = {
    claims: number
  }

  export type MeshCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | MeshCountOutputTypeCountClaimsArgs
  }

  // Custom InputTypes
  /**
   * MeshCountOutputType without action
   */
  export type MeshCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeshCountOutputType
     */
    select?: MeshCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MeshCountOutputType without action
   */
  export type MeshCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeshClaimWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    address: string | null
    role: string | null
    createdAt: Date | null
    lastActive: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    address: string | null
    role: string | null
    createdAt: Date | null
    lastActive: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    address: number
    role: number
    createdAt: number
    lastActive: number
    metadata: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    address?: true
    role?: true
    createdAt?: true
    lastActive?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    address?: true
    role?: true
    createdAt?: true
    lastActive?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    address?: true
    role?: true
    createdAt?: true
    lastActive?: true
    metadata?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    address: string
    role: string
    createdAt: Date
    lastActive: Date | null
    metadata: JsonValue | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    role?: boolean
    createdAt?: boolean
    lastActive?: boolean
    metadata?: boolean
    meshClaims?: boolean | User$meshClaimsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    address?: boolean
    role?: boolean
    createdAt?: boolean
    lastActive?: boolean
    metadata?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "address" | "role" | "createdAt" | "lastActive" | "metadata", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meshClaims?: boolean | User$meshClaimsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      meshClaims: Prisma.$MeshClaimPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      address: string
      role: string
      createdAt: Date
      lastActive: Date | null
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meshClaims<T extends User$meshClaimsArgs<ExtArgs> = {}>(args?: Subset<T, User$meshClaimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeshClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly address: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly lastActive: FieldRef<"User", 'DateTime'>
    readonly metadata: FieldRef<"User", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.meshClaims
   */
  export type User$meshClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeshClaim
     */
    select?: MeshClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeshClaim
     */
    omit?: MeshClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshClaimInclude<ExtArgs> | null
    where?: MeshClaimWhereInput
    orderBy?: MeshClaimOrderByWithRelationInput | MeshClaimOrderByWithRelationInput[]
    cursor?: MeshClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeshClaimScalarFieldEnum | MeshClaimScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model MeshClaim
   */

  export type AggregateMeshClaim = {
    _count: MeshClaimCountAggregateOutputType | null
    _avg: MeshClaimAvgAggregateOutputType | null
    _sum: MeshClaimSumAggregateOutputType | null
    _min: MeshClaimMinAggregateOutputType | null
    _max: MeshClaimMaxAggregateOutputType | null
  }

  export type MeshClaimAvgAggregateOutputType = {
    id: number | null
    longitude: Decimal | null
    latitude: Decimal | null
    blockNumber: number | null
  }

  export type MeshClaimSumAggregateOutputType = {
    id: number | null
    longitude: Decimal | null
    latitude: Decimal | null
    blockNumber: bigint | null
  }

  export type MeshClaimMinAggregateOutputType = {
    id: number | null
    userAddress: string | null
    meshId: string | null
    longitude: Decimal | null
    latitude: Decimal | null
    txHash: string | null
    blockNumber: bigint | null
    claimedAt: Date | null
  }

  export type MeshClaimMaxAggregateOutputType = {
    id: number | null
    userAddress: string | null
    meshId: string | null
    longitude: Decimal | null
    latitude: Decimal | null
    txHash: string | null
    blockNumber: bigint | null
    claimedAt: Date | null
  }

  export type MeshClaimCountAggregateOutputType = {
    id: number
    userAddress: number
    meshId: number
    longitude: number
    latitude: number
    txHash: number
    blockNumber: number
    claimedAt: number
    _all: number
  }


  export type MeshClaimAvgAggregateInputType = {
    id?: true
    longitude?: true
    latitude?: true
    blockNumber?: true
  }

  export type MeshClaimSumAggregateInputType = {
    id?: true
    longitude?: true
    latitude?: true
    blockNumber?: true
  }

  export type MeshClaimMinAggregateInputType = {
    id?: true
    userAddress?: true
    meshId?: true
    longitude?: true
    latitude?: true
    txHash?: true
    blockNumber?: true
    claimedAt?: true
  }

  export type MeshClaimMaxAggregateInputType = {
    id?: true
    userAddress?: true
    meshId?: true
    longitude?: true
    latitude?: true
    txHash?: true
    blockNumber?: true
    claimedAt?: true
  }

  export type MeshClaimCountAggregateInputType = {
    id?: true
    userAddress?: true
    meshId?: true
    longitude?: true
    latitude?: true
    txHash?: true
    blockNumber?: true
    claimedAt?: true
    _all?: true
  }

  export type MeshClaimAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MeshClaim to aggregate.
     */
    where?: MeshClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeshClaims to fetch.
     */
    orderBy?: MeshClaimOrderByWithRelationInput | MeshClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeshClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeshClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeshClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MeshClaims
    **/
    _count?: true | MeshClaimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MeshClaimAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MeshClaimSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeshClaimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeshClaimMaxAggregateInputType
  }

  export type GetMeshClaimAggregateType<T extends MeshClaimAggregateArgs> = {
        [P in keyof T & keyof AggregateMeshClaim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeshClaim[P]>
      : GetScalarType<T[P], AggregateMeshClaim[P]>
  }




  export type MeshClaimGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeshClaimWhereInput
    orderBy?: MeshClaimOrderByWithAggregationInput | MeshClaimOrderByWithAggregationInput[]
    by: MeshClaimScalarFieldEnum[] | MeshClaimScalarFieldEnum
    having?: MeshClaimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeshClaimCountAggregateInputType | true
    _avg?: MeshClaimAvgAggregateInputType
    _sum?: MeshClaimSumAggregateInputType
    _min?: MeshClaimMinAggregateInputType
    _max?: MeshClaimMaxAggregateInputType
  }

  export type MeshClaimGroupByOutputType = {
    id: number
    userAddress: string
    meshId: string
    longitude: Decimal | null
    latitude: Decimal | null
    txHash: string | null
    blockNumber: bigint | null
    claimedAt: Date
    _count: MeshClaimCountAggregateOutputType | null
    _avg: MeshClaimAvgAggregateOutputType | null
    _sum: MeshClaimSumAggregateOutputType | null
    _min: MeshClaimMinAggregateOutputType | null
    _max: MeshClaimMaxAggregateOutputType | null
  }

  type GetMeshClaimGroupByPayload<T extends MeshClaimGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MeshClaimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeshClaimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeshClaimGroupByOutputType[P]>
            : GetScalarType<T[P], MeshClaimGroupByOutputType[P]>
        }
      >
    >


  export type MeshClaimSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    meshId?: boolean
    longitude?: boolean
    latitude?: boolean
    txHash?: boolean
    blockNumber?: boolean
    claimedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    mesh?: boolean | MeshDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meshClaim"]>



  export type MeshClaimSelectScalar = {
    id?: boolean
    userAddress?: boolean
    meshId?: boolean
    longitude?: boolean
    latitude?: boolean
    txHash?: boolean
    blockNumber?: boolean
    claimedAt?: boolean
  }

  export type MeshClaimOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userAddress" | "meshId" | "longitude" | "latitude" | "txHash" | "blockNumber" | "claimedAt", ExtArgs["result"]["meshClaim"]>
  export type MeshClaimInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    mesh?: boolean | MeshDefaultArgs<ExtArgs>
  }

  export type $MeshClaimPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MeshClaim"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      mesh: Prisma.$MeshPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userAddress: string
      meshId: string
      longitude: Prisma.Decimal | null
      latitude: Prisma.Decimal | null
      txHash: string | null
      blockNumber: bigint | null
      claimedAt: Date
    }, ExtArgs["result"]["meshClaim"]>
    composites: {}
  }

  type MeshClaimGetPayload<S extends boolean | null | undefined | MeshClaimDefaultArgs> = $Result.GetResult<Prisma.$MeshClaimPayload, S>

  type MeshClaimCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MeshClaimFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MeshClaimCountAggregateInputType | true
    }

  export interface MeshClaimDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MeshClaim'], meta: { name: 'MeshClaim' } }
    /**
     * Find zero or one MeshClaim that matches the filter.
     * @param {MeshClaimFindUniqueArgs} args - Arguments to find a MeshClaim
     * @example
     * // Get one MeshClaim
     * const meshClaim = await prisma.meshClaim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeshClaimFindUniqueArgs>(args: SelectSubset<T, MeshClaimFindUniqueArgs<ExtArgs>>): Prisma__MeshClaimClient<$Result.GetResult<Prisma.$MeshClaimPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MeshClaim that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeshClaimFindUniqueOrThrowArgs} args - Arguments to find a MeshClaim
     * @example
     * // Get one MeshClaim
     * const meshClaim = await prisma.meshClaim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeshClaimFindUniqueOrThrowArgs>(args: SelectSubset<T, MeshClaimFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MeshClaimClient<$Result.GetResult<Prisma.$MeshClaimPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MeshClaim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshClaimFindFirstArgs} args - Arguments to find a MeshClaim
     * @example
     * // Get one MeshClaim
     * const meshClaim = await prisma.meshClaim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeshClaimFindFirstArgs>(args?: SelectSubset<T, MeshClaimFindFirstArgs<ExtArgs>>): Prisma__MeshClaimClient<$Result.GetResult<Prisma.$MeshClaimPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MeshClaim that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshClaimFindFirstOrThrowArgs} args - Arguments to find a MeshClaim
     * @example
     * // Get one MeshClaim
     * const meshClaim = await prisma.meshClaim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeshClaimFindFirstOrThrowArgs>(args?: SelectSubset<T, MeshClaimFindFirstOrThrowArgs<ExtArgs>>): Prisma__MeshClaimClient<$Result.GetResult<Prisma.$MeshClaimPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MeshClaims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshClaimFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MeshClaims
     * const meshClaims = await prisma.meshClaim.findMany()
     * 
     * // Get first 10 MeshClaims
     * const meshClaims = await prisma.meshClaim.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const meshClaimWithIdOnly = await prisma.meshClaim.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MeshClaimFindManyArgs>(args?: SelectSubset<T, MeshClaimFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeshClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MeshClaim.
     * @param {MeshClaimCreateArgs} args - Arguments to create a MeshClaim.
     * @example
     * // Create one MeshClaim
     * const MeshClaim = await prisma.meshClaim.create({
     *   data: {
     *     // ... data to create a MeshClaim
     *   }
     * })
     * 
     */
    create<T extends MeshClaimCreateArgs>(args: SelectSubset<T, MeshClaimCreateArgs<ExtArgs>>): Prisma__MeshClaimClient<$Result.GetResult<Prisma.$MeshClaimPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MeshClaims.
     * @param {MeshClaimCreateManyArgs} args - Arguments to create many MeshClaims.
     * @example
     * // Create many MeshClaims
     * const meshClaim = await prisma.meshClaim.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MeshClaimCreateManyArgs>(args?: SelectSubset<T, MeshClaimCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MeshClaim.
     * @param {MeshClaimDeleteArgs} args - Arguments to delete one MeshClaim.
     * @example
     * // Delete one MeshClaim
     * const MeshClaim = await prisma.meshClaim.delete({
     *   where: {
     *     // ... filter to delete one MeshClaim
     *   }
     * })
     * 
     */
    delete<T extends MeshClaimDeleteArgs>(args: SelectSubset<T, MeshClaimDeleteArgs<ExtArgs>>): Prisma__MeshClaimClient<$Result.GetResult<Prisma.$MeshClaimPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MeshClaim.
     * @param {MeshClaimUpdateArgs} args - Arguments to update one MeshClaim.
     * @example
     * // Update one MeshClaim
     * const meshClaim = await prisma.meshClaim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MeshClaimUpdateArgs>(args: SelectSubset<T, MeshClaimUpdateArgs<ExtArgs>>): Prisma__MeshClaimClient<$Result.GetResult<Prisma.$MeshClaimPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MeshClaims.
     * @param {MeshClaimDeleteManyArgs} args - Arguments to filter MeshClaims to delete.
     * @example
     * // Delete a few MeshClaims
     * const { count } = await prisma.meshClaim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MeshClaimDeleteManyArgs>(args?: SelectSubset<T, MeshClaimDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MeshClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshClaimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MeshClaims
     * const meshClaim = await prisma.meshClaim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MeshClaimUpdateManyArgs>(args: SelectSubset<T, MeshClaimUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MeshClaim.
     * @param {MeshClaimUpsertArgs} args - Arguments to update or create a MeshClaim.
     * @example
     * // Update or create a MeshClaim
     * const meshClaim = await prisma.meshClaim.upsert({
     *   create: {
     *     // ... data to create a MeshClaim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MeshClaim we want to update
     *   }
     * })
     */
    upsert<T extends MeshClaimUpsertArgs>(args: SelectSubset<T, MeshClaimUpsertArgs<ExtArgs>>): Prisma__MeshClaimClient<$Result.GetResult<Prisma.$MeshClaimPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MeshClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshClaimCountArgs} args - Arguments to filter MeshClaims to count.
     * @example
     * // Count the number of MeshClaims
     * const count = await prisma.meshClaim.count({
     *   where: {
     *     // ... the filter for the MeshClaims we want to count
     *   }
     * })
    **/
    count<T extends MeshClaimCountArgs>(
      args?: Subset<T, MeshClaimCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeshClaimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MeshClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshClaimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MeshClaimAggregateArgs>(args: Subset<T, MeshClaimAggregateArgs>): Prisma.PrismaPromise<GetMeshClaimAggregateType<T>>

    /**
     * Group by MeshClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshClaimGroupByArgs} args - Group by arguments.
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
      T extends MeshClaimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeshClaimGroupByArgs['orderBy'] }
        : { orderBy?: MeshClaimGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MeshClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeshClaimGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MeshClaim model
   */
  readonly fields: MeshClaimFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MeshClaim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MeshClaimClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    mesh<T extends MeshDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MeshDefaultArgs<ExtArgs>>): Prisma__MeshClient<$Result.GetResult<Prisma.$MeshPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MeshClaim model
   */
  interface MeshClaimFieldRefs {
    readonly id: FieldRef<"MeshClaim", 'Int'>
    readonly userAddress: FieldRef<"MeshClaim", 'String'>
    readonly meshId: FieldRef<"MeshClaim", 'String'>
    readonly longitude: FieldRef<"MeshClaim", 'Decimal'>
    readonly latitude: FieldRef<"MeshClaim", 'Decimal'>
    readonly txHash: FieldRef<"MeshClaim", 'String'>
    readonly blockNumber: FieldRef<"MeshClaim", 'BigInt'>
    readonly claimedAt: FieldRef<"MeshClaim", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MeshClaim findUnique
   */
  export type MeshClaimFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeshClaim
     */
    select?: MeshClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeshClaim
     */
    omit?: MeshClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshClaimInclude<ExtArgs> | null
    /**
     * Filter, which MeshClaim to fetch.
     */
    where: MeshClaimWhereUniqueInput
  }

  /**
   * MeshClaim findUniqueOrThrow
   */
  export type MeshClaimFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeshClaim
     */
    select?: MeshClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeshClaim
     */
    omit?: MeshClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshClaimInclude<ExtArgs> | null
    /**
     * Filter, which MeshClaim to fetch.
     */
    where: MeshClaimWhereUniqueInput
  }

  /**
   * MeshClaim findFirst
   */
  export type MeshClaimFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeshClaim
     */
    select?: MeshClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeshClaim
     */
    omit?: MeshClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshClaimInclude<ExtArgs> | null
    /**
     * Filter, which MeshClaim to fetch.
     */
    where?: MeshClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeshClaims to fetch.
     */
    orderBy?: MeshClaimOrderByWithRelationInput | MeshClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MeshClaims.
     */
    cursor?: MeshClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeshClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeshClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MeshClaims.
     */
    distinct?: MeshClaimScalarFieldEnum | MeshClaimScalarFieldEnum[]
  }

  /**
   * MeshClaim findFirstOrThrow
   */
  export type MeshClaimFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeshClaim
     */
    select?: MeshClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeshClaim
     */
    omit?: MeshClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshClaimInclude<ExtArgs> | null
    /**
     * Filter, which MeshClaim to fetch.
     */
    where?: MeshClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeshClaims to fetch.
     */
    orderBy?: MeshClaimOrderByWithRelationInput | MeshClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MeshClaims.
     */
    cursor?: MeshClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeshClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeshClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MeshClaims.
     */
    distinct?: MeshClaimScalarFieldEnum | MeshClaimScalarFieldEnum[]
  }

  /**
   * MeshClaim findMany
   */
  export type MeshClaimFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeshClaim
     */
    select?: MeshClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeshClaim
     */
    omit?: MeshClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshClaimInclude<ExtArgs> | null
    /**
     * Filter, which MeshClaims to fetch.
     */
    where?: MeshClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeshClaims to fetch.
     */
    orderBy?: MeshClaimOrderByWithRelationInput | MeshClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MeshClaims.
     */
    cursor?: MeshClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeshClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeshClaims.
     */
    skip?: number
    distinct?: MeshClaimScalarFieldEnum | MeshClaimScalarFieldEnum[]
  }

  /**
   * MeshClaim create
   */
  export type MeshClaimCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeshClaim
     */
    select?: MeshClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeshClaim
     */
    omit?: MeshClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshClaimInclude<ExtArgs> | null
    /**
     * The data needed to create a MeshClaim.
     */
    data: XOR<MeshClaimCreateInput, MeshClaimUncheckedCreateInput>
  }

  /**
   * MeshClaim createMany
   */
  export type MeshClaimCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MeshClaims.
     */
    data: MeshClaimCreateManyInput | MeshClaimCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MeshClaim update
   */
  export type MeshClaimUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeshClaim
     */
    select?: MeshClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeshClaim
     */
    omit?: MeshClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshClaimInclude<ExtArgs> | null
    /**
     * The data needed to update a MeshClaim.
     */
    data: XOR<MeshClaimUpdateInput, MeshClaimUncheckedUpdateInput>
    /**
     * Choose, which MeshClaim to update.
     */
    where: MeshClaimWhereUniqueInput
  }

  /**
   * MeshClaim updateMany
   */
  export type MeshClaimUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MeshClaims.
     */
    data: XOR<MeshClaimUpdateManyMutationInput, MeshClaimUncheckedUpdateManyInput>
    /**
     * Filter which MeshClaims to update
     */
    where?: MeshClaimWhereInput
    /**
     * Limit how many MeshClaims to update.
     */
    limit?: number
  }

  /**
   * MeshClaim upsert
   */
  export type MeshClaimUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeshClaim
     */
    select?: MeshClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeshClaim
     */
    omit?: MeshClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshClaimInclude<ExtArgs> | null
    /**
     * The filter to search for the MeshClaim to update in case it exists.
     */
    where: MeshClaimWhereUniqueInput
    /**
     * In case the MeshClaim found by the `where` argument doesn't exist, create a new MeshClaim with this data.
     */
    create: XOR<MeshClaimCreateInput, MeshClaimUncheckedCreateInput>
    /**
     * In case the MeshClaim was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeshClaimUpdateInput, MeshClaimUncheckedUpdateInput>
  }

  /**
   * MeshClaim delete
   */
  export type MeshClaimDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeshClaim
     */
    select?: MeshClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeshClaim
     */
    omit?: MeshClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshClaimInclude<ExtArgs> | null
    /**
     * Filter which MeshClaim to delete.
     */
    where: MeshClaimWhereUniqueInput
  }

  /**
   * MeshClaim deleteMany
   */
  export type MeshClaimDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MeshClaims to delete
     */
    where?: MeshClaimWhereInput
    /**
     * Limit how many MeshClaims to delete.
     */
    limit?: number
  }

  /**
   * MeshClaim without action
   */
  export type MeshClaimDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeshClaim
     */
    select?: MeshClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeshClaim
     */
    omit?: MeshClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshClaimInclude<ExtArgs> | null
  }


  /**
   * Model Mesh
   */

  export type AggregateMesh = {
    _count: MeshCountAggregateOutputType | null
    _avg: MeshAvgAggregateOutputType | null
    _sum: MeshSumAggregateOutputType | null
    _min: MeshMinAggregateOutputType | null
    _max: MeshMaxAggregateOutputType | null
  }

  export type MeshAvgAggregateOutputType = {
    id: number | null
    longitude: Decimal | null
    latitude: Decimal | null
    heatLevel: number | null
    claimCount: number | null
  }

  export type MeshSumAggregateOutputType = {
    id: number | null
    longitude: Decimal | null
    latitude: Decimal | null
    heatLevel: number | null
    claimCount: number | null
  }

  export type MeshMinAggregateOutputType = {
    id: number | null
    meshId: string | null
    longitude: Decimal | null
    latitude: Decimal | null
    heatLevel: number | null
    claimCount: number | null
    lastClaimTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MeshMaxAggregateOutputType = {
    id: number | null
    meshId: string | null
    longitude: Decimal | null
    latitude: Decimal | null
    heatLevel: number | null
    claimCount: number | null
    lastClaimTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MeshCountAggregateOutputType = {
    id: number
    meshId: number
    longitude: number
    latitude: number
    heatLevel: number
    claimCount: number
    lastClaimTime: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MeshAvgAggregateInputType = {
    id?: true
    longitude?: true
    latitude?: true
    heatLevel?: true
    claimCount?: true
  }

  export type MeshSumAggregateInputType = {
    id?: true
    longitude?: true
    latitude?: true
    heatLevel?: true
    claimCount?: true
  }

  export type MeshMinAggregateInputType = {
    id?: true
    meshId?: true
    longitude?: true
    latitude?: true
    heatLevel?: true
    claimCount?: true
    lastClaimTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MeshMaxAggregateInputType = {
    id?: true
    meshId?: true
    longitude?: true
    latitude?: true
    heatLevel?: true
    claimCount?: true
    lastClaimTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MeshCountAggregateInputType = {
    id?: true
    meshId?: true
    longitude?: true
    latitude?: true
    heatLevel?: true
    claimCount?: true
    lastClaimTime?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MeshAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mesh to aggregate.
     */
    where?: MeshWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meshes to fetch.
     */
    orderBy?: MeshOrderByWithRelationInput | MeshOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeshWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meshes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meshes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Meshes
    **/
    _count?: true | MeshCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MeshAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MeshSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeshMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeshMaxAggregateInputType
  }

  export type GetMeshAggregateType<T extends MeshAggregateArgs> = {
        [P in keyof T & keyof AggregateMesh]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMesh[P]>
      : GetScalarType<T[P], AggregateMesh[P]>
  }




  export type MeshGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeshWhereInput
    orderBy?: MeshOrderByWithAggregationInput | MeshOrderByWithAggregationInput[]
    by: MeshScalarFieldEnum[] | MeshScalarFieldEnum
    having?: MeshScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeshCountAggregateInputType | true
    _avg?: MeshAvgAggregateInputType
    _sum?: MeshSumAggregateInputType
    _min?: MeshMinAggregateInputType
    _max?: MeshMaxAggregateInputType
  }

  export type MeshGroupByOutputType = {
    id: number
    meshId: string
    longitude: Decimal
    latitude: Decimal
    heatLevel: number | null
    claimCount: number | null
    lastClaimTime: Date | null
    createdAt: Date
    updatedAt: Date
    _count: MeshCountAggregateOutputType | null
    _avg: MeshAvgAggregateOutputType | null
    _sum: MeshSumAggregateOutputType | null
    _min: MeshMinAggregateOutputType | null
    _max: MeshMaxAggregateOutputType | null
  }

  type GetMeshGroupByPayload<T extends MeshGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MeshGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeshGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeshGroupByOutputType[P]>
            : GetScalarType<T[P], MeshGroupByOutputType[P]>
        }
      >
    >


  export type MeshSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    meshId?: boolean
    longitude?: boolean
    latitude?: boolean
    heatLevel?: boolean
    claimCount?: boolean
    lastClaimTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    claims?: boolean | Mesh$claimsArgs<ExtArgs>
    _count?: boolean | MeshCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mesh"]>



  export type MeshSelectScalar = {
    id?: boolean
    meshId?: boolean
    longitude?: boolean
    latitude?: boolean
    heatLevel?: boolean
    claimCount?: boolean
    lastClaimTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MeshOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "meshId" | "longitude" | "latitude" | "heatLevel" | "claimCount" | "lastClaimTime" | "createdAt" | "updatedAt", ExtArgs["result"]["mesh"]>
  export type MeshInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | Mesh$claimsArgs<ExtArgs>
    _count?: boolean | MeshCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MeshPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mesh"
    objects: {
      claims: Prisma.$MeshClaimPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      meshId: string
      longitude: Prisma.Decimal
      latitude: Prisma.Decimal
      heatLevel: number | null
      claimCount: number | null
      lastClaimTime: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mesh"]>
    composites: {}
  }

  type MeshGetPayload<S extends boolean | null | undefined | MeshDefaultArgs> = $Result.GetResult<Prisma.$MeshPayload, S>

  type MeshCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MeshFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MeshCountAggregateInputType | true
    }

  export interface MeshDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mesh'], meta: { name: 'Mesh' } }
    /**
     * Find zero or one Mesh that matches the filter.
     * @param {MeshFindUniqueArgs} args - Arguments to find a Mesh
     * @example
     * // Get one Mesh
     * const mesh = await prisma.mesh.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeshFindUniqueArgs>(args: SelectSubset<T, MeshFindUniqueArgs<ExtArgs>>): Prisma__MeshClient<$Result.GetResult<Prisma.$MeshPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mesh that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeshFindUniqueOrThrowArgs} args - Arguments to find a Mesh
     * @example
     * // Get one Mesh
     * const mesh = await prisma.mesh.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeshFindUniqueOrThrowArgs>(args: SelectSubset<T, MeshFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MeshClient<$Result.GetResult<Prisma.$MeshPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mesh that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshFindFirstArgs} args - Arguments to find a Mesh
     * @example
     * // Get one Mesh
     * const mesh = await prisma.mesh.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeshFindFirstArgs>(args?: SelectSubset<T, MeshFindFirstArgs<ExtArgs>>): Prisma__MeshClient<$Result.GetResult<Prisma.$MeshPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mesh that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshFindFirstOrThrowArgs} args - Arguments to find a Mesh
     * @example
     * // Get one Mesh
     * const mesh = await prisma.mesh.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeshFindFirstOrThrowArgs>(args?: SelectSubset<T, MeshFindFirstOrThrowArgs<ExtArgs>>): Prisma__MeshClient<$Result.GetResult<Prisma.$MeshPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Meshes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Meshes
     * const meshes = await prisma.mesh.findMany()
     * 
     * // Get first 10 Meshes
     * const meshes = await prisma.mesh.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const meshWithIdOnly = await prisma.mesh.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MeshFindManyArgs>(args?: SelectSubset<T, MeshFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeshPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mesh.
     * @param {MeshCreateArgs} args - Arguments to create a Mesh.
     * @example
     * // Create one Mesh
     * const Mesh = await prisma.mesh.create({
     *   data: {
     *     // ... data to create a Mesh
     *   }
     * })
     * 
     */
    create<T extends MeshCreateArgs>(args: SelectSubset<T, MeshCreateArgs<ExtArgs>>): Prisma__MeshClient<$Result.GetResult<Prisma.$MeshPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Meshes.
     * @param {MeshCreateManyArgs} args - Arguments to create many Meshes.
     * @example
     * // Create many Meshes
     * const mesh = await prisma.mesh.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MeshCreateManyArgs>(args?: SelectSubset<T, MeshCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Mesh.
     * @param {MeshDeleteArgs} args - Arguments to delete one Mesh.
     * @example
     * // Delete one Mesh
     * const Mesh = await prisma.mesh.delete({
     *   where: {
     *     // ... filter to delete one Mesh
     *   }
     * })
     * 
     */
    delete<T extends MeshDeleteArgs>(args: SelectSubset<T, MeshDeleteArgs<ExtArgs>>): Prisma__MeshClient<$Result.GetResult<Prisma.$MeshPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mesh.
     * @param {MeshUpdateArgs} args - Arguments to update one Mesh.
     * @example
     * // Update one Mesh
     * const mesh = await prisma.mesh.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MeshUpdateArgs>(args: SelectSubset<T, MeshUpdateArgs<ExtArgs>>): Prisma__MeshClient<$Result.GetResult<Prisma.$MeshPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Meshes.
     * @param {MeshDeleteManyArgs} args - Arguments to filter Meshes to delete.
     * @example
     * // Delete a few Meshes
     * const { count } = await prisma.mesh.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MeshDeleteManyArgs>(args?: SelectSubset<T, MeshDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meshes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Meshes
     * const mesh = await prisma.mesh.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MeshUpdateManyArgs>(args: SelectSubset<T, MeshUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Mesh.
     * @param {MeshUpsertArgs} args - Arguments to update or create a Mesh.
     * @example
     * // Update or create a Mesh
     * const mesh = await prisma.mesh.upsert({
     *   create: {
     *     // ... data to create a Mesh
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mesh we want to update
     *   }
     * })
     */
    upsert<T extends MeshUpsertArgs>(args: SelectSubset<T, MeshUpsertArgs<ExtArgs>>): Prisma__MeshClient<$Result.GetResult<Prisma.$MeshPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Meshes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshCountArgs} args - Arguments to filter Meshes to count.
     * @example
     * // Count the number of Meshes
     * const count = await prisma.mesh.count({
     *   where: {
     *     // ... the filter for the Meshes we want to count
     *   }
     * })
    **/
    count<T extends MeshCountArgs>(
      args?: Subset<T, MeshCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeshCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mesh.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MeshAggregateArgs>(args: Subset<T, MeshAggregateArgs>): Prisma.PrismaPromise<GetMeshAggregateType<T>>

    /**
     * Group by Mesh.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeshGroupByArgs} args - Group by arguments.
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
      T extends MeshGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeshGroupByArgs['orderBy'] }
        : { orderBy?: MeshGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MeshGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeshGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mesh model
   */
  readonly fields: MeshFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mesh.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MeshClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    claims<T extends Mesh$claimsArgs<ExtArgs> = {}>(args?: Subset<T, Mesh$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeshClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Mesh model
   */
  interface MeshFieldRefs {
    readonly id: FieldRef<"Mesh", 'Int'>
    readonly meshId: FieldRef<"Mesh", 'String'>
    readonly longitude: FieldRef<"Mesh", 'Decimal'>
    readonly latitude: FieldRef<"Mesh", 'Decimal'>
    readonly heatLevel: FieldRef<"Mesh", 'Int'>
    readonly claimCount: FieldRef<"Mesh", 'Int'>
    readonly lastClaimTime: FieldRef<"Mesh", 'DateTime'>
    readonly createdAt: FieldRef<"Mesh", 'DateTime'>
    readonly updatedAt: FieldRef<"Mesh", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mesh findUnique
   */
  export type MeshFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesh
     */
    select?: MeshSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesh
     */
    omit?: MeshOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshInclude<ExtArgs> | null
    /**
     * Filter, which Mesh to fetch.
     */
    where: MeshWhereUniqueInput
  }

  /**
   * Mesh findUniqueOrThrow
   */
  export type MeshFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesh
     */
    select?: MeshSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesh
     */
    omit?: MeshOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshInclude<ExtArgs> | null
    /**
     * Filter, which Mesh to fetch.
     */
    where: MeshWhereUniqueInput
  }

  /**
   * Mesh findFirst
   */
  export type MeshFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesh
     */
    select?: MeshSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesh
     */
    omit?: MeshOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshInclude<ExtArgs> | null
    /**
     * Filter, which Mesh to fetch.
     */
    where?: MeshWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meshes to fetch.
     */
    orderBy?: MeshOrderByWithRelationInput | MeshOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meshes.
     */
    cursor?: MeshWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meshes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meshes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meshes.
     */
    distinct?: MeshScalarFieldEnum | MeshScalarFieldEnum[]
  }

  /**
   * Mesh findFirstOrThrow
   */
  export type MeshFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesh
     */
    select?: MeshSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesh
     */
    omit?: MeshOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshInclude<ExtArgs> | null
    /**
     * Filter, which Mesh to fetch.
     */
    where?: MeshWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meshes to fetch.
     */
    orderBy?: MeshOrderByWithRelationInput | MeshOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meshes.
     */
    cursor?: MeshWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meshes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meshes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meshes.
     */
    distinct?: MeshScalarFieldEnum | MeshScalarFieldEnum[]
  }

  /**
   * Mesh findMany
   */
  export type MeshFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesh
     */
    select?: MeshSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesh
     */
    omit?: MeshOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshInclude<ExtArgs> | null
    /**
     * Filter, which Meshes to fetch.
     */
    where?: MeshWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meshes to fetch.
     */
    orderBy?: MeshOrderByWithRelationInput | MeshOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Meshes.
     */
    cursor?: MeshWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meshes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meshes.
     */
    skip?: number
    distinct?: MeshScalarFieldEnum | MeshScalarFieldEnum[]
  }

  /**
   * Mesh create
   */
  export type MeshCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesh
     */
    select?: MeshSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesh
     */
    omit?: MeshOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshInclude<ExtArgs> | null
    /**
     * The data needed to create a Mesh.
     */
    data: XOR<MeshCreateInput, MeshUncheckedCreateInput>
  }

  /**
   * Mesh createMany
   */
  export type MeshCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Meshes.
     */
    data: MeshCreateManyInput | MeshCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mesh update
   */
  export type MeshUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesh
     */
    select?: MeshSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesh
     */
    omit?: MeshOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshInclude<ExtArgs> | null
    /**
     * The data needed to update a Mesh.
     */
    data: XOR<MeshUpdateInput, MeshUncheckedUpdateInput>
    /**
     * Choose, which Mesh to update.
     */
    where: MeshWhereUniqueInput
  }

  /**
   * Mesh updateMany
   */
  export type MeshUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Meshes.
     */
    data: XOR<MeshUpdateManyMutationInput, MeshUncheckedUpdateManyInput>
    /**
     * Filter which Meshes to update
     */
    where?: MeshWhereInput
    /**
     * Limit how many Meshes to update.
     */
    limit?: number
  }

  /**
   * Mesh upsert
   */
  export type MeshUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesh
     */
    select?: MeshSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesh
     */
    omit?: MeshOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshInclude<ExtArgs> | null
    /**
     * The filter to search for the Mesh to update in case it exists.
     */
    where: MeshWhereUniqueInput
    /**
     * In case the Mesh found by the `where` argument doesn't exist, create a new Mesh with this data.
     */
    create: XOR<MeshCreateInput, MeshUncheckedCreateInput>
    /**
     * In case the Mesh was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeshUpdateInput, MeshUncheckedUpdateInput>
  }

  /**
   * Mesh delete
   */
  export type MeshDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesh
     */
    select?: MeshSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesh
     */
    omit?: MeshOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshInclude<ExtArgs> | null
    /**
     * Filter which Mesh to delete.
     */
    where: MeshWhereUniqueInput
  }

  /**
   * Mesh deleteMany
   */
  export type MeshDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meshes to delete
     */
    where?: MeshWhereInput
    /**
     * Limit how many Meshes to delete.
     */
    limit?: number
  }

  /**
   * Mesh.claims
   */
  export type Mesh$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeshClaim
     */
    select?: MeshClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeshClaim
     */
    omit?: MeshClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshClaimInclude<ExtArgs> | null
    where?: MeshClaimWhereInput
    orderBy?: MeshClaimOrderByWithRelationInput | MeshClaimOrderByWithRelationInput[]
    cursor?: MeshClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeshClaimScalarFieldEnum | MeshClaimScalarFieldEnum[]
  }

  /**
   * Mesh without action
   */
  export type MeshDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesh
     */
    select?: MeshSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesh
     */
    omit?: MeshOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeshInclude<ExtArgs> | null
  }


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
    chainId: number | null
    lastBlock: number | null
  }

  export type ContractStatusSumAggregateOutputType = {
    id: number | null
    chainId: bigint | null
    lastBlock: bigint | null
  }

  export type ContractStatusMinAggregateOutputType = {
    id: number | null
    contractName: string | null
    contractAddress: string | null
    chainId: bigint | null
    isPaused: boolean | null
    lastBlock: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContractStatusMaxAggregateOutputType = {
    id: number | null
    contractName: string | null
    contractAddress: string | null
    chainId: bigint | null
    isPaused: boolean | null
    lastBlock: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContractStatusCountAggregateOutputType = {
    id: number
    contractName: number
    contractAddress: number
    chainId: number
    isPaused: number
    lastBlock: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContractStatusAvgAggregateInputType = {
    id?: true
    chainId?: true
    lastBlock?: true
  }

  export type ContractStatusSumAggregateInputType = {
    id?: true
    chainId?: true
    lastBlock?: true
  }

  export type ContractStatusMinAggregateInputType = {
    id?: true
    contractName?: true
    contractAddress?: true
    chainId?: true
    isPaused?: true
    lastBlock?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContractStatusMaxAggregateInputType = {
    id?: true
    contractName?: true
    contractAddress?: true
    chainId?: true
    isPaused?: true
    lastBlock?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContractStatusCountAggregateInputType = {
    id?: true
    contractName?: true
    contractAddress?: true
    chainId?: true
    isPaused?: true
    lastBlock?: true
    createdAt?: true
    updatedAt?: true
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
    contractName: string
    contractAddress: string
    chainId: bigint
    isPaused: boolean
    lastBlock: bigint
    createdAt: Date
    updatedAt: Date
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
    contractName?: boolean
    contractAddress?: boolean
    chainId?: boolean
    isPaused?: boolean
    lastBlock?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contractStatus"]>



  export type ContractStatusSelectScalar = {
    id?: boolean
    contractName?: boolean
    contractAddress?: boolean
    chainId?: boolean
    isPaused?: boolean
    lastBlock?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ContractStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "contractName" | "contractAddress" | "chainId" | "isPaused" | "lastBlock" | "createdAt" | "updatedAt", ExtArgs["result"]["contractStatus"]>

  export type $ContractStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContractStatus"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      contractName: string
      contractAddress: string
      chainId: bigint
      isPaused: boolean
      lastBlock: bigint
      createdAt: Date
      updatedAt: Date
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
    readonly contractName: FieldRef<"ContractStatus", 'String'>
    readonly contractAddress: FieldRef<"ContractStatus", 'String'>
    readonly chainId: FieldRef<"ContractStatus", 'BigInt'>
    readonly isPaused: FieldRef<"ContractStatus", 'Boolean'>
    readonly lastBlock: FieldRef<"ContractStatus", 'BigInt'>
    readonly createdAt: FieldRef<"ContractStatus", 'DateTime'>
    readonly updatedAt: FieldRef<"ContractStatus", 'DateTime'>
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
   * Model SystemEvent
   */

  export type AggregateSystemEvent = {
    _count: SystemEventCountAggregateOutputType | null
    _avg: SystemEventAvgAggregateOutputType | null
    _sum: SystemEventSumAggregateOutputType | null
    _min: SystemEventMinAggregateOutputType | null
    _max: SystemEventMaxAggregateOutputType | null
  }

  export type SystemEventAvgAggregateOutputType = {
    id: number | null
  }

  export type SystemEventSumAggregateOutputType = {
    id: number | null
  }

  export type SystemEventMinAggregateOutputType = {
    id: number | null
    eventType: string | null
    message: string | null
    createdAt: Date | null
  }

  export type SystemEventMaxAggregateOutputType = {
    id: number | null
    eventType: string | null
    message: string | null
    createdAt: Date | null
  }

  export type SystemEventCountAggregateOutputType = {
    id: number
    eventType: number
    message: number
    data: number
    createdAt: number
    _all: number
  }


  export type SystemEventAvgAggregateInputType = {
    id?: true
  }

  export type SystemEventSumAggregateInputType = {
    id?: true
  }

  export type SystemEventMinAggregateInputType = {
    id?: true
    eventType?: true
    message?: true
    createdAt?: true
  }

  export type SystemEventMaxAggregateInputType = {
    id?: true
    eventType?: true
    message?: true
    createdAt?: true
  }

  export type SystemEventCountAggregateInputType = {
    id?: true
    eventType?: true
    message?: true
    data?: true
    createdAt?: true
    _all?: true
  }

  export type SystemEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemEvent to aggregate.
     */
    where?: SystemEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemEvents to fetch.
     */
    orderBy?: SystemEventOrderByWithRelationInput | SystemEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemEvents
    **/
    _count?: true | SystemEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SystemEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SystemEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemEventMaxAggregateInputType
  }

  export type GetSystemEventAggregateType<T extends SystemEventAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemEvent[P]>
      : GetScalarType<T[P], AggregateSystemEvent[P]>
  }




  export type SystemEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemEventWhereInput
    orderBy?: SystemEventOrderByWithAggregationInput | SystemEventOrderByWithAggregationInput[]
    by: SystemEventScalarFieldEnum[] | SystemEventScalarFieldEnum
    having?: SystemEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemEventCountAggregateInputType | true
    _avg?: SystemEventAvgAggregateInputType
    _sum?: SystemEventSumAggregateInputType
    _min?: SystemEventMinAggregateInputType
    _max?: SystemEventMaxAggregateInputType
  }

  export type SystemEventGroupByOutputType = {
    id: number
    eventType: string
    message: string
    data: JsonValue | null
    createdAt: Date
    _count: SystemEventCountAggregateOutputType | null
    _avg: SystemEventAvgAggregateOutputType | null
    _sum: SystemEventSumAggregateOutputType | null
    _min: SystemEventMinAggregateOutputType | null
    _max: SystemEventMaxAggregateOutputType | null
  }

  type GetSystemEventGroupByPayload<T extends SystemEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemEventGroupByOutputType[P]>
            : GetScalarType<T[P], SystemEventGroupByOutputType[P]>
        }
      >
    >


  export type SystemEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventType?: boolean
    message?: boolean
    data?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["systemEvent"]>



  export type SystemEventSelectScalar = {
    id?: boolean
    eventType?: boolean
    message?: boolean
    data?: boolean
    createdAt?: boolean
  }

  export type SystemEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventType" | "message" | "data" | "createdAt", ExtArgs["result"]["systemEvent"]>

  export type $SystemEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      eventType: string
      message: string
      data: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["systemEvent"]>
    composites: {}
  }

  type SystemEventGetPayload<S extends boolean | null | undefined | SystemEventDefaultArgs> = $Result.GetResult<Prisma.$SystemEventPayload, S>

  type SystemEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemEventCountAggregateInputType | true
    }

  export interface SystemEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemEvent'], meta: { name: 'SystemEvent' } }
    /**
     * Find zero or one SystemEvent that matches the filter.
     * @param {SystemEventFindUniqueArgs} args - Arguments to find a SystemEvent
     * @example
     * // Get one SystemEvent
     * const systemEvent = await prisma.systemEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemEventFindUniqueArgs>(args: SelectSubset<T, SystemEventFindUniqueArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemEventFindUniqueOrThrowArgs} args - Arguments to find a SystemEvent
     * @example
     * // Get one SystemEvent
     * const systemEvent = await prisma.systemEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemEventFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventFindFirstArgs} args - Arguments to find a SystemEvent
     * @example
     * // Get one SystemEvent
     * const systemEvent = await prisma.systemEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemEventFindFirstArgs>(args?: SelectSubset<T, SystemEventFindFirstArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventFindFirstOrThrowArgs} args - Arguments to find a SystemEvent
     * @example
     * // Get one SystemEvent
     * const systemEvent = await prisma.systemEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemEventFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemEvents
     * const systemEvents = await prisma.systemEvent.findMany()
     * 
     * // Get first 10 SystemEvents
     * const systemEvents = await prisma.systemEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemEventWithIdOnly = await prisma.systemEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemEventFindManyArgs>(args?: SelectSubset<T, SystemEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemEvent.
     * @param {SystemEventCreateArgs} args - Arguments to create a SystemEvent.
     * @example
     * // Create one SystemEvent
     * const SystemEvent = await prisma.systemEvent.create({
     *   data: {
     *     // ... data to create a SystemEvent
     *   }
     * })
     * 
     */
    create<T extends SystemEventCreateArgs>(args: SelectSubset<T, SystemEventCreateArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemEvents.
     * @param {SystemEventCreateManyArgs} args - Arguments to create many SystemEvents.
     * @example
     * // Create many SystemEvents
     * const systemEvent = await prisma.systemEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemEventCreateManyArgs>(args?: SelectSubset<T, SystemEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SystemEvent.
     * @param {SystemEventDeleteArgs} args - Arguments to delete one SystemEvent.
     * @example
     * // Delete one SystemEvent
     * const SystemEvent = await prisma.systemEvent.delete({
     *   where: {
     *     // ... filter to delete one SystemEvent
     *   }
     * })
     * 
     */
    delete<T extends SystemEventDeleteArgs>(args: SelectSubset<T, SystemEventDeleteArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemEvent.
     * @param {SystemEventUpdateArgs} args - Arguments to update one SystemEvent.
     * @example
     * // Update one SystemEvent
     * const systemEvent = await prisma.systemEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemEventUpdateArgs>(args: SelectSubset<T, SystemEventUpdateArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemEvents.
     * @param {SystemEventDeleteManyArgs} args - Arguments to filter SystemEvents to delete.
     * @example
     * // Delete a few SystemEvents
     * const { count } = await prisma.systemEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemEventDeleteManyArgs>(args?: SelectSubset<T, SystemEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemEvents
     * const systemEvent = await prisma.systemEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemEventUpdateManyArgs>(args: SelectSubset<T, SystemEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SystemEvent.
     * @param {SystemEventUpsertArgs} args - Arguments to update or create a SystemEvent.
     * @example
     * // Update or create a SystemEvent
     * const systemEvent = await prisma.systemEvent.upsert({
     *   create: {
     *     // ... data to create a SystemEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemEvent we want to update
     *   }
     * })
     */
    upsert<T extends SystemEventUpsertArgs>(args: SelectSubset<T, SystemEventUpsertArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventCountArgs} args - Arguments to filter SystemEvents to count.
     * @example
     * // Count the number of SystemEvents
     * const count = await prisma.systemEvent.count({
     *   where: {
     *     // ... the filter for the SystemEvents we want to count
     *   }
     * })
    **/
    count<T extends SystemEventCountArgs>(
      args?: Subset<T, SystemEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SystemEventAggregateArgs>(args: Subset<T, SystemEventAggregateArgs>): Prisma.PrismaPromise<GetSystemEventAggregateType<T>>

    /**
     * Group by SystemEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventGroupByArgs} args - Group by arguments.
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
      T extends SystemEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemEventGroupByArgs['orderBy'] }
        : { orderBy?: SystemEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SystemEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemEvent model
   */
  readonly fields: SystemEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SystemEvent model
   */
  interface SystemEventFieldRefs {
    readonly id: FieldRef<"SystemEvent", 'Int'>
    readonly eventType: FieldRef<"SystemEvent", 'String'>
    readonly message: FieldRef<"SystemEvent", 'String'>
    readonly data: FieldRef<"SystemEvent", 'Json'>
    readonly createdAt: FieldRef<"SystemEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemEvent findUnique
   */
  export type SystemEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * Filter, which SystemEvent to fetch.
     */
    where: SystemEventWhereUniqueInput
  }

  /**
   * SystemEvent findUniqueOrThrow
   */
  export type SystemEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * Filter, which SystemEvent to fetch.
     */
    where: SystemEventWhereUniqueInput
  }

  /**
   * SystemEvent findFirst
   */
  export type SystemEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * Filter, which SystemEvent to fetch.
     */
    where?: SystemEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemEvents to fetch.
     */
    orderBy?: SystemEventOrderByWithRelationInput | SystemEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemEvents.
     */
    cursor?: SystemEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemEvents.
     */
    distinct?: SystemEventScalarFieldEnum | SystemEventScalarFieldEnum[]
  }

  /**
   * SystemEvent findFirstOrThrow
   */
  export type SystemEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * Filter, which SystemEvent to fetch.
     */
    where?: SystemEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemEvents to fetch.
     */
    orderBy?: SystemEventOrderByWithRelationInput | SystemEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemEvents.
     */
    cursor?: SystemEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemEvents.
     */
    distinct?: SystemEventScalarFieldEnum | SystemEventScalarFieldEnum[]
  }

  /**
   * SystemEvent findMany
   */
  export type SystemEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * Filter, which SystemEvents to fetch.
     */
    where?: SystemEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemEvents to fetch.
     */
    orderBy?: SystemEventOrderByWithRelationInput | SystemEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemEvents.
     */
    cursor?: SystemEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemEvents.
     */
    skip?: number
    distinct?: SystemEventScalarFieldEnum | SystemEventScalarFieldEnum[]
  }

  /**
   * SystemEvent create
   */
  export type SystemEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemEvent.
     */
    data: XOR<SystemEventCreateInput, SystemEventUncheckedCreateInput>
  }

  /**
   * SystemEvent createMany
   */
  export type SystemEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemEvents.
     */
    data: SystemEventCreateManyInput | SystemEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemEvent update
   */
  export type SystemEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemEvent.
     */
    data: XOR<SystemEventUpdateInput, SystemEventUncheckedUpdateInput>
    /**
     * Choose, which SystemEvent to update.
     */
    where: SystemEventWhereUniqueInput
  }

  /**
   * SystemEvent updateMany
   */
  export type SystemEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemEvents.
     */
    data: XOR<SystemEventUpdateManyMutationInput, SystemEventUncheckedUpdateManyInput>
    /**
     * Filter which SystemEvents to update
     */
    where?: SystemEventWhereInput
    /**
     * Limit how many SystemEvents to update.
     */
    limit?: number
  }

  /**
   * SystemEvent upsert
   */
  export type SystemEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemEvent to update in case it exists.
     */
    where: SystemEventWhereUniqueInput
    /**
     * In case the SystemEvent found by the `where` argument doesn't exist, create a new SystemEvent with this data.
     */
    create: XOR<SystemEventCreateInput, SystemEventUncheckedCreateInput>
    /**
     * In case the SystemEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemEventUpdateInput, SystemEventUncheckedUpdateInput>
  }

  /**
   * SystemEvent delete
   */
  export type SystemEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * Filter which SystemEvent to delete.
     */
    where: SystemEventWhereUniqueInput
  }

  /**
   * SystemEvent deleteMany
   */
  export type SystemEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemEvents to delete
     */
    where?: SystemEventWhereInput
    /**
     * Limit how many SystemEvents to delete.
     */
    limit?: number
  }

  /**
   * SystemEvent without action
   */
  export type SystemEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
  }


  /**
   * Model EventLog
   */

  export type AggregateEventLog = {
    _count: EventLogCountAggregateOutputType | null
    _avg: EventLogAvgAggregateOutputType | null
    _sum: EventLogSumAggregateOutputType | null
    _min: EventLogMinAggregateOutputType | null
    _max: EventLogMaxAggregateOutputType | null
  }

  export type EventLogAvgAggregateOutputType = {
    id: number | null
  }

  export type EventLogSumAggregateOutputType = {
    id: number | null
  }

  export type EventLogMinAggregateOutputType = {
    id: number | null
    level: string | null
    message: string | null
    createdAt: Date | null
  }

  export type EventLogMaxAggregateOutputType = {
    id: number | null
    level: string | null
    message: string | null
    createdAt: Date | null
  }

  export type EventLogCountAggregateOutputType = {
    id: number
    level: number
    message: number
    data: number
    createdAt: number
    _all: number
  }


  export type EventLogAvgAggregateInputType = {
    id?: true
  }

  export type EventLogSumAggregateInputType = {
    id?: true
  }

  export type EventLogMinAggregateInputType = {
    id?: true
    level?: true
    message?: true
    createdAt?: true
  }

  export type EventLogMaxAggregateInputType = {
    id?: true
    level?: true
    message?: true
    createdAt?: true
  }

  export type EventLogCountAggregateInputType = {
    id?: true
    level?: true
    message?: true
    data?: true
    createdAt?: true
    _all?: true
  }

  export type EventLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventLog to aggregate.
     */
    where?: EventLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventLogs to fetch.
     */
    orderBy?: EventLogOrderByWithRelationInput | EventLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventLogs
    **/
    _count?: true | EventLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventLogMaxAggregateInputType
  }

  export type GetEventLogAggregateType<T extends EventLogAggregateArgs> = {
        [P in keyof T & keyof AggregateEventLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventLog[P]>
      : GetScalarType<T[P], AggregateEventLog[P]>
  }




  export type EventLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventLogWhereInput
    orderBy?: EventLogOrderByWithAggregationInput | EventLogOrderByWithAggregationInput[]
    by: EventLogScalarFieldEnum[] | EventLogScalarFieldEnum
    having?: EventLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventLogCountAggregateInputType | true
    _avg?: EventLogAvgAggregateInputType
    _sum?: EventLogSumAggregateInputType
    _min?: EventLogMinAggregateInputType
    _max?: EventLogMaxAggregateInputType
  }

  export type EventLogGroupByOutputType = {
    id: number
    level: string
    message: string
    data: JsonValue | null
    createdAt: Date
    _count: EventLogCountAggregateOutputType | null
    _avg: EventLogAvgAggregateOutputType | null
    _sum: EventLogSumAggregateOutputType | null
    _min: EventLogMinAggregateOutputType | null
    _max: EventLogMaxAggregateOutputType | null
  }

  type GetEventLogGroupByPayload<T extends EventLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventLogGroupByOutputType[P]>
            : GetScalarType<T[P], EventLogGroupByOutputType[P]>
        }
      >
    >


  export type EventLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    message?: boolean
    data?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["eventLog"]>



  export type EventLogSelectScalar = {
    id?: boolean
    level?: boolean
    message?: boolean
    data?: boolean
    createdAt?: boolean
  }

  export type EventLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "level" | "message" | "data" | "createdAt", ExtArgs["result"]["eventLog"]>

  export type $EventLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      level: string
      message: string
      data: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["eventLog"]>
    composites: {}
  }

  type EventLogGetPayload<S extends boolean | null | undefined | EventLogDefaultArgs> = $Result.GetResult<Prisma.$EventLogPayload, S>

  type EventLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventLogCountAggregateInputType | true
    }

  export interface EventLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventLog'], meta: { name: 'EventLog' } }
    /**
     * Find zero or one EventLog that matches the filter.
     * @param {EventLogFindUniqueArgs} args - Arguments to find a EventLog
     * @example
     * // Get one EventLog
     * const eventLog = await prisma.eventLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventLogFindUniqueArgs>(args: SelectSubset<T, EventLogFindUniqueArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventLogFindUniqueOrThrowArgs} args - Arguments to find a EventLog
     * @example
     * // Get one EventLog
     * const eventLog = await prisma.eventLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventLogFindUniqueOrThrowArgs>(args: SelectSubset<T, EventLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogFindFirstArgs} args - Arguments to find a EventLog
     * @example
     * // Get one EventLog
     * const eventLog = await prisma.eventLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventLogFindFirstArgs>(args?: SelectSubset<T, EventLogFindFirstArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogFindFirstOrThrowArgs} args - Arguments to find a EventLog
     * @example
     * // Get one EventLog
     * const eventLog = await prisma.eventLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventLogFindFirstOrThrowArgs>(args?: SelectSubset<T, EventLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventLogs
     * const eventLogs = await prisma.eventLog.findMany()
     * 
     * // Get first 10 EventLogs
     * const eventLogs = await prisma.eventLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventLogWithIdOnly = await prisma.eventLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventLogFindManyArgs>(args?: SelectSubset<T, EventLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventLog.
     * @param {EventLogCreateArgs} args - Arguments to create a EventLog.
     * @example
     * // Create one EventLog
     * const EventLog = await prisma.eventLog.create({
     *   data: {
     *     // ... data to create a EventLog
     *   }
     * })
     * 
     */
    create<T extends EventLogCreateArgs>(args: SelectSubset<T, EventLogCreateArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventLogs.
     * @param {EventLogCreateManyArgs} args - Arguments to create many EventLogs.
     * @example
     * // Create many EventLogs
     * const eventLog = await prisma.eventLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventLogCreateManyArgs>(args?: SelectSubset<T, EventLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EventLog.
     * @param {EventLogDeleteArgs} args - Arguments to delete one EventLog.
     * @example
     * // Delete one EventLog
     * const EventLog = await prisma.eventLog.delete({
     *   where: {
     *     // ... filter to delete one EventLog
     *   }
     * })
     * 
     */
    delete<T extends EventLogDeleteArgs>(args: SelectSubset<T, EventLogDeleteArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventLog.
     * @param {EventLogUpdateArgs} args - Arguments to update one EventLog.
     * @example
     * // Update one EventLog
     * const eventLog = await prisma.eventLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventLogUpdateArgs>(args: SelectSubset<T, EventLogUpdateArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventLogs.
     * @param {EventLogDeleteManyArgs} args - Arguments to filter EventLogs to delete.
     * @example
     * // Delete a few EventLogs
     * const { count } = await prisma.eventLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventLogDeleteManyArgs>(args?: SelectSubset<T, EventLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventLogs
     * const eventLog = await prisma.eventLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventLogUpdateManyArgs>(args: SelectSubset<T, EventLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EventLog.
     * @param {EventLogUpsertArgs} args - Arguments to update or create a EventLog.
     * @example
     * // Update or create a EventLog
     * const eventLog = await prisma.eventLog.upsert({
     *   create: {
     *     // ... data to create a EventLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventLog we want to update
     *   }
     * })
     */
    upsert<T extends EventLogUpsertArgs>(args: SelectSubset<T, EventLogUpsertArgs<ExtArgs>>): Prisma__EventLogClient<$Result.GetResult<Prisma.$EventLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogCountArgs} args - Arguments to filter EventLogs to count.
     * @example
     * // Count the number of EventLogs
     * const count = await prisma.eventLog.count({
     *   where: {
     *     // ... the filter for the EventLogs we want to count
     *   }
     * })
    **/
    count<T extends EventLogCountArgs>(
      args?: Subset<T, EventLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventLogAggregateArgs>(args: Subset<T, EventLogAggregateArgs>): Prisma.PrismaPromise<GetEventLogAggregateType<T>>

    /**
     * Group by EventLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventLogGroupByArgs} args - Group by arguments.
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
      T extends EventLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventLogGroupByArgs['orderBy'] }
        : { orderBy?: EventLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventLog model
   */
  readonly fields: EventLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the EventLog model
   */
  interface EventLogFieldRefs {
    readonly id: FieldRef<"EventLog", 'Int'>
    readonly level: FieldRef<"EventLog", 'String'>
    readonly message: FieldRef<"EventLog", 'String'>
    readonly data: FieldRef<"EventLog", 'Json'>
    readonly createdAt: FieldRef<"EventLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventLog findUnique
   */
  export type EventLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Filter, which EventLog to fetch.
     */
    where: EventLogWhereUniqueInput
  }

  /**
   * EventLog findUniqueOrThrow
   */
  export type EventLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Filter, which EventLog to fetch.
     */
    where: EventLogWhereUniqueInput
  }

  /**
   * EventLog findFirst
   */
  export type EventLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Filter, which EventLog to fetch.
     */
    where?: EventLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventLogs to fetch.
     */
    orderBy?: EventLogOrderByWithRelationInput | EventLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventLogs.
     */
    cursor?: EventLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventLogs.
     */
    distinct?: EventLogScalarFieldEnum | EventLogScalarFieldEnum[]
  }

  /**
   * EventLog findFirstOrThrow
   */
  export type EventLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Filter, which EventLog to fetch.
     */
    where?: EventLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventLogs to fetch.
     */
    orderBy?: EventLogOrderByWithRelationInput | EventLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventLogs.
     */
    cursor?: EventLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventLogs.
     */
    distinct?: EventLogScalarFieldEnum | EventLogScalarFieldEnum[]
  }

  /**
   * EventLog findMany
   */
  export type EventLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Filter, which EventLogs to fetch.
     */
    where?: EventLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventLogs to fetch.
     */
    orderBy?: EventLogOrderByWithRelationInput | EventLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventLogs.
     */
    cursor?: EventLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventLogs.
     */
    skip?: number
    distinct?: EventLogScalarFieldEnum | EventLogScalarFieldEnum[]
  }

  /**
   * EventLog create
   */
  export type EventLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * The data needed to create a EventLog.
     */
    data: XOR<EventLogCreateInput, EventLogUncheckedCreateInput>
  }

  /**
   * EventLog createMany
   */
  export type EventLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventLogs.
     */
    data: EventLogCreateManyInput | EventLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventLog update
   */
  export type EventLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * The data needed to update a EventLog.
     */
    data: XOR<EventLogUpdateInput, EventLogUncheckedUpdateInput>
    /**
     * Choose, which EventLog to update.
     */
    where: EventLogWhereUniqueInput
  }

  /**
   * EventLog updateMany
   */
  export type EventLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventLogs.
     */
    data: XOR<EventLogUpdateManyMutationInput, EventLogUncheckedUpdateManyInput>
    /**
     * Filter which EventLogs to update
     */
    where?: EventLogWhereInput
    /**
     * Limit how many EventLogs to update.
     */
    limit?: number
  }

  /**
   * EventLog upsert
   */
  export type EventLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * The filter to search for the EventLog to update in case it exists.
     */
    where: EventLogWhereUniqueInput
    /**
     * In case the EventLog found by the `where` argument doesn't exist, create a new EventLog with this data.
     */
    create: XOR<EventLogCreateInput, EventLogUncheckedCreateInput>
    /**
     * In case the EventLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventLogUpdateInput, EventLogUncheckedUpdateInput>
  }

  /**
   * EventLog delete
   */
  export type EventLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
    /**
     * Filter which EventLog to delete.
     */
    where: EventLogWhereUniqueInput
  }

  /**
   * EventLog deleteMany
   */
  export type EventLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventLogs to delete
     */
    where?: EventLogWhereInput
    /**
     * Limit how many EventLogs to delete.
     */
    limit?: number
  }

  /**
   * EventLog without action
   */
  export type EventLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventLog
     */
    select?: EventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventLog
     */
    omit?: EventLogOmit<ExtArgs> | null
  }


  /**
   * Model SafeConfig
   */

  export type AggregateSafeConfig = {
    _count: SafeConfigCountAggregateOutputType | null
    _avg: SafeConfigAvgAggregateOutputType | null
    _sum: SafeConfigSumAggregateOutputType | null
    _min: SafeConfigMinAggregateOutputType | null
    _max: SafeConfigMaxAggregateOutputType | null
  }

  export type SafeConfigAvgAggregateOutputType = {
    id: number | null
  }

  export type SafeConfigSumAggregateOutputType = {
    id: number | null
  }

  export type SafeConfigMinAggregateOutputType = {
    id: number | null
    key: string | null
    value: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SafeConfigMaxAggregateOutputType = {
    id: number | null
    key: string | null
    value: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SafeConfigCountAggregateOutputType = {
    id: number
    key: number
    value: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SafeConfigAvgAggregateInputType = {
    id?: true
  }

  export type SafeConfigSumAggregateInputType = {
    id?: true
  }

  export type SafeConfigMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SafeConfigMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SafeConfigCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SafeConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SafeConfig to aggregate.
     */
    where?: SafeConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SafeConfigs to fetch.
     */
    orderBy?: SafeConfigOrderByWithRelationInput | SafeConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SafeConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SafeConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SafeConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SafeConfigs
    **/
    _count?: true | SafeConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SafeConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SafeConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SafeConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SafeConfigMaxAggregateInputType
  }

  export type GetSafeConfigAggregateType<T extends SafeConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateSafeConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSafeConfig[P]>
      : GetScalarType<T[P], AggregateSafeConfig[P]>
  }




  export type SafeConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SafeConfigWhereInput
    orderBy?: SafeConfigOrderByWithAggregationInput | SafeConfigOrderByWithAggregationInput[]
    by: SafeConfigScalarFieldEnum[] | SafeConfigScalarFieldEnum
    having?: SafeConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SafeConfigCountAggregateInputType | true
    _avg?: SafeConfigAvgAggregateInputType
    _sum?: SafeConfigSumAggregateInputType
    _min?: SafeConfigMinAggregateInputType
    _max?: SafeConfigMaxAggregateInputType
  }

  export type SafeConfigGroupByOutputType = {
    id: number
    key: string
    value: string
    createdAt: Date
    updatedAt: Date
    _count: SafeConfigCountAggregateOutputType | null
    _avg: SafeConfigAvgAggregateOutputType | null
    _sum: SafeConfigSumAggregateOutputType | null
    _min: SafeConfigMinAggregateOutputType | null
    _max: SafeConfigMaxAggregateOutputType | null
  }

  type GetSafeConfigGroupByPayload<T extends SafeConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SafeConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SafeConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SafeConfigGroupByOutputType[P]>
            : GetScalarType<T[P], SafeConfigGroupByOutputType[P]>
        }
      >
    >


  export type SafeConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["safeConfig"]>



  export type SafeConfigSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SafeConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "createdAt" | "updatedAt", ExtArgs["result"]["safeConfig"]>

  export type $SafeConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SafeConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      key: string
      value: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["safeConfig"]>
    composites: {}
  }

  type SafeConfigGetPayload<S extends boolean | null | undefined | SafeConfigDefaultArgs> = $Result.GetResult<Prisma.$SafeConfigPayload, S>

  type SafeConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SafeConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SafeConfigCountAggregateInputType | true
    }

  export interface SafeConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SafeConfig'], meta: { name: 'SafeConfig' } }
    /**
     * Find zero or one SafeConfig that matches the filter.
     * @param {SafeConfigFindUniqueArgs} args - Arguments to find a SafeConfig
     * @example
     * // Get one SafeConfig
     * const safeConfig = await prisma.safeConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SafeConfigFindUniqueArgs>(args: SelectSubset<T, SafeConfigFindUniqueArgs<ExtArgs>>): Prisma__SafeConfigClient<$Result.GetResult<Prisma.$SafeConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SafeConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SafeConfigFindUniqueOrThrowArgs} args - Arguments to find a SafeConfig
     * @example
     * // Get one SafeConfig
     * const safeConfig = await prisma.safeConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SafeConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, SafeConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SafeConfigClient<$Result.GetResult<Prisma.$SafeConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SafeConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafeConfigFindFirstArgs} args - Arguments to find a SafeConfig
     * @example
     * // Get one SafeConfig
     * const safeConfig = await prisma.safeConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SafeConfigFindFirstArgs>(args?: SelectSubset<T, SafeConfigFindFirstArgs<ExtArgs>>): Prisma__SafeConfigClient<$Result.GetResult<Prisma.$SafeConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SafeConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafeConfigFindFirstOrThrowArgs} args - Arguments to find a SafeConfig
     * @example
     * // Get one SafeConfig
     * const safeConfig = await prisma.safeConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SafeConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, SafeConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__SafeConfigClient<$Result.GetResult<Prisma.$SafeConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SafeConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafeConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SafeConfigs
     * const safeConfigs = await prisma.safeConfig.findMany()
     * 
     * // Get first 10 SafeConfigs
     * const safeConfigs = await prisma.safeConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const safeConfigWithIdOnly = await prisma.safeConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SafeConfigFindManyArgs>(args?: SelectSubset<T, SafeConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SafeConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SafeConfig.
     * @param {SafeConfigCreateArgs} args - Arguments to create a SafeConfig.
     * @example
     * // Create one SafeConfig
     * const SafeConfig = await prisma.safeConfig.create({
     *   data: {
     *     // ... data to create a SafeConfig
     *   }
     * })
     * 
     */
    create<T extends SafeConfigCreateArgs>(args: SelectSubset<T, SafeConfigCreateArgs<ExtArgs>>): Prisma__SafeConfigClient<$Result.GetResult<Prisma.$SafeConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SafeConfigs.
     * @param {SafeConfigCreateManyArgs} args - Arguments to create many SafeConfigs.
     * @example
     * // Create many SafeConfigs
     * const safeConfig = await prisma.safeConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SafeConfigCreateManyArgs>(args?: SelectSubset<T, SafeConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SafeConfig.
     * @param {SafeConfigDeleteArgs} args - Arguments to delete one SafeConfig.
     * @example
     * // Delete one SafeConfig
     * const SafeConfig = await prisma.safeConfig.delete({
     *   where: {
     *     // ... filter to delete one SafeConfig
     *   }
     * })
     * 
     */
    delete<T extends SafeConfigDeleteArgs>(args: SelectSubset<T, SafeConfigDeleteArgs<ExtArgs>>): Prisma__SafeConfigClient<$Result.GetResult<Prisma.$SafeConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SafeConfig.
     * @param {SafeConfigUpdateArgs} args - Arguments to update one SafeConfig.
     * @example
     * // Update one SafeConfig
     * const safeConfig = await prisma.safeConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SafeConfigUpdateArgs>(args: SelectSubset<T, SafeConfigUpdateArgs<ExtArgs>>): Prisma__SafeConfigClient<$Result.GetResult<Prisma.$SafeConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SafeConfigs.
     * @param {SafeConfigDeleteManyArgs} args - Arguments to filter SafeConfigs to delete.
     * @example
     * // Delete a few SafeConfigs
     * const { count } = await prisma.safeConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SafeConfigDeleteManyArgs>(args?: SelectSubset<T, SafeConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SafeConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafeConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SafeConfigs
     * const safeConfig = await prisma.safeConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SafeConfigUpdateManyArgs>(args: SelectSubset<T, SafeConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SafeConfig.
     * @param {SafeConfigUpsertArgs} args - Arguments to update or create a SafeConfig.
     * @example
     * // Update or create a SafeConfig
     * const safeConfig = await prisma.safeConfig.upsert({
     *   create: {
     *     // ... data to create a SafeConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SafeConfig we want to update
     *   }
     * })
     */
    upsert<T extends SafeConfigUpsertArgs>(args: SelectSubset<T, SafeConfigUpsertArgs<ExtArgs>>): Prisma__SafeConfigClient<$Result.GetResult<Prisma.$SafeConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SafeConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafeConfigCountArgs} args - Arguments to filter SafeConfigs to count.
     * @example
     * // Count the number of SafeConfigs
     * const count = await prisma.safeConfig.count({
     *   where: {
     *     // ... the filter for the SafeConfigs we want to count
     *   }
     * })
    **/
    count<T extends SafeConfigCountArgs>(
      args?: Subset<T, SafeConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SafeConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SafeConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafeConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SafeConfigAggregateArgs>(args: Subset<T, SafeConfigAggregateArgs>): Prisma.PrismaPromise<GetSafeConfigAggregateType<T>>

    /**
     * Group by SafeConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafeConfigGroupByArgs} args - Group by arguments.
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
      T extends SafeConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SafeConfigGroupByArgs['orderBy'] }
        : { orderBy?: SafeConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SafeConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSafeConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SafeConfig model
   */
  readonly fields: SafeConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SafeConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SafeConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SafeConfig model
   */
  interface SafeConfigFieldRefs {
    readonly id: FieldRef<"SafeConfig", 'Int'>
    readonly key: FieldRef<"SafeConfig", 'String'>
    readonly value: FieldRef<"SafeConfig", 'String'>
    readonly createdAt: FieldRef<"SafeConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"SafeConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SafeConfig findUnique
   */
  export type SafeConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafeConfig
     */
    select?: SafeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafeConfig
     */
    omit?: SafeConfigOmit<ExtArgs> | null
    /**
     * Filter, which SafeConfig to fetch.
     */
    where: SafeConfigWhereUniqueInput
  }

  /**
   * SafeConfig findUniqueOrThrow
   */
  export type SafeConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafeConfig
     */
    select?: SafeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafeConfig
     */
    omit?: SafeConfigOmit<ExtArgs> | null
    /**
     * Filter, which SafeConfig to fetch.
     */
    where: SafeConfigWhereUniqueInput
  }

  /**
   * SafeConfig findFirst
   */
  export type SafeConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafeConfig
     */
    select?: SafeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafeConfig
     */
    omit?: SafeConfigOmit<ExtArgs> | null
    /**
     * Filter, which SafeConfig to fetch.
     */
    where?: SafeConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SafeConfigs to fetch.
     */
    orderBy?: SafeConfigOrderByWithRelationInput | SafeConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SafeConfigs.
     */
    cursor?: SafeConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SafeConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SafeConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SafeConfigs.
     */
    distinct?: SafeConfigScalarFieldEnum | SafeConfigScalarFieldEnum[]
  }

  /**
   * SafeConfig findFirstOrThrow
   */
  export type SafeConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafeConfig
     */
    select?: SafeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafeConfig
     */
    omit?: SafeConfigOmit<ExtArgs> | null
    /**
     * Filter, which SafeConfig to fetch.
     */
    where?: SafeConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SafeConfigs to fetch.
     */
    orderBy?: SafeConfigOrderByWithRelationInput | SafeConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SafeConfigs.
     */
    cursor?: SafeConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SafeConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SafeConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SafeConfigs.
     */
    distinct?: SafeConfigScalarFieldEnum | SafeConfigScalarFieldEnum[]
  }

  /**
   * SafeConfig findMany
   */
  export type SafeConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafeConfig
     */
    select?: SafeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafeConfig
     */
    omit?: SafeConfigOmit<ExtArgs> | null
    /**
     * Filter, which SafeConfigs to fetch.
     */
    where?: SafeConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SafeConfigs to fetch.
     */
    orderBy?: SafeConfigOrderByWithRelationInput | SafeConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SafeConfigs.
     */
    cursor?: SafeConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SafeConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SafeConfigs.
     */
    skip?: number
    distinct?: SafeConfigScalarFieldEnum | SafeConfigScalarFieldEnum[]
  }

  /**
   * SafeConfig create
   */
  export type SafeConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafeConfig
     */
    select?: SafeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafeConfig
     */
    omit?: SafeConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a SafeConfig.
     */
    data: XOR<SafeConfigCreateInput, SafeConfigUncheckedCreateInput>
  }

  /**
   * SafeConfig createMany
   */
  export type SafeConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SafeConfigs.
     */
    data: SafeConfigCreateManyInput | SafeConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SafeConfig update
   */
  export type SafeConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafeConfig
     */
    select?: SafeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafeConfig
     */
    omit?: SafeConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a SafeConfig.
     */
    data: XOR<SafeConfigUpdateInput, SafeConfigUncheckedUpdateInput>
    /**
     * Choose, which SafeConfig to update.
     */
    where: SafeConfigWhereUniqueInput
  }

  /**
   * SafeConfig updateMany
   */
  export type SafeConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SafeConfigs.
     */
    data: XOR<SafeConfigUpdateManyMutationInput, SafeConfigUncheckedUpdateManyInput>
    /**
     * Filter which SafeConfigs to update
     */
    where?: SafeConfigWhereInput
    /**
     * Limit how many SafeConfigs to update.
     */
    limit?: number
  }

  /**
   * SafeConfig upsert
   */
  export type SafeConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafeConfig
     */
    select?: SafeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafeConfig
     */
    omit?: SafeConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the SafeConfig to update in case it exists.
     */
    where: SafeConfigWhereUniqueInput
    /**
     * In case the SafeConfig found by the `where` argument doesn't exist, create a new SafeConfig with this data.
     */
    create: XOR<SafeConfigCreateInput, SafeConfigUncheckedCreateInput>
    /**
     * In case the SafeConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SafeConfigUpdateInput, SafeConfigUncheckedUpdateInput>
  }

  /**
   * SafeConfig delete
   */
  export type SafeConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafeConfig
     */
    select?: SafeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafeConfig
     */
    omit?: SafeConfigOmit<ExtArgs> | null
    /**
     * Filter which SafeConfig to delete.
     */
    where: SafeConfigWhereUniqueInput
  }

  /**
   * SafeConfig deleteMany
   */
  export type SafeConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SafeConfigs to delete
     */
    where?: SafeConfigWhereInput
    /**
     * Limit how many SafeConfigs to delete.
     */
    limit?: number
  }

  /**
   * SafeConfig without action
   */
  export type SafeConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafeConfig
     */
    select?: SafeConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafeConfig
     */
    omit?: SafeConfigOmit<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    address: 'address',
    role: 'role',
    createdAt: 'createdAt',
    lastActive: 'lastActive',
    metadata: 'metadata'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MeshClaimScalarFieldEnum: {
    id: 'id',
    userAddress: 'userAddress',
    meshId: 'meshId',
    longitude: 'longitude',
    latitude: 'latitude',
    txHash: 'txHash',
    blockNumber: 'blockNumber',
    claimedAt: 'claimedAt'
  };

  export type MeshClaimScalarFieldEnum = (typeof MeshClaimScalarFieldEnum)[keyof typeof MeshClaimScalarFieldEnum]


  export const MeshScalarFieldEnum: {
    id: 'id',
    meshId: 'meshId',
    longitude: 'longitude',
    latitude: 'latitude',
    heatLevel: 'heatLevel',
    claimCount: 'claimCount',
    lastClaimTime: 'lastClaimTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MeshScalarFieldEnum = (typeof MeshScalarFieldEnum)[keyof typeof MeshScalarFieldEnum]


  export const ContractStatusScalarFieldEnum: {
    id: 'id',
    contractName: 'contractName',
    contractAddress: 'contractAddress',
    chainId: 'chainId',
    isPaused: 'isPaused',
    lastBlock: 'lastBlock',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContractStatusScalarFieldEnum = (typeof ContractStatusScalarFieldEnum)[keyof typeof ContractStatusScalarFieldEnum]


  export const SystemEventScalarFieldEnum: {
    id: 'id',
    eventType: 'eventType',
    message: 'message',
    data: 'data',
    createdAt: 'createdAt'
  };

  export type SystemEventScalarFieldEnum = (typeof SystemEventScalarFieldEnum)[keyof typeof SystemEventScalarFieldEnum]


  export const EventLogScalarFieldEnum: {
    id: 'id',
    level: 'level',
    message: 'message',
    data: 'data',
    createdAt: 'createdAt'
  };

  export type EventLogScalarFieldEnum = (typeof EventLogScalarFieldEnum)[keyof typeof EventLogScalarFieldEnum]


  export const SafeConfigScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SafeConfigScalarFieldEnum = (typeof SafeConfigScalarFieldEnum)[keyof typeof SafeConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    address: 'address',
    role: 'role'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const MeshClaimOrderByRelevanceFieldEnum: {
    userAddress: 'userAddress',
    meshId: 'meshId',
    txHash: 'txHash'
  };

  export type MeshClaimOrderByRelevanceFieldEnum = (typeof MeshClaimOrderByRelevanceFieldEnum)[keyof typeof MeshClaimOrderByRelevanceFieldEnum]


  export const MeshOrderByRelevanceFieldEnum: {
    meshId: 'meshId'
  };

  export type MeshOrderByRelevanceFieldEnum = (typeof MeshOrderByRelevanceFieldEnum)[keyof typeof MeshOrderByRelevanceFieldEnum]


  export const ContractStatusOrderByRelevanceFieldEnum: {
    contractName: 'contractName',
    contractAddress: 'contractAddress'
  };

  export type ContractStatusOrderByRelevanceFieldEnum = (typeof ContractStatusOrderByRelevanceFieldEnum)[keyof typeof ContractStatusOrderByRelevanceFieldEnum]


  export const SystemEventOrderByRelevanceFieldEnum: {
    eventType: 'eventType',
    message: 'message'
  };

  export type SystemEventOrderByRelevanceFieldEnum = (typeof SystemEventOrderByRelevanceFieldEnum)[keyof typeof SystemEventOrderByRelevanceFieldEnum]


  export const EventLogOrderByRelevanceFieldEnum: {
    level: 'level',
    message: 'message'
  };

  export type EventLogOrderByRelevanceFieldEnum = (typeof EventLogOrderByRelevanceFieldEnum)[keyof typeof EventLogOrderByRelevanceFieldEnum]


  export const SafeConfigOrderByRelevanceFieldEnum: {
    key: 'key',
    value: 'value'
  };

  export type SafeConfigOrderByRelevanceFieldEnum = (typeof SafeConfigOrderByRelevanceFieldEnum)[keyof typeof SafeConfigOrderByRelevanceFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    address?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    lastActive?: DateTimeNullableFilter<"User"> | Date | string | null
    metadata?: JsonNullableFilter<"User">
    meshClaims?: MeshClaimListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    lastActive?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    meshClaims?: MeshClaimOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    address?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    lastActive?: DateTimeNullableFilter<"User"> | Date | string | null
    metadata?: JsonNullableFilter<"User">
    meshClaims?: MeshClaimListRelationFilter
  }, "id" | "address">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    lastActive?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    address?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastActive?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    metadata?: JsonNullableWithAggregatesFilter<"User">
  }

  export type MeshClaimWhereInput = {
    AND?: MeshClaimWhereInput | MeshClaimWhereInput[]
    OR?: MeshClaimWhereInput[]
    NOT?: MeshClaimWhereInput | MeshClaimWhereInput[]
    id?: IntFilter<"MeshClaim"> | number
    userAddress?: StringFilter<"MeshClaim"> | string
    meshId?: StringFilter<"MeshClaim"> | string
    longitude?: DecimalNullableFilter<"MeshClaim"> | Decimal | DecimalJsLike | number | string | null
    latitude?: DecimalNullableFilter<"MeshClaim"> | Decimal | DecimalJsLike | number | string | null
    txHash?: StringNullableFilter<"MeshClaim"> | string | null
    blockNumber?: BigIntNullableFilter<"MeshClaim"> | bigint | number | null
    claimedAt?: DateTimeFilter<"MeshClaim"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    mesh?: XOR<MeshScalarRelationFilter, MeshWhereInput>
  }

  export type MeshClaimOrderByWithRelationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    meshId?: SortOrder
    longitude?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    claimedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    mesh?: MeshOrderByWithRelationInput
    _relevance?: MeshClaimOrderByRelevanceInput
  }

  export type MeshClaimWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MeshClaimWhereInput | MeshClaimWhereInput[]
    OR?: MeshClaimWhereInput[]
    NOT?: MeshClaimWhereInput | MeshClaimWhereInput[]
    userAddress?: StringFilter<"MeshClaim"> | string
    meshId?: StringFilter<"MeshClaim"> | string
    longitude?: DecimalNullableFilter<"MeshClaim"> | Decimal | DecimalJsLike | number | string | null
    latitude?: DecimalNullableFilter<"MeshClaim"> | Decimal | DecimalJsLike | number | string | null
    txHash?: StringNullableFilter<"MeshClaim"> | string | null
    blockNumber?: BigIntNullableFilter<"MeshClaim"> | bigint | number | null
    claimedAt?: DateTimeFilter<"MeshClaim"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    mesh?: XOR<MeshScalarRelationFilter, MeshWhereInput>
  }, "id">

  export type MeshClaimOrderByWithAggregationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    meshId?: SortOrder
    longitude?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    claimedAt?: SortOrder
    _count?: MeshClaimCountOrderByAggregateInput
    _avg?: MeshClaimAvgOrderByAggregateInput
    _max?: MeshClaimMaxOrderByAggregateInput
    _min?: MeshClaimMinOrderByAggregateInput
    _sum?: MeshClaimSumOrderByAggregateInput
  }

  export type MeshClaimScalarWhereWithAggregatesInput = {
    AND?: MeshClaimScalarWhereWithAggregatesInput | MeshClaimScalarWhereWithAggregatesInput[]
    OR?: MeshClaimScalarWhereWithAggregatesInput[]
    NOT?: MeshClaimScalarWhereWithAggregatesInput | MeshClaimScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MeshClaim"> | number
    userAddress?: StringWithAggregatesFilter<"MeshClaim"> | string
    meshId?: StringWithAggregatesFilter<"MeshClaim"> | string
    longitude?: DecimalNullableWithAggregatesFilter<"MeshClaim"> | Decimal | DecimalJsLike | number | string | null
    latitude?: DecimalNullableWithAggregatesFilter<"MeshClaim"> | Decimal | DecimalJsLike | number | string | null
    txHash?: StringNullableWithAggregatesFilter<"MeshClaim"> | string | null
    blockNumber?: BigIntNullableWithAggregatesFilter<"MeshClaim"> | bigint | number | null
    claimedAt?: DateTimeWithAggregatesFilter<"MeshClaim"> | Date | string
  }

  export type MeshWhereInput = {
    AND?: MeshWhereInput | MeshWhereInput[]
    OR?: MeshWhereInput[]
    NOT?: MeshWhereInput | MeshWhereInput[]
    id?: IntFilter<"Mesh"> | number
    meshId?: StringFilter<"Mesh"> | string
    longitude?: DecimalFilter<"Mesh"> | Decimal | DecimalJsLike | number | string
    latitude?: DecimalFilter<"Mesh"> | Decimal | DecimalJsLike | number | string
    heatLevel?: IntNullableFilter<"Mesh"> | number | null
    claimCount?: IntNullableFilter<"Mesh"> | number | null
    lastClaimTime?: DateTimeNullableFilter<"Mesh"> | Date | string | null
    createdAt?: DateTimeFilter<"Mesh"> | Date | string
    updatedAt?: DateTimeFilter<"Mesh"> | Date | string
    claims?: MeshClaimListRelationFilter
  }

  export type MeshOrderByWithRelationInput = {
    id?: SortOrder
    meshId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    heatLevel?: SortOrderInput | SortOrder
    claimCount?: SortOrderInput | SortOrder
    lastClaimTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    claims?: MeshClaimOrderByRelationAggregateInput
    _relevance?: MeshOrderByRelevanceInput
  }

  export type MeshWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    meshId?: string
    AND?: MeshWhereInput | MeshWhereInput[]
    OR?: MeshWhereInput[]
    NOT?: MeshWhereInput | MeshWhereInput[]
    longitude?: DecimalFilter<"Mesh"> | Decimal | DecimalJsLike | number | string
    latitude?: DecimalFilter<"Mesh"> | Decimal | DecimalJsLike | number | string
    heatLevel?: IntNullableFilter<"Mesh"> | number | null
    claimCount?: IntNullableFilter<"Mesh"> | number | null
    lastClaimTime?: DateTimeNullableFilter<"Mesh"> | Date | string | null
    createdAt?: DateTimeFilter<"Mesh"> | Date | string
    updatedAt?: DateTimeFilter<"Mesh"> | Date | string
    claims?: MeshClaimListRelationFilter
  }, "id" | "meshId">

  export type MeshOrderByWithAggregationInput = {
    id?: SortOrder
    meshId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    heatLevel?: SortOrderInput | SortOrder
    claimCount?: SortOrderInput | SortOrder
    lastClaimTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MeshCountOrderByAggregateInput
    _avg?: MeshAvgOrderByAggregateInput
    _max?: MeshMaxOrderByAggregateInput
    _min?: MeshMinOrderByAggregateInput
    _sum?: MeshSumOrderByAggregateInput
  }

  export type MeshScalarWhereWithAggregatesInput = {
    AND?: MeshScalarWhereWithAggregatesInput | MeshScalarWhereWithAggregatesInput[]
    OR?: MeshScalarWhereWithAggregatesInput[]
    NOT?: MeshScalarWhereWithAggregatesInput | MeshScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Mesh"> | number
    meshId?: StringWithAggregatesFilter<"Mesh"> | string
    longitude?: DecimalWithAggregatesFilter<"Mesh"> | Decimal | DecimalJsLike | number | string
    latitude?: DecimalWithAggregatesFilter<"Mesh"> | Decimal | DecimalJsLike | number | string
    heatLevel?: IntNullableWithAggregatesFilter<"Mesh"> | number | null
    claimCount?: IntNullableWithAggregatesFilter<"Mesh"> | number | null
    lastClaimTime?: DateTimeNullableWithAggregatesFilter<"Mesh"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Mesh"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Mesh"> | Date | string
  }

  export type ContractStatusWhereInput = {
    AND?: ContractStatusWhereInput | ContractStatusWhereInput[]
    OR?: ContractStatusWhereInput[]
    NOT?: ContractStatusWhereInput | ContractStatusWhereInput[]
    id?: IntFilter<"ContractStatus"> | number
    contractName?: StringFilter<"ContractStatus"> | string
    contractAddress?: StringFilter<"ContractStatus"> | string
    chainId?: BigIntFilter<"ContractStatus"> | bigint | number
    isPaused?: BoolFilter<"ContractStatus"> | boolean
    lastBlock?: BigIntFilter<"ContractStatus"> | bigint | number
    createdAt?: DateTimeFilter<"ContractStatus"> | Date | string
    updatedAt?: DateTimeFilter<"ContractStatus"> | Date | string
  }

  export type ContractStatusOrderByWithRelationInput = {
    id?: SortOrder
    contractName?: SortOrder
    contractAddress?: SortOrder
    chainId?: SortOrder
    isPaused?: SortOrder
    lastBlock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: ContractStatusOrderByRelevanceInput
  }

  export type ContractStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    contractAddress_chainId?: ContractStatusContractAddressChainIdCompoundUniqueInput
    AND?: ContractStatusWhereInput | ContractStatusWhereInput[]
    OR?: ContractStatusWhereInput[]
    NOT?: ContractStatusWhereInput | ContractStatusWhereInput[]
    contractName?: StringFilter<"ContractStatus"> | string
    contractAddress?: StringFilter<"ContractStatus"> | string
    chainId?: BigIntFilter<"ContractStatus"> | bigint | number
    isPaused?: BoolFilter<"ContractStatus"> | boolean
    lastBlock?: BigIntFilter<"ContractStatus"> | bigint | number
    createdAt?: DateTimeFilter<"ContractStatus"> | Date | string
    updatedAt?: DateTimeFilter<"ContractStatus"> | Date | string
  }, "id" | "contractAddress_chainId">

  export type ContractStatusOrderByWithAggregationInput = {
    id?: SortOrder
    contractName?: SortOrder
    contractAddress?: SortOrder
    chainId?: SortOrder
    isPaused?: SortOrder
    lastBlock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    contractName?: StringWithAggregatesFilter<"ContractStatus"> | string
    contractAddress?: StringWithAggregatesFilter<"ContractStatus"> | string
    chainId?: BigIntWithAggregatesFilter<"ContractStatus"> | bigint | number
    isPaused?: BoolWithAggregatesFilter<"ContractStatus"> | boolean
    lastBlock?: BigIntWithAggregatesFilter<"ContractStatus"> | bigint | number
    createdAt?: DateTimeWithAggregatesFilter<"ContractStatus"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ContractStatus"> | Date | string
  }

  export type SystemEventWhereInput = {
    AND?: SystemEventWhereInput | SystemEventWhereInput[]
    OR?: SystemEventWhereInput[]
    NOT?: SystemEventWhereInput | SystemEventWhereInput[]
    id?: IntFilter<"SystemEvent"> | number
    eventType?: StringFilter<"SystemEvent"> | string
    message?: StringFilter<"SystemEvent"> | string
    data?: JsonNullableFilter<"SystemEvent">
    createdAt?: DateTimeFilter<"SystemEvent"> | Date | string
  }

  export type SystemEventOrderByWithRelationInput = {
    id?: SortOrder
    eventType?: SortOrder
    message?: SortOrder
    data?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _relevance?: SystemEventOrderByRelevanceInput
  }

  export type SystemEventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SystemEventWhereInput | SystemEventWhereInput[]
    OR?: SystemEventWhereInput[]
    NOT?: SystemEventWhereInput | SystemEventWhereInput[]
    eventType?: StringFilter<"SystemEvent"> | string
    message?: StringFilter<"SystemEvent"> | string
    data?: JsonNullableFilter<"SystemEvent">
    createdAt?: DateTimeFilter<"SystemEvent"> | Date | string
  }, "id">

  export type SystemEventOrderByWithAggregationInput = {
    id?: SortOrder
    eventType?: SortOrder
    message?: SortOrder
    data?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SystemEventCountOrderByAggregateInput
    _avg?: SystemEventAvgOrderByAggregateInput
    _max?: SystemEventMaxOrderByAggregateInput
    _min?: SystemEventMinOrderByAggregateInput
    _sum?: SystemEventSumOrderByAggregateInput
  }

  export type SystemEventScalarWhereWithAggregatesInput = {
    AND?: SystemEventScalarWhereWithAggregatesInput | SystemEventScalarWhereWithAggregatesInput[]
    OR?: SystemEventScalarWhereWithAggregatesInput[]
    NOT?: SystemEventScalarWhereWithAggregatesInput | SystemEventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SystemEvent"> | number
    eventType?: StringWithAggregatesFilter<"SystemEvent"> | string
    message?: StringWithAggregatesFilter<"SystemEvent"> | string
    data?: JsonNullableWithAggregatesFilter<"SystemEvent">
    createdAt?: DateTimeWithAggregatesFilter<"SystemEvent"> | Date | string
  }

  export type EventLogWhereInput = {
    AND?: EventLogWhereInput | EventLogWhereInput[]
    OR?: EventLogWhereInput[]
    NOT?: EventLogWhereInput | EventLogWhereInput[]
    id?: IntFilter<"EventLog"> | number
    level?: StringFilter<"EventLog"> | string
    message?: StringFilter<"EventLog"> | string
    data?: JsonNullableFilter<"EventLog">
    createdAt?: DateTimeFilter<"EventLog"> | Date | string
  }

  export type EventLogOrderByWithRelationInput = {
    id?: SortOrder
    level?: SortOrder
    message?: SortOrder
    data?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _relevance?: EventLogOrderByRelevanceInput
  }

  export type EventLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EventLogWhereInput | EventLogWhereInput[]
    OR?: EventLogWhereInput[]
    NOT?: EventLogWhereInput | EventLogWhereInput[]
    level?: StringFilter<"EventLog"> | string
    message?: StringFilter<"EventLog"> | string
    data?: JsonNullableFilter<"EventLog">
    createdAt?: DateTimeFilter<"EventLog"> | Date | string
  }, "id">

  export type EventLogOrderByWithAggregationInput = {
    id?: SortOrder
    level?: SortOrder
    message?: SortOrder
    data?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EventLogCountOrderByAggregateInput
    _avg?: EventLogAvgOrderByAggregateInput
    _max?: EventLogMaxOrderByAggregateInput
    _min?: EventLogMinOrderByAggregateInput
    _sum?: EventLogSumOrderByAggregateInput
  }

  export type EventLogScalarWhereWithAggregatesInput = {
    AND?: EventLogScalarWhereWithAggregatesInput | EventLogScalarWhereWithAggregatesInput[]
    OR?: EventLogScalarWhereWithAggregatesInput[]
    NOT?: EventLogScalarWhereWithAggregatesInput | EventLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EventLog"> | number
    level?: StringWithAggregatesFilter<"EventLog"> | string
    message?: StringWithAggregatesFilter<"EventLog"> | string
    data?: JsonNullableWithAggregatesFilter<"EventLog">
    createdAt?: DateTimeWithAggregatesFilter<"EventLog"> | Date | string
  }

  export type SafeConfigWhereInput = {
    AND?: SafeConfigWhereInput | SafeConfigWhereInput[]
    OR?: SafeConfigWhereInput[]
    NOT?: SafeConfigWhereInput | SafeConfigWhereInput[]
    id?: IntFilter<"SafeConfig"> | number
    key?: StringFilter<"SafeConfig"> | string
    value?: StringFilter<"SafeConfig"> | string
    createdAt?: DateTimeFilter<"SafeConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SafeConfig"> | Date | string
  }

  export type SafeConfigOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: SafeConfigOrderByRelevanceInput
  }

  export type SafeConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    key?: string
    AND?: SafeConfigWhereInput | SafeConfigWhereInput[]
    OR?: SafeConfigWhereInput[]
    NOT?: SafeConfigWhereInput | SafeConfigWhereInput[]
    value?: StringFilter<"SafeConfig"> | string
    createdAt?: DateTimeFilter<"SafeConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SafeConfig"> | Date | string
  }, "id" | "key">

  export type SafeConfigOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SafeConfigCountOrderByAggregateInput
    _avg?: SafeConfigAvgOrderByAggregateInput
    _max?: SafeConfigMaxOrderByAggregateInput
    _min?: SafeConfigMinOrderByAggregateInput
    _sum?: SafeConfigSumOrderByAggregateInput
  }

  export type SafeConfigScalarWhereWithAggregatesInput = {
    AND?: SafeConfigScalarWhereWithAggregatesInput | SafeConfigScalarWhereWithAggregatesInput[]
    OR?: SafeConfigScalarWhereWithAggregatesInput[]
    NOT?: SafeConfigScalarWhereWithAggregatesInput | SafeConfigScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SafeConfig"> | number
    key?: StringWithAggregatesFilter<"SafeConfig"> | string
    value?: StringWithAggregatesFilter<"SafeConfig"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SafeConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SafeConfig"> | Date | string
  }

  export type UserCreateInput = {
    address: string
    role?: string
    createdAt?: Date | string
    lastActive?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    meshClaims?: MeshClaimCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    address: string
    role?: string
    createdAt?: Date | string
    lastActive?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    meshClaims?: MeshClaimUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    meshClaims?: MeshClaimUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    meshClaims?: MeshClaimUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    address: string
    role?: string
    createdAt?: Date | string
    lastActive?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserUpdateManyMutationInput = {
    address?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MeshClaimCreateInput = {
    longitude?: Decimal | DecimalJsLike | number | string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    txHash?: string | null
    blockNumber?: bigint | number | null
    claimedAt?: Date | string
    user: UserCreateNestedOneWithoutMeshClaimsInput
    mesh: MeshCreateNestedOneWithoutClaimsInput
  }

  export type MeshClaimUncheckedCreateInput = {
    id?: number
    userAddress: string
    meshId: string
    longitude?: Decimal | DecimalJsLike | number | string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    txHash?: string | null
    blockNumber?: bigint | number | null
    claimedAt?: Date | string
  }

  export type MeshClaimUpdateInput = {
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMeshClaimsNestedInput
    mesh?: MeshUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type MeshClaimUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userAddress?: StringFieldUpdateOperationsInput | string
    meshId?: StringFieldUpdateOperationsInput | string
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeshClaimCreateManyInput = {
    id?: number
    userAddress: string
    meshId: string
    longitude?: Decimal | DecimalJsLike | number | string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    txHash?: string | null
    blockNumber?: bigint | number | null
    claimedAt?: Date | string
  }

  export type MeshClaimUpdateManyMutationInput = {
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeshClaimUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userAddress?: StringFieldUpdateOperationsInput | string
    meshId?: StringFieldUpdateOperationsInput | string
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeshCreateInput = {
    meshId: string
    longitude: Decimal | DecimalJsLike | number | string
    latitude: Decimal | DecimalJsLike | number | string
    heatLevel?: number | null
    claimCount?: number | null
    lastClaimTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    claims?: MeshClaimCreateNestedManyWithoutMeshInput
  }

  export type MeshUncheckedCreateInput = {
    id?: number
    meshId: string
    longitude: Decimal | DecimalJsLike | number | string
    latitude: Decimal | DecimalJsLike | number | string
    heatLevel?: number | null
    claimCount?: number | null
    lastClaimTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    claims?: MeshClaimUncheckedCreateNestedManyWithoutMeshInput
  }

  export type MeshUpdateInput = {
    meshId?: StringFieldUpdateOperationsInput | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    heatLevel?: NullableIntFieldUpdateOperationsInput | number | null
    claimCount?: NullableIntFieldUpdateOperationsInput | number | null
    lastClaimTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: MeshClaimUpdateManyWithoutMeshNestedInput
  }

  export type MeshUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    meshId?: StringFieldUpdateOperationsInput | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    heatLevel?: NullableIntFieldUpdateOperationsInput | number | null
    claimCount?: NullableIntFieldUpdateOperationsInput | number | null
    lastClaimTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: MeshClaimUncheckedUpdateManyWithoutMeshNestedInput
  }

  export type MeshCreateManyInput = {
    id?: number
    meshId: string
    longitude: Decimal | DecimalJsLike | number | string
    latitude: Decimal | DecimalJsLike | number | string
    heatLevel?: number | null
    claimCount?: number | null
    lastClaimTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MeshUpdateManyMutationInput = {
    meshId?: StringFieldUpdateOperationsInput | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    heatLevel?: NullableIntFieldUpdateOperationsInput | number | null
    claimCount?: NullableIntFieldUpdateOperationsInput | number | null
    lastClaimTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeshUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    meshId?: StringFieldUpdateOperationsInput | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    heatLevel?: NullableIntFieldUpdateOperationsInput | number | null
    claimCount?: NullableIntFieldUpdateOperationsInput | number | null
    lastClaimTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractStatusCreateInput = {
    contractName: string
    contractAddress: string
    chainId?: bigint | number
    isPaused?: boolean
    lastBlock: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractStatusUncheckedCreateInput = {
    id?: number
    contractName: string
    contractAddress: string
    chainId?: bigint | number
    isPaused?: boolean
    lastBlock: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractStatusUpdateInput = {
    contractName?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: BigIntFieldUpdateOperationsInput | bigint | number
    isPaused?: BoolFieldUpdateOperationsInput | boolean
    lastBlock?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractStatusUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    contractName?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: BigIntFieldUpdateOperationsInput | bigint | number
    isPaused?: BoolFieldUpdateOperationsInput | boolean
    lastBlock?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractStatusCreateManyInput = {
    id?: number
    contractName: string
    contractAddress: string
    chainId?: bigint | number
    isPaused?: boolean
    lastBlock: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractStatusUpdateManyMutationInput = {
    contractName?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: BigIntFieldUpdateOperationsInput | bigint | number
    isPaused?: BoolFieldUpdateOperationsInput | boolean
    lastBlock?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractStatusUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    contractName?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: BigIntFieldUpdateOperationsInput | bigint | number
    isPaused?: BoolFieldUpdateOperationsInput | boolean
    lastBlock?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemEventCreateInput = {
    eventType: string
    message?: string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SystemEventUncheckedCreateInput = {
    id?: number
    eventType: string
    message?: string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SystemEventUpdateInput = {
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemEventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemEventCreateManyInput = {
    id?: number
    eventType: string
    message?: string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SystemEventUpdateManyMutationInput = {
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemEventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventLogCreateInput = {
    level: string
    message: string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EventLogUncheckedCreateInput = {
    id?: number
    level: string
    message: string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EventLogUpdateInput = {
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventLogCreateManyInput = {
    id?: number
    level: string
    message: string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EventLogUpdateManyMutationInput = {
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SafeConfigCreateInput = {
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SafeConfigUncheckedCreateInput = {
    id?: number
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SafeConfigUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SafeConfigUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SafeConfigCreateManyInput = {
    id?: number
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SafeConfigUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SafeConfigUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MeshClaimListRelationFilter = {
    every?: MeshClaimWhereInput
    some?: MeshClaimWhereInput
    none?: MeshClaimWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MeshClaimOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    lastActive?: SortOrder
    metadata?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    lastActive?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    lastActive?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MeshScalarRelationFilter = {
    is?: MeshWhereInput
    isNot?: MeshWhereInput
  }

  export type MeshClaimOrderByRelevanceInput = {
    fields: MeshClaimOrderByRelevanceFieldEnum | MeshClaimOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MeshClaimCountOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    meshId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    txHash?: SortOrder
    blockNumber?: SortOrder
    claimedAt?: SortOrder
  }

  export type MeshClaimAvgOrderByAggregateInput = {
    id?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    blockNumber?: SortOrder
  }

  export type MeshClaimMaxOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    meshId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    txHash?: SortOrder
    blockNumber?: SortOrder
    claimedAt?: SortOrder
  }

  export type MeshClaimMinOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    meshId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    txHash?: SortOrder
    blockNumber?: SortOrder
    claimedAt?: SortOrder
  }

  export type MeshClaimSumOrderByAggregateInput = {
    id?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    blockNumber?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MeshOrderByRelevanceInput = {
    fields: MeshOrderByRelevanceFieldEnum | MeshOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MeshCountOrderByAggregateInput = {
    id?: SortOrder
    meshId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    heatLevel?: SortOrder
    claimCount?: SortOrder
    lastClaimTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MeshAvgOrderByAggregateInput = {
    id?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    heatLevel?: SortOrder
    claimCount?: SortOrder
  }

  export type MeshMaxOrderByAggregateInput = {
    id?: SortOrder
    meshId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    heatLevel?: SortOrder
    claimCount?: SortOrder
    lastClaimTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MeshMinOrderByAggregateInput = {
    id?: SortOrder
    meshId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    heatLevel?: SortOrder
    claimCount?: SortOrder
    lastClaimTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MeshSumOrderByAggregateInput = {
    id?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    heatLevel?: SortOrder
    claimCount?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ContractStatusOrderByRelevanceInput = {
    fields: ContractStatusOrderByRelevanceFieldEnum | ContractStatusOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ContractStatusContractAddressChainIdCompoundUniqueInput = {
    contractAddress: string
    chainId: bigint | number
  }

  export type ContractStatusCountOrderByAggregateInput = {
    id?: SortOrder
    contractName?: SortOrder
    contractAddress?: SortOrder
    chainId?: SortOrder
    isPaused?: SortOrder
    lastBlock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContractStatusAvgOrderByAggregateInput = {
    id?: SortOrder
    chainId?: SortOrder
    lastBlock?: SortOrder
  }

  export type ContractStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    contractName?: SortOrder
    contractAddress?: SortOrder
    chainId?: SortOrder
    isPaused?: SortOrder
    lastBlock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContractStatusMinOrderByAggregateInput = {
    id?: SortOrder
    contractName?: SortOrder
    contractAddress?: SortOrder
    chainId?: SortOrder
    isPaused?: SortOrder
    lastBlock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContractStatusSumOrderByAggregateInput = {
    id?: SortOrder
    chainId?: SortOrder
    lastBlock?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SystemEventOrderByRelevanceInput = {
    fields: SystemEventOrderByRelevanceFieldEnum | SystemEventOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SystemEventCountOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    message?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemEventAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SystemEventMaxOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemEventMinOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemEventSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EventLogOrderByRelevanceInput = {
    fields: EventLogOrderByRelevanceFieldEnum | EventLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EventLogCountOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    message?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type EventLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EventLogMaxOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type EventLogMinOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type EventLogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SafeConfigOrderByRelevanceInput = {
    fields: SafeConfigOrderByRelevanceFieldEnum | SafeConfigOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SafeConfigCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SafeConfigAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SafeConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SafeConfigMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SafeConfigSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MeshClaimCreateNestedManyWithoutUserInput = {
    create?: XOR<MeshClaimCreateWithoutUserInput, MeshClaimUncheckedCreateWithoutUserInput> | MeshClaimCreateWithoutUserInput[] | MeshClaimUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MeshClaimCreateOrConnectWithoutUserInput | MeshClaimCreateOrConnectWithoutUserInput[]
    createMany?: MeshClaimCreateManyUserInputEnvelope
    connect?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
  }

  export type MeshClaimUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MeshClaimCreateWithoutUserInput, MeshClaimUncheckedCreateWithoutUserInput> | MeshClaimCreateWithoutUserInput[] | MeshClaimUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MeshClaimCreateOrConnectWithoutUserInput | MeshClaimCreateOrConnectWithoutUserInput[]
    createMany?: MeshClaimCreateManyUserInputEnvelope
    connect?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type MeshClaimUpdateManyWithoutUserNestedInput = {
    create?: XOR<MeshClaimCreateWithoutUserInput, MeshClaimUncheckedCreateWithoutUserInput> | MeshClaimCreateWithoutUserInput[] | MeshClaimUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MeshClaimCreateOrConnectWithoutUserInput | MeshClaimCreateOrConnectWithoutUserInput[]
    upsert?: MeshClaimUpsertWithWhereUniqueWithoutUserInput | MeshClaimUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MeshClaimCreateManyUserInputEnvelope
    set?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    disconnect?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    delete?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    connect?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    update?: MeshClaimUpdateWithWhereUniqueWithoutUserInput | MeshClaimUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MeshClaimUpdateManyWithWhereWithoutUserInput | MeshClaimUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MeshClaimScalarWhereInput | MeshClaimScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MeshClaimUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MeshClaimCreateWithoutUserInput, MeshClaimUncheckedCreateWithoutUserInput> | MeshClaimCreateWithoutUserInput[] | MeshClaimUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MeshClaimCreateOrConnectWithoutUserInput | MeshClaimCreateOrConnectWithoutUserInput[]
    upsert?: MeshClaimUpsertWithWhereUniqueWithoutUserInput | MeshClaimUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MeshClaimCreateManyUserInputEnvelope
    set?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    disconnect?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    delete?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    connect?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    update?: MeshClaimUpdateWithWhereUniqueWithoutUserInput | MeshClaimUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MeshClaimUpdateManyWithWhereWithoutUserInput | MeshClaimUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MeshClaimScalarWhereInput | MeshClaimScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMeshClaimsInput = {
    create?: XOR<UserCreateWithoutMeshClaimsInput, UserUncheckedCreateWithoutMeshClaimsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMeshClaimsInput
    connect?: UserWhereUniqueInput
  }

  export type MeshCreateNestedOneWithoutClaimsInput = {
    create?: XOR<MeshCreateWithoutClaimsInput, MeshUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: MeshCreateOrConnectWithoutClaimsInput
    connect?: MeshWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type UserUpdateOneRequiredWithoutMeshClaimsNestedInput = {
    create?: XOR<UserCreateWithoutMeshClaimsInput, UserUncheckedCreateWithoutMeshClaimsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMeshClaimsInput
    upsert?: UserUpsertWithoutMeshClaimsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMeshClaimsInput, UserUpdateWithoutMeshClaimsInput>, UserUncheckedUpdateWithoutMeshClaimsInput>
  }

  export type MeshUpdateOneRequiredWithoutClaimsNestedInput = {
    create?: XOR<MeshCreateWithoutClaimsInput, MeshUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: MeshCreateOrConnectWithoutClaimsInput
    upsert?: MeshUpsertWithoutClaimsInput
    connect?: MeshWhereUniqueInput
    update?: XOR<XOR<MeshUpdateToOneWithWhereWithoutClaimsInput, MeshUpdateWithoutClaimsInput>, MeshUncheckedUpdateWithoutClaimsInput>
  }

  export type MeshClaimCreateNestedManyWithoutMeshInput = {
    create?: XOR<MeshClaimCreateWithoutMeshInput, MeshClaimUncheckedCreateWithoutMeshInput> | MeshClaimCreateWithoutMeshInput[] | MeshClaimUncheckedCreateWithoutMeshInput[]
    connectOrCreate?: MeshClaimCreateOrConnectWithoutMeshInput | MeshClaimCreateOrConnectWithoutMeshInput[]
    createMany?: MeshClaimCreateManyMeshInputEnvelope
    connect?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
  }

  export type MeshClaimUncheckedCreateNestedManyWithoutMeshInput = {
    create?: XOR<MeshClaimCreateWithoutMeshInput, MeshClaimUncheckedCreateWithoutMeshInput> | MeshClaimCreateWithoutMeshInput[] | MeshClaimUncheckedCreateWithoutMeshInput[]
    connectOrCreate?: MeshClaimCreateOrConnectWithoutMeshInput | MeshClaimCreateOrConnectWithoutMeshInput[]
    createMany?: MeshClaimCreateManyMeshInputEnvelope
    connect?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MeshClaimUpdateManyWithoutMeshNestedInput = {
    create?: XOR<MeshClaimCreateWithoutMeshInput, MeshClaimUncheckedCreateWithoutMeshInput> | MeshClaimCreateWithoutMeshInput[] | MeshClaimUncheckedCreateWithoutMeshInput[]
    connectOrCreate?: MeshClaimCreateOrConnectWithoutMeshInput | MeshClaimCreateOrConnectWithoutMeshInput[]
    upsert?: MeshClaimUpsertWithWhereUniqueWithoutMeshInput | MeshClaimUpsertWithWhereUniqueWithoutMeshInput[]
    createMany?: MeshClaimCreateManyMeshInputEnvelope
    set?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    disconnect?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    delete?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    connect?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    update?: MeshClaimUpdateWithWhereUniqueWithoutMeshInput | MeshClaimUpdateWithWhereUniqueWithoutMeshInput[]
    updateMany?: MeshClaimUpdateManyWithWhereWithoutMeshInput | MeshClaimUpdateManyWithWhereWithoutMeshInput[]
    deleteMany?: MeshClaimScalarWhereInput | MeshClaimScalarWhereInput[]
  }

  export type MeshClaimUncheckedUpdateManyWithoutMeshNestedInput = {
    create?: XOR<MeshClaimCreateWithoutMeshInput, MeshClaimUncheckedCreateWithoutMeshInput> | MeshClaimCreateWithoutMeshInput[] | MeshClaimUncheckedCreateWithoutMeshInput[]
    connectOrCreate?: MeshClaimCreateOrConnectWithoutMeshInput | MeshClaimCreateOrConnectWithoutMeshInput[]
    upsert?: MeshClaimUpsertWithWhereUniqueWithoutMeshInput | MeshClaimUpsertWithWhereUniqueWithoutMeshInput[]
    createMany?: MeshClaimCreateManyMeshInputEnvelope
    set?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    disconnect?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    delete?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    connect?: MeshClaimWhereUniqueInput | MeshClaimWhereUniqueInput[]
    update?: MeshClaimUpdateWithWhereUniqueWithoutMeshInput | MeshClaimUpdateWithWhereUniqueWithoutMeshInput[]
    updateMany?: MeshClaimUpdateManyWithWhereWithoutMeshInput | MeshClaimUpdateManyWithWhereWithoutMeshInput[]
    deleteMany?: MeshClaimScalarWhereInput | MeshClaimScalarWhereInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MeshClaimCreateWithoutUserInput = {
    longitude?: Decimal | DecimalJsLike | number | string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    txHash?: string | null
    blockNumber?: bigint | number | null
    claimedAt?: Date | string
    mesh: MeshCreateNestedOneWithoutClaimsInput
  }

  export type MeshClaimUncheckedCreateWithoutUserInput = {
    id?: number
    meshId: string
    longitude?: Decimal | DecimalJsLike | number | string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    txHash?: string | null
    blockNumber?: bigint | number | null
    claimedAt?: Date | string
  }

  export type MeshClaimCreateOrConnectWithoutUserInput = {
    where: MeshClaimWhereUniqueInput
    create: XOR<MeshClaimCreateWithoutUserInput, MeshClaimUncheckedCreateWithoutUserInput>
  }

  export type MeshClaimCreateManyUserInputEnvelope = {
    data: MeshClaimCreateManyUserInput | MeshClaimCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MeshClaimUpsertWithWhereUniqueWithoutUserInput = {
    where: MeshClaimWhereUniqueInput
    update: XOR<MeshClaimUpdateWithoutUserInput, MeshClaimUncheckedUpdateWithoutUserInput>
    create: XOR<MeshClaimCreateWithoutUserInput, MeshClaimUncheckedCreateWithoutUserInput>
  }

  export type MeshClaimUpdateWithWhereUniqueWithoutUserInput = {
    where: MeshClaimWhereUniqueInput
    data: XOR<MeshClaimUpdateWithoutUserInput, MeshClaimUncheckedUpdateWithoutUserInput>
  }

  export type MeshClaimUpdateManyWithWhereWithoutUserInput = {
    where: MeshClaimScalarWhereInput
    data: XOR<MeshClaimUpdateManyMutationInput, MeshClaimUncheckedUpdateManyWithoutUserInput>
  }

  export type MeshClaimScalarWhereInput = {
    AND?: MeshClaimScalarWhereInput | MeshClaimScalarWhereInput[]
    OR?: MeshClaimScalarWhereInput[]
    NOT?: MeshClaimScalarWhereInput | MeshClaimScalarWhereInput[]
    id?: IntFilter<"MeshClaim"> | number
    userAddress?: StringFilter<"MeshClaim"> | string
    meshId?: StringFilter<"MeshClaim"> | string
    longitude?: DecimalNullableFilter<"MeshClaim"> | Decimal | DecimalJsLike | number | string | null
    latitude?: DecimalNullableFilter<"MeshClaim"> | Decimal | DecimalJsLike | number | string | null
    txHash?: StringNullableFilter<"MeshClaim"> | string | null
    blockNumber?: BigIntNullableFilter<"MeshClaim"> | bigint | number | null
    claimedAt?: DateTimeFilter<"MeshClaim"> | Date | string
  }

  export type UserCreateWithoutMeshClaimsInput = {
    address: string
    role?: string
    createdAt?: Date | string
    lastActive?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserUncheckedCreateWithoutMeshClaimsInput = {
    id?: number
    address: string
    role?: string
    createdAt?: Date | string
    lastActive?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserCreateOrConnectWithoutMeshClaimsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMeshClaimsInput, UserUncheckedCreateWithoutMeshClaimsInput>
  }

  export type MeshCreateWithoutClaimsInput = {
    meshId: string
    longitude: Decimal | DecimalJsLike | number | string
    latitude: Decimal | DecimalJsLike | number | string
    heatLevel?: number | null
    claimCount?: number | null
    lastClaimTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MeshUncheckedCreateWithoutClaimsInput = {
    id?: number
    meshId: string
    longitude: Decimal | DecimalJsLike | number | string
    latitude: Decimal | DecimalJsLike | number | string
    heatLevel?: number | null
    claimCount?: number | null
    lastClaimTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MeshCreateOrConnectWithoutClaimsInput = {
    where: MeshWhereUniqueInput
    create: XOR<MeshCreateWithoutClaimsInput, MeshUncheckedCreateWithoutClaimsInput>
  }

  export type UserUpsertWithoutMeshClaimsInput = {
    update: XOR<UserUpdateWithoutMeshClaimsInput, UserUncheckedUpdateWithoutMeshClaimsInput>
    create: XOR<UserCreateWithoutMeshClaimsInput, UserUncheckedCreateWithoutMeshClaimsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMeshClaimsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMeshClaimsInput, UserUncheckedUpdateWithoutMeshClaimsInput>
  }

  export type UserUpdateWithoutMeshClaimsInput = {
    address?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserUncheckedUpdateWithoutMeshClaimsInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MeshUpsertWithoutClaimsInput = {
    update: XOR<MeshUpdateWithoutClaimsInput, MeshUncheckedUpdateWithoutClaimsInput>
    create: XOR<MeshCreateWithoutClaimsInput, MeshUncheckedCreateWithoutClaimsInput>
    where?: MeshWhereInput
  }

  export type MeshUpdateToOneWithWhereWithoutClaimsInput = {
    where?: MeshWhereInput
    data: XOR<MeshUpdateWithoutClaimsInput, MeshUncheckedUpdateWithoutClaimsInput>
  }

  export type MeshUpdateWithoutClaimsInput = {
    meshId?: StringFieldUpdateOperationsInput | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    heatLevel?: NullableIntFieldUpdateOperationsInput | number | null
    claimCount?: NullableIntFieldUpdateOperationsInput | number | null
    lastClaimTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeshUncheckedUpdateWithoutClaimsInput = {
    id?: IntFieldUpdateOperationsInput | number
    meshId?: StringFieldUpdateOperationsInput | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    heatLevel?: NullableIntFieldUpdateOperationsInput | number | null
    claimCount?: NullableIntFieldUpdateOperationsInput | number | null
    lastClaimTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeshClaimCreateWithoutMeshInput = {
    longitude?: Decimal | DecimalJsLike | number | string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    txHash?: string | null
    blockNumber?: bigint | number | null
    claimedAt?: Date | string
    user: UserCreateNestedOneWithoutMeshClaimsInput
  }

  export type MeshClaimUncheckedCreateWithoutMeshInput = {
    id?: number
    userAddress: string
    longitude?: Decimal | DecimalJsLike | number | string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    txHash?: string | null
    blockNumber?: bigint | number | null
    claimedAt?: Date | string
  }

  export type MeshClaimCreateOrConnectWithoutMeshInput = {
    where: MeshClaimWhereUniqueInput
    create: XOR<MeshClaimCreateWithoutMeshInput, MeshClaimUncheckedCreateWithoutMeshInput>
  }

  export type MeshClaimCreateManyMeshInputEnvelope = {
    data: MeshClaimCreateManyMeshInput | MeshClaimCreateManyMeshInput[]
    skipDuplicates?: boolean
  }

  export type MeshClaimUpsertWithWhereUniqueWithoutMeshInput = {
    where: MeshClaimWhereUniqueInput
    update: XOR<MeshClaimUpdateWithoutMeshInput, MeshClaimUncheckedUpdateWithoutMeshInput>
    create: XOR<MeshClaimCreateWithoutMeshInput, MeshClaimUncheckedCreateWithoutMeshInput>
  }

  export type MeshClaimUpdateWithWhereUniqueWithoutMeshInput = {
    where: MeshClaimWhereUniqueInput
    data: XOR<MeshClaimUpdateWithoutMeshInput, MeshClaimUncheckedUpdateWithoutMeshInput>
  }

  export type MeshClaimUpdateManyWithWhereWithoutMeshInput = {
    where: MeshClaimScalarWhereInput
    data: XOR<MeshClaimUpdateManyMutationInput, MeshClaimUncheckedUpdateManyWithoutMeshInput>
  }

  export type MeshClaimCreateManyUserInput = {
    id?: number
    meshId: string
    longitude?: Decimal | DecimalJsLike | number | string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    txHash?: string | null
    blockNumber?: bigint | number | null
    claimedAt?: Date | string
  }

  export type MeshClaimUpdateWithoutUserInput = {
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mesh?: MeshUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type MeshClaimUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    meshId?: StringFieldUpdateOperationsInput | string
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeshClaimUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    meshId?: StringFieldUpdateOperationsInput | string
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeshClaimCreateManyMeshInput = {
    id?: number
    userAddress: string
    longitude?: Decimal | DecimalJsLike | number | string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    txHash?: string | null
    blockNumber?: bigint | number | null
    claimedAt?: Date | string
  }

  export type MeshClaimUpdateWithoutMeshInput = {
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMeshClaimsNestedInput
  }

  export type MeshClaimUncheckedUpdateWithoutMeshInput = {
    id?: IntFieldUpdateOperationsInput | number
    userAddress?: StringFieldUpdateOperationsInput | string
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeshClaimUncheckedUpdateManyWithoutMeshInput = {
    id?: IntFieldUpdateOperationsInput | number
    userAddress?: StringFieldUpdateOperationsInput | string
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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