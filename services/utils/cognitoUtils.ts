import { CognitoIdentityProviderClient, InitiateAuthCommand, InitiateAuthCommandOutput, RespondToAuthChallengeCommand, RespondToAuthChallengeCommandOutput } from "@aws-sdk/client-cognito-identity-provider";

interface LogInArgs {
  userName: string
  password: string
}

interface MfaChallengeArgs {
  session: string
  userName: string
  mfaCode: string
}

export const getCognitoClient = () => {
  const AWS_REGION = process.env.AWS_REGION ?? ''
  return new CognitoIdentityProviderClient({ region: AWS_REGION });
}

export const initLogInFlow = async ({ userName, password}: LogInArgs) => {
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

export const respondToMfaChallenge = async ({ session, userName, mfaCode }: MfaChallengeArgs): Promise<RespondToAuthChallengeCommandOutput> => {
  const USER_POOL_CLIENT_ID = process.env.USER_POOL_CLIENT_ID ?? ''
  const cognitoClient = getCognitoClient()

  const command = new RespondToAuthChallengeCommand({
    ChallengeName: 'SOFTWARE_TOKEN_MFA',
    ClientId: USER_POOL_CLIENT_ID,
    Session: session,
    ChallengeResponses: {
      USERNAME: userName,
      SOFTWARE_TOKEN_MFA_CODE: mfaCode
    }
  })

  return cognitoClient.send(command)
}
