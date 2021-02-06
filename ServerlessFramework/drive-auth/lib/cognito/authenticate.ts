import AWS from 'aws-sdk';
// import { CognitoUserPool } from 'amazon-cognito-identity-js';
import SignInDto from '../dto/signIn.dto';
import { AdminInitiateAuthRequest, AuthenticationResultType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
const { COGNITO_POOL_ID: UserPoolId, COGNITO_CLIENT_ID: ClientId } = process.env;

export default async function authenticate(signInDto: SignInDto): Promise<AuthenticationResultType> {
    console.log(signInDto);
    const { AuthenticationResult } = await cognito.adminInitiateAuth({
        UserPoolId,
        ClientId,
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        AuthParameters: {
            USERNAME: signInDto.phone_number,
            PASSWORD: signInDto.password, 
        }
    } as AdminInitiateAuthRequest).promise();

    return {
        TokenType: AuthenticationResult!.TokenType,
        AccessToken: AuthenticationResult!.AccessToken,
        RefreshToken: AuthenticationResult!.RefreshToken,
        ExpiresIn: AuthenticationResult!.ExpiresIn,
    };
}