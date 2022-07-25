# 找出数组中只出现过一次的数

> 给定一个数组，其中有一个数字只出现了一次，写一个方法，返回这个数字

const getRes = (item) => {
  item.sort();
  for (let i = 0; i < item.length; i+=2) {
    if (item[i] !== item[i+1]) {
      return item[i];
    }
  }
};
const item = [3, 3, 2, 2, 4, 5, 5];
console.log(getRes(item));


const getSingleNumber = (item) => {
  let res = 0;
  for (let i = 0; i < item.length; i++) {
    res ^= item[i];
  }
  return res;
}
console.log(getSingleNumber(item));

const getSingNum = (item) => {
  let map = new Map()
  for (let i = 0; i < item.length; i++) {
    if (map.has(item[i])) {
      map.delete(item[i]);
    } else {
      map.set(item[i], 1);
    }
  }
  for (let [key] of map) {
    return key;
  }
}
getSingNum(item);

const getSingNum2 = (item) => {
  let res = {}
  for (let i = 0; i < item.length; i++) {
    res[item[i]] = res[item[i]] ? res[item[i]] + 1 : 1;
  }
  for (let [k, v] of Object.entries(res)) {
    if (v === 1) return k;
  }
}
getSingNum2(item);
