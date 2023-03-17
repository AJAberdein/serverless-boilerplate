
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

```
serverless offline start
```

Units tests

```
npm run test
```