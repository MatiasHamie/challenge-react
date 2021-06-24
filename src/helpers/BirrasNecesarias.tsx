export const BirrasNecesarias = (
  temperatura: number,
  invitations: string[]
) => {
  let birrasPorPersona = 0;
  let birrasPorMeetup = 0;
  let cajones = 0;

  if (temperatura > 24) birrasPorPersona = 2;
  else if (temperatura <= 24 && temperatura >= 20) birrasPorPersona = 1;
  else birrasPorPersona = 0.75;
  birrasPorMeetup = birrasPorPersona * invitations.length;
  cajones = Math.ceil(birrasPorMeetup / 6);

  return [birrasPorMeetup, cajones];
};
