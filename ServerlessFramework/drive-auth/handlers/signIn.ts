import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayEventRequestContext, APIGatewayProxyResult } from 'aws-lambda';
import createError from 'http-errors';

import { commonMiddleware, signInMiddleware } from '../lib/middleware';
import SignInDto from '../lib/dto/signIn.dto';
import authenticate from '../lib/cognito/authenticate';
import { AuthenticationResultType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

interface Context extends APIGatewayEventRequestContext {
    signInDto: SignInDto;
}

const signIn = async (_event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    try {
        const result: AuthenticationResultType = await authenticate(context.signInDto);
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        }
    } catch ({ code, message }) {
        throw new createError.Unauthorized(JSON.stringify({ code, message }));
    }
};

export const handler = commonMiddleware(signIn)
    .use(signInMiddleware());