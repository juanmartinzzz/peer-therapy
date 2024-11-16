import auth from "../../data/auth";
import Button from "../form/Button";
import TextInput from "../form/TextInput";
import { useEffect, useState } from "react";
import { dataLayer } from "../../data/dataLayer";
import { requestTemplate } from "../../data/entities";
import { groupEmojis, requestEmojis } from "../../data/enums";
import TextareaInput from "../form/TextareaInput";

const saveRequest = async ({request}) => {
  await dataLayer.request.addOrUpdate({request});
}

const RequestForm = ({participantRequest}) => {
  const [request, setRequest] = useState(participantRequest || {emotionalState: ''});

  useEffect(() => {
    if(participantRequest) {
      setRequest(participantRequest);
    }
  }, [participantRequest]);

  return (
    <>
      <div className="flex column gap-sm wrap">
        <div className="emojiInput">
          <div className="flex wrap gap-xs emojiPicker">
            {Object.keys(requestEmojis).map((emoji, index) => (
              <div className="card padding-xs text size-md emojiOption" onClick={() => setRequest({...request, emotionalStateEmoji: requestEmojis[emoji]})} key={index}>{requestEmojis[emoji]}</div>
            ))}
          </div>

          <div className="card padding-xs text size-lg">{request.emotionalStateEmoji}</div>
        </div>

        <TextInput label="Emotional state" placeholder="Emotional state" value={request.emotionalState} onChange={({target}) => setRequest({...request, emotionalState: target.value})} />

        <TextInput label="Request to group" placeholder="Request to group" value={request.requestToGroup} onChange={({target}) => setRequest({...request, requestToGroup: target.value})} />

        <TextareaInput label="Context" placeholder="Context" rows={5} value={request.context} onChange={({target}) => setRequest({...request, context: target.value})} />
      </div>

      <Button onClick={() => saveRequest({request})}>Save request</Button>
    </>
  );
}

export default RequestForm;