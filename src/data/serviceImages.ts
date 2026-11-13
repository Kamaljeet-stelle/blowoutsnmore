import type { ImageSourcePropType } from 'react-native';
import type { Service, ServiceCategory } from '../types/catalog';

export const serviceImages: Record<ServiceCategory, ImageSourcePropType> = {
  hair: require('../assets/services/hair.jpg'),
  nails: require('../assets/services/nails.jpg'),
  body: require('../assets/services/body.jpg'),
};

export const brandLogo = require('../assets/brand/logo.png');

export const heroImage = require('../assets/services/face.jpg');

const faceImage = require('../assets/services/face.jpg');
const handsImage = require('../assets/services/hands.jpg');

export function imageForService(service: Pick<Service, 'category' | 'group' | 'name'>) {
  const key = `${service.group} ${service.name}`.toLowerCase();

  if (
    key.includes('facial') ||
    key.includes('face') ||
    key.includes('skin') ||
    key.includes('brow') ||
    key.includes('lash') ||
    key.includes('wax')
  ) {
    return faceImage;
  }

  if (key.includes('hand') || key.includes('massage')) {
    return service.category === 'nails' ? handsImage : serviceImages.body;
  }

  return serviceImages[service.category];
}
