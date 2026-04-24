module.exports = {
  api: {
    input: 'http://localhost:5000/swagger/v1/swagger.json',
    output: {
      mode: 'tags-split', 
      target: './src/api',
      client: 'axios',
      schemas: './src/api/models',
      clean: true,
      override: {
        useNativeEnums: true,
        useTypeOverInterfaces: false,
      }
    },
  }
};