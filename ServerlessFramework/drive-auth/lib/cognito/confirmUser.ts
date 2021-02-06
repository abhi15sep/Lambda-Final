import AWS from 'aws-sdk';
import { ConfirmUserDto } from '../dto/confirmUser.dto';

const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

export default async function confirmUser(confirmDetails: ConfirmUserDto) {
    await cognito.confirmSignUp({
        ClientId: process.env.COGNITO_CLIENT_ID!,
        Username: confirmDetails.userId,
        ConfirmationCode: confirmDetails.confirmationCode,
    }).promise();
}