import auth from "../../data/auth";
import SessionGroups from "../groups/SessionGroups";
import ParticipantList from "../particpants/ParticipantList";
import { useEffect, useState } from "react";
import { onGroupsChange, onParticipantsChange, updateGroupParticipants, updateParticipantGroup, updateParticipantsForGroup } from "../../data/dataLayer";

const randomlyAssignParticipantsToGroups = ({participants, groups}) => {
  const shuffledParticipants = participants.sort(() => 0.5 - Math.random());
  // Divide participants into as many arrays as there are groups
  const assignedParticipants = [];
  for (let i = 0; i < groups.length; i++) {
    assignedParticipants.push(shuffledParticipants.slice(i * (shuffledParticipants.length / groups.length), (i + 1) * (shuffledParticipants.length / groups.length)));
  }

  console.log({assignedParticipants});

  groups.forEach((group, index) => {
    updateGroupParticipants({group, participants: assignedParticipants[index]});
    assignedParticipants[index].forEach(participant => {
      updateParticipantGroup({participant, group});
    });
  });

  // return assignedParticipants;
}

const SessionGroupsAndParticipants = ({session}) => {
  const [groups, setGroups] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    onGroupsChange({sessionId: session.id, callback: ({documents}) => setGroups(documents)});
    onParticipantsChange({sessionId: session.id, callback: ({documents}) => setParticipants(documents)});
  }, []);

  return (
    <>
      {auth.isAdmin() && <SessionGroups session={session} groups={groups} />}

      <ParticipantList participants={participants} />

      {auth.isAdmin() && (
        <div>
          <div className="flex center">
            <div className="text size-md action-element padding-sm" onClick={() => randomlyAssignParticipantsToGroups({participants, groups})}>Randomly assign participants to groups</div>
          </div>
        </div>
      )}
    </>
  );
}

export default SessionGroupsAndParticipants;