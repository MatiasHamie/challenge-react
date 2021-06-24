import { db } from "../firebase/firebase-config";
import { RegisteredUsers } from "../interfaces/User";

// carga los usuarios de firebase
export const getUsersFromFirebase = async () => {
  try {
    const usersSnap = await db.collection("users").get();
    const users: RegisteredUsers[] = [];

    usersSnap.forEach((snapHijo) => {
      users.push({
        ...(snapHijo.data() as RegisteredUsers),
      });
    });
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getFromFirebaseIfIsActiveUserIsAdmin = async (
  loggedInUserEmail: string
) => {
  try {
    const userSnap = await db
      .collection("users")
      .where("email", "==", loggedInUserEmail)
      .get();

    let userType: string = "";
    await userSnap.forEach(
      (user) => (userType = (user.data() as RegisteredUsers).userType)
    );

    return userType;
  } catch (error) {
    console.log(error);
  }
};
