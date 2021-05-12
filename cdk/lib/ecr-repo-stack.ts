import * as cdk from '@aws-cdk/core';
import * as ecr from '@aws-cdk/aws-ecr';

export class EcrRepoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const region = props?.env?.region;
    const accountId = props?.env?.account;

    new ecr.Repository(this, 'ecr-repo', {
      repositoryName: 'spring-boot-react-app-repo',
    });

    new cdk.CfnOutput(this, 'ecr-repo-uri', {
      value: `${cdk.Aws.ACCOUNT_ID}.dkr.ecr.${cdk.Aws.REGION}.amazonaws.com`,
    });

    new cdk.CfnOutput(this, 'ecr-login-password', {
      value: `aws ecr get-login-password --region ${region} \
| docker login --password-stdin --username AWS \
"${accountId}.dkr.ecr.${region}.amazonaws.com"`,
    });
  }
}
