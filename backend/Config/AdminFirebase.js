import { config } from "dotenv";
config();
import admin from "firebase-admin";
import path from "path";

const serverAccount = path.resolve(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH
);
admin.initializeApp({
  credential: admin.credential.cert(serverAccount),
});

export default admin;
