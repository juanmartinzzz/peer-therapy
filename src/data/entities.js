import { cities } from "./enums";

const locationTemplate = {
  nickname: '',
  hostCompanyName: 'Acme Inc.',
  city: cities.montreal,
};

const sessionTemplate = {
  nickname: '',
  date: new Date(),
  location: locationTemplate,
  isCompleted: false,
};

export { locationTemplate, sessionTemplate };