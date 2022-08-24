const  { S3Client } = require("@aws-sdk/client-s3");
const { envConfig } = require("./envConfig");


 const s3Client = new S3Client({
     region: envConfig.aws.region,
     accessKeyId: envConfig.aws.accessKey,
     secretAccessKey: envConfig.aws.secretKey
 });

 module.exports = { s3Client }