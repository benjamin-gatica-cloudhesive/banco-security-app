import { respondToMfaChallenge } from "../../utils/cognitoUtils";
import { errorResponse, formattedResponse, getBodyFromEvent, validateStructureLoginCredentials, validateStructureMFACredentials } from "../../utils/utils";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const credentials = getBodyFromEvent(event)

    validateStructureMFACredentials(credentials)

    const { userName, session, mfaCode } = credentials

    const response = await respondToMfaChallenge({ userName, mfaCode, session })

    return formattedResponse(200, {
      message: 'Log In successfull',
      info: {
        ...response.AuthenticationResult
      }
    })
  } catch (error) {
    return errorResponse(error, 'Error trying to resolve MFA')
  }
}

export { handler }
