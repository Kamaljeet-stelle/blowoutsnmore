import type { ImageSourcePropType } from 'react-native';
import { serviceImages } from '../../data/serviceImages';
import type { ServiceCategory } from '../../types/catalog';

export const categoryCards: {
  id: ServiceCategory;
  title: string;
  detail: string;
  image: ImageSourcePropType;
}[] = [
  {
    id: 'hair',
    title: 'Hair',
    detail: 'Blowouts, cuts, colour & treatments',
    image: serviceImages.hair,
  },
  {
    id: 'nails',
    title: 'Nails',
    detail: 'Manicures, pedicures & gel',
    image: serviceImages.nails,
  },
  {
    id: 'body',
    title: 'Body',
    detail: 'Waxing, threading & massage',
    image: serviceImages.body,
  },
];
