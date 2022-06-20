const webMap = {
  "label": "前端",
  "prop": "web",
  "url": 'https://blog.csdn.net/weixin_41192489/category_9421858.html',
  "link": "博客",
  "children":
      [
          {
              "label": "编程语言",
              "prop": "codeType",
              "disabled": true,
              "children":
                  [
                      {
                          "label": "HTML",
                          "prop": "HTML",
                      },
                      {
                          "label": "CSS",
                          "prop": "CSS",
                      },
                      {
                          "label": "Javascript",
                          "prop": "Javascript",
                      },
                  ]
          },
          {
              "label": "JS框架",
              "prop": "jsFrame",
              "disabled": true,
              "children":
                  [
                      {
                          "label": "Vue",
                          "prop": "Vue",
                      },
                      {
                          "label": "React",
                          "prop": "React",
                      },
                      {
                          "label": "Angular",
                          "prop": "Angular",
                          dicType: 'doc'
                      },
                  ]
          },
          {
              "label": "UI框架",
              "prop": "uiFrame",
              "disabled": true,
              "url": '',
              "children":
                  [
                      {
                          "label": "Element UI",
                          "prop": "element_ui",
                          "url": 'https://element.eleme.cn/#/zh-CN/component/i18n',
                          "link": "官网",
                      },
                      {
                          "label": "iview UI",
                          "prop": "iview UI",
                          "url": 'http://v1.iviewui.com/docs/introduce',
                          "link": "官网",
                      },
                      {
                          "label": "layUI",
                          "prop": "layUI",
                          "url": 'https://www.layui.com/doc/',
                          "link": "官网",
                      },
                      {
                          "label": "Ant Design",
                          "prop": "Ant Design",
                          "url": 'https://www.antdv.com/docs/vue/introduce-cn/',
                          "link": "官网",
                      },
                  ]
          },
      ]
}
const serverMap = {
  "label": "后端",
  "prop": "server",
  "url": 'https://blog.csdn.net/weixin_41192489/category_11044490.html',
  "link": "博客",
  "children":
      [
          {
              "label": "编程语言",
              "prop": "codeType",
              disabled:true,
              "children":
                  [
                      {
                          "label": "Node.js",
                          "prop": "nodejs",
                          dicType: 'doc'
                      },
                      {
                          "label": "Java",
                          "prop": "java",
                      },
                  ]
          },
          {
              "label": "框架",
              "prop": "frame",
              disabled:true,
              "children":
                  [
                      {
                          "label": "Koa2",
                          "prop": "koa2",
                      },
                  ]
          },
          {
              "label": "数据库",
              "prop": "database",
              disabled:true,
              "children":
                  [
                      {
                          "label": "Redis",
                          "prop": "Redis",
                          dicType: 'doc'
                      },
                      {
                          "label": "MongoDB",
                          "prop": "MongoDB",
                          dicType: 'doc'
                      },
                      {
                          "label": "MySQL",
                          "prop": "MySQL",
                          dicType: 'doc'
                      },
                  ]
          },
      ]
}
export default {
  webMap, serverMap
}