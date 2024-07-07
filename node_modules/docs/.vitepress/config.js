// .vitepress/config.js
module.exports = {
  // 站点级选项
  title: 'Personal UI',
  description: 'Personal UI 是一个基于 Vue 3.0 的 UI 组件库',

  themeConfig: {
    lastUpdated: '上次更新',
    docDir: 'docs',
    editLink: true,
    editLinkText: '在 GitHub 上编辑此页',
    // repo: 'https://github.com/12750/personal-UI',
    footer:{
      message: 'Personal UI 是一个基于 Vue 3.0 的 UI 组件库',
      copyright: 'MIT Licensed | Copyright © 2021-present 12750'
    }
  },

  nav:[
    { text: '指南', link: '/guide/installation', activeMatch: '^/guide/' },
    { text: '组件', link: '/components/icon', activeMatch: '/components/' },
  ],
  sidebar: {
    '/guide/': [
      {
        text: '指南',
        items: [
          { text: '安装', link: '/guide/installation' },
          { text: '快速开始', link: '/guide/quide/quieStart' },
        ]  
      }
    ],
    '/components/': [
      {
        text: '基础组件',
        items: [
          { text: 'Icon', link: '/components/icon' },
        ]
      }
    ]
  }
}