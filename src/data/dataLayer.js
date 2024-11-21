import { db } from "../integrations/firebase";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, setDoc } from "firebase/firestore";

// helpers

const setCallbackOnQuerySnapshot = async ({query, callback}) => {
  onSnapshot(query, querySnapshot => {
    const documents = [];
    querySnapshot.forEach(doc => {
        documents.push({...doc.data(), id: doc.id});
    });

    callback({documents});
  });
}

const addOrUpdateDocument = async ({collectionName, data, id}) => {
  const dataToAdd = {
    createdAt: new Date(),
    ...data,
    updatedAt: new Date(),
  }

  try {
    if(id) {
      const docRef = await setDoc(doc(collection(db, collectionName), id), dataToAdd);

      return docRef;
    } else {
      const docRef = await addDoc(collection(db, collectionName), dataToAdd);

      return docRef;
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

const updateDocumentWithDefaultFields = async ({docRef, data, merge = true}) => {
  const dataToAdd = {
    ...data,
    updatedAt: new Date(),
  }

  setDoc(docRef, dataToAdd, {merge});
}

const addDocumentWithDefaultFields = async ({collectionName, data, id}) => {

  const dataToAdd = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  try {
    console.log({collectionName, dataToAdd, id});
    if(id) {
      const docRef = await setDoc(doc(collection(db, collectionName), id), dataToAdd);

      return docRef;
    } else {
      const docRef = await addDoc(collection(db, collectionName), dataToAdd);

      return docRef;
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// data methods

const request = {
  updateRequest: async ({request}) => {
    console.log({requestToBeUpdated: request});
    if(request.id) {
      updateDocumentWithDefaultFields({docRef: doc(collection(db, `sessions/${request.sessionId}/groups/${request.groupId}/requests`), request.id), data: request});

      return request.id;
    }

    const docRef = await addDocumentWithDefaultFields({collectionName: `sessions/${request.sessionId}/groups/${request.groupId}/requests`, data: request});

    return docRef.id;
  },
  onRequestsChange: async ({sessionId, groupId, callback}) => {
    const q = query(collection(db, `sessions/${sessionId}/groups/${groupId}/requests`));

    setCallbackOnQuerySnapshot({query: q, callback});
  },
  addOrUpdate: async ({request}) => {
    addOrUpdateDocument({collectionName: `sessions/${request.sessionId}/groups/${request.groupId}/requests`, data: request, id: request.id});
  }
}

const group = {
  updateGroup: async ({group}) => {
    if(group.id) {
      updateDocumentWithDefaultFields({docRef: doc(collection(db, `sessions/${group.sessionId}/groups`), group.id), data: group});

      return group.id;
    }

    const docRef = await addDocumentWithDefaultFields({collectionName: `sessions/${group.sessionId}/groups`, data: group});

    return docRef.id;
  },
  onGroupsChange: async ({sessionId, callback}) => {
    const q = query(collection(db, `sessions/${sessionId}/groups`));

    setCallbackOnQuerySnapshot({query: q, callback});
  },
  updateGroupParticipants: async ({group, participants}) => {
    const docRef = doc(collection(db, `sessions/${group.sessionId}/groups`), group.id);
    await setDoc(docRef, {...group, participantIds: participants.map(participant => participant.id)});
  },
  deleteGroup: async ({group}) => {
    await deleteDoc(doc(collection(db, `sessions/${group.sessionId}/groups`), group.id));
  }
}

const participant = {
  onParticipantsChange: async ({sessionId, callback}) => {
    const q = query(collection(db, `sessions/${sessionId}/participants`));

    setCallbackOnQuerySnapshot({query: q, callback});
  },
  updateParticipantGroup: async ({participant, group}) => {
    const docRef = doc(collection(db, `sessions/${group.sessionId}/participants`), participant.id);
    await setDoc(docRef, {...participant, groupId: group.id});
  },
}

const user = {
  updateUser: async ({user}) => {
    user.sessions.map(sessionId => {
      const docRef = doc(collection(db, `sessions/${sessionId}/participants`), user.id);

      updateDocumentWithDefaultFields({docRef, data: user});
    });
  },
  addUserToSession: async ({sessionId, user}) => {
    await addDocumentWithDefaultFields({collectionName: `sessions/${sessionId}/participants`, data: user, id: user.id});
  }
}

const session = {
  updateSession: async ({session}) => {
    if(session.id) {
      updateDocumentWithDefaultFields({docRef: doc(collection(db, `sessions`), session.id), data: session});

      return session.id;
    }

    const docRef = await addDocumentWithDefaultFields({collectionName: `sessions`, data: session});

    return docRef.id;
  },
  onSessionsChange: async ({callback}) => {
    const q = query(collection(db, "sessions"));

    setCallbackOnQuerySnapshot({query: q, callback: ({documents}) => {
      callback({documents: documents.map(document => ({...document, date: new Date(document.date.seconds * 1000)}))})
    }});
  }
}

const dataLayer = {
  user,
  group,
  request,
  session,
  participant,
}

export {
  dataLayer,
};
