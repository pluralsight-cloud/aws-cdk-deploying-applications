import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import * as cdk from 'aws-cdk-lib';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { IconCropStack } from './icon-crop-stack';
import { Construct } from 'constructs';

export class IconCropPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new CodeCommit repository
    const repo = new codecommit.Repository(this, 'IconCropRepo', {
      repositoryName: 'IconCropRepo',
    });

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      pipelineName: 'IconCropPipeline',
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.codeCommit(repo, 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
        primaryOutputDirectory: 'cdk.out'
      }),
    });

    pipeline.addStage(new IconCropAppStage(this, 'Dev'));

    // Output the CodeCommit repository URL
    new cdk.CfnOutput(this, 'RepoUrl', {
      value: repo.repositoryCloneUrlHttp,
      description: 'The URL of the newly created CodeCommit repository',
      exportName: 'IconCropRepoUrl',
    });
  }
}

class IconCropAppStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new IconCropStack(this, 'IconCropStack', {});
  }
}