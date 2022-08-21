const dotenv = require('dotenv')

const envFound = dotenv.config();
if(!envFound){
    throw new Error("Couldn't find .env file.");
}

const { 
    APP_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_DIALECT,
    SECRET_TOKEN,
    MAIL_USER,
    MAIL_PASSWORD,
    BUCKET_NAME,
    AWS_REGION,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
} = process.env;

exports.envConfig = {
    app: {
        port: APP_PORT,
        
    },
    db: {
        user: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        name: DB_NAME,
        port: DB_PORT,
        dialect:'mysql',
    },
    jwt: {
        secret: SECRET_TOKEN
    },
    mail: {
        user: MAIL_USER,
        password: MAIL_PASSWORD
    },
    aws: {
        bucketName: BUCKET_NAME,
        region: AWS_REGION,
        accessKey: AWS_ACCESS_KEY_ID,
        secretKey: AWS_SECRET_ACCESS_KEY

    }
}