// إعدادات المتجر — عدّل الأسعار والروابط هنا عند الحاجة.
const WHATSAPP_NUMBER = "201070424120"; // رقم المتجر بصيغة دولية بدون +
const bundles = [
  { id: "flex10400", name: "فليكس 10400", description: "باقة فليكس كبيرة", price: 250, tag: "اختيار مميز", featured: true },
  { id: "flex5200", name: "فليكس 5200", description: "باقة للاستخدام اليومي", price: 130, tag: "عملية", featured: false },
  { id: "flex6500", name: "فليكس 6500", description: "مكالمات وإنترنت", price: 140, tag: "قيمة ممتازة", featured: false }
];

const grid = document.getElementById("bundleGrid");
const select = document.getElementById("selectedBundle");
const totalPrice = document.getElementById("totalPrice");
const cartCount = document.getElementById("cartCount");
const form = document.getElementById("orderForm");
const message = document.getElementById("formMessage");
const dialog = document.getElementById("reviewDialog");
const paymentStatus = document.getElementById("paymentStatus");
let currentOrder = null;
let selectedPayment = "لم يتم اختيار وسيلة دفع";

function money(n) { return `${n} ج.م`; }
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
}

bundles.forEach((bundle) => {
  const card = document.createElement("article");
  card.className = `bundle ${bundle.featured ? "featured" : ""}`;
  card.innerHTML = `<span class="tag">${bundle.tag}</span><h3>${bundle.name}</h3><p class="desc">${bundle.description}</p><div class="price">${money(bundle.price)} <small>/ للطلب</small></div><button type="button" data-bundle="${bundle.id}">اختار الباقة ←</button>`;
  grid.appendChild(card);
  const option = document.createElement("option");
  option.value = bundle.id;
  option.textContent = `${bundle.name} — ${money(bundle.price)}`;
  select.appendChild(option);
});

function updateTotal() {
  const chosen = bundles.find(b => b.id === select.value);
  totalPrice.textContent = chosen ? money(chosen.price) : "— ج.م";
  cartCount.textContent = chosen ? "1" : "0";
}
grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-bundle]");
  if (!button) return;
  select.value = button.dataset.bundle;
  updateTotal();
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
});
select.addEventListener("change", updateTotal);
document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".payment-link").forEach(link => {
  link.addEventListener("click", () => {
    selectedPayment = link.dataset.payment;
    paymentStatus.textContent = `وسيلة الدفع المختارة: ${selectedPayment}. بعد التحويل اكتب مرجع العملية إن توفر.`;
    document.querySelectorAll(".payment-link").forEach(item => item.classList.toggle("payment-selected", item === link));
  });
});

function validEgyptianMobile(value) { return /^01[0125][0-9]{8}$/.test(value); }
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const bundle = bundles.find(b => b.id === select.value);
  const phone = document.getElementById("phone").value.trim();
  const name = document.getElementById("customerName").value.trim();
  const paymentRef = document.getElementById("paymentRef").value.trim();
  if (!bundle) { message.textContent = "اختار الباقة أولًا."; return; }
  if (!validEgyptianMobile(phone)) { message.textContent = "اكتب رقم موبايل مصري صحيح من 11 رقمًا يبدأ بـ 010 أو 011 أو 012 أو 015."; return; }
  currentOrder = { bundle, phone, name, paymentRef, payment: selectedPayment };
  document.getElementById("reviewDetails").innerHTML =
    `<b>الباقة:</b> ${escapeHtml(bundle.name)}<br><b>رقم الموبايل:</b> ${escapeHtml(phone)}<br>` +
    `${name ? `<b>الاسم:</b> ${escapeHtml(name)}<br>` : ""}<b>الإجمالي:</b> ${money(bundle.price)}<br>` +
    `<b>وسيلة الدفع:</b> ${escapeHtml(selectedPayment)}<br>` +
    `${paymentRef ? `<b>مرجع التحويل:</b> ${escapeHtml(paymentRef)}<br>` : "<b>مرجع التحويل:</b> غير مضاف<br>"}`;
  message.textContent = "";
  dialog.showModal();
});

document.getElementById("sendWhatsApp").addEventListener("click", () => {
  if (!currentOrder) return;
  const { bundle, phone, name, paymentRef, payment } = currentOrder;
  const text = [
    "طلب جديد من متجر Ahmed Shokr",
    `الباقة: ${bundle.name}`,
    `السعر: ${bundle.price} جنيه`,
    `رقم العميل: ${phone}`,
    `الاسم: ${name || "غير مذكور"}`,
    `وسيلة الدفع: ${payment}`,
    `مرجع التحويل: ${paymentRef || "غير مضاف"}`,
    "يرجى مراجعة التحويل وتأكيد الطلب يدويًا."
  ].join("\n");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
