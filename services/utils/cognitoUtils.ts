import { CognitoIdentityProviderClient, InitiateAuthCommand, InitiateAuthCommandOutput } from "@aws-sdk/client-cognito-identity-provider";

export const getCognitoClient = () => {
  const AWS_REGION = process.env.AWS_REGION ?? ''
  return new CognitoIdentityProviderClient({ region: AWS_REGION });
}

interface LogInArgs {
  userName: string
  password: string
}

export const logIn = async ({ userName, password}: LogInArgs) => {
  const USER_POOL_CLIENT_ID = process.env.USER_POOL_CLIENT_ID ?? ''
  const cognitoClient = getCognitoClient()

  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: USER_POOL_CLIENT_ID,
    AuthParameters: {
      USERNAME: userName,
      PASSWORD: password
    }
  });

  return cognitoClient.send(command)
}

export const getToken = (logInResponse: InitiateAuthCommandOutput) => {
  return logInResponse.AuthenticationResult
}
