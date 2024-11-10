const getGroup = ({groupId, groups}) => groups.find(group => group.id === groupId);

const ParticipantList = ({participants, groups}) => {
  return (
    <>
      <div className="flex center text size-xl">{participants.length} participant{participants.length !== 1 && 's'}</div>
      <div className="flex column gap-xs">
        {participants.sort((a, b) => a.name.localeCompare(b.name)).map(participant => {
          return (
            <div className="flex gap-xs center-vertical" key={participant.id}>
              <div className="text size-xl">{participant.name}</div>
              <div className="text size-md">({participant.industry} {participant.companyName && `- ${participant.companyName}`})</div>
              <div className="text size-md">({getGroup({groupId: participant.groupId, groups})?.name})</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ParticipantList;