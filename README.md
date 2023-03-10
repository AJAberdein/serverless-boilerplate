
# Serverless Personal Boilerplate

## Usage

### Running locally

DynamoDB offline workaraound for DynamoDBLocal Jar 403 issue on 
```
sls dynamodb install
```
https://github.com/99x/serverless-dynamodb-local/issues/209

This is why we use docker...

```
wget http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest.tar.gz
mkdir .dynamodb
tar zxvf dynamodb_local_latest.tar.gz -C .dynamodb
```

Running serverless locally w/ dynamodb & api-gw

TODO: npm script

```
sls dynamodb start --migrate
aws dynamodb create-table --endpoint-url http://localhost:8000 --table-name documents --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
serverless offline start
```