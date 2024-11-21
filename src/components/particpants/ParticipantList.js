import Role from "./Role";
import auth from "../../data/auth";
import { Fragment } from "react";

const getGroup = ({groupId, groups}) => groups.find(group => group.id === groupId);

const getSortedParticipants = ({participants, participantId}) => {
  return participants.sort((a, b) => {
    if(a.id === auth.getUser().id) {
      return -1;
    }

    return a.name.localeCompare(b.name);
  });
};

const ParticipantList = ({participants, groups}) => {
  return (
    <>
      <div className="flex center padding-top-bottom-md text size-xl">Participants ({participants.length})</div>
      <div className="flex column gap-xs">
        {getSortedParticipants({participants}).map(participant => {
          return (
            <Fragment key={participant.id}>
              <div className="flex column gap-xs">
                <div className="text size-xl color-main">{participant.name}</div>
                <div className="flex column gap-xs">
                  <div className="flex gap-xs text size-md">
                    <img width="16px" height="16px" src={"	https://cdn-icons-png.flaticon.com/16/2488/2488751.png"} />
                    <Role participant={participant} /> working in {participant.industry}
                  </div>
                  <div className="flex gap-xs text size-md">
                    <img width="16px" height="16px" src={"https://cdn-icons-png.flaticon.com/16/5510/5510563.png"} />
                    Group: {getGroup({groupId: participant.groupId, groups}) ? getGroup({groupId: participant.groupId, groups}).name : 'No group assigned.'}
                  </div>
                </div>
              </div>

              <div className="padding-top-bottom-xs">
                <div className="horizontal-line" />
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
}

export default ParticipantList;