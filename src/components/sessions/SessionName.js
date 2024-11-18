const SessionName = ({session}) => {
  return <div>{`${session.date.getFullYear()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][session.date.getUTCMonth()]} ${session.date.getUTCDate()} @ ${session.location.hostCompanyName} - ${session.location.city}`}</div>;
};

export default SessionName;
