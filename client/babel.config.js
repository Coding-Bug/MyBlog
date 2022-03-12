



module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins:[
    // 配置element-ui
    [
      "component",
      {
        libraryName:"element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ],

}
