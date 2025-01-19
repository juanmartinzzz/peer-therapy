import { cities, groupEmojis, requestStatuses } from "./enums";


/* Request */
const requestTemplate = {
  id: '',
  groupId: '',
  context: '',
  sessionId: '',
  participantId: '',
  emotionalState: '',
  thingsAskedForKeys: [],
  otherThingToAskFor: '',
  emotionalStateEmoji: '',
  status: requestStatuses.editing,
};


/* Group */
const groupTemplate = {
  id: '',
  name: '',
  scribeId: '',
  sessionId: '',
  emoji: groupEmojis[Object.keys(groupEmojis)[Math.floor(Math.random() * Object.keys(groupEmojis).length)]],
};


/* Location */
const locationTemplate = {
  nickname: '',
  city: cities.montreal,
  hostCompanyName: '',
};


/* Session */
const sessionTemplate = {
  nickname: '',
  date: new Date(),
  isCompleted: false,
  location: locationTemplate,
};


/* User */
const userTemplate = {
  id: '',
  name: '',
  role: '',
  email: '',
  industry: '',
  sessions: [],
  companyName: '',
  city: cities.montreal,
};

const template = {
  user: userTemplate,
  group: groupTemplate,
  session: sessionTemplate,
  request: requestTemplate,
  location: locationTemplate,
};

export {
  template,
  userTemplate,
  groupTemplate,
  sessionTemplate,
  requestTemplate,
  locationTemplate,
};
