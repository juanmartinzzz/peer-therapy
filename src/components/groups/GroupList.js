import auth from "../../data/auth";
import Button from "../interaction/Button";
import { useState } from "react";
import { dataLayer } from "../../data/dataLayer";

const deleteGroup = ({group, setGroupToDelete}) => {
  setGroupToDelete(null);
  dataLayer.group.deleteGroup({group});
}

const GroupList = ({groups, setGroupToEdit}) => {
  const [groupToDelete, setGroupToDelete] = useState(null);

  return (
    <>
      <div className="flex center text size-xl">Groups ({groups.length})</div>

      <div className="padding-top-bottom-sm flex gap-md" style={{overflow: 'scroll'}}>
        {groups.map(group => (
          <div className="padding-sm border-main rounded-sm background-grayscale-0 flex column justify-between gap-xs" style={{minWidth: 136}} key={group.id}>
            <span className="text bold size-lg">{group.name}</span>

            <span className="text size-sm">Participants: {group.participantIds ? group.participantIds.length : 0}</span>

            {auth.isAdmin() && <div className="text size-sm color-main bold pointer" onClick={() => {window.location.href = `/group/${group.sessionId}/${group.id}`;}}>Go to this group</div>}

            {(group.participantIds && group.participantIds.includes(auth.getUser().id)) && <div className="text size-sm color-main bold pointer" onClick={() => {window.location.href = `/group/${group.sessionId}/${group.id}`;}}>Go to your group</div>}

            {auth.isAdmin() && (
              <>
                <Button text="Edit" onClick={() => setGroupToEdit(group)} />
                <Button text="Remove" onClick={() => setGroupToDelete(group)} />
                {groupToDelete?.id === group.id && <Button text="Confirm remove" onClick={() => deleteGroup({group, setGroupToDelete})} />}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default GroupList;