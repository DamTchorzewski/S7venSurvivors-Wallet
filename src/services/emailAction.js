import { applyActionCode } from 'firebase/auth';
import Notiflix from 'notiflix';
import { getFirebaseAuth } from './firebase';

// Where the confirmation link of an e-mail takes the user back to: this site.
export const siteUrl = () =>
  `${window.location.origin}${import.meta.env.BASE_URL}`;

// The settings of the Firebase e-mails (the link in them continues to this site).
export const actionCodeSettings = () => ({ url: siteUrl() });

/*
 * The confirmation link of Firebase can open this site (Authentication, Templates, "Customize action URL" set to the
 * address of the site): the address then has ?mode=verifyEmail&oobCode=... . This applies the code, refreshes the
 * Firebase session of this browser (if there is one) and tells the user. It runs before the session is restored, so
 * a user who has just confirmed the address is signed in at once.
 */
export const handleEmailAction = async () => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  const code = params.get('oobCode');
  const auth = getFirebaseAuth();

  if (mode !== 'verifyEmail' || !code || !auth) return;

  // the link is single use: take it out of the address first, so a reload does not apply it again
  window.history.replaceState(null, '', window.location.pathname);

  try {
    await applyActionCode(auth, code);

    if (auth.currentUser) {
      await auth.currentUser.reload();
      // the ID token of this session still says "not confirmed": renew it
      await auth.currentUser.getIdToken(true);
    }

    Notiflix.Notify.success('E-mail confirmed. You can use the app now', {
      timeout: 5000,
    });
  } catch (err) {
    console.error(err.message);
    Notiflix.Notify.failure(
      'This confirmation link is invalid or has expired. Log in to get a new one',
      { timeout: 6000 }
    );
  }
};
