import { db } from "../firebase/firebase-config";
import { Meetup } from "../interfaces/Meetup";

// carga los usuarios de firebase
export const getMeetupsFromFirebase = async () => {
  try {
    const meetupsSnap = await db.collection("meetups").get();
    const meetups: Meetup[] = [];

    meetupsSnap.docs.forEach((snapHijo) => {
      meetups.push({
        id: snapHijo.id,
        ...(snapHijo.data() as Meetup),
      });
    });
    return meetups;
  } catch (error) {
    console.log(error);
  }
};
