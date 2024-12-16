const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 5080,
    allowedHosts: [
      'jurinl.com',
      '.jurinl.com'
    ]
  }
});
