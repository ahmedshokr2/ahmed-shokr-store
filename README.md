# Ahmed Shokr — متجر الباقات

موقع عربي متجاوب لعرض الباقات وتجهيز الطلب وإرساله إلى واتساب. يعمل كصفحة ثابتة ويمكن نشره مجانًا عبر GitHub Pages.

## الملفات
- `index.html`: بنية الصفحة.
- `style.css`: التصميم والألوان والتجاوب مع الموبايل.
- `script.js`: أسعار الباقات ورقم واتساب ومنطق الطلب.

## تعديل الأسعار ورقم واتساب
افتح `script.js` وعدّل `WHATSAPP_NUMBER` بصيغة دولية من دون علامة +، ثم عدّل `price` لكل باقة.

## وسائل الدفع الحالية
- InstaPay: https://ipn.eg/S/ahmed.shokr1/instapay/6puImD
- Vodafone Cash: http://vf.eg/vfcash?id=mt&qrId=LRwbNU

**تنبيه:** الروابط تفتح وسيلة الدفع فقط. الموقع لا يتحقق آليًا من التحويل ولا يفعّل الباقات تلقائيًا، وتأكيد الطلب يدوي. لا تطلب من العملاء كلمات مرور أو رموز OTP.

## النشر عبر GitHub Pages
ارفع الملفات الثلاثة `index.html` و`style.css` و`script.js` إلى جذر المستودع على فرع `main`، ثم من Settings → Pages اختر Deploy from a branch، وحدد `main` و`/(root)` ثم Save.
