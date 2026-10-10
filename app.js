// إعدادات المتجر. رقم واتساب بصيغة دولية بدون علامة +.
const STORE = {
  whatsapp: "201070424120",
  instapay: "https://ipn.eg/S/ahmed.shokr1/instapay/6puImD"
};
const bundles = [
  {id:"flex10400",name:"Flex 10400",description:"باقة فليكس",price:250,icon:"ϟ"},
  {id:"flex6500",name:"Flex 6500",description:"باقة فليكس",price:140,icon:"◈"},
  {id:"flex2600",name:"Flex 2600",description:"باقة فليكس",price:80,icon:"⌁"},
  {id:"flex1300",name:"Flex 1300",description:"باقة فليكس",price:50,icon:"✳"},
  {id:"internet",name:"باقة إنترنت",description:"18,000–20,000 ميجا حسب التوافر",price:320,icon:"⌘"}
];
// الوضع الليلي/النهاري مع حفظ اختيار المستخدم على نفس المتصفح.
const themeToggle = document.getElementById("themeToggle");
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  if (themeToggle) {
    themeToggle.innerHTML = dark ? '☀️ <span>الوضع النهاري</span>' : '🌙 <span>الوضع الليلي</span>';
    themeToggle.setAttribute("aria-label", dark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي");
    themeToggle.title = dark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي";
  }
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.content = dark ? "#0b1220" : "#101827";
}
let savedTheme = "light";
try { savedTheme = localStorage.getItem("ahmedShokrTheme") || "light"; } catch (error) {}
applyTheme(savedTheme === "dark" ? "dark" : "light");
if (themeToggle) themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try { localStorage.setItem("ahmedShokrTheme", nextTheme); } catch (error) {}
});

const wa = message => `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;
document.getElementById("headerWhatsapp").href=wa("أهلًا Ahmed Shokr، عندي استفسار عن الباقات.");
document.getElementById("bottomWhatsapp").href=wa("أهلًا، أريد الاستفسار عن طلب باقة.");
document.getElementById("instapayLink").href=STORE.instapay;
const copyCashButton = document.getElementById("copyVodafoneCash");
if (copyCashButton) copyCashButton.addEventListener("click", async () => {
  const number = document.getElementById("vodafoneCashNumber").textContent.trim();
  const status = document.getElementById("copyCashStatus");
  try {
    await navigator.clipboard.writeText(number);
    status.textContent = "تم نسخ رقم فودافون كاش.";
  } catch (error) {
    const field = document.createElement("textarea");
    field.value = number; field.setAttribute("readonly", "");
    field.style.position = "fixed"; field.style.opacity = "0";
    document.body.appendChild(field); field.select();
    const copied = document.execCommand("copy"); field.remove();
    status.textContent = copied ? "تم نسخ رقم فودافون كاش." : "انسخ الرقم يدويًا: 01012639004";
  }
  copyCashButton.textContent = "تم النسخ ✓";
  setTimeout(() => { copyCashButton.textContent = "نسخ الرقم"; }, 1800);
});
document.getElementById("year").textContent=new Date().getFullYear();
const grid=document.getElementById("bundleGrid"),select=document.getElementById("selectedBundle");
bundles.forEach(bundle=>{
 const card=document.createElement("article");card.className="bundle-card";
 const icon=document.createElement("span");icon.className="bundle-icon";icon.textContent=bundle.icon;
 const title=document.createElement("h3");title.textContent=bundle.name;
 const desc=document.createElement("p");desc.textContent=bundle.description;
 const price=document.createElement("div");price.className="bundle-price";price.textContent=bundle.price+" ";const unit=document.createElement("small");unit.textContent="ج.م";price.appendChild(unit);
 const button=document.createElement("button");button.className="choose-btn";button.type="button";button.textContent="اختار الباقة ←";button.dataset.bundle=bundle.id;
 card.append(icon,title,desc,price,button);grid.appendChild(card);
 const option=document.createElement("option");option.value=bundle.id;option.textContent=`${bundle.name} — ${bundle.price} جنيه`;select.appendChild(option);
});
grid.addEventListener("click",event=>{const btn=event.target.closest("[data-bundle]");if(!btn)return;select.value=btn.dataset.bundle;document.getElementById("order").scrollIntoView({behavior:"smooth"});});
document.getElementById("orderForm").addEventListener("submit",event=>{
 event.preventDefault();const bundle=bundles.find(item=>item.id===select.value);const name=document.getElementById("customerName").value.trim();const phone=document.getElementById("customerPhone").value.trim();const note=document.getElementById("customerNote").value.trim();
 if(!bundle||!name||!phone||!document.getElementById("terms").checked){alert("راجع البيانات المطلوبة قبل إرسال الطلب.");return;}
 if(!/^[0-9+\s()-]{8,15}$/.test(phone)){alert("اكتب رقم موبايل صحيحًا.");return;}
 const orderId="AS-"+Date.now().toString().slice(-8);
 const message=["طلب باقة جديد — Ahmed Shokr",`رقم الطلب: ${orderId}`,`الاسم: ${name}`,`رقم التفعيل: ${phone}`,`الباقة: ${bundle.name}`,`السعر: ${bundle.price} جنيه`,`ملاحظة: ${note||"لا يوجد"}`,"","برجاء مراجعة الدفع والتوافر وتأكيد الطلب قبل التفعيل."].join("\n");
 // نسخة محلية للتجربة فقط؛ ليست قاعدة بيانات مشتركة.
 try{const orders=JSON.parse(localStorage.getItem("ahmedShokrDemoOrders")||"[]");orders.unshift({orderId,name,phone,bundle:bundle.name,price:bundle.price,note,status:"بانتظار المراجعة",createdAt:new Date().toISOString()});localStorage.setItem("ahmedShokrDemoOrders",JSON.stringify(orders.slice(0,100)));}catch(error){}
 window.open(wa(message),"_blank","noopener");
});
