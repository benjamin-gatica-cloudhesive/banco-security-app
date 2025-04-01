import { getToken, logIn } from "../../utils/cognitoUtils";
import { errorResponse, formattedResponse, getBodyFromEvent, validateStructureLoginCredentials } from "../../utils/utils";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const credentials = getBodyFromEvent(event)

    validateStructureLoginCredentials(credentials)

    const { userName, password } = credentials

    const logInResponse = await logIn({ userName, password })

    const token = getToken(logInResponse)

    return formattedResponse(200, {
      message: 'Token obtained successfully',
      info: token
    })
  } catch (error) {
    return errorResponse(error, 'Error trying to make logIn')
  }
}

export { handler }
