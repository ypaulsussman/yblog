import { ICONS } from '../constants';

const getIcon = (name) => {
  let icon;

  switch (name) {
    case 'linkedin':
      icon = ICONS.LINKEDIN;
      break;
    case 'github':
      icon = ICONS.GITHUB;
      break;
    case 'email':
      icon = ICONS.EMAIL;
      break;
    default:
      icon = {};
      break;
  }

  return icon;
};

export default getIcon;
