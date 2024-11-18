import TextInput from "../form/TextInput";
import ModalForm from "../form/ModalForm";
import { useState } from "react";
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

const GroupForm2 = ({sessionId}) => {
  const [group, setGroup] = useState({...groupTemplate, sessionId});

  // const EmojiInput = ({emojis, object, setObject}) => {
  //   return (
  //     <div className="emojiInput">
  //       <div className="flex wrap gap-xs emojiPicker">
  //         {Object.keys(emojis).map((emoji, index) => (
  //           <div className="padding-xs emojiOption" onClick={() => setObject({...object, emoji: emojis[emoji]})} key={index}>{emojis[emoji]}</div>
  //         ))}
  //       </div>

  //       <div className="padding-xs">{group.emoji}</div>
  //     </div>
  //   )
  // }

  return (
    <ModalForm openButtonText="New Group" saveButtonText="Save Group" onSave={() => saveGroup({group})}>
      <div className="flex column gap-sm padding-sm">
        <div>
          <div className="text size-xl">Make your group stand out!</div>
          <div className="text size-lg">Give it a distinctive or funny name</div>
        </div>

        <TextInput label="Name" placeholder="Name" value={group.name} onChange={({target}) => setGroup({...group, name: target.value})} />
        {/* <EmojiInput emojis={groupEmojis} object={group} setObject={setGroup} /> */}
      </div>
    </ModalForm>
  );
}

export default GroupForm2;