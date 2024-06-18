#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IconCropStack } from '../lib/icon-crop-stack';

const app = new cdk.App();
const stack = new IconCropStack(app, 'IconCropStack', { });

cdk.Tags.of(stack).add('environment', 'dev', {
    excludeResourceTypes: ['AWS::IAM::Role'],
});
cdk.Tags.of(stack).add('application', 'icon-crop');