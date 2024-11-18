const SessionName = ({session}) => {
  return <>{`${session.date.getFullYear()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][session.date.getUTCMonth()]} ${session.date.getUTCDate()} @ ${session.location.hostCompanyName} - ${session.location.city}`}</>;
};

export default SessionName;
