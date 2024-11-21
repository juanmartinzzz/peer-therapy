import AppBar from "../appbar/AppBar";
import Role from "../particpants/Role";
import RequestForm2 from "../requests/RequestForm2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataLayer } from "../../data/dataLayer";
import { thingsToAskForOptions } from "../../data/enums";

const getParticipant = ({participants, id}) => participants.find(participant => participant.id === id) || {};

const Group = () => {
  const { sessionId, groupId } = useParams();
  const [group, setGroup] = useState({});
  const [requests, setRequests] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    dataLayer.group.onGroupsChange({sessionId, callback: ({documents}) => {
      setGroup(documents.find(group => group.id === groupId));
    }});
    dataLayer.request.onRequestsChange({sessionId, groupId, callback: ({documents}) => setRequests(documents)});
    dataLayer.participant.onParticipantsChange({sessionId, callback: ({documents}) => setParticipants(documents)});
  }, []);

  const ParticipantInfo = ({participant}) => {
    return (
      <div>
        <div className="text size-xl color-main bold">{participant.name}</div>
        <div><Role participant={participant} /> working in {participant.industry}</div>
      </div>
    );
  }

  return (
    <>
      <AppBar backAction={() => {window.location.href = `/session/${sessionId}`;}} />

      <div className="flex column center padding-sm">
        <div className="text size-lg">Welcome to</div>
        <div className="flex center gap-xs">
          <div className="text color-main bold size-xxl">{group.name}</div>
        </div>
      </div>

      <div className="padding-sm">
        <div className="flex center text size-xl">People in our group and their requests</div>
        {requests.map(request => (
          <div className="flex column padding-top-bottom-sm gap-xs" key={request.id}>
            <ParticipantInfo participant={getParticipant({participants, id: request.participantId})} />
            <div className="flex center-vertical gap-xs">Feeling <span className="text size-xxxl">{request.emotionalStateEmoji}</span></div>
            <div className="">Want to</div>
            <div className="padding-left-right-sm">
              {[...request.thingsAskedForKeys.map(key => thingsToAskForOptions[key]), request.otherThingToAskFor].join(', ').split(', ').map(thing => (
                <div className="text size-md color-main">{thing}</div>
              ))}
            </div>
            <div className="">For context:</div>
            <div className="text size-md">{request.context}</div>
            <div className="horizontal-line"></div>
          </div>
        ))}
      </div>

      <RequestForm2 sessionId={sessionId} groupId={groupId} />
    </>
  );
}

export default Group;