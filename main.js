// Business settings — replace before launch
const SHOW_PRICES = true;
const WHATSAPP_NUMBER = ''; // digits only, e.g. '919800000000'. When set, "WhatsApp us" and the form open WhatsApp.

const activities = [
  { img: 'images/act-rafting.jpg', alt: 'Rafting on the Ganga', tag: 'Grade III–IV', name: 'River Rafting', from: 'from ₹600', desc: '16 km, 26 km or 36 km runs from Shivpuri and Marine Drive.' },
  { img: 'images/act-bungee.jpg', alt: 'Bungee jump platform', tag: '83 m drop', name: 'Bungee & Swing', from: 'from ₹3,700', desc: 'India’s highest fixed-platform jump at Mohan Chatti, plus giant swing.' },
  { img: 'images/act-camp.jpg', alt: 'Tents on a river beach', tag: 'Overnight', name: 'Riverside Camping', from: 'from ₹1,500', desc: 'Beach tents, bonfire, meals and volleyball on the sand.' },
  { img: 'images/act-trek.jpg', alt: 'Trekkers on a ridge', tag: 'Easy–Moderate', name: 'Treks & Hikes', from: 'from ₹900', desc: 'Kunjapuri sunrise, Neer Garh waterfall and multi-day Himalayan trails.' }
];

const packages = [
  { img: 'images/pkg-1.jpg', alt: 'Camp at dusk', cat: 'Adventure', days: '2D / 1N', name: 'Rafting + Riverside Camp', inc: '16 km rafting, beach camp stay, bonfire, all meals, cliff jumping.', price: '₹2,499' },
  { img: 'images/pkg-2.jpg', alt: 'Bungee jumper mid-air', cat: 'Adventure', days: '3D / 2N', name: 'Adrenaline Weekend', inc: '26 km rafting, bungee jump, flying fox, camp stay and transfers.', price: '₹7,999' },
  { img: 'images/pkg-3.jpg', alt: 'Ganga Aarti at Triveni Ghat', cat: 'Spiritual', days: '2D / 1N', name: 'Rishikesh Soul Tour', inc: 'Ganga Aarti, Laxman & Ram Jhula, Beatles Ashram, sunrise yoga session.', price: '₹3,299' },
  { img: 'images/pkg-4.jpg', alt: 'Kunjapuri temple sunrise', cat: 'Trek', days: '1 Day', name: 'Kunjapuri Sunrise Trek', inc: 'Pre-dawn pickup, guided hike, Himalayan sunrise view, breakfast.', price: '₹1,199' },
  { img: 'images/pkg-5.jpg', alt: 'Kedarnath valley', cat: 'Spiritual', days: '10D / 9N', name: 'Char Dham Yatra', inc: 'Yamunotri, Gangotri, Kedarnath, Badrinath — hotels, cab and guide.', price: '₹28,500' },
  { img: 'images/pkg-6.jpg', alt: 'Snowy Himalayan trail', cat: 'Trek', days: '6D / 5N', name: 'Kedarkantha Snow Trek', inc: 'Winter summit trek with tents, meals, permits and certified trek leader.', price: '₹9,999' }
];

const reasons = [
  { n: '01', t: 'Certified river guides', d: 'Trained rescue kayakers on every rafting trip.' },
  { n: '02', t: 'One price, all in', d: 'Transfers, gear, meals and permits are always included.' },
  { n: '03', t: 'Small groups', d: 'More time on the water, less time waiting in line.' }
];

const TABS = ['All', 'Adventure', 'Trek', 'Spiritual'];

const state = {
  activeTab: 'All',
  form: { name: '', phone: '', pkg: 'Rafting + Riverside Camp', date: '', pax: 2 },
  error: false,
  sent: false
};

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Show the striped placeholder instead of a broken-image icon until real photos exist
function watchImages(root) {
  root.querySelectorAll('.img img').forEach(img => {
    const miss = () => img.classList.add('is-missing');
    if (img.complete && img.naturalWidth === 0) miss();
    else img.addEventListener('error', miss, { once: true });
  });
}

/* ---------- Rendering ---------- */

function renderActivities() {
  $('activities-grid').innerHTML = activities.map(a => `
    <article class="activity">
      <div class="img activity-img">
        <img src="${a.img}" alt="${esc(a.alt)}" loading="lazy">
        <span class="tag">${esc(a.tag)}</span>
      </div>
      <div class="activity-title">
        <h3>${esc(a.name)}</h3>
        <span class="activity-from">${esc(a.from)}</span>
      </div>
      <p>${esc(a.desc)}</p>
    </article>`).join('');
  watchImages($('activities-grid'));
}

function renderTabs() {
  $('package-tabs').innerHTML = TABS.map(t =>
    `<button type="button" class="tab" data-tab="${t}" aria-pressed="${t === state.activeTab}">${t}</button>`
  ).join('');
}

function renderPackages() {
  const list = packages.filter(p => state.activeTab === 'All' || p.cat === state.activeTab);
  $('packages-grid').innerHTML = list.map(p => `
    <article class="package">
      <div class="img package-img"><img src="${p.img}" alt="${esc(p.alt)}" loading="lazy"></div>
      <div class="package-body">
        <div class="package-meta"><span>${esc(p.days)}</span><span>·</span><span>${esc(p.cat)}</span></div>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.inc)}</p>
        <div class="package-foot">
          ${SHOW_PRICES
            ? `<div class="price">${esc(p.price)}<small> / person</small></div>`
            : `<div class="price-request">Price on request</div>`}
          <button type="button" class="btn-enquire" data-pkg="${esc(p.name)}">Enquire</button>
        </div>
      </div>
    </article>`).join('');
  watchImages($('packages-grid'));
}

function renderReasons() {
  $('reasons').innerHTML = reasons.map(r => `
    <div class="reason">
      <span class="reason-n">${r.n}</span>
      <div>
        <div class="reason-t">${esc(r.t)}</div>
        <div class="reason-d">${esc(r.d)}</div>
      </div>
    </div>`).join('');
}

function renderPkgOptions() {
  const opts = [...packages.map(p => p.name), 'Custom trip'];
  $('pkg-select').innerHTML = opts.map(o => `<option value="${esc(o)}">${esc(o)}</option>`).join('');
}

/* ---------- Form ---------- */

const form = () => $('book-form');

function syncFormFromState() {
  const f = form();
  f.name.value = state.form.name;
  f.phone.value = state.form.phone;
  f.pkg.value = state.form.pkg;
  f.date.value = state.form.date;
  f.pax.value = state.form.pax;
}

function renderFormState() {
  form().hidden = state.sent;
  $('success').hidden = !state.sent;
  $('form-error').hidden = !state.error;
  if (state.sent) {
    $('success-name').textContent = state.form.name;
    $('success-pkg').textContent = state.form.pkg;
  }
}

function whatsappLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}` + (text ? `?text=${encodeURIComponent(text)}` : '');
}

function bindForm() {
  const f = form();
  f.addEventListener('input', e => {
    const k = e.target.name;
    if (k in state.form) state.form[k] = e.target.value;
    if (state.error) { state.error = false; renderFormState(); }
  });
  f.addEventListener('submit', e => {
    e.preventDefault();
    if (!state.form.name.trim() || !state.form.phone.trim()) {
      state.error = true;
      renderFormState();
      return;
    }
    // TODO: POST to a backend / form service before launch
    if (WHATSAPP_NUMBER) {
      const { name, phone, pkg, date, pax } = state.form;
      const msg = `Hi Monkey Adventure! Enquiry from ${name} (${phone}).\nPackage: ${pkg}\nDate: ${date || 'flexible'}\nTravellers: ${pax}`;
      window.open(whatsappLink(msg), '_blank', 'noopener');
    }
    state.sent = true;
    renderFormState();
  });
  $('reset-btn').addEventListener('click', () => {
    state.sent = false;
    state.form.name = '';
    state.form.phone = '';
    syncFormFromState();
    renderFormState();
  });
}

/* ---------- Packages interactions ---------- */

function bindPackages() {
  $('package-tabs').addEventListener('click', e => {
    const btn = e.target.closest('[data-tab]');
    if (!btn || btn.dataset.tab === state.activeTab) return;
    state.activeTab = btn.dataset.tab;
    renderTabs();
    renderPackages();
  });
  $('packages-grid').addEventListener('click', e => {
    const btn = e.target.closest('[data-pkg]');
    if (!btn) return;
    state.form.pkg = btn.dataset.pkg;
    state.sent = false;
    syncFormFromState();
    renderFormState();
    const el = $('book');
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  });
}

/* ---------- Rope + climber ---------- */

const rope = {
  svg: null, lut: null, ticking: false,

  init() {
    this.svg = document.querySelector('.rope');
    this.paths = this.svg.querySelectorAll('.rope-path');
    this.start = this.svg.querySelector('.rope-start');
    this.end = this.svg.querySelector('.rope-end');
    this.climber = this.svg.querySelector('.climber');
    this.poseA = this.svg.querySelectorAll('.pose-a');
    this.poseB = this.svg.querySelectorAll('.pose-b');

    this.layout = this.layout.bind(this);
    this.requestUpdate = this.requestUpdate.bind(this);
    window.addEventListener('scroll', this.requestUpdate, { passive: true });
    window.addEventListener('resize', this.layout);
    new ResizeObserver(() => this.layout()).observe(document.body);
    this.layout();
  },

  layout() {
    if (getComputedStyle(this.svg).display === 'none') return;
    const de = document.documentElement;
    // Collapse first so the SVG's own height doesn't inflate scrollHeight
    this.svg.setAttribute('height', 0);
    const W = de.clientWidth, H = de.scrollHeight;
    const pad = Math.min(40, Math.max(16, W * 0.04));
    const lo = Math.max(10, (W - Math.min(W, 1320)) / 2 + pad / 2), hi = W - lo;
    const sx = lo, sy = 118;

    const r = $('send-btn').getBoundingClientRect();
    let ex = W / 2, ey = H - 320;
    if (r.width) { ex = r.left + r.width / 2; ey = r.top + window.scrollY - 4; }

    const hb = $('top').getBoundingClientRect().bottom + window.scrollY + 40;
    const n = Math.max(2, Math.round((ey - hb) / 820));
    const pts = [[sx, sy], [lo, hb]];
    for (let i = 1; i < n; i++) pts.push([i % 2 ? hi : lo, hb + (ey - hb) * i / n]);
    pts.push([ex, ey]);

    const bez = (p0, c1, c2, p1, t) => {
      const u = 1 - t;
      return [0, 1].map(k => u*u*u*p0[k] + 3*u*u*t*c1[k] + 3*u*t*t*c2[k] + t*t*t*p1[k]);
    };
    let d = `M${sx.toFixed(1)} ${sy.toFixed(1)}`;
    const lut = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i], p1 = pts[i + 1], dy = p1[1] - p0[1];
      const c1 = [p0[0], p0[1] + dy * 0.55], c2 = [p1[0], p1[1] - dy * 0.55];
      d += ' C' + [c1, c2, p1].map(q => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' ');
      for (let k = 0; k <= 80; k++) lut.push(bez(p0, c1, c2, p1, k / 80));
    }
    this.lut = lut;

    this.svg.setAttribute('width', W);
    this.svg.setAttribute('height', H);
    this.paths.forEach(p => p.setAttribute('d', d));
    this.start.setAttribute('cx', sx); this.start.setAttribute('cy', sy);
    this.end.setAttribute('cx', ex); this.end.setAttribute('cy', ey);
    this.update();
  },

  requestUpdate() {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => { this.ticking = false; this.update(); });
  },

  update() {
    const lut = this.lut;
    if (!lut) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    const y0 = lut[0][1], y1 = lut[lut.length - 1][1] - 40, ty = y0 + p * (y1 - y0);

    let lo = 0, hi = lut.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (lut[m][1] < ty) lo = m; else hi = m; }
    const A = lut[lo], B = lut[hi], f = B[1] > A[1] ? (ty - A[1]) / (B[1] - A[1]) : 0;
    const x = A[0] + (B[0] - A[0]) * f, y = A[1] + (B[1] - A[1]) * f;

    const P = lut[Math.max(0, lo - 2)], N = lut[Math.min(lut.length - 1, hi + 2)];
    const poseA = reducedMotion.matches || Math.floor(window.scrollY / 70) % 2 === 0;
    const deg = Math.atan2(-(N[0] - P[0]), N[1] - P[1]) * 180 / Math.PI + (poseA ? -4 : 4);

    this.climber.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg.toFixed(1)}) scale(1.2) translate(-20 -32)`);
    this.poseA.forEach(g => g.setAttribute('display', poseA ? 'inline' : 'none'));
    this.poseB.forEach(g => g.setAttribute('display', poseA ? 'none' : 'inline'));
  }
};

/* ---------- Init ---------- */

renderActivities();
renderTabs();
renderPackages();
renderReasons();
renderPkgOptions();
syncFormFromState();
renderFormState();
bindPackages();
bindForm();
watchImages(document);
if (WHATSAPP_NUMBER) document.querySelectorAll('[data-whatsapp]').forEach(a => { a.href = whatsappLink(); a.target = '_blank'; a.rel = 'noopener'; });
rope.init();
