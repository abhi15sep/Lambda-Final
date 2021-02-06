import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayEventRequestContext, APIGatewayProxyResult } from 'aws-lambda';
import createError from 'http-errors';

import { commonMiddleware, signUpMiddleware } from '../lib/middleware';
import SignUpDto from '../lib/dto/signUp.dto';
import createUser from '../lib/cognito/createUser';

interface Context extends APIGatewayEventRequestContext {
    signUpDto: SignUpDto;
}

const signUp = async (_event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    try {
        const { userId } = await createUser(context.signUpDto);
        return {
            statusCode: 201,
            body: JSON.stringify({ userId }),
        };
    } catch ({ code }) {
        throw new createError.Unauthorized(JSON.stringify({ code }));
    }
};

export const handler = commonMiddleware(signUp)
    .use(signUpMiddleware());