# CarDex

Website for searching cars created for *COMPSCI 266 Introduction to Web Programming* course.

## Backend

The website requires a running server on `localhost:3001` to work. The following commands will run the server:

```bash
cd backend
npm i
npm start
```

The following variables are required to exist in `backend/.env` to ensure full functionality:

```bash
# For AWS S3
AWS_ACCESS_KEY_ID=<your_aws_key>
AWS_SECRET_ACCESS_KEY=<your_aws_secret_key>

# For Gas Price API
COLLECT_API_TOKEN=<your_collect_api_token>
```