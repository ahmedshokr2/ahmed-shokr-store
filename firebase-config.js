// إعدادات تطبيق Firebase Web (ليست كلمة مرور). احتفظ بصلاحيات Firestore مقيدة.
export const firebaseConfig = {
  apiKey: "AIzaSyAQVWI5H0mPSPeq7zTmT7Vay2VYVU8LHRQ",
  authDomain: "ahmed-shokr-store.firebaseapp.com",
  projectId: "ahmed-shokr-store",
  storageBucket: "ahmed-shokr-store.firebasestorage.app",
  messagingSenderId: "887296601492",
  appId: "1:887296601492:web:128faa9ca1d4e875863381",
  measurementId: "G-ECJDGR76LH"
};

// استبدل القيمة بـ UID حساب المدير من Firebase Authentication > Users.
export const ADMIN_UID = "REPLACE_WITH_ADMIN_UID";
// اختياري: رابط Cloudflare Worker بعد نشره. لا تضع Bot Token هنا.
export const NOTIFY_ENDPOINT = "REPLACE_WITH_CLOUDFLARE_WORKER_URL";
