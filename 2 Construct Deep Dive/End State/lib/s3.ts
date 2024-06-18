import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export function createIconBuckets(scope: Construct): { iconSource: s3.Bucket, iconDest: s3.Bucket } {

    const iconSource = new s3.Bucket(scope, 'iconSource', {
      removalPolicy: RemovalPolicy.DESTROY,
    });

    let iconDest: s3.Bucket;

    try {
        iconDest = s3.Bucket.fromBucketName(scope, 'iconDest', 'icon-destination-bucket-public') as s3.Bucket;
    } catch (error) {
        iconDest = new s3.Bucket(scope, 'iconDest', {
            bucketName: 'icon-destination-bucket-public',
            blockPublicAccess: new s3.BlockPublicAccess({
                blockPublicAcls: false,
                blockPublicPolicy: false,
                ignorePublicAcls: false,
                restrictPublicBuckets: false,
            }),
            publicReadAccess: true,
            removalPolicy: RemovalPolicy.RETAIN,
        });
    }
    
    /* const iconDest = new s3.Bucket(scope, 'iconDest', {
        bucketName: 'icon-destination-bucket-public',
        blockPublicAccess: new s3.BlockPublicAccess({
            blockPublicAcls: false,
            blockPublicPolicy: false,
            ignorePublicAcls: false,
            restrictPublicBuckets: false,
          }),
        publicReadAccess: true,
        removalPolicy: RemovalPolicy.RETAIN,
    }); */

    iconDest.addToResourcePolicy(new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [`${iconDest.bucketArn}/*`],
        principals: [new iam.AnyPrincipal()],
        effect: iam.Effect.ALLOW,
      }));

    return { iconSource, iconDest }

}
