import * as path from 'path'
import * as Lambda from "@aws-cdk/aws-lambda"
import * as cdk from '@aws-cdk/core';
import * as chatbot from '@aws-cdk/aws-chatbot';
import iam = require('@aws-cdk/aws-iam');


export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const slackWorkSpaceId = new cdk.CfnParameter(this, "workspace", {
      type: "String",
      description: "enter slack workspace id"});

    const slackChannelId = new cdk.CfnParameter(this, "channel", {
      type: "String",
      description: "enter slack channel id"});

// Configure path to Dockerfile
    const dockerfile = path.join(__dirname, "../src/lambda-python-example");

    // Create AWS Lambda function and push image to ECR
    new Lambda.DockerImageFunction(this, "function", {
      code: Lambda.DockerImageCode.fromImageAsset(dockerfile),
      timeout: cdk.Duration.seconds(300),
    });
    
    const slackChannel = new chatbot.SlackChannelConfiguration(this, 'MySlackChannel', {
      slackChannelConfigurationName: 'awsbot-channel-config',
      slackWorkspaceId: slackWorkSpaceId.valueAsString, 
      slackChannelId: slackChannelId.valueAsString
    });
    
    //Issue created because the next line doesn't work https://github.com/aws/aws-cdk/issues/13444
    //slackChannel.addLambdaInvokeCommandPermissions();
    
    //https://docs.aws.amazon.com/chatbot/latest/adminguide/chatbot-cli-commands.html#iam-policies-for-slack-channels-cli-support

    const lambdaInvokeCommandStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      resources: ['*'],
      actions: [
        "lambda:invokeAsync",
        "lambda:invokeFunction"
      ],
    });
    slackChannel.addToRolePolicy(lambdaInvokeCommandStatement);

  }
}
