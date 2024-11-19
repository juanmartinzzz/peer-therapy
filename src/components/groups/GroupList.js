import { Fragment } from "react";

const GroupList = ({groups, setGroupToEdit}) => {
  return (
    <>
      <div className="flex center text size-xl">Groups ({groups.length})</div>
      <div className="padding-top-bottom-sm">
        {groups.map(group => (
          <Fragment key={group.id}>
            <div className="flex center-vertical gap-xs">
              <span className="text bold size-xl">{group.name}</span>
              <span className="text size-sm">Participants: {group.participantIds ? group.participantIds.length : 0}</span>
            </div>

            <div className="flex gap-xs">
              <div className="action-element text size-sm padding-left-right-sm" onClick={() => setGroupToEdit(group)}>Edit</div>
            </div>

            <div className="padding-top-bottom-xs"><div className="horizontal-line"></div></div>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default GroupList;