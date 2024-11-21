import auth from "../../data/auth";
import GroupList from "../groups/GroupList";
import ParticipantList from "../particpants/ParticipantList";
import { useEffect, useState } from "react";
import { dataLayer } from "../../data/dataLayer";

const randomlyAssignParticipantsToGroups = ({participants, groups}) => {
  console.log({participants, groups});
  const shuffledParticipants = participants.sort(() => 0.5 - Math.random());

  // Divide participants into as many arrays as there are groups
  const assignedParticipants = [];
  for (let i = 0; i < groups.length; i++) {
    assignedParticipants.push(shuffledParticipants.slice(i * (shuffledParticipants.length / groups.length), (i + 1) * (shuffledParticipants.length / groups.length)));
  }

  // Assign each group an array of participants
  groups.forEach((group, index) => {
    dataLayer.group.updateGroupParticipants({group, participants: assignedParticipants[index]});
    assignedParticipants[index].forEach(participant => {
      dataLayer.participant.updateParticipantGroup({participant, group});
    });
  });
}

const SessionGroupsAndParticipants = ({session, setGroupToEdit}) => {
  const [groups, setGroups] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    dataLayer.group.onGroupsChange({sessionId: session.id, callback: ({documents}) => setGroups(documents)});
    dataLayer.participant.onParticipantsChange({sessionId: session.id, callback: ({documents}) => setParticipants(documents)});
  }, []);

  return (
    <>
      <GroupList session={session} groups={groups} setGroupToEdit={setGroupToEdit} />

      {auth.isAdmin() && (
        <div className="flex center">
          <div className="text size-md action-element padding-left-right-sm" onClick={() => randomlyAssignParticipantsToGroups({participants, groups})}>Randomly assign participants to groups</div>
        </div>
      )}

      <ParticipantList participants={participants} groups={groups} />
    </>
  );
}

export default SessionGroupsAndParticipants;