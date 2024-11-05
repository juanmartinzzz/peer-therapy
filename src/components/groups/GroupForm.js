import Button from "../form/Button";
import TextInput from "../form/TextInput";
import { emojis } from "../../data/enums";
import { updateGroup } from "../../data/dataLayer";

const saveGroup = async ({group, setGroup}) => {
  // Dont create group with empty name
  if (group.name === "") {
    return;
  }

  const newGroupId = await updateGroup({group});
  setGroup({...group, id: newGroupId});
}

const GroupForm = ({group, setGroup}) => {
  const buttonText = group.id ? `Update "${group.name}" group` : "Add new group to this session";

  return (
    <div>
      <div className="flex gap-sm padding-top-bottom-sm">
        <TextInput label="Name" placeholder="Name" value={group.name} onChange={({target}) => setGroup({...group, name: target.value})} />
        <div className="emojiInput">
          <div className="flex wrap gap-xs emojiPicker">
            {Object.keys(emojis).map((emoji, index) => (
              <div className="card padding-xs text size-md emojiOption" onClick={() => setGroup({...group, emoji: emojis[emoji]})} key={index}>{emojis[emoji]}</div>
            ))}
          </div>

          <div className="card padding-xs text size-lg">{group.emoji}</div>
        </div>
      </div>


      <Button onClick={() => saveGroup({group, setGroup})}>
        <div className="text size-md">{buttonText}</div>
      </Button>
    </div>
  );
}

export default GroupForm;