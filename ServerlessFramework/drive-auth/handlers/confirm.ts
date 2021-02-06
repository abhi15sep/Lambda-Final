import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayEventRequestContext, APIGatewayProxyResult } from 'aws-lambda';
import createError from 'http-errors';
import confirmUser from '../lib/cognito/confirmUser';
import { commonMiddleware, confirmUserMiddleware } from '../lib/middleware';
import { ConfirmUserDto } from '../lib/dto/confirmUser.dto';

interface Context extends APIGatewayEventRequestContext {
    confirmUserDto: ConfirmUserDto 
}

const confirm = async (_event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const { confirmUserDto } = context;

    try {
        await confirmUser(confirmUserDto);
    } catch ({ code }) {
        throw new createError.Unauthorized(JSON.stringify({ code }));
    }

    return {
        statusCode: 200,
        body: JSON.stringify({}),
    };
};

export const handler = commonMiddleware(confirm)
    .use(confirmUserMiddleware());