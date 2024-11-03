import { db } from "../integrations/firebase";
import { sessionTemplate } from "./entities";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";

const addDocumentWithDefaultFields = async ({collectionName, data}) => {

  const dataToAdd = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  try {
    await addDoc(collection(db, collectionName), dataToAdd);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

const setCallbackOnQuerySnapshot = async ({query, callback}) => {
  const unsubscribe = onSnapshot(query, querySnapshot => {
    const documents = [];
    querySnapshot.forEach(doc => {
        documents.push({...doc.data(), id: doc.id});
    });

    callback({documents});
  });
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

export { createSession, onSessionsChange };
