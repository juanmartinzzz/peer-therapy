import { cities, groupEmojis, requestStatuses } from "./enums";

const requestTemplate = {
  id: '',
  groupId: '',
  sessionId: '',
  participantId: '',
  emotionalState: '',
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
  hostCompanyName: 'Acme Inc.',
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
