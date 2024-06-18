import * as cdk from 'aws-cdk-lib';
import { createIconBuckets } from './s3';
import { createLambdaRole } from './iam';
import { createIconCropFunction } from './lambda';
import { createApiGateway } from './api-gateway';
import { setupMonitoring } from './monitoring';
// import { createLambdaApiGateway } from './lambda-api';
import { Construct } from 'constructs';

export class IconCropStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { iconSource, iconDest } = createIconBuckets(this);
    const lambdaRole = createLambdaRole(this, iconSource.bucketName, iconDest.bucketName);
    const iconCrop = createIconCropFunction(this, lambdaRole, iconSource, iconDest);
    const api = createApiGateway(this, iconCrop);
    const monitoring = setupMonitoring(this, iconCrop);
    // const apiGatewayToLambda = createLambdaApiGateway(this, iconSource.bucketName, iconDest.bucketName);
  }
}