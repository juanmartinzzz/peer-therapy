import auth from "../../data/auth";
import ModalForm from "../form/ModalForm";
import TextInput2 from "../form/TextInput2";
import { useState } from "react";
import { dataLayer } from "../../data/dataLayer";

const joinSession = ({sessionId}) => {
  // Add the session ID to the user's sessions list
  auth.addSessionToUser({sessionId});

  // Add the user to the session
  const user = auth.getUser();
  dataLayer.user.addUserToSession({sessionId, user});
};

const saveUser = async ({user, sessionId}) => {
  // Since sessions are not set in this form, we do not want them to override existing sessions
  delete user.sessions;
  // TODO: change this logic to: remove any properties not set in this form

  auth.updateUser({user});
  const updatedUser = auth.getUser();
  await dataLayer.user.updateUser({user: updatedUser});

  joinSession({sessionId});
}

const ParticipantBasicInfoForm = ({sessionId}) => {
  const [user, setUser] = useState(auth.getUser());

  return (
    <ModalForm onSave={() => saveUser({user, sessionId})} openButtonText="Fill your personal info" saveButtonText="Save and join the session">
      <div className="flex column padding-left-right-sm">
        <div className="text size-lg">Please tell us a bit about yourself</div>
        <div className="text size-sm">This will help us create groups and assign participants</div>
      </div>

      <div className="padding-top-bottom-sm padding-left-right-sm">
        <div className="text size-lg">My name is <TextInput2 placeholder="Name" value={user.name} onChange={({target}) => setUser({...user, name: target.value})} /> and I am a <TextInput2 placeholder="Role" value={user.role} onChange={({target}) => setUser({...user, role: target.value})} /> in a <TextInput2 placeholder="Industry" value={user.industry} onChange={({target}) => setUser({...user, industry: target.value})} /> company.</div>
      </div>

      <div className="padding-top-bottom-sm padding-left-right-sm">
        <div className="text size-lg">My email is <TextInput2 placeholder="Email" value={user.email} onChange={({target}) => setUser({...user, email: target.value})} />.</div>
        <div className="text size-md color-main">Don't worry: nobody will see your email! It's just for us.</div>
      </div>
    </ModalForm>
  );
}

export default ParticipantBasicInfoForm;
