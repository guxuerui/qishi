# 纵览TypeScript之对象类型的遍历

在JS中可以使用 `for/in` 遍历对象的属性，在TS中也有类似的方式，不过更加简洁.

例如，把所有属性都加上 `readonly` 修饰符(TS有此内置泛型方法):

```ts
// JS对象遍历
const person = {
  name: 'qishi',
  age: 18,
  id: 1,
}

for (const key in range)
  console.log(key, person[key])

// TS类型对象遍历
interface IPerson {
  name: string
  age?: number
  readonly id: number
}

type Readonly<T> = {
  readonly [Key in keyof T]: T[Key]
}

// 使用
const My: Readonly<IPerson> = {
  name: 'qishi',
  age: 18,
  id: 1,
}

My.name = 'gxr'
// Error: Cannot assign to 'name' because it is a read-only property
```

这个例子有以下几点:

- `keyof` 关键字可以获取到对象所有的属性
- `Key` 就是每次遍历时存的属性名
- `T[Key]` 就是每次遍历时存的属性值
- 然后再每个属性前面加上了 `readonly`，这样所有的属性就都是只读了
