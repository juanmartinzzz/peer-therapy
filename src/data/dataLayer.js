import { db } from "../integrations/firebase";
import { sessionTemplate } from "./entities";
import { addDoc, collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";

// helpers

const setCallbackOnQuerySnapshot = async ({query, callback}) => {
  const unsubscribe = onSnapshot(query, querySnapshot => {
    const documents = [];
    querySnapshot.forEach(doc => {
        documents.push({...doc.data(), id: doc.id});
    });

    callback({documents});
  });
}

const updateDocumentWithDefaultFields = async ({docRef, data}) => {
  const dataToAdd = {
    ...data,
    updatedAt: new Date(),
  }

  setDoc(docRef, dataToAdd);
}

const addDocumentWithDefaultFields = async ({collectionName, data, id}) => {

  const dataToAdd = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  try {
    if(id) {
      setDoc(doc(collection(db, collectionName), id), dataToAdd);
    } else {
      await addDoc(collection(db, collectionName), dataToAdd);
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// data methods

const onParticipantsChange = async ({sessionId, callback}) => {
  const q = query(collection(db, `sessions/${sessionId}/participants`));

  setCallbackOnQuerySnapshot({query: q, callback});
}

const updateUser = async ({user}) => {
  user.sessions.map(sessionId => {
    const docRef = doc(collection(db, `sessions/${sessionId}/participants`), user.id);

    updateDocumentWithDefaultFields({docRef, data: user});
  });
}

const addUserToSession = async ({sessionId, user}) => {
  await addDocumentWithDefaultFields({collectionName: `sessions/${sessionId}/participants`, data: user, id: user.id});
}

const createSession = async ({ session = sessionTemplate }) => {
  console.log({session});
  addDocumentWithDefaultFields({ collectionName: 'sessions', data: session });
}

const onSessionsChange = async ({callback}) => {
  const q = query(collection(db, "sessions"));

  setCallbackOnQuerySnapshot({query: q, callback: ({documents}) => {
    callback({documents: documents.map(document => ({...document, date: new Date(document.date.seconds * 1000)}))})
  }});
}

export {
  updateUser,
  createSession,
  onSessionsChange,
  addUserToSession,
  onParticipantsChange,
};
