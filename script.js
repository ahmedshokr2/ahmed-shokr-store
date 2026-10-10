// عدّل أسعار الباقات ورابط واتساب هنا.
// اكتب رقم واتساب بصيغة دولية بدون +، مثال: 2010XXXXXXXX
const WHATSAPP_NUMBER = ""; // اتركه فارغًا لتعطيل الإرسال عبر واتساب
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
let currentOrder = null;

function money(n) { return `${n} ج.م`; }

bundles.forEach((bundle) => {
  const card = document.createElement("article");
  card.className = `bundle ${bundle.featured ? "featured" : ""}`;
  card.innerHTML = `
    <span class="tag">${bundle.tag}</span>
    <h3>${bundle.name}</h3>
    <p class="desc">${bundle.description}</p>
    <div class="price">${money(bundle.price)} <small>/ للطلب</small></div>
    <button type="button" data-bundle="${bundle.id}">اختار الباقة ←</button>`;
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

function validEgyptianMobile(value) {
  return /^01[0125][0-9]{8}$/.test(value);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const bundle = bundles.find(b => b.id === select.value);
  const phone = document.getElementById("phone").value.trim();
  const name = document.getElementById("customerName").value.trim();
  if (!bundle) { message.textContent = "اختار الباقة أولًا."; return; }
  if (!validEgyptianMobile(phone)) { message.textContent = "اكتب رقم موبايل مصري صحيح من 11 رقمًا."; return; }

  currentOrder = { bundle, phone, name };
  document.getElementById("reviewDetails").innerHTML =
    `<b>الباقة:</b> ${bundle.name}<br><b>رقم الموبايل:</b> ${phone}<br>` +
    `${name ? `<b>الاسم:</b> ${escapeHtml(name)}<br>` : ""}<b>الإجمالي:</b> ${money(bundle.price)}`;
  message.textContent = "";
  dialog.showModal();
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[char]));
}

document.getElementById("sendWhatsApp").addEventListener("click", () => {
  if (!currentOrder) return;
  if (!WHATSAPP_NUMBER) {
    document.getElementById("reviewDetails").insertAdjacentHTML(
      "beforeend", '<p style="color:#ff9aab">أضف رقم واتساب المتجر في WHATSAPP_NUMBER داخل ملف script.js أولًا.</p>'
    );
    return;
  }
  const { bundle, phone, name } = currentOrder;
  const text = `طلب جديد من متجر Ahmed Shokr%0Aالباقة: ${encodeURIComponent(bundle.name)}%0Aالسعر: ${bundle.price} جنيه%0Aرقم العميل: ${encodeURIComponent(phone)}%0Aالاسم: ${encodeURIComponent(name || "غير مذكور")}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
});
