#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IconCropStack } from '../lib/icon-crop-stack';
import { IconCropPipelineStack } from '../lib/pipeline';

const app = new cdk.App();
const stack = new IconCropStack(app, 'IconCropStack', { });
const pipeline = new IconCropPipelineStack(app, 'IconCropPipelineStack', { });

cdk.Tags.of(stack).add('environment', 'dev', {
    excludeResourceTypes: ['AWS::IAM::Role'],
});
cdk.Tags.of(stack).add('application', 'icon-crop');