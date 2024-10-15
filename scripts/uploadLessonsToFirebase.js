const firebaseConfig = {
  apiKey: "AIzaSyByJvaNDfhSroaExTQzrap_sXuHzMmvKbg",
  authDomain: "capylanga.firebaseapp.com",
  projectId: "capylanga",
  storageBucket: "capylanga.appspot.com",
  messagingSenderId: "183625982823",
  appId: "1:183625982823:web:8b32a7a46964bdbf3545c2",
  measurementId: "G-N0C2Z58Z0N"
};

const serviceAccountKey = require('../serviceWorker.json');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
});

const db = admin.firestore();
const lessonsDir = '../public/lessons';

function uploadFiles(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        uploadFiles(filePath);
      } else if (file === 'lesson.json') {
        const relativePath = path.relative(lessonsDir, dir);
        const docPath = relativePath.split(path.sep).join('/');
        const lessonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        db.collection('lessons').doc(docPath).set(lessonData)
          .then(() => {
            console.log(`Uploaded ${filePath} to ${docPath}`);
          })
          .catch(err => {
            console.error(`Error uploading ${filePath}: ${err}`);
          });
      }
    });
  });
}

uploadFiles(lessonsDir);