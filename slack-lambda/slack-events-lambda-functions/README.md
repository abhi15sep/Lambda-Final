# Slack Events with Lambda Functions

![](images/architecture.jpg?raw=true "Architecture")

In certain cases, we need an assistant to help us in our daily work like adding items in an Airtable or making queries in a data table.

This project consists of doing the connection between a Slack app with an AWS Lambda Function.

## Requirements
* NodeJS
* Yarn/NPM
* AWS account
* AWS CLI
* [Serverless](https://www.serverless.com/)

## Setting up
First, you need to create a [Slack app](https://api.slack.com/start/overview) with permissions to post messages in a channel and to detect events like [app mentions](https://api.slack.com/events/app_mention). Install the app on your workspace to get the "Bot User OAuth Token", copy this token on "OAuth & Permissions" and fill the variable "SLACK_TOKEN_BOT" on serverless.yml.

### Testing
Run the following command to test if everthing is working:
```
yarn offline
```

### Deploying
Run the following command to deploy to AWS:
```
yarn deploy
```
After deploying, you'll receive a link from your brand new API Gateway. Copy the link that has the "slack-event" endpoint. Goes back to your Slack app, click on Event Subscriptions, enable the slack events, and past the link that you copied.

