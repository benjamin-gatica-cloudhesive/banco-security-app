import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CfnManagedLoginBranding,
  Mfa,
  UserPool,
  UserPoolClient,
  UserPoolDomain,
} from "aws-cdk-lib/aws-cognito";
import * as customResources from "aws-cdk-lib/custom-resources";

export class AuthStack extends Stack {
  public userPool: UserPool;
  public userPoolClient: UserPoolClient;
  public userPoolDomain: UserPoolDomain;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.createUserPool();
    this.createUserPoolClient();
    this.createUserPoolDomain();
    this.updateDomainLoginType();
    this.createDomainStyle();
  }

  private createUserPool() {
    this.userPool = new UserPool(this, "BancoSecurityUserPool", {
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      mfa: Mfa.REQUIRED,
      mfaSecondFactor: {
        otp: true,
        sms: false,
      },
    });

    new CfnOutput(this, "BancoSecurityUserPoolId", {
      value: this.userPool.userPoolId,
    });
  }

  private createUserPoolClient() {
    this.userPoolClient = this.userPool.addClient(
      "BancoSecurityUserPoolClient",
      {
        authFlows: {
          adminUserPassword: true,
          custom: true,
          userPassword: true,
          userSrp: true,
        },
      },
    );

    new CfnOutput(this, "BancoSecurityUserPoolClientId", {
      value: this.userPoolClient.userPoolClientId,
    });
  }

  private createUserPoolDomain() {
    this.userPoolDomain = this.userPool.addDomain(
      "BancoSecurityUserPoolDomain",
      {
        cognitoDomain: {
          domainPrefix: "banco-security",
        },
      },
    );

    new CfnOutput(this, "BancoSecurityUserPoolDomainUrl", {
      value: this.userPoolDomain.baseUrl(),
    });
  }

  /*
   * Esta funcion se encarga de actualizar el login del dominio de cognito de
   * HostedUI a Managed login
   * */
  private updateDomainLoginType() {
    const changeManagedLogin = new customResources.AwsCustomResource(
      this,
      "BancoSecurityChangeManagedLogin",
      {
        onCreate: {
          service: "CognitoIdentityServiceProvider",
          action: "UpdateUserPoolDomain",
          parameters: {
            UserPoolId: this.userPool.userPoolId,
            ManagedLoginVersion: 2,
            Domain: this.userPoolDomain.domainName,
          },
          physicalResourceId:
            customResources.PhysicalResourceId.of("ChangeManagedLogin"),
        },
        policy: customResources.AwsCustomResourcePolicy.fromSdkCalls({
          resources: customResources.AwsCustomResourcePolicy.ANY_RESOURCE,
        }),
      },
    );
    changeManagedLogin.node.addDependency(this.userPoolDomain);
  }

  /*
   * Funcion para crear el estilo del managed login
   * */
  private createDomainStyle() {
    new CfnManagedLoginBranding(this, "BancoSecurityManagedbranding", {
      userPoolId: this.userPool.userPoolId,
      clientId: this.userPoolClient.userPoolClientId,
      useCognitoProvidedValues: true,
    });
  }
}
