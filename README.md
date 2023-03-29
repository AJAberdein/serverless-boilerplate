
# Serverless Personal Boilerplate

## Usage

### Run locally

Install dynamodb offline
```
sls dynamodb install
```

If you experience timeout issues when downloading the dynamodb jar, you can download it manually and place it in the .dynamodb folder

```
wget http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest.tar.gz
mkdir .dynamodb
tar zxvf dynamodb_local_latest.tar.gz -C .dynamodb
```

Running serverless locally w/ dynamodb & api-gw

```
npm run dev
```


### Run using docker

```
npm run dev:docker
```

Units tests

```
npm run test
```