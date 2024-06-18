import * as cdk from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { Construct } from 'constructs';

export function createPipeline(scope: Construct, iconCrop: lambda.IFunction): void {
  const sourceOutput = new codepipeline.Artifact();
  const buildOutput = new codepipeline.Artifact();

  const repo = new codecommit.Repository(scope, 'IconCropRepo', {
    repositoryName: 'icon-crop2',
  });

  new codepipeline.Pipeline(scope, 'Pipeline', {
    stages: [
      {
        stageName: 'Source',
        actions: [new codepipeline_actions.CodeCommitSourceAction({
          actionName: 'CodeCommit_Source',
          repository: repo,
          branch: 'main',
          output: sourceOutput,
        })],
      },
      {
        stageName: 'Build',
        actions: [new codepipeline_actions.CodeBuildAction({
          actionName: 'CodeBuild',
          project: new codebuild.PipelineProject(scope, 'BuildProject'),
          input: sourceOutput,
          outputs: [buildOutput],
        })],
      },
      {
        stageName: 'Deploy',
        actions: [new codepipeline_actions.CloudFormationCreateUpdateStackAction({
          actionName: 'CFN_Deploy',
          stackName: 'IconCropStack',
          templatePath: buildOutput.atPath('IconCropStack.template.json'),
          adminPermissions: true,
        })],
      },
    ],
  });

  new cdk.CfnOutput(scope, 'CodeCommitHttpUrl', {
    value: repo.repositoryCloneUrlHttp,
    description: 'The HTTP URL of the CodeCommit repository',
  });
}