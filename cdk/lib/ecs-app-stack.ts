import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import * as ecr from '@aws-cdk/aws-ecr';

export class EcsAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'app-vpc', {
      maxAzs: 2,
      cidr: '10.1.0.0/16',
      subnetConfiguration: [
        { subnetType: ec2.SubnetType.PUBLIC, name: 'public', cidrMask: 24 },
      ],
    });

    const cluster = new ecs.Cluster(this, 'app-cluster', {
      vpc: vpc,
      capacity: {
        instanceType: new ec2.InstanceType('t2.small'),
        minCapacity: 2,
      },
    });

    const appTaskDef = new ecs.TaskDefinition(this, 'app-task-def', {
      compatibility: ecs.Compatibility.EC2,
    });

    const repo = ecr.Repository.fromRepositoryName(
      this,
      'ecr-repo',
      'spring-boot-react-app-repo',
    );

    appTaskDef
      .addContainer('app-container', {
        image: ecs.ContainerImage.fromEcrRepository(repo),
        cpu: 256,
        memoryLimitMiB: 256,
        dockerLabels: { app: 'spring-boot-react-app' },
        logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'App' }),
      })
      .addPortMappings({ containerPort: 8080 });

    const appService = new ecsPatterns.ApplicationLoadBalancedEc2Service(
      this,
      'app-service-with-alb',
      {
        cluster: cluster,
        serviceName: 'spring-boot-react-app',
        desiredCount: 2,
        taskDefinition: appTaskDef,
      },
    );

    appService.targetGroup.configureHealthCheck({
      interval: cdk.Duration.seconds(10),
      timeout: cdk.Duration.seconds(5),
    });

    appService.service.addPlacementStrategies(
      ecs.PlacementStrategy.spreadAcross(
        ecs.BuiltInAttributes.AVAILABILITY_ZONE,
      ),
    );
  }
}
