# AWS Site Deploy

A simple project built using [Serverless](https://serverless.com) to easily deploy a static website to AWS cloud resources. I used this project to deploy my own personal website [averydl.com](https://averydl.com/), code available [here](https://github.com/averydl/personal-site.git). This project is [MIT](https://github.com/averydl/aws-site-deploy/blob/master/LICENSE) licensed, and is easily modifiable to host your own website on AWS.


## Dependencies

This project requires [node.js](https://nodejs.org/) and [Serverless](https://www.serverless.com/).


## Prerequisites

You must first create an [AWS account](https://aws.amazon.com/resources/create-account/) and purchase a domain through Amazon [Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html) using the AWS console before using this tool. Once your account is created, you will need to configure [serverless credentials](https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/#aws---config-credentials/) to allow serverless to create and modify AWS resources for your cloud stack. You can create and download [AWS Access Keys](https://console.aws.amazon.com/iam/home?#/security_credentials) for your root account, or configure a new IAM user with minimal permissions for your stack. Learn more [here](https://www.serverless.com/blog/abcs-of-iam-permissions).

## Setup

To get started, clone the repo and install dependencies by running
```bash
git clone git://github.com/averydl/aws-site-deploy.git # replace [averydl] with your github username if you forked the repo
cd aws-site-deploy
npm install
```

Create a subdirectory for your site content under the project directory (e.g. `build/`) and copy your site files to it. Note the name of the directory, as you'll need to enter it during configuration.

## Configuration

Once the project is setup, you can execute a script to configure your project by running

```bash
npm run config
```

This will walk you through an automatic configuration that generates a `config.json` file with required information for your cloud stack. The fields populated durings this configuration are:

- `servicename` - The name of your serverless service (e.g. personal-site) that serverless uses to generate unique resource ID's for your cloud stack.

- `buildpath` - The relative path to the directory containing your static site files. For ease of use, you should copy these files to a subdirectory under the root project, e.g. `aws-site-deploy/build`.

- `region` - The AWS region where you want serverless to deploy your cloud stack (defaults to *us-east-1*).

- `domain` - The public domain of your website (e.g. example.com). This **must* match the domain purchased through Route53, or the deployment will fail.

- `zoneid` - The [Hosted Zone ID](https://console.aws.amazon.com/route53/v2/hostedzones#) created by AWS when you purchased your domain through Route53. You can find this ID in the Route53 console by clicking on *Hosted zones* in the sidebar on the Route53 homepage. You should see your domain and its Hosted Zone ID listed - copy this ID and enter it as the value for `zoneid` while running the config script.

- `logprefix` - A prefix (e.g. `logs/`) that AWS will append this prefix to logs generated in the log bucket. This field is *optional*.

- `rootobject` - The default static website object users will be navigated to when they access your domain (e.g. `index.html`). This field is not required, but it is **highly recommended** that you set it, as otherwise users may be able to manually navigate to the bucket url (i.e. *bucketname*.s3.amazonaws.com) and view information about your site resources *without* going through your public domain.

## Deploying to AWS

After setting up and configuring the project, you can deploy it to AWS by running
```bash
npm run deploy
```