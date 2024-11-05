import GroupForm from "./GroupForm";
import GroupList from "./GroupList";
import { useState } from "react";
import { groupTemplate } from "../../data/entities";

const SessionGroups = ({session}) => {
  const [group, setGroup] = useState({...groupTemplate, sessionId: session.id});

  return (
    <>
      <GroupList session={session} setGroup={setGroup} />

      <GroupForm group={group} setGroup={setGroup} />
    </>
  );
}

export default SessionGroups;