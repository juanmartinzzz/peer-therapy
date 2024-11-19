import TextInput from "../form/TextInput";
import ModalForm from "../form/ModalForm";
import { useEffect, useState } from "react";
import { groupEmojis } from "../../data/enums";
import { dataLayer } from "../../data/dataLayer";
import { groupTemplate } from "../../data/entities";

const saveGroup = async ({group}) => {
  // Dont create group with empty name
  if (group.name === "") {
    return;
  }

  console.log({group});
  await dataLayer.group.updateGroup({group});
}

const GroupForm2 = ({sessionId, groupToEdit, setGroupToEdit}) => {
  const [group, setGroup] = useState({...groupTemplate, sessionId});
  const [shouldOpen, setShouldOpen] = useState(false);

  useEffect(() => {
    console.log({groupToEdit});
    setGroup(groupToEdit !== undefined ? groupToEdit : {...groupTemplate, sessionId});
    setShouldOpen(groupToEdit !== undefined);
  }, [groupToEdit]);

  return (
    <ModalForm openButtonText="New Group" saveButtonText="Save Group" onSave={() => {saveGroup({group}); setGroupToEdit();}} shouldOpen={shouldOpen} onClose={() => {setGroupToEdit();}}>
      <div className="flex column gap-sm padding-sm">
        <div>
          <div className="text size-xl">Make your group stand out!</div>
          <div className="text size-lg">Give it a distinctive or funny name</div>
        </div>

        <TextInput label="Name" placeholder="Name" value={group.name} onChange={({target}) => setGroup({...group, name: target.value})} />
      </div>
    </ModalForm>
  );
}

export default GroupForm2;