import { useEffect, useState } from "react";
import { onGroupsChange } from "../../data/dataLayer";

const GroupList = ({session, setGroup}) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    onGroupsChange({sessionId: session.id, callback: ({documents}) => setGroups(documents)});
  }, []);

  return (
    <>
      <div className="flex center text size-xl">{groups.length} group{groups.length !== 1 && 's'}</div>
      <div className="flex wrap space-between gap-sm">
        {groups.map(group => (
          <div className="flex gap-xs center padding-top-bottom-sm" key={group.id}>
            <div className="padding-xs text size-xl center" style={{width: "48px", height: "48px", backgroundColor: "#eaeaea",  borderRadius: "50%"}}>{group.emoji}</div>
            <div className="text size-xl">{group.name}</div>
            <div className="text size-xs action-element padding-xs" onClick={() => setGroup(group)}>EDIT</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default GroupList;