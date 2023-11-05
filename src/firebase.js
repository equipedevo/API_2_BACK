const firebaseApp = require("firebase/app");
const firebaseStorage = require("firebase/storage");

// import { initializeApp } from "firebase/app";
// import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDUMat2u2prwCCQ77Dt4FjMJzCwfY-R5sI",
    authDomain: "hermezimgdb-dev.firebaseapp.com",
    projectId: "hermezimgdb-dev",
    storageBucket: "hermezimgdb-dev.appspot.com",
    messagingSenderId: "531253872489",
    appId: "1:531253872489:web:396990f28cf0c03fcfdff8"
};

class FirebaseWrapper {
    app = null;
    storage = null;

    constructor() {
        this.app = firebaseApp.initializeApp(firebaseConfig);
        this.storage = firebaseStorage.getStorage(this.app);
    }

    async StoreImage(imagem, caminho) {
        try{
            const imageRef = firebaseStorage.ref(this.storage, `${caminho}/${imagem.originalname}`);
            const uploadResponse = await firebaseStorage.uploadBytes(imageRef, imagem.buffer);
            return firebaseStorage.getDownloadURL(uploadResponse.ref);
        }
        catch(err){
            throw(err);
        }
    }
}

module.exports = { FirebaseWrapper };