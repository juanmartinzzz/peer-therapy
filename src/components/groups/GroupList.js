const GroupList = ({groups}) => {
  return (
    <>
      <div className="flex center text size-xl">Groups ({groups.length})</div>
      <div className="flex wrap space-between gap-sm">
        {/* {groups.map(group => (
          <div className="flex gap-xs center padding-top-bottom-sm" key={group.id}>
            <div className="padding-xs text size-xl center" style={{width: "48px", height: "48px", backgroundColor: "#eaeaea",  borderRadius: "50%"}}>{group.emoji}</div>
            <div className="text size-xs">{group.name}</div>
            <div className="text size-xs">({group.participantIds ? group.participantIds.length : 0})</div>
            <div className="text size-xxs action-element padding-xs" onClick={() => setGroup(group)}>EDIT</div>
          </div>
        ))} */}
      </div>
    </>
  );
}

export default GroupList;