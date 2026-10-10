// ==========================================
// إعدادات Shokr Store وروابط التحويل
// ==========================================
const INSTAPAY_LINK = "https://ipn.eg/S/ahmed.shokr1/instapay/6puImD";
const VFCASH_LINK = "http://vf.eg/vfcash?id=mt&qrId=LRwbNU";
const WHATSAPP_NUMBER = "201070424120";

// ==========================================
// دوال الدفع والطلب
// ==========================================

// 1. الدفع عبر إنستا باي (InstaPay)
function payInstaPay(packageName, packagePrice) {
    window.open(INSTAPAY_LINK, '_blank');
}

// 2. الدفع عبر فودافون كاش (Vodafone Cash)
function payVFCash(packageName, packagePrice) {
    window.open(VFCASH_LINK, '_blank');
}

// 3. الطلب عبر الواتساب برقم متجر شكر ستور
function sendWhatsApp(packageName, packagePrice) {
    const orderId = 'SHOKR-' + Math.floor(100000 + Math.random() * 900000);
    
    const message = `مرحباً Shokr Store، أود طلب الباقة التالية:
- اسم الباقة: ${packageName}
- السعر: ${packagePrice}
- رقم المرجع: #${orderId}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}
