import Role from "../particpants/Role";
import { thingsToAskForOptions } from "../../data/enums";

const getParticipant = ({participants, id}) => participants.find(participant => participant.id === id) || {};

const ParticipantInfo = ({participant}) => {
  return (
    <div>
      <div className="text size-xl color-main bold">{participant.name}</div>
      <div>A <Role participant={participant} /> working in {participant.industry} shared this situation:</div>
    </div>
  );
}

const RequestItem = ({request, participants}) => {
  return (
    <div className="flex column gap-xs background-grayscale-0 padding-sm border-main rounded-xs" key={request.id}>
      <ParticipantInfo participant={getParticipant({participants, id: request.participantId})} />
      <div className="text size-md">{request.context}</div>
      <div className="flex center-vertical gap-xs">Feeling <span className="text size-xxxl">{request.emotionalStateEmoji}</span></div>
      <div className="">Want to</div>
      <div className="padding-left-right-sm">
        {[...request.thingsAskedForKeys.map(key => thingsToAskForOptions[key]), request.otherThingToAskFor].join(', ').split(', ').map(thing => (
          <div className="text size-md color-main" key={thing}>{thing}</div>
        ))}
      </div>
    </div>

  );
}

export default RequestItem;