import AWS from 'aws-sdk';
import SignUpDto from '../dto/signUp.dto';

const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

export default async function createUser(userDetails: SignUpDto) {
    const { UserSub } = await cognito.signUp({
        ClientId: process.env.COGNITO_CLIENT_ID!,
        Username: userDetails.phone_number,
        Password: userDetails.password,
        UserAttributes: [
            { Name: 'given_name', Value: userDetails.given_name },
            { Name: 'family_name', Value: userDetails.family_name },
        ],
    }).promise();

    return {
        userId: UserSub,
    };
}