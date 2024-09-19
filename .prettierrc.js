// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
  printWidth: 140, // 每行代码长度（默认80）
  tabWidth: 2, // 每个tab相当于多少个空格（默认2）
  useTabs: false, // 是否使用tab进行缩进（默认false）
  semi: true, // 声明结尾使用分号(默认true)
  singleQuote: true, // 使用单引号（默认false）
  quoteProps: "as-needed", // 对象属性的引号使用（默认as-needed）
  jsxSingleQuote: false, // jsx中使用单引号（默认false）
  trailingComma: "all", // 多行使用拖尾逗号（默认all）
  bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
  bracketSameLine: false, // 大括号是否与代码同一行（默认false）
  arrowParens: "always", // 只有一个参数的箭头函数的参数是否带圆括号（默认always）
  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
  rangeEnd: Infinity, // 每个文件格式化的范围是文件的全部内容
  requirePragma: false, // 是否严格按照文件顶部的一些特殊的注释格式化代码（默认false）
  insertPragma: false, // 是否在格式化的文件顶部插入Pragma标记，以表明该文件被prettier格式化过了（默认false）
  proseWrap: "preserve", // 是否对markdown进行拆行（默认preserve）
  htmlWhitespaceSensitivity: "ignore", // 指定HTML文件的全局空白区域敏感度（默认css），主要针对行内元素
  vueIndentScriptAndStyle: false, // 是否缩进Vue文件中的代码<script>和<style>标记（默认false）
  endOfLine: "lf", // 行尾换行格式（默认lf）auto|lf|crlf|cr
  embeddedLanguageFormatting: "auto", // 是否格式化嵌入的代码（默认auto）auto|off
  singleAttributePerLine: true, // 多个属性是否每行一个（默认false）
};
