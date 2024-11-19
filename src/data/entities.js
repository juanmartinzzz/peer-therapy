import { cities, groupEmojis, requestStatuses } from "./enums";

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

const groupTemplate = {
  id: '',
  name: '',
  sessionId: '',
  emoji: groupEmojis[Object.keys(groupEmojis)[Math.floor(Math.random() * Object.keys(groupEmojis).length)]],
};

const locationTemplate = {
  nickname: '',
  city: cities.montreal,
  hostCompanyName: '',
};

const sessionTemplate = {
  nickname: '',
  date: new Date(),
  isCompleted: false,
  location: locationTemplate,
};

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

export {
  userTemplate,
  groupTemplate,
  sessionTemplate,
  requestTemplate,
  locationTemplate,
};
