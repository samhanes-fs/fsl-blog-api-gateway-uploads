const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid');

const s3 = new S3({ apiVersion: '2006-03-02' });

module.exports.handler = async function handler(event, context) {
  const body = JSON.parse(event.body);

  // you should validate that this is a type you want to allow
  const contentType = body.contentType;

  // decide where the uploaded file should go in your bucket
  // you might want to use a filename from the request as part of the key
  const key = 'signed-putobject/' + uuid.v4();

  const signedUrl = await s3.getSignedUrlPromise('putObject', {
    Bucket: process.env.UPLOADS_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  return {
    uploadMethod: 'PUT',
    uploadUrl: signedUrl,
  };
}
