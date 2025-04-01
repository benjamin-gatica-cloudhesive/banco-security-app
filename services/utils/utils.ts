import { APIGatewayProxyEvent } from "aws-lambda"

interface ResponseBody {
  message: string,
  info?: any
}

export const formattedResponse = (statusCode: number, body: ResponseBody) => {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    }
  }
}

export const errorResponse = (error: any, defaultMessage: string) => {
  if (error instanceof Error) {
    return formattedResponse(500, { message: error.message })
  }

  return formattedResponse(500, { message: defaultMessage })
}

export const getBodyFromEvent = (event: APIGatewayProxyEvent) => {
  try {
    if (!event.body) {
      throw new Error('Not body found in event')
    }

    return JSON.parse(event.body)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error('Error parsing event')
  }
}

export const validateStructureLoginCredentials = (credentials: any) => {
  if (!credentials.userName) {
    throw new Error('userName not received')
  }

  if (!credentials.password) {
    throw new Error('password not received')
  }

  if (typeof credentials.userName !== 'string') {
    throw new Error('userName must be type string')
  }

  if (typeof credentials.password !== 'string') {
    throw new Error('password must be type string')
  }
}

export const isIdInParameters = (event: APIGatewayProxyEvent) => {
  if (!event.pathParameters) {
    return false
  }

  if (!event.pathParameters?.id) {
    return false
  }

  return true
}

export const getIdFromParameters = (event: APIGatewayProxyEvent) => {
  return event.pathParameters?.id
}
