const { s3Client } = require("../config/s3Client");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { envConfig } = require("../config/envConfig");
const { ErrorObject } = require('../helpers/error')

const uploadImage = async (file) => {
  
  const params = {
  Bucket: envConfig.aws.bucketName, 
  Key: file.name, 
  Body: file.data,
  ACL: 'public-read' 
};
  try {
    await s3Client.send(new PutObjectCommand(params))
    return (`https://${params.Bucket}.s3.amazonaws.com/${params.Key}`)
  } catch (err) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
};

const deleteImage = async (key) => {
  
  const params = {
  Bucket: envConfig.aws.bucketName, 
  Key: key.split('/')[3]
};

try {
  await s3Client.send(new DeleteObjectCommand(params))
} catch (err) {
    throw new ErrorObject(error.message, error.statusCode || 500)
}
};

module.exports = { uploadImage, deleteImage}