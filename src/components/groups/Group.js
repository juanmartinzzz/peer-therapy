import auth from "../../data/auth";
import AppBar from "../appbar/AppBar";
import RequestItem from "../requests/RequestItem";
import RequestForm2 from "../requests/RequestForm2";
import Suggestions from "../suggestions/Suggestions";
import { useParams } from "react-router-dom";
import { dataLayer } from "../../data/dataLayer";
import { Fragment, useEffect, useState } from "react";

const Group = () => {
  const [group, setGroup] = useState({});
  const { sessionId, groupId } = useParams();
  const [requests, setRequests] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    dataLayer.group.onGroupsChange({sessionId, callback: ({documents}) => setGroup(documents.find(group => group.id === groupId))});
    dataLayer.request.onRequestsChange({sessionId, groupId, callback: ({documents}) => setRequests(documents)});
    dataLayer.participant.onParticipantsChange({sessionId, callback: ({documents}) => setParticipants(documents)});
  }, []);

  return (
    <>
      <AppBar backAction={() => {window.location.href = `/session/${sessionId}`;}} />

      <div className="flex column center padding-sm">
        <div className="text size-lg">Welcome to</div>
        <div className="flex center gap-xs">
          <div className="text color-main bold size-xxl">{group.name}</div>
        </div>
      </div>

      <div className="padding-left-right-sm flex column gap-xs">
        {requests.map(request => (
          <Fragment key={request.id}>
            <RequestItem request={request} participants={participants} />

            <Suggestions request={request} />
          </Fragment>
        ))}
      </div>

      {/* Only show form to share problem with the Group if User is NOT Group's Scribe */}
      {auth.getUser().id !== group.scribeId && <RequestForm2 sessionId={sessionId} groupId={groupId} />}
    </>
  );
}

export default Group;