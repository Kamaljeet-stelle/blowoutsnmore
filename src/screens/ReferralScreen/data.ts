export const referralOffer = {
  friendAed: 50,
  creditAed: 50,
};

export const referralSteps = [
  "Share Blowouts N' More with a friend who has not visited yet.",
  `They book their first service and mention your name for AED ${referralOffer.friendAed} off when the salon confirms.`,
  `After their visit, ask the salon about AED ${referralOffer.creditAed} credit on your next booking.`,
];

export function shareMessage(code: string) {
  return `Try Blowouts N' More in Dubai Studio City. Mention my code ${code} for AED ${referralOffer.friendAed} off your first service (subject to salon confirmation).`;
}
