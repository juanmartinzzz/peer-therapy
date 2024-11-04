import { useEffect, useState } from "react";
import { onGroupsChange } from "../../data/dataLayer";

const GroupList = ({session}) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    onGroupsChange({sessionId: session.id, callback: ({documents}) => setGroups(documents)});
  }, []);

  return (
    <>
      <div className="flex center text size-xl">{groups.length} group{groups.length !== 1 && 's'}</div>
        {groups.map(group => (
          <div className="flex gap-xs center padding-top-bottom-sm" key={group.id}>
            <div className="padding-xs text size-xl center" style={{width: "48px", height: "48px", backgroundColor: "rgba(174,174,215, 0.3)",  borderRadius: "50%"}}>{group.emoji}</div>
            <div className="text size-xl">{group.name}</div>
          </div>
        ))}
    </>
  );
}

export default GroupList;