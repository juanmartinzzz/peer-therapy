import { Fragment } from "react";
import { nonDisclosedRoleReplacements } from "../../data/enums";

const getRole = ({participant}) => {
  if(participant.role) {
    return participant.role;
  }

  const randomIndex = Object.keys(nonDisclosedRoleReplacements)[Math.floor(Math.random() * Object.keys(nonDisclosedRoleReplacements).length)];
  return nonDisclosedRoleReplacements[randomIndex];
};

const getGroup = ({groupId, groups}) => groups.find(group => group.id === groupId);

const ParticipantList = ({participants, groups}) => {
  return (
    <>
      <div className="flex center padding-top-bottom-md text size-xl">Participants ({participants.length})</div>
      <div className="flex column gap-xs">
        {participants.sort((a, b) => a.name.localeCompare(b.name)).map(participant => {
          return (
            <Fragment key={participant.id}>
              <div className="flex column gap-xs">
                <div className="text size-xl color-main">{participant.name}</div>
                <div className="flex column gap-xs">
                  <div className="flex gap-xs text size-md">
                    <img width="16px" height="16px" src={"	https://cdn-icons-png.flaticon.com/16/2488/2488751.png"} />
                    {getRole({participant})} working in {participant.industry}
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