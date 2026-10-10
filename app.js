const plans = [...document.querySelectorAll('.plan')];
const summaryPlan = document.getElementById('summaryPlan');
const summaryPrice = document.getElementById('summaryPrice');
const result = document.getElementById('result');
const phoneInput = document.getElementById('phone');
let selected = {plan:'10400', price:250};
plans.forEach(btn => btn.addEventListener('click', () => {
  plans.forEach(p => p.classList.remove('selected'));
  btn.classList.add('selected');
  selected = {plan:btn.dataset.plan, price:Number(btn.dataset.price)};
  summaryPlan.textContent = `فليكس ${selected.plan}`;
  summaryPrice.textContent = selected.price;
}));
function getOrders(){ try{return JSON.parse(localStorage.getItem('as_orders')||'{}')}catch{return {}} }
function saveOrders(orders){localStorage.setItem('as_orders',JSON.stringify(orders))}
document.getElementById('orderForm').addEventListener('submit', e => {
  e.preventDefault();
  const phone = phoneInput.value.trim();
  if(!/^01[0125][0-9]{8}$/.test(phone)){alert('اكتب رقم فودافون مصري صحيح من 11 رقم.');return}
  const payment = document.getElementById('payment').value;
  const id = 'AS-' + Math.floor(100000 + Math.random()*900000);
  const order = {id, phone, plan:selected.plan, price:selected.price, payment, paymentStatus:'بانتظار المراجعة', activationStatus:'بانتظار التفعيل', createdAt:new Date().toISOString()};
  const orders = getOrders(); orders[id]=order; saveOrders(orders);
  result.classList.remove('hidden');
  result.innerHTML = `<b>تم تسجيل الطلب على هذا الجهاز كمعاينة.</b><br>رقم الطلب: <strong>${id}</strong><br>الباقة: فليكس ${selected.plan} — ${selected.price} جنيه<br>الدفع: ${payment}<br><small>احتفظ برقم الطلب. هذه النسخة التجريبية لا ترسل الطلبات إلى لوحة تحكم مركزية بعد.</small>`;
  document.getElementById('trackId').value=id;
  result.scrollIntoView({behavior:'smooth',block:'center'});
});
document.getElementById('trackForm').addEventListener('submit', e=>{
  e.preventDefault(); const id=document.getElementById('trackId').value.trim().toUpperCase();
  const order=getOrders()[id]; const out=document.getElementById('trackResult');
  out.textContent = order ? `الطلب ${order.id}: ${order.paymentStatus} — ${order.activationStatus}. (محفوظ على هذا الجهاز فقط)` : 'لم يتم العثور على الطلب على هذا الجهاز. تأكد من رقم الطلب أو استخدم النسخة المتصلة بقاعدة بيانات.';
});
