import type { Lounge } from '../types/catalog';

export const lounges: Lounge[] = [
  {
    id: 'studio-city',
    name: "Blowouts N' More",
    city: 'Dubai',
    address:
      'G01 Qanawat Office Building, Plot no. 6757728, Al Hebiah 2nd, Dubai Studio City, Dubai',
    email: '',
    phone: '+971 58 297 1740',
    hours:
      'Mon–Wed 10AM–7PM · Thu–Fri 10AM–8PM · Sat 9AM–8PM · Sun 10AM–8PM',
  },
];

export const salonHours = [
  { day: 'Monday', hours: '10AM – 7PM' },
  { day: 'Tuesday', hours: '10AM – 7PM' },
  { day: 'Wednesday', hours: '10AM – 7PM' },
  { day: 'Thursday', hours: '10AM – 8PM' },
  { day: 'Friday', hours: '10AM – 8PM' },
  { day: 'Saturday', hours: '9AM – 8PM' },
  { day: 'Sunday', hours: '10AM – 8PM' },
] as const;

export const salon = lounges[0];
