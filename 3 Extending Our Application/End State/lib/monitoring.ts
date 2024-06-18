import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export function setupMonitoring(scope: Construct, iconCrop: lambda.Function): void {
    
/*  const logGroup = new logs.LogGroup(scope, 'IconCropLogGroup', {
    logGroupName: `/aws/lambda/${iconCrop.functionName}`,
    retention: logs.RetentionDays.ONE_WEEK,
  }); */

  const logGroup = logs.LogGroup.fromLogGroupName(scope, 'ExistingLogGroup', `/aws/lambda/${iconCrop.functionName}`);

  new cloudwatch.Alarm(scope, 'ErrorAlarm', {
    metric: iconCrop.metricErrors(),
    threshold: 1,
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
  });

  new cloudwatch.Dashboard(scope, 'IconCropDashboard', {
    widgets: [
      [new cloudwatch.GraphWidget({
        title: 'Lambda Errors',
        left: [iconCrop.metricErrors()],
      })],
      [new cloudwatch.GraphWidget({
        title: 'Lambda Invocations',
        right: [iconCrop.metricInvocations()],
      })],
    ],
  });
  
}