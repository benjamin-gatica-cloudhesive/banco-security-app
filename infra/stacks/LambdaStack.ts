import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface LambdaStackProps extends StackProps {
  userPoolId: string,
  userPoolClientId: string
}

export class LambdaStack extends Stack {
  public readonly loginIntegration: LambdaIntegration

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props)

    const login = new NodejsFunction(this, 'Login', {
      runtime: Runtime.NODEJS_22_X,
      handler: 'handler',
      entry: (join(__dirname, '..','..', 'services', 'lambdas', 'auth', 'handler.ts')),
      environment: {
        USER_POOL_CLIENT_ID: props.userPoolClientId
      },
    })

    login.addToRolePolicy(new PolicyStatement({
      actions: [
        'cognito-idp:AdminInitiateAuth'
      ],
      resources: [
        `arn:aws:cognito-idp:${this.region}:${this.account}:userpool/${props.userPoolId}`
      ],
    }));

    this.loginIntegration = new LambdaIntegration(login)
  }
}