import {
    PutObjectCommand,
    GetObjectCommand,
    S3Client
} from '@aws-sdk/client-s3';
import s3RequestPresigner  from "@aws-sdk/s3-request-presigner";
import config from '../../config.js';

const s3Client = new S3Client({
    endpoint: config.S3_ENDPOINT,
    forcePathStyle: false,
    region: config.S3_REGION,
    credentials: {
        accessKeyId: config.S3_ACCESS_KEY,
        secretAccessKey: config.S3_SECRET_KEY
    }
});

const uploadObject = async (path, content) => {

    const params = {
        Bucket: config.S3_BUCKET_NAME,
        Key: path,
        Body: content,
        ACL: "private",
        Metadata: {
            "x-amz-meta-my-key": "idkaboutthisonetbh"
        }
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log(
            "[DEBUG] Successfully uploaded object: " +
            params.Bucket +
            "/" +
            params.Key
        );
        return data;
    } catch (err) {
        console.log("[DEBUG] Error", err);
    }
};

async function readObject(path) {
    try {
        const command = new GetObjectCommand({
            Bucket: config.S3_BUCKET_NAME,
            Key: path,
        });
        const response = await s3Client.send(command);
        const fileContent = response.Body.read().toString('utf-8');
        // console.log('File content:', fileContent);
        return fileContent;
    } catch (err) {
        console.error('[DEBUG] Error reading file:', err);
        return;
    }
}

async function generateSignedReadURL(path) {
    try {
        const command = new GetObjectCommand({
          Bucket: config.S3_BUCKET_NAME,
          Key: path,
        });

        const signedUrl = await s3RequestPresigner.getSignedUrl(
          s3Client,
          command,
          { expiresIn: 3600 * 24 } // Expiration time in seconds (e.g., 1 hour)
        );
    
        return signedUrl;
      } catch (err) {
        console.error('Error generating signed URL:', err);
        return null;
      }
}

async function generateSignedUploadURL(path, contentType, isPublic) {
    try {
        const command = new PutObjectCommand({
          Bucket: config.S3_BUCKET_NAME,
          Key: path,
          ContentType: contentType,
          ACL: isPublic ? 'public-read' : 'authenticated-read'
        });

        const signedUrl = await s3RequestPresigner.getSignedUrl(
          s3Client,
          command,
          { expiresIn: 3600 * 24 } // Expiration time in seconds (e.g., 1 hour)
        );
    
        return signedUrl;
      } catch (err) {
        console.error('Error generating signed URL:', err);
        return null;
      }
}

export {
    uploadObject,
    readObject,
    generateSignedReadURL,
    generateSignedUploadURL
}