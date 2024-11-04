import { useEffect, useState } from "react";
import { onParticipantsChange } from "../../data/dataLayer";

const ParticipantList = ({session}) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    onParticipantsChange({sessionId: session.id, callback: ({documents}) => setParticipants(documents)});
  }, []);

  return (
    <>
      <div className="flex center text size-lg">{participants.length} participant{participants.length !== 1 && 's'}</div>
      <div className="flex column gap-xs">
        {participants.sort((a, b) => a.name.localeCompare(b.name)).map(participant => {
          return (
            <div className="flex gap-xs center-vertical" key={participant.id}>
              <div className="text size-xl">{participant.name}</div>
              <div className="text size-md">({participant.industry} {participant.companyName && `- ${participant.companyName}`})</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ParticipantList;