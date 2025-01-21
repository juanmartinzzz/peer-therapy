import auth from "../../data/auth";
import Button from "../interaction/Button";
import { useNavigate } from "react-router-dom";
import { dataLayer } from "../../data/dataLayer";

const updateGroupScribe = ({group, scribeId}) => {
  const groupToUpdate = {...group, scribeId};
  dataLayer.group.updateGroup({group: groupToUpdate});
}

const SelectScribeDropdown = ({group, participants}) => {
  if(!auth.isAdmin()) {
    return;
  }

  return (
    <>
      <span className="text size-sm">Scribe: {participants.find(participant => participant.id === group.scribeId)?.name}</span>
      <select className="text size-md" onChange={({target}) => updateGroupScribe({group, scribeId: target.value})}>
        <option value="">Select scribe</option>
        {participants.map(participant => (
          <option value={participant.id} key={participant.id}>{participant.name}</option>
        ))}
      </select>
    </>
  )
}

const GoToGroupButton = ({group, navigate}) => {
  const isAdmin = auth.isAdmin();
  const isParticipantInGroup = group.participantIds && group.participantIds.includes(auth.getUser().id);
  const isScribe = auth.getUser().id === group.scribeId;

  if(!isAdmin && !isParticipantInGroup && !isScribe) {
    return;
  }

  return <Button text="Go" onClick={() => navigate(`/group/${group.sessionId}/${group.id}`)} />
}

const GroupItem = ({group, setGroupToEdit, groupToDelete, setGroupToDelete, deleteGroup, participants}) => {
  const navigate = useNavigate();

  return (
    <div className="padding-sm border-main rounded-sm background-grayscale-0 flex column justify-between gap-xs" style={{minWidth: 136}} key={group.id}>
      <span className="text bold size-lg">{group.name}</span>

      <span className="text size-sm">Participants ({group.participantIds ? group.participantIds.length : 0})</span>
      <span className="text size-sm">{participants.filter(participant => group.participantIds.includes(participant.id)).map(participant => participant.name).join(', ')}</span>

      <SelectScribeDropdown group={group} participants={participants} />

      <GoToGroupButton group={group} navigate={navigate} />

      {auth.isAdmin() && (
        <>
          <Button text="Edit" onClick={() => setGroupToEdit(group)} />
          <Button text="Remove" onClick={() => setGroupToDelete(group)} />
          {groupToDelete?.id === group.id && <Button text="Confirm remove" onClick={() => deleteGroup({group, setGroupToDelete})} />}
        </>
      )}
    </div>
  )
}

export default GroupItem;