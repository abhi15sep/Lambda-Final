- cdk deploy --parameters workspace=XXXXXXXX --parameters channel=XXXXXXXX
- This code is inspired by https://medium.com/faun/deploy-an-aws-lamba-function-as-docker-image-and-invoke-it-from-slack-a977f98025af. 
- Always use Cloud9 when creating container based Lambda function as it takes forever or times out when doing it locally. 
- Use https://gist.github.com/aqilzeeshan/9b1ea973b51e24afca51aedd93a6049b to create cloud9 and subnet ending with c0020a9c as input parameter value
- https://docs.aws.amazon.com/cloud9/latest/user-guide/sample-cdk.html is helpful guide to setup Cloud9 for CDK but all is already setup, there is nothing to do.
- This work is inspired by https://sbstjn.com/blog/aws-cdk-lambda-fleet-multiple-docker-images-container/
- To look at later https://github.com/talkncloud/aws/tree/main/essential-billing-bot
- To implement use cases https://docs.aws.amazon.com/chatbot/latest/adminguide/chatbot-lambda-common-use-cases.html
- To implement use cases https://aws.amazon.com/blogs/devops/running-aws-commands-from-slack-using-aws-chatbot/ 



# Welcome to your CDK TypeScript project!

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`HelloCdkStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
