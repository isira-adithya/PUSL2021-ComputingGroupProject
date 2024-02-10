const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  devServer: {
    host: 'www.eventhive.local',
    port: 3000
  },
  productionSourceMap: false
})
