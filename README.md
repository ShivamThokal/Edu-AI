# 🔐 FRONTEND: Firebase Config

### /client/src/.env
- REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
- REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
- REACT_APP_FIREBASE_PROJECT_ID=your_project_id
- REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
- REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
- REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
---


# 🧠 BACKEND: Environment Setup
### /server/.env
### MongoDB connection string
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-db-name
### JWT secret for token signing
JWT_SECRET=your_jwt_secret_here
### OpenAI API key (for AI features like answer generation, summaries, etc.)
OPENAI_API_KEY=your_openai_api_key_here
### Cloudinary (for image/pdf uploads if used)
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=your_optional_cloudinary_folder_name
