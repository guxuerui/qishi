# 纵览TypeScript之通过变量取属性

我们知道在JS中对象可以通过 `.` 操作符取值，在TS类型中，也能进行类似的操作。例如:

```ts
// 普通对象
interface Person {
  name: string
  age: number
}

type Name = Person['name'] // string

// enum 枚举
enum Color {
  Red,
  Green,
  Blue
}
type red = Color.Red // 0

// 数组(数组是没法取得length属性的，因为其有多少项是不固定的)
type Names = string[]
type FirstName = Names[0] // string
type len = Names['length'] // 报错

// 元组(元组是可以获取length属性的，因为其长度是固定的)

type lang = ['js', 'java', 'python', 'rust']
type Rust = lang[3] // rust
type Len = lang['length'] // 👌🏻

// 字符串
type Str = 'hello'
type S = Str[0] // ⚠️ 注意这里是string，不是`h`
type StrLen = Str['length'] // number, 而非具体的数字
```

> ⚠️ 注意，基础类型是可以取到原型的定义的，所以并非无属性

```ts
// 字符串原型方法
type Concat = 'h'['concat'] // `String.prototype.concat` 的类型定义

// 数字原型方法
type N = 1
type ToFixed = 1['toFixed'] // `Number.prototype.toFixed` 的类型定义
```

