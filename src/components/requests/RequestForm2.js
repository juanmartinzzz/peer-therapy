import auth from "../../data/auth";
import TextInput from "../form/TextInput";
import ModalForm from "../form/ModalForm";
import EmojiPicker from "../form/EmojiPicker";
import TextareaInput from "../form/TextareaInput";
import CheckboxInput from "../form/CheckboxInput";
import { useState } from "react";
import { dataLayer } from "../../data/dataLayer";
import { requestTemplate } from "../../data/entities";
import { requestEmojis, requestStatuses, thingsToAskForOptions } from "../../data/enums";

const saveRequest = ({ sessionId, groupId, request }) => {
  const requestToSave = {
    ...request,
    groupId,
    sessionId,
    id: auth.getUser().id,
    participantId: auth.getUser().id,
    status: requestStatuses.submitted,
  };

  dataLayer.request.updateRequest({request: requestToSave});
};

const toggleThingToAskForKey = ({request, thingToAskForKey, setRequest}) => {
  if(request.thingsAskedForKeys.includes(thingToAskForKey)) {
    setRequest({...request, thingsAskedForKeys: request.thingsAskedForKeys.filter(key => key !== thingToAskForKey)});
    return;
  }

  setRequest({...request, thingsAskedForKeys: [...request.thingsAskedForKeys, thingToAskForKey]});
};

const RequestForm2 = ({sessionId, groupId}) => {
  const [request, setRequest] = useState(requestTemplate);

  const ThingToAskForOption = ({thingToAskForKey}) => {
    return (
      <div className="flex gap-xs" onClick={() => toggleThingToAskForKey({request, thingToAskForKey, setRequest})}>
        <CheckboxInput checked={request.thingsAskedForKeys.includes(thingToAskForKey)} />
        <div className="pointer">{thingsToAskForOptions[thingToAskForKey]}</div>
      </div>
    )
  };

  return (
    <ModalForm openButtonText="Share with the group" saveButtonText="Save your request to the group" onSave={() => saveRequest({sessionId, groupId, request})}>
      <div className="flex column gap-md padding-left-right-sm">
        <div>
          <div>Today I feel: <span className="text size-xxl">{request.emotionalStateEmoji}</span></div>
          <EmojiPicker
            emojis={requestEmojis}
            currentEmoji={request.emotionalStateEmoji}
            numberOfEmojisToShowInitially={request.emotionalStateEmoji ? 0 : 9}
            onClick={({emoji}) => setRequest({...request, emotionalStateEmoji: emoji})}
          />
        </div>

        <div>
          <div>And I want to <span className="text size-sm">(chose as many as you want)</span></div>
          {Object.keys(thingsToAskForOptions).map(key => <ThingToAskForOption key={key} thingToAskForKey={key} />)}
          <TextInput placeholder="Something else" value={request.otherThingToAskFor} onChange={({target}) => setRequest({...request, otherThingToAskFor: target.value})} />
        </div>

        <div>
          <div>Here's more context about my situation</div>
          <TextareaInput placeholder="Context" rows={5} value={request.context} onChange={({target}) => setRequest({...request, context: target.value})} />
        </div>

        <div></div>
      </div>
    </ModalForm>
  );
}

export default RequestForm2;