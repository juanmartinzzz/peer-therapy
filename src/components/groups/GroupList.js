import auth from "../../data/auth";
import { Fragment, useState } from "react";
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
      <div className="padding-top-bottom-sm">
        {groups.map(group => (
          <Fragment key={group.id}>
            {console.log({group})}
            <div className="flex center-vertical gap-xs">
              <span className="text bold size-xl">{group.name}</span>
              <span className="text size-sm">Participants: {group.participantIds ? group.participantIds.length : 0}</span>
              {auth.isAdmin() && <div className="text size-sm color-main bold pointer" onClick={() => {window.location.href = `/group/${group.sessionId}/${group.id}`;}}>Go to this group</div>}
              {(group.participantIds && group.participantIds.includes(auth.getUser().id)) && <div className="text size-sm color-main bold pointer" onClick={() => {window.location.href = `/group/${group.sessionId}/${group.id}`;}}>Go to your group</div>}
            </div>

            {auth.isAdmin() && (
              <div className="flex gap-xs">
                <div className="action-element text size-sm padding-left-right-sm" onClick={() => setGroupToEdit(group)}>Edit</div>
                <div className="action-element text size-sm padding-left-right-sm" onClick={() => setGroupToDelete(group)}>Delete</div>
                {groupToDelete?.id === group.id && <div className="action-element text size-sm padding-left-right-sm" onClick={() => deleteGroup({group, setGroupToDelete})}>Confirm delete</div>}
              </div>
            )}

            <div className="padding-top-bottom-xs"><div className="horizontal-line"></div></div>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default GroupList;