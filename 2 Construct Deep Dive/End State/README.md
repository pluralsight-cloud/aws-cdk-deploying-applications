# Icon Crop Service

This is the partially-complete end state of the Icon Crop application created during the Deploying Applications with the CDK Pluralsight course, module 2.

It contains code to:
- Deploy two buckets, one public
- Deploy an IAM role for Lambda
- Use an L3 construct to deploy Lambda and a RESTful API with API Gateway, to be refactored out in the next module

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
