const AWS = require('aws-sdk');

const application = require('./dist');
const awsServerlessExpress = require('aws-serverless-express');
let configs = {};
const app = new application.Lb4LambdaBoilerplateApplication({
  rest: {
    openApiSpec: {
      setServersFromRequest: true,
    },
  },
});
const server = awsServerlessExpress.createServer(app.restServer.requestHandler);



exports.handler = async (event, context) => {
  await app.boot();
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};

