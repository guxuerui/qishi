# 纵览TypeScript之条件语句

TS中没有其他语言的 `if/else` 语法，而是使用了三元运算符 `X extends Y ? expr1 : expr2`

- X extends Y -> 判断X是否为Y的子类型
- expr1 -> 如果 `X` 是 `Y` 的子类型，则返回该值
- expr2 -> 如果 `X` 不是 `Y` 的子类型，则返回该值

比如:

```ts
type A = 1 extends number ? 1 : never // 1
type IsRes = 'blue' extends 'red' ? true : false // false
```

再比如:

```ts
interface IName1 {
  name: string
}

interface IName2 {
  name: string
  age: number
}

type IName = IName2 extends IName1 ? string : number

const name: IName = 'gxr' // Ok
const name2: IName = 123 // Error: Type 'number' is not assignable to type 'string'
```

> **因为满足 `IName2` 的接口一定可以满足 `IName1`, 所以条件为真, `IName` 的类型为 `string`**
