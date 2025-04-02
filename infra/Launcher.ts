import { App } from "aws-cdk-lib";
import { AuthStack } from "./stacks/AuthStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";

const app = new App()

const authStack = new AuthStack(app, 'BancoSecurityAuthStack')

const lambdaStack = new LambdaStack(app, 'BancoSecurityLambdaStack', {
  userPoolClientId: authStack.userPoolClient.userPoolClientId,
  userPoolId: authStack.userPool.userPoolId
})

new ApiStack(app, 'BancoSecurityApiStack', {
  initLoginIntegration: lambdaStack.initLoginIntegration,
  resolveMFAIntegracion: lambdaStack.resolveMFAIntegracion
})
