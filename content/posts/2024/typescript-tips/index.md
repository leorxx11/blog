---
title: "TypeScript 高级技巧与最佳实践"
date: "2024-01-25"
tags: ["TypeScript", "JavaScript", "前端开发", "最佳实践"]
categories: ["前端开发", "编程技巧"]
summary: "分享一些 TypeScript 的高级技巧和最佳实践，帮助你写出更优雅、更安全的代码。"
slug: "typescript-tips"
draft: false
featured: false
series: "博客开发系列"
seriesOrder: 2
---

# TypeScript 高级技巧与最佳实践

TypeScript 已经成为现代前端开发的必备技能。在这篇文章中，我将分享一些高级技巧和最佳实践。

## 1. 高级类型技巧

### 条件类型 (Conditional Types)

条件类型允许我们根据类型关系来选择不同的类型：

```typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : T extends number 
  ? { code: T } 
  : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type NumberResponse = ApiResponse<number>; // { code: number }
type ObjectResponse = ApiResponse<{ id: number }>; // { data: { id: number } }
```

### 映射类型 (Mapped Types)

创建基于现有类型的新类型：

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// 实际应用
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>; // 所有属性变为可选
type ReadonlyUser = Readonly<User>; // 所有属性变为只读
```

### 模板字面量类型

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<'click'>; // 'onClick'
type ChangeEvent = EventName<'change'>; // 'onChange'

// 更复杂的例子
type RouteParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
  ? { [K in Param | keyof RouteParams<Rest>]: string }
  : T extends `${string}:${infer Param}`
  ? { [K in Param]: string }
  : {};

type UserRoute = RouteParams<'/users/:id/posts/:postId'>; 
// { id: string; postId: string }
```

## 2. 实用工具类型

### 深度 Partial

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Config {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
  cache: {
    ttl: number;
  };
}

type PartialConfig = DeepPartial<Config>;
// 所有嵌套属性都变为可选
```

### 提取函数参数和返回值类型

```typescript
// 提取函数参数类型
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// 提取函数返回值类型
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

function fetchUser(id: number, includeProfile: boolean): Promise<User> {
  // 实现
}

type FetchUserParams = Parameters<typeof fetchUser>; // [number, boolean]
type FetchUserReturn = ReturnType<typeof fetchUser>; // Promise<User>
```

### 联合类型到交叉类型

```typescript
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type Union = { a: string } | { b: number };
type Intersection = UnionToIntersection<Union>; // { a: string } & { b: number }
```

## 3. 高级模式

### 品牌类型 (Branded Types)

用于创建具有语义的类型：

```typescript
type Brand<T, TBrand> = T & { readonly __brand: TBrand };

type UserId = Brand<number, 'UserId'>;
type ProductId = Brand<number, 'ProductId'>;

function createUserId(id: number): UserId {
  return id as UserId;
}

function getUser(id: UserId): User {
  // 实现
}

const userId = createUserId(123);
const productId = 456 as ProductId;

getUser(userId); // ✅ 正确
getUser(productId); // ❌ 类型错误
```

### 状态机类型

```typescript
type State = 
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: string };

function handleState(state: State) {
  switch (state.status) {
    case 'loading':
      // state.data 不存在，TypeScript 会报错
      break;
    case 'success':
      // state.data 存在且类型安全
      console.log(state.data);
      break;
    case 'error':
      // state.error 存在且类型安全
      console.error(state.error);
      break;
  }
}
```

### 递归类型

```typescript
type TreeNode<T> = {
  value: T;
  children?: TreeNode<T>[];
};

type JsonValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JsonValue[] 
  | { [key: string]: JsonValue };

// 路径类型
type Path<T> = T extends object 
  ? {
      [K in keyof T]: K extends string 
        ? T[K] extends object 
          ? K | `${K}.${Path<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

type UserPaths = Path<User>; // 'id' | 'name' | 'email' | 'profile.avatar' | 'profile.bio'
```

## 4. 最佳实践

### 类型优先设计

```typescript
// ❌ 不好的做法
function processData(data: any) {
  return data.items.map(item => item.name);
}

// ✅ 好的做法
interface DataItem {
  id: number;
  name: string;
  category: string;
}

interface ProcessedData {
  items: DataItem[];
  total: number;
}

function processData(data: ProcessedData): string[] {
  return data.items.map(item => item.name);
}
```

### 严格的配置

在 `tsconfig.json` 中启用严格模式：

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### 类型收窄

```typescript
function processValue(value: string | number | null) {
  // 类型守卫
  if (typeof value === 'string') {
    return value.toUpperCase(); // value 被收窄为 string
  }
  
  if (typeof value === 'number') {
    return value.toFixed(2); // value 被收窄为 number
  }
  
  // value 被收窄为 null
  return 'N/A';
}

// 自定义类型守卫
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number' && typeof obj.name === 'string';
}

function handleUserData(data: unknown) {
  if (isUser(data)) {
    // data 被收窄为 User
    console.log(data.name);
  }
}
```

### 错误处理类型

```typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: number): Promise<Result<User, string>> {
  try {
    const user = await api.getUser(id);
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: 'Failed to fetch user' };
  }
}

// 使用
const result = await fetchUser(123);
if (result.success) {
  console.log(result.data.name); // 类型安全
} else {
  console.error(result.error); // 类型安全
}
```

## 5. 性能优化

### 避免过度复杂的类型

```typescript
// ❌ 过度复杂，编译慢
type ComplexType<T> = T extends object 
  ? {
      [K in keyof T]: T[K] extends object 
        ? ComplexType<T[K]> 
        : T[K] extends (...args: any) => any 
        ? ReturnType<T[K]> 
        : T[K]
    }
  : T;

// ✅ 简化版本
type SimpleType<T> = T extends object 
  ? { [K in keyof T]: T[K] }
  : T;
```

### 使用类型断言而不是类型守卫（在确保安全的情况下）

```typescript
// 当你确定类型时
const data = response.data as User[];

// 而不是每次都进行类型检查
function isUserArray(data: any): data is User[] {
  return Array.isArray(data) && data.every(isUser);
}
```

## 6. 常见陷阱

### 避免使用 any

```typescript
// ❌ 不好
function process(data: any) {
  return data.someProperty;
}

// ✅ 更好
function process<T>(data: T): T extends { someProperty: infer P } ? P : never {
  return (data as any).someProperty;
}

// ✅ 最好
function process<T extends { someProperty: any }>(data: T): T['someProperty'] {
  return data.someProperty;
}
```

### 正确使用泛型约束

```typescript
// ❌ 过于宽泛
function getValue<T>(obj: T, key: string) {
  return obj[key]; // 错误
}

// ✅ 正确约束
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

## 总结

TypeScript 的类型系统非常强大，掌握这些高级技巧可以帮助你：

1. **写出更安全的代码** - 在编译时捕获更多错误
2. **提升开发效率** - 更好的 IDE 支持和自动补全
3. **增强代码可读性** - 类型即文档
4. **重构更安全** - 类型系统保证重构的正确性

记住，类型系统是为了服务开发，不要过度设计。在复杂性和实用性之间找到平衡点是关键。

---

> 想了解更多 TypeScript 技巧？欢迎关注我的博客，后续会有更多深度文章！
