# Spring Boot React App

## Spring Boot base app

[Spring Initializer](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=2.4.5.RELEASE&packaging=jar&jvmVersion=11&groupId=com.example&artifactId=payroll&name=payroll&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.payroll&dependencies=h2,data-jpa,web)


## Run at local

```
$ cd frontend
$ yarn build
$ cd ..
$ ./gradlew bootRun
# access localhost:8080
```

## Deploy to AWS

Create ECR repogitory
```
$ cd cdk
$ yarn cdk deploy ecr-repo-stack
```

Execute docker login
```
$ aws ecr get-login-password --region ap-northeast-1 | docker login --password-stdin --username AWS "<account_id>.dkr.ecr.ap-northeast-1.amazonaws.com"
```

Build and push image
```
$ cd ..
$ docker build -t spring-boot-react-app .
$ docker tag <image_id> <account_id>.dkr.ecr.ap-northeast-1.amazonaws.com/spring-boot-react-app-repo
$ docker push <account_id>.dkr.ecr.ap-northeast-1.amazonaws.com/spring-boot-react-app-repo
```

Deploy app
```
$ cd cdk
$ yarn cdk deploy ecs-app-stack
```
