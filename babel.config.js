module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '67',
          firefox: '59',
        },
      },
    ],
    '@babel/react',
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", {"legacy": true}],
    ["@babel/plugin-proposal-class-properties", {"loose": true}],
    '@babel/plugin-proposal-object-rest-spread',
  ],
}
