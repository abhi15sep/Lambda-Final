import AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

export default async function getConfirmationStatus(userId: string) {
    const { UserStatus } = await cognito.adminGetUser({
        UserPoolId: process.env.COGNITO_POOL_ID!,
        Username: userId,
    }).promise();

    return UserStatus === 'CONFIRMED';
}