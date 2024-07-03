interface checkList {
  label:string,
  name:string,
}
const HomeTabNavList = [
  {
    index: "0",
    label: "HTML",
    name: "HTML",
  },
  {
    index: "1",
    label: "CSS",
    name: "CSS",
  },
  {
    index: "2",
    label: "JS",
    name: "JS",
  },
  {
    index: "3",
    label: "ES6",
    name: "ES6",
  },
  {
    index: "4",
    label: "Browser",
    name: "Browser",
  },
  {
    index: "5",
    label: "案例练习",
    name: "CaseDemo",
  },
];
const HtmlNavList:Array<checkList> = [
  {
    label: "H5新增特性",
    name: '/home/h5label'
  },
  {
    label: "H5标签",
    name: '/home/h5NewFeatures'
  },
]
const CssNavList:Array<checkList> = [
  {
    label: "BFC",
    name: '/home/bfc'
  },
  {
    label: "盒模型",
    name: '/home/boxModel'
  },
]
const JsNavList:Array<checkList> = [
  {
    label: "闭包",
    name: '/home/closure'
  },
  {
    label: "Promise",
    name: '/home/promise'
  },
]
const ES6NavList:Array<checkList> = [
  {
    label: "ES6新特性",
    name: '/home/es6'
  },
  {
    label: "Promise",
    name: '/home/boxModel'
  },
]
const BrowserNavList:Array<checkList> = [
  {
    label: "浏览器缓存",
    name: '/home/cache'
  },
  {
    label: "Promise",
    name: '/home/boxModel'
  },
]
const CaseNavList:Array<checkList> = [
  {
    label: "表格分页案例",
    name: '/home/movieList'
  },
  {
    label: "Promise",
    name: '/home/boxModel'
  },
]
export {
  HomeTabNavList,
  HtmlNavList,
  CssNavList,
  JsNavList,
  ES6NavList,
  BrowserNavList,
  CaseNavList
};
