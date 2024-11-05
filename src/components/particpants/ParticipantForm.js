import auth from "../../data/auth";
import Button from "../form/Button";
import TextInput from "../form/TextInput";
import { useState } from "react";
import { updateUser } from "../../data/dataLayer";

const saveUser = async ({user}) => {
  // Since sessions are not set in this form, we do not want them to override existing sessions
  delete user.sessions;
  // TODO: change this logic to: remove any properties not set in this form

  auth.updateUser({user});
  const updatedUser = auth.getUser();
  await updateUser({user: updatedUser});
}

const ParticipantForm = ({}) => {
  const [user, setUser] = useState(auth.getUser());

  return (
    <div className="flex column gap-sm padding-left-right-sm">
      <div className="text size-xxl">Your info</div>
      <div className="flex wrap gap-md">
        <TextInput label="Name" placeholder="Name" value={user.name} onChange={({target}) => setUser({...user, name: target.value})} />
        <TextInput label="Email (will not be shown to others)" placeholder="Email" value={user.email} onChange={({target}) => setUser({...user, email: target.value})} />
        <TextInput label="Industry" placeholder="Industry" value={user.industry} onChange={({target}) => setUser({...user, industry: target.value})} />
        <TextInput label="Company Name" placeholder="Company Name" value={user.companyName} onChange={({target}) => setUser({...user, companyName: target.value})} />
      </div>

      <div>
        <Button onClick={() => saveUser({user})}>
          <div className="text size-xxl">Save info</div>
        </Button>
      </div>
    </div>
  );
}

export default ParticipantForm;
