# إعادة هيكلة Ahmed Shokr Store

## محتويات الحزمة
- `index.html`, `style.css`, `app.js`: واجهة المتجر، حسابات Firebase، الطلبات وسجل طلبات العميل.
- `admin.html`, `admin.js`: لوحة إدارة تتحقق من UID المحدد قبل إظهار الطلبات.
- `firebase-config.js`: إعدادات Firebase Web وUID المدير. مفتاح Web ظاهر بطبيعته في تطبيق المتصفح؛ يجب تقييده من Google Cloud Console.
- `firestore.rules`: قواعد تحدد الأسعار وتمنع العميل من قراءة طلبات الآخرين أو تغيير الحالات.
- `*-original-backup.*`: نسخ احتياطية من الملفات المحلية القديمة، لا تُرفع إلى الاستضافة إلا إذا كنت تريد الاحتفاظ بها.

## مهم قبل النشر
1. افتح `firebase-config.js` وتأكد أن `apiKey` هو مفتاح Web الصحيح للمشروع `ahmed-shokr-store`.
2. افتح Firebase Console > Authentication > Users وتأكد أن UID حساب المدير يطابق `BTxztpHJrPYPikfFEmOonyEvy1Z2`. إذا اختلف، عدّل UID في `firebase-config.js` و`firestore.rules` معًا.
3. انشر محتوى `firestore.rules` من Firebase Console > Firestore Database > Rules. لا تستخدم قواعد مفتوحة للجميع.
4. في Firebase Authentication تأكد من تفعيل Email/Password وإضافة نطاق GitHub Pages إلى Authorized domains.
5. في Google Cloud Console > APIs & Services > Credentials، قيّد المفتاح بنطاق الموقع (HTTP referrers) وبـ APIs التي يحتاجها مشروعك. لا تحذف مفتاح Firebase عشوائيًا قبل تجهيز البديل واختباره.
6. ارفع ملفات التشغيل الستة: `index.html`, `style.css`, `app.js`, `admin.html`, `admin.js`, `firebase-config.js`. ملف القواعد يُنشر داخل Firebase Console وليس ملفًا يشغله المتصفح.
7. اختبر من رابط HTTPS المنشور، وليس بفتح `index.html` محليًا.

## اختبارات ضرورية بعد النشر
- إنشاء حساب عميل وتسجيل الدخول والخروج واستعادة كلمة المرور.
- إرسال طلب تجريبي بسعر صحيح ثم التأكد من ظهوره في Firestore وفي «طلباتي».
- تسجيل الدخول بحساب عميل آخر والتأكد أنه لا يرى طلب العميل الأول.
- دخول المدير وتغيير الحالة، ثم التأكد من حفظها.
- تجربة سعر معدل يدويًا ورفضه من Firestore Rules.

## حدود النسخة
- الدفع يدوي؛ لا يوجد تحقق آلي من التحويل ولا رفع إيصال في هذه النسخة.
- إشعارات Telegram غير مفعلة. إذا أضفتها، ضع التوكن في خدمة خلفية فقط ولا تضعه في ملفات الواجهة.
- لا يمكن من الاختبار المحلي وحده تأكيد اتصال Firebase الفعلي أو نشر القواعد؛ ذلك يحتاج اختبارًا من مشروعك بعد النشر.
