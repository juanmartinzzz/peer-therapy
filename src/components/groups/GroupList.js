import GroupItem from "./GroupItem";
import { useState } from "react";
import { dataLayer } from "../../data/dataLayer";

const deleteGroup = ({group, setGroupToDelete}) => {
  setGroupToDelete(null);
  dataLayer.group.deleteGroup({group});
}

const GroupList = ({groups, setGroupToEdit, participants}) => {
  const [groupToDelete, setGroupToDelete] = useState(null);

  return (
    <>
      <div className="flex center text size-xl">Groups ({groups.length})</div>

      <div className="padding-top-bottom-sm flex gap-md" style={{overflow: 'scroll'}}>
        {groups.map(group => (
          <GroupItem group={group} participants={participants} setGroupToEdit={setGroupToEdit} groupToDelete={groupToDelete} setGroupToDelete={setGroupToDelete} deleteGroup={deleteGroup} key={group.id} />
        ))}
      </div>
    </>
  );
}

export default GroupList;