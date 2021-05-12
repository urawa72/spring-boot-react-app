#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EcrRepoStack } from '../lib/ecr-repo-stack';
import { EcsAppStack } from '../lib/ecs-app-stack';

const app = new cdk.App();
new EcrRepoStack(app, 'ecr-repo-stack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
new EcsAppStack(app, 'ecs-app-stack');
