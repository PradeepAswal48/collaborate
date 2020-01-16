
import { db } from '../firebase/firebase.js';

export async function getCollaborations() {
    const collaborations = await db.collection('collaborations').get().then(doc => {
        return doc.docs;
    });
    collaborations.forEach(collab => {
        //console.log(collab.data());
    });
}

export async function checkIfUserExist(user){
     const dbUser = await db.collection('userInformation').doc(user.uid).get();
     return dbUser.exists;
 }
export async function createNewUser(user){
    let userExist = await checkIfUserExist(user);
    if(! userExist ){
        try {
            db.collection('userInformation').doc(user.uid).set({ 
                'userId':user.uid,
                'userEmail':user.email,
                'userName' : user.displayName,
                'userPhoneNumber' : user.phoneNumber
            });
        } catch (error) {
            console.log(error);
        }
        
    }
    
}  

