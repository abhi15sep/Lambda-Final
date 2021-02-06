import 'source-map-support/register';
import createError from 'http-errors';
import { APIGatewayProxyEvent, APIGatewayEventRequestContext, APIGatewayProxyResult } from 'aws-lambda';
import { commonMiddleware } from '../lib/middleware';
import getConfirmationStatus from '../lib/cognito/getConfirmationStatus';

const getConfirmationStatusHandler = async (event: APIGatewayProxyEvent, _context: APIGatewayEventRequestContext): Promise<APIGatewayProxyResult> => {
    const userId = event.pathParameters!.id;
    let confirmed;

    try {
        confirmed = await getConfirmationStatus(userId);
    } catch ({ code, message }) {
        console.error(message);
        throw new createError.Unauthorized(JSON.stringify({ code }));
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ confirmed }),
    };
};

export const handler = commonMiddleware(getConfirmationStatusHandler);
