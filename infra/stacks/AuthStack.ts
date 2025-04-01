import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';

export class AuthStack extends Stack {
  public userPool: UserPool
  public userPoolClient: UserPoolClient

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    this.createUserPool()
    this.createUserPoolClient()
  }

  private createUserPool() {
    this.userPool = new UserPool(this, 'BancoSecurityUserPool', {
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true
      }
    })

    new CfnOutput(this, 'BancoSecurityUserPoolId', {
      value: this.userPool.userPoolId
    })
  }

  private createUserPoolClient() {
    this.userPoolClient = this.userPool.addClient('BancoSecurityUserPoolClient', {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true
      }
    })

    new CfnOutput(this, 'BancoSecurityUserPoolClientId', {
      value: this.userPoolClient.userPoolClientId
    })
  }
}
