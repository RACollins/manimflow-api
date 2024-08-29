import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from "dotenv";

dotenv.config();

export class InfraStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /*Constructs the layer for the lambda function*/
    const layer = new lambda.LayerVersion(this, 'BaseLayer', {
      code: lambda.Code.fromAsset("lambda_base_layer/layer.zip"),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_11]
    });

    /*Constructs the lambda function for the API.*/
    const apiLambda = new lambda.Function(this, 'ApiFunction', {
      runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset("../app/"),
      handler: 'api.handler',
      layers: [layer],
      environment: {
        "OPENAI_API_KEY": process.env.OPENAI_API_KEY ?? "",
        "ANTHROPIC_API_KEY": process.env.ANTHROPIC_API_KEY ?? "",
      }
    });

    /*Constructs the API Gateway rest api*/
    const manimFlowApi = new apiGateway.RestApi(this, 'RestApi', {
      restApiName: "Manim Flow API",
    });

    manimFlowApi.root.addProxy({
        defaultIntegration: new apiGateway.LambdaIntegration(apiLambda),
      })
  }
}
