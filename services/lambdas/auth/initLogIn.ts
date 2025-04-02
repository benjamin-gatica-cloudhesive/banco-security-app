import { initLogInFlow } from "../../utils/cognitoUtils";
import { errorResponse, formattedResponse, getBodyFromEvent, validateStructureLoginCredentials } from "../../utils/utils";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const credentials = getBodyFromEvent(event)

    validateStructureLoginCredentials(credentials)

    const { userName, password } = credentials

    const logInResponse = await initLogInFlow({ userName, password })

    return formattedResponse(200, {
      message: 'MFA needed',
      info: {
        Session: logInResponse.Session
      }
    })
  } catch (error) {
    return errorResponse(error, 'Error trying to init Log In')
  }
}

export { handler }
