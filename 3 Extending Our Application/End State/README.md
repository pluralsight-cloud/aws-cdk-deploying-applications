# Icon Crop Service

This is the complete end state of the Icon Crop application created during the Deploying Applications with the CDK Pluralsight course, module 3.

It contains code for:
- Two buckets, one public
- An IAM role for Lambda
- A Lambda function
- An API Gateway endpoint
- CloudWatch monitoring with alert and dashboard
- A CDK Pipeline using CodeCommit and CodePipeline

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template