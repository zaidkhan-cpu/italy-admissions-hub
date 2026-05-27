/* ============================================================
   GLOBAL STUDY HUB — app.js
   File 3 of 4

   Contains all JavaScript logic:
   - Navigation
   - University search
   - Eligibility checker
   - Student registration form (5 steps)
   - Document upload (base64, stored in localStorage)
   - Admin dashboard (password protected)
   - University match engine
   - Scholarships filter
   - Visa guide accordion
   - Contact form
   - WhatsApp button wiring

   ADMIN PASSWORD: Change ADMIN_PASSWORD below
   Storage: localStorage (works on GitHub Pages — no server needed)
   ============================================================ */

/* ── Global config ── */
var WA             = '393497871294';          // WhatsApp number (no + or spaces)
var EMAIL          = 'italyguidance@gmail.com';
var ADMIN_PASSWORD = 'GlobalAdmin2026';       // Change this to your own password

/* ── Education level order (for matching engine) ── */
var EDU_ORDER = { hs: 1, ba14: 2, ba16: 3, ma: 4, phd: 5 };
var EDU_LABELS = {
  hs:   'High School / FSc / Matric / A-Levels',
  ba14: 'Bachelor — 14 years total (Pass / 2-year)',
  ba16: 'Bachelor — 16 years total (Hons / 4-year)',
  ma:   'Master Degree',
  phd:  'PhD / Doctorate'
};

/* ── Required documents for profile form ── */
var REQUIRED_DOCS = [
  { key: 'passport',     label: 'Passport — copy of photo page',               req: true  },
  { key: 'transcripts',  label: 'Academic Transcripts — all years',             req: true  },
  { key: 'degree',       label: 'Degree Certificate / Diploma',                 req: true  },
  { key: 'english',      label: 'English Certificate — IELTS / TOEFL / Duolingo', req: false },
  { key: 'motivation',   label: 'Motivation Letter / Statement of Purpose',     req: false },
  { key: 'cv',           label: 'CV / Resume',                                  req: false },
  { key: 'bank',         label: 'Bank Statement — last 3–6 months',             req: false },
  { key: 'apostille',    label: 'Apostille Stamp on Documents',                 req: false },
  { key: 'declaration',  label: 'Dichiarazione di Valore — for Italy only',     req: false }
];

/* ============================================================
   NAVIGATION
   ============================================================ */
function showTab(id) {
  document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('on'); });
  document.querySelectorAll('.nb').forEach(function(b)  { b.classList.remove('on'); });
  var t  = document.getElementById(id);       if (t)  t.classList.add('on');
  var nb = document.getElementById('nav-'+id); if (nb) nb.classList.add('on');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'admin')    { isAdminLoggedIn() ? renderApplicantList() : null; }
  if (id === 'register') { initRegisterForm(); }
}

/* ── WhatsApp helper ── */
function wa(msg) {
  window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank');
}

/* ── GPA → percentage converter ── */
function toPercent(val, scale) {
  val = parseFloat(val);
  if (isNaN(val)) return null;
  if (scale === 'pct')  return Math.round(val * 10) / 10;
  if (scale === '4.0')  return Math.round((val / 4.0)  * 100 * 10) / 10;
  if (scale === '5.0')  return Math.round((val / 5.0)  * 100 * 10) / 10;
  if (scale === '10.0') return Math.round((val / 10.0) * 100 * 10) / 10;
  return val;
}

/* ── Auto-calculate GPA percentage when user types ── */
document.addEventListener('input', function(e) {
  if (e.target.id === 'r-gpa' || e.target.id === 'r-gpa-scale') {
    var gpa   = document.getElementById('r-gpa').value;
    var scale = document.getElementById('r-gpa-scale').value;
    var pct   = toPercent(gpa, scale);
    var pctEl = document.getElementById('r-gpa-pct');
    if (pctEl) pctEl.value = pct !== null ? pct : '';
  }
});

/* ============================================================
   UNIVERSITY SEARCH
   ============================================================ */
var searchResults = [];

function doSearch() {
  var country = document.getElementById('f-country').value;
  var field   = document.getElementById('f-field').value;
  var level   = document.getElementById('f-level').value;
  var lang    = document.getElementById('f-lang').value;
  var schol   = document.getElementById('f-schol').value;

  var res = UNIS.filter(function(u) {
    if (country && u.co !== country) return false;
    if (field   && u.f.indexOf(field) === -1) return false;
    if (level   && u.lv.indexOf(level) === -1) return false;
    if (lang) {
      if (lang === 'English' && u.lg === 'Italian') return false;
      if (lang === 'Italian' && u.lg === 'English') return false;
    }
    if (schol === 'yes' && !u.sc) return false;
    return true;
  });

  if (!country && !field && !level) res = UNIS.slice(0, 10);
  searchResults = res;

  var loadEl  = document.getElementById('ai-load');
  var countEl = document.getElementById('f-count');
  var resEl   = document.getElementById('f-results');

  if (loadEl)  loadEl.classList.remove('on');
  if (countEl) { countEl.style.display = 'block'; countEl.textContent = res.length + ' program' + (res.length !== 1 ? 's' : '') + ' found'; }

  if (!res.length) {
    if (resEl) resEl.innerHTML = '<div class="empty-state">&#128269;<br>No programs match your filters. Try removing some filters.</div>';
    return;
  }

  if (!resEl) return;
  resEl.innerHTML = res.map(function(u, i) {
    var r = u.req || {};
    var reqBlock = r.edu ?
      '<div class="req-box">' +
        '<span class="req-title">Full Admission Requirements</span>' +
        (r.age  ? '<div class="req-row"><b>Age:</b> '             + r.age  + '</div>' : '') +
        (r.edu  ? '<div class="req-row"><b>Education needed:</b> ' + r.edu  + '</div>' : '') +
        (r.gpa  ? '<div class="req-row"><b>GPA / Grade:</b> '     + r.gpa  + '</div>' : '') +
        (r.lang ? '<div class="req-row"><b>Language test:</b> '   + r.lang + '</div>' : '') +
        (r.other? '<div class="req-row"><b>Important notes:</b> ' + r.other+ '</div>' : '') +
      '</div>' : '';

    return '<div class="card">' +
      '<div class="ct">' + u.n + '</div>' +
      '<div class="bdgs">' +
        '<span class="bdg bnavy">&#128205; ' + u.ci + ', ' + u.co + '</span>' +
        '<span class="bdg bblue">' + (u.lg === 'Both' ? 'EN and Local' : u.lg) + '</span>' +
        (u.sc ? '<span class="bdg bgreen">&#10003; Scholarships</span>' : '') +
      '</div>' +
      '<span class="dpill">&#128197; Opens: ' + u.op + '</span>' +
      '<span class="dpill">Deadline: ' + u.cl + '</span>' +
      '<div class="cmeta">Fees: <strong>' + u.fee + '</strong></div>' +
      '<div class="cmeta">' + u.rk + '</div>' +
      reqBlock +
      '<div style="margin-top:.8rem">' +
        '<button class="btn btn-gold btn-sm" data-si="' + i + '">Apply Now</button>' +
      '</div>' +
    '</div>';
  }).join('');

  resEl.querySelectorAll('[data-si]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var u = searchResults[parseInt(this.getAttribute('data-si'))];
      showTab('register');
      var tc = document.getElementById('r-target-country'); if (tc) tc.value = u.co;
      var tf = document.getElementById('r-target-field');   if (tf && u.f[0]) tf.value = u.f[0];
      var tl = document.getElementById('r-target-level');   if (tl) tl.value = u.lv[0] || '';
    });
  });
}

/* ============================================================
   ELIGIBILITY CHECKER
   ============================================================ */
function doElig() {
  var nat    = document.getElementById('e-nat').value;
  var edu    = document.getElementById('e-edu').value;
  var gpa    = document.getElementById('e-gpa').value;
  var eng    = document.getElementById('e-eng').value;
  var dest   = document.getElementById('e-dest').value;
  var target = document.getElementById('e-target').value;

  if (!nat || !edu || !gpa || !eng || !dest || !target) {
    alert('Please fill in all fields to check your eligibility.');
    return;
  }

  var box   = document.getElementById('elig-res');
  var items = [];
  var warns = [];

  if (edu === 'hs' && (target === 'ma' || target === 'phd')) {
    box.className = 'eres warn';
    box.innerHTML = '<div class="etitle">Important — Please Read</div>' +
      '<div class="ewarn">A Bachelor degree is required before applying for a Master or PhD program. Please complete your undergraduate degree first, then apply for Master.</div>';
    return;
  }

  items.push('You are eligible to apply as an international student');

  if (gpa === 'hi')        items.push('Your academic record qualifies for competitive programs and most scholarship applications');
  else if (gpa === 'mid') { items.push('Your grades qualify for many good universities'); warns.push('Some competitive programs prefer higher grades. We can match you with best-fit universities for your exact profile.'); }
  else                    { items.push('You may qualify for specific programs and universities'); warns.push('Grades below 55% limit options — but good paths still exist. Contact us for a personalised assessment.'); }

  if (edu === 'ba14' && target === 'ma') warns.push('A 14-year Bachelor degree (Pass/2-year) may not be accepted for Master admission in Italy and Germany. Many universities only accept a 16-year (Hons/4-year) Bachelor. We can identify which universities accept your specific degree.');

  if (eng === 'hi')        items.push('English level is strong — qualifies for 95% of English-taught programs worldwide');
  else if (eng === 'mid') { items.push('English level meets requirements for most programs'); warns.push('IELTS 6.5+ is recommended for competitive universities. We know which ones accept 6.0.'); }
  else if (eng === 'lo')  { items.push('English level meets the minimum for some programs'); warns.push('Most universities require IELTS 6.0+. We recommend preparing for a retake while applications are in progress.'); }
  else                    { warns.push('An English language certificate is required for English-taught programs. IELTS preparation typically takes 2–3 months. Contact us for free prep resource recommendations.'); }

  items.push('You qualify to apply to universities in ' + dest);

  if (dest === 'Italy')    { items.push('You qualify for Italian DSU regional scholarship — up to EUR 6,300 per year based on income'); items.push('Italy has the lowest tuition fees in Europe — EUR 156–2,800/year at public universities'); }
  if (dest === 'Germany')  { items.push('German public universities charge EUR 0 tuition — only a semester fee of EUR 100–350'); items.push('DAAD scholarship fully funded is available for Master and PhD students'); }
  if (dest === 'Norway')   items.push('Norway charges EUR 0 tuition for ALL students including non-EU — only a small semester fee of EUR 50');
  if (dest === 'Turkey')   items.push('Turkiye Burslari scholarship covers everything — tuition, accommodation, monthly stipend, flights and health insurance');
  if (dest === 'Sweden')   items.push('Swedish Institute Scholarship is available and fully funded for eligible countries including Pakistan and Afghanistan');
  if (gpa === 'hi')        items.push('Your grades make you eligible for merit-based scholarships — a strong competitive advantage');

  items.push('We offer a free 30-minute WhatsApp consultation to map your exact university options');

  box.className = 'eres ok';
  box.innerHTML =
    '<div class="etitle">Your Eligibility Summary</div>' +
    items.map(function(i) { return '<div class="eitem">' + i + '</div>'; }).join('') +
    warns.map(function(w) { return '<div class="ewarn">' + w + '</div>'; }).join('') +
    '<hr style="border:none;border-top:1px solid #86efac;margin:1rem 0">' +
    '<p style="font-size:.84rem;color:#166534;margin-bottom:.75rem">Ready for personalised university recommendations?</p>' +
    '<button class="btn btn-wa" id="elig-wa-btn">Get Free Personalised Advice on WhatsApp</button>';

  var waMsg = 'Hi! I checked my eligibility on Global Study Hub. I am from ' + nat +
    ', applying for a ' + (target === 'ba' ? 'Bachelor' : target === 'ma' ? 'Master' : 'PhD') +
    ' degree in ' + dest + '. I would like a free consultation.';
  document.getElementById('elig-wa-btn').addEventListener('click', function() { wa(waMsg); });
}

/* ============================================================
   REGISTRATION FORM — 5 Steps
   ============================================================ */
var subjectCount = 0;
var uploadedDocs = {};
var extraDocs    = [];

function initRegisterForm() {
  uploadedDocs = {};
  extraDocs    = [];
  subjectCount = 0;
  regStep(1, true); // true = skip validation on init

  /* Build subject rows — start with 3 blank rows */
  var sr = document.getElementById('subject-rows');
  if (sr) { sr.innerHTML = ''; for (var i = 0; i < 3; i++) addSubject(); }

  /* Build document upload sections */
  var dEl = document.getElementById('doc-upload-sections');
  if (!dEl) return;
  dEl.innerHTML = REQUIRED_DOCS.map(function(doc) {
    return '<div style="margin-bottom:.75rem">' +
      '<label class="fl">' + (doc.req ? '<span style="color:var(--red)">* </span>' : '') + doc.label + '</label>' +
      '<div class="doc-upload-box" id="dbox-' + doc.key + '">' +
        '<input type="file" id="dinput-' + doc.key + '" accept=".pdf,.jpg,.jpeg,.png">' +
        '<p style="font-size:.83rem;color:var(--navy);font-weight:500">&#128196; Click to upload</p>' +
        '<p style="font-size:.74rem;color:var(--muted);margin-top:.2rem">PDF, JPG or PNG — max 3MB</p>' +
      '</div>' +
      '<div id="dstatus-' + doc.key + '"></div>' +
    '</div>';
  }).join('');

  /* Wire file input events after building HTML */
  REQUIRED_DOCS.forEach(function(doc) {
    var box   = document.getElementById('dbox-' + doc.key);
    var input = document.getElementById('dinput-' + doc.key);
    if (!input || !box) return;
    box.addEventListener('click', function() { input.click(); });
    input.addEventListener('change', function() { handleDocUpload(input, doc.key); });
  });

  var extraInput = document.getElementById('extra-upload');
  if (extraInput) extraInput.addEventListener('change', function() { handleExtraDocs(this); });

  var extraList = document.getElementById('extra-doc-list');
  if (extraList) extraList.innerHTML = '';
}

function addSubject() {
  subjectCount++;
  var id  = subjectCount;
  var row = document.createElement('div');
  row.className = 'subject-row';
  row.id        = 'srow-' + id;
  row.innerHTML =
    '<input type="text" placeholder="Subject name — e.g. Mathematics, Physics, English..." id="sname-' + id + '">' +
    '<input type="text" placeholder="Grade / Mark — e.g. 85, A, 4.0" id="sgrade-' + id + '">' +
    '<input type="text" placeholder="Out of — e.g. 100, A+, 5.0" id="smax-' + id + '">' +
    '<button class="remove-btn" type="button">&#215;</button>';
  var sr = document.getElementById('subject-rows');
  if (sr) sr.appendChild(row);
  row.querySelector('.remove-btn').addEventListener('click', function() { row.remove(); });
}

function handleDocUpload(input, key) {
  var file = input.files[0];
  if (!file) return;
  if (file.size > 3 * 1024 * 1024) {
    alert('File "' + file.name + '" is too large. Maximum size is 3MB. Please compress or scan at lower resolution.');
    input.value = '';
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    uploadedDocs[key] = { name: file.name, size: file.size, type: file.type, data: e.target.result };
    var box    = document.getElementById('dbox-' + key);
    var status = document.getElementById('dstatus-' + key);
    if (box) {
      box.style.border     = '2px solid var(--green)';
      box.style.background = 'var(--greenl)';
      var p = box.querySelector('p'); if (p) p.textContent = '✓ ' + file.name;
    }
    if (status) status.innerHTML = '<div style="font-size:.75rem;color:var(--green);margin-top:.25rem">&#10003; Uploaded: ' + file.name + ' (' + Math.round(file.size / 1024) + 'KB)</div>';
  };
  reader.readAsDataURL(file);
}

function handleExtraDocs(input) {
  Array.from(input.files).forEach(function(file) {
    if (file.size > 3 * 1024 * 1024) { alert(file.name + ' is too large (max 3MB). Skipping.'); return; }
    var reader = new FileReader();
    reader.onload = function(e) {
      extraDocs.push({ name: file.name, size: file.size, type: file.type, data: e.target.result });
      renderExtraDocList();
    };
    reader.readAsDataURL(file);
  });
  input.value = '';
}

function renderExtraDocList() {
  var el = document.getElementById('extra-doc-list');
  if (!el) return;
  el.innerHTML = extraDocs.map(function(d, i) {
    return '<div class="doc-item">' +
      '<span class="doc-item-name">&#128196; ' + d.name + '</span>' +
      '<span class="doc-item-size">' + Math.round(d.size / 1024) + 'KB</span>' +
      '<button class="btn btn-red btn-sm" data-di="' + i + '">&#215;</button>' +
    '</div>';
  }).join('');
  el.querySelectorAll('[data-di]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      extraDocs.splice(parseInt(this.getAttribute('data-di')), 1);
      renderExtraDocList();
    });
  });
}

function getSubjects() {
  var subjects = [];
  document.querySelectorAll('.subject-row').forEach(function(row) {
    var id    = row.id.replace('srow-', '');
    var nameEl  = document.getElementById('sname-'  + id);
    var gradeEl = document.getElementById('sgrade-' + id);
    var maxEl   = document.getElementById('smax-'   + id);
    if (nameEl && nameEl.value.trim()) {
      subjects.push({ name: nameEl.value.trim(), grade: gradeEl ? gradeEl.value.trim() : '', max: maxEl ? maxEl.value.trim() : '' });
    }
  });
  return subjects;
}

function regStep(n, skipValidation) {
  if (!skipValidation) {
    if (n === 2 && !validateStep1()) return;
    if (n === 3 && !validateStep2()) return;
  }
  document.querySelectorAll('.form-step').forEach(function(s) { s.classList.remove('on'); });
  var step = document.getElementById('rs' + n); if (step) step.classList.add('on');

  for (var i = 1; i <= 5; i++) {
    var ci  = document.getElementById('rc' + i);
    var li  = document.getElementById('rl' + i);
    var ln  = document.getElementById('rln' + i);
    if (!ci) continue;
    if (i < n)       { ci.className = 'si-circle done'; if (li) li.className = 'si-label';     if (ln) ln.className = 'si-line done'; }
    else if (i === n){ ci.className = 'si-circle act';  if (li) li.className = 'si-label act'; }
    else             { ci.className = 'si-circle';      if (li) li.className = 'si-label';     if (ln) ln.className = 'si-line'; }
  }
  if (n === 5) buildRegSummary();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateStep1() {
  var ids = ['r-name','r-dob','r-email','r-phone','r-nat','r-address','r-target-country','r-target-level','r-target-field'];
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (!el || !el.value.trim()) { alert('Please fill in all required fields in Step 1 — Personal Information.'); if (el) el.focus(); return false; }
  }
  return true;
}

function validateStep2() {
  var ids = ['r-edu-level','r-institution','r-major','r-grad-year','r-edu-duration','r-total-years','r-gpa'];
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (!el || !el.value.trim()) { alert('Please fill in all required fields in Step 2 — Education Background.'); if (el) el.focus(); return false; }
  }
  return true;
}

function buildRegSummary() {
  var name     = (document.getElementById('r-name') || {}).value || '';
  var email    = (document.getElementById('r-email') || {}).value || '';
  var phone    = (document.getElementById('r-phone') || {}).value || '';
  var nat      = (document.getElementById('r-nat') || {}).value || '';
  var tCountry = (document.getElementById('r-target-country') || {}).value || '';
  var tLevel   = (document.getElementById('r-target-level') || {}).value || '';
  var tField   = (document.getElementById('r-target-field') || {}).value || '';
  var eduLvl   = (document.getElementById('r-edu-level') || {}).value || '';
  var inst     = (document.getElementById('r-institution') || {}).value || '';
  var major    = (document.getElementById('r-major') || {}).value || '';
  var gradYr   = (document.getElementById('r-grad-year') || {}).value || '';
  var totalYrs = (document.getElementById('r-total-years') || {}).value || '';
  var gpaScale = (document.getElementById('r-gpa-scale') || {}).value || 'pct';
  var gpaVal   = (document.getElementById('r-gpa') || {}).value || '';
  var gpaPct   = toPercent(gpaVal, gpaScale);
  var ielts    = (document.getElementById('r-ielts') || {}).value || '';
  var toefl    = (document.getElementById('r-toefl') || {}).value || '';
  var subjects = getSubjects();
  var docCount = Object.keys(uploadedDocs).length + extraDocs.length;

  function row(l, v) { return '<div class="sum-row"><span>' + l + '</span><span style="font-weight:500">' + (v || 'Not provided') + '</span></div>'; }

  var el = document.getElementById('reg-summary');
  if (!el) return;
  el.innerHTML =
    '<p class="slabel" style="margin-bottom:.6rem">Personal Information</p>' +
    row('Full Name', name) + row('Email', email) + row('Phone/WhatsApp', phone) +
    row('Nationality', nat) +
    row('Target Program', tLevel + ' in ' + tField + ', ' + tCountry) +
    '<p class="slabel" style="margin:.9rem 0 .6rem">Education</p>' +
    row('Highest Education Level', EDU_LABELS[eduLvl] || eduLvl) +
    row('Institution', inst) + row('Major / Field Studied', major) +
    row('Graduation Year', gradYr) + row('Total Years of Education', totalYrs) +
    row('GPA / Score', gpaVal + ' (' + gpaScale + ') = ' + (gpaPct !== null ? gpaPct + '%' : 'N/A')) +
    row('IELTS Score', ielts || 'Not provided') +
    row('TOEFL Score', toefl || 'Not provided') +
    '<p class="slabel" style="margin:.9rem 0 .6rem">Subjects and Documents</p>' +
    row('Subjects entered', subjects.length + ' subject' + (subjects.length !== 1 ? 's' : '')) +
    row('Documents uploaded', docCount + ' file' + (docCount !== 1 ? 's' : ''));
}

function submitRegistration() {
  var name = (document.getElementById('r-name') || {}).value;
  if (!name || !name.trim()) { alert('Please complete the form.'); return; }

  var gpaScale = (document.getElementById('r-gpa-scale') || {}).value || 'pct';
  var gpaVal   = (document.getElementById('r-gpa') || {}).value || '';
  var gpaPct   = toPercent(gpaVal, gpaScale);

  var applicant = {
    id:        Date.now().toString(),
    createdAt: new Date().toISOString(),
    status:    'pending',
    notes:     '',
    personal: {
      name:          (document.getElementById('r-name') || {}).value.trim(),
      dob:           (document.getElementById('r-dob') || {}).value,
      email:         (document.getElementById('r-email') || {}).value.trim(),
      phone:         (document.getElementById('r-phone') || {}).value.trim(),
      nationality:   (document.getElementById('r-nat') || {}).value,
      passport:      (document.getElementById('r-passport') || {}).value.trim(),
      address:       (document.getElementById('r-address') || {}).value.trim(),
      targetCountry: (document.getElementById('r-target-country') || {}).value,
      targetLevel:   (document.getElementById('r-target-level') || {}).value,
      targetField:   (document.getElementById('r-target-field') || {}).value
    },
    education: {
      level:      (document.getElementById('r-edu-level') || {}).value,
      institution:(document.getElementById('r-institution') || {}).value.trim(),
      major:      (document.getElementById('r-major') || {}).value.trim(),
      gradYear:   (document.getElementById('r-grad-year') || {}).value,
      duration:   (document.getElementById('r-edu-duration') || {}).value,
      totalYears: (document.getElementById('r-total-years') || {}).value,
      gpaScale:   gpaScale,
      gpaVal:     gpaVal,
      gpaPct:     gpaPct,
      ielts:      (document.getElementById('r-ielts') || {}).value,
      toefl:      (document.getElementById('r-toefl') || {}).value,
      italian:    (document.getElementById('r-italian') || {}).value,
      otherLang:  (document.getElementById('r-other-lang') || {}).value.trim()
    },
    subjects:       getSubjects(),
    documents:      uploadedDocs,
    extraDocuments: extraDocs
  };

  saveApplicant(applicant);

  /* Notify admin by email */
  var body =
    'NEW APPLICANT REGISTERED — GLOBAL STUDY HUB\n' +
    '==============================================\n' +
    'Name: '        + applicant.personal.name          + '\n' +
    'Email: '       + applicant.personal.email         + '\n' +
    'Phone: '       + applicant.personal.phone         + '\n' +
    'Nationality: ' + applicant.personal.nationality   + '\n' +
    'Target: '      + applicant.personal.targetLevel   + ' in ' + applicant.personal.targetField + ', ' + applicant.personal.targetCountry + '\n' +
    'Education: '   + (EDU_LABELS[applicant.education.level] || applicant.education.level) + '\n' +
    'GPA: '         + gpaVal + ' (' + gpaScale + ') = ' + (gpaPct !== null ? gpaPct + '%' : 'N/A') + '\n' +
    'IELTS: '       + (applicant.education.ielts || 'Not provided') + '\n' +
    'TOEFL: '       + (applicant.education.toefl || 'Not provided') + '\n' +
    'Subjects: '    + applicant.subjects.length + ' entered\n' +
    'Documents: '   + (Object.keys(applicant.documents).length + applicant.extraDocuments.length) + ' uploaded\n' +
    'Submitted: '   + new Date().toLocaleString();

  window.location.href =
    'mailto:' + EMAIL +
    '?subject=' + encodeURIComponent('New Applicant: ' + applicant.personal.name + ' — Global Study Hub') +
    '&body='    + encodeURIComponent(body);

  /* Also notify via WhatsApp */
  setTimeout(function() {
    wa('Hi! I just registered my student profile on Global Study Hub. My name is ' + applicant.personal.name +
       ' and I am applying for ' + applicant.personal.targetLevel + ' in ' + applicant.personal.targetField +
       ' in ' + applicant.personal.targetCountry + '. Please review my profile.');
  }, 1500);

  var succ = document.getElementById('reg-succ');
  if (succ) succ.style.display = 'block';
}

/* ============================================================
   DATA STORAGE — localStorage
   ============================================================ */
function saveApplicant(applicant) {
  var list    = getApplicants();
  var existing = list.findIndex(function(a) { return a.id === applicant.id; });
  if (existing >= 0) list[existing] = applicant; else list.push(applicant);
  try {
    localStorage.setItem('gsh_applicants', JSON.stringify(list));
  } catch(e) {
    alert('Storage is full. Please ask the admin to export and delete old applicant data.');
  }
}

function getApplicants() {
  try { return JSON.parse(localStorage.getItem('gsh_applicants') || '[]'); }
  catch(e) { return []; }
}

function deleteApplicant(id) {
  if (!confirm('Delete this applicant? This cannot be undone.')) return;
  var list = getApplicants().filter(function(a) { return a.id !== id; });
  localStorage.setItem('gsh_applicants', JSON.stringify(list));
  backToList();
  renderApplicantList();
}

function updateApplicantStatus(id, status) {
  var list = getApplicants();
  var ap   = list.find(function(a) { return a.id === id; });
  if (!ap) return;
  ap.status = status;
  localStorage.setItem('gsh_applicants', JSON.stringify(list));
  renderDetailView(ap);
  renderApplicantList();
}

function saveAdminNotes(id, notes) {
  var list = getApplicants();
  var ap   = list.find(function(a) { return a.id === id; });
  if (!ap) return;
  ap.notes = notes;
  localStorage.setItem('gsh_applicants', JSON.stringify(list));
  alert('Notes saved successfully.');
}

/* ============================================================
   ADMIN SYSTEM
   ============================================================ */
function isAdminLoggedIn() {
  return sessionStorage.getItem('gsh_admin') === 'true';
}

function adminLogin() {
  var pw = (document.getElementById('admin-pw') || {}).value || '';
  if (pw === ADMIN_PASSWORD) {
    sessionStorage.setItem('gsh_admin', 'true');
    var gate = document.getElementById('admin-gate');
    var dash = document.getElementById('admin-dashboard');
    if (gate) gate.style.display = 'none';
    if (dash) dash.style.display = 'block';
    renderApplicantList();
  } else {
    alert('Incorrect password. Please try again.');
    var pwEl = document.getElementById('admin-pw');
    if (pwEl) { pwEl.value = ''; pwEl.focus(); }
  }
}

function adminLogout() {
  sessionStorage.removeItem('gsh_admin');
  var gate = document.getElementById('admin-gate');
  var dash = document.getElementById('admin-dashboard');
  var detv = document.getElementById('admin-detail-view');
  if (gate) gate.style.display = 'block';
  if (dash) dash.style.display = 'none';
  if (detv) detv.style.display = 'none';
  var pwEl = document.getElementById('admin-pw'); if (pwEl) pwEl.value = '';
}

function adminRefresh() { renderApplicantList(); }

function renderApplicantList() {
  if (!isAdminLoggedIn()) return;
  var dash = document.getElementById('admin-dashboard');
  var detv = document.getElementById('admin-detail-view');
  if (dash) dash.style.display = 'block';
  if (detv) detv.style.display = 'none';

  var list    = getApplicants();
  var search  = ((document.getElementById('admin-search-input') || {}).value || '').toLowerCase();
  var statusF = (document.getElementById('admin-status-filter') || {}).value || '';

  /* Stats */
  var statTotal    = document.getElementById('stat-total');
  var statPending  = document.getElementById('stat-pending');
  var statApproved = document.getElementById('stat-approved');
  var countLabel   = document.getElementById('admin-count-label');
  if (statTotal)    statTotal.textContent    = list.length;
  if (statPending)  statPending.textContent  = list.filter(function(a){ return a.status==='pending'; }).length;
  if (statApproved) statApproved.textContent = list.filter(function(a){ return a.status==='approved'; }).length;
  if (countLabel)   countLabel.textContent   = list.length + ' total applicant' + (list.length !== 1 ? 's' : '');

  var filtered = list.filter(function(a) {
    var nm  = ((a.personal && a.personal.name)  || '').toLowerCase();
    var em  = ((a.personal && a.personal.email) || '').toLowerCase();
    var match  = !search || nm.indexOf(search) !== -1 || em.indexOf(search) !== -1;
    var stMatch= !statusF || a.status === statusF;
    return match && stMatch;
  });

  var el = document.getElementById('admin-list');
  if (!el) return;

  if (!filtered.length) {
    el.innerHTML = '<div class="empty-state">&#128100;<br>' +
      (list.length === 0
        ? 'No applicants yet. Share your website link and students will appear here when they register their profiles.'
        : 'No applicants match your search filter.') +
      '</div>';
    return;
  }

  var statusClasses = { pending:'st-pending', reviewing:'st-reviewing', approved:'st-approved', rejected:'st-rejected' };
  var statusLabels  = { pending:'Pending',    reviewing:'Reviewing',    approved:'Approved',    rejected:'Rejected'    };

  el.innerHTML = filtered.map(function(a) {
    var p         = a.personal  || {};
    var e         = a.education || {};
    var initials  = (p.name || '?').split(' ').map(function(w){ return w[0]||''; }).join('').toUpperCase().substring(0, 2);
    var sc        = statusClasses[a.status] || 'st-pending';
    var sl        = statusLabels[a.status]  || 'Pending';
    var date      = a.createdAt ? new Date(a.createdAt).toLocaleDateString() : '';
    var edu       = EDU_LABELS[e.level] || e.level || '';
    var target    = p.targetLevel ? (p.targetLevel + ' in ' + (p.targetField||'') + ', ' + (p.targetCountry||'')) : '';
    var gpaTxt    = e.gpaPct ? e.gpaPct + '%' : 'N/A';
    var docCount  = Object.keys(a.documents || {}).length + (a.extraDocuments || []).length;
    return '<div class="applicant-list-item" data-id="' + a.id + '">' +
      '<div class="applicant-avatar">' + initials + '</div>' +
      '<div class="applicant-info">' +
        '<div class="applicant-name">' + (p.name || 'Unknown') + '</div>' +
        '<div class="applicant-meta">' + (p.email || '') + ' &nbsp;|&nbsp; ' + target + '</div>' +
        '<div class="applicant-meta">' + edu + ' &nbsp;|&nbsp; GPA: ' + gpaTxt + ' &nbsp;|&nbsp; Docs: ' + docCount + ' &nbsp;|&nbsp; ' + date + '</div>' +
      '</div>' +
      '<span class="status-badge ' + sc + '">' + sl + '</span>' +
    '</div>';
  }).join('');

  el.querySelectorAll('.applicant-list-item').forEach(function(item) {
    item.addEventListener('click', function() { openApplicant(this.getAttribute('data-id')); });
  });
}

function openApplicant(id) {
  var ap = getApplicants().find(function(a) { return a.id === id; });
  if (!ap) return;
  renderDetailView(ap);
}

function renderDetailView(ap) {
  var dash = document.getElementById('admin-dashboard');
  var detv = document.getElementById('admin-detail-view');
  if (dash) dash.style.display = 'none';
  if (detv) { detv.style.display = 'block'; detv.setAttribute('data-apid', ap.id); }

  var p = ap.personal  || {};
  var e = ap.education || {};

  var titleEl = document.getElementById('detail-title');
  if (titleEl) titleEl.textContent = (p.name || 'Applicant') + ' — Full Profile';

  /* Status action buttons */
  var sc = { pending:'st-pending', reviewing:'st-reviewing', approved:'st-approved', rejected:'st-rejected' }[ap.status] || 'st-pending';
  var sl = { pending:'Pending',    reviewing:'Reviewing',    approved:'Approved',    rejected:'Rejected'    }[ap.status] || 'Pending';
  var actEl = document.getElementById('admin-actions');
  if (actEl) {
    actEl.innerHTML =
      '<span class="status-badge ' + sc + '" style="font-size:.8rem;padding:5px 14px">Status: ' + sl + '</span>' +
      '<button class="btn btn-out btn-sm" data-action="reviewing">Mark Reviewing</button>' +
      '<button class="btn btn-gold btn-sm" data-action="approved">Approve</button>' +
      '<button class="btn btn-red btn-sm" data-action="rejected">Reject</button>' +
      '<button class="btn btn-wa btn-sm" style="width:auto" id="btn-contact-ap">&#128172; WhatsApp</button>' +
      '<button class="btn btn-out btn-sm" id="btn-delete-ap">&#128465; Delete</button>';
    actEl.querySelectorAll('[data-action]').forEach(function(btn) {
      btn.addEventListener('click', function() { updateApplicantStatus(ap.id, this.getAttribute('data-action')); });
    });
    var waBtn = document.getElementById('btn-contact-ap');
    if (waBtn) waBtn.addEventListener('click', function() { wa('Hi ' + (p.name||'') + '! This is Global Study Hub. We have reviewed your application profile and would like to discuss your options. When is a good time to talk?'); });
    var delBtn = document.getElementById('btn-delete-ap');
    if (delBtn) delBtn.addEventListener('click', function() { deleteApplicant(ap.id); });
  }

  /* Helper for info rows */
  function infoRow(key, val) {
    return '<div class="info-row"><div class="info-key">' + key + '</div><div class="info-val">' + (val || '<span style="color:var(--muted)">Not provided</span>') + '</div></div>';
  }

  /* Personal info */
  var persEl = document.getElementById('detail-personal');
  if (persEl) persEl.innerHTML =
    infoRow('Full Name', p.name) + infoRow('Date of Birth', p.dob) +
    infoRow('Email', p.email)    + infoRow('Phone / WhatsApp', p.phone) +
    infoRow('Nationality', p.nationality) + infoRow('Passport Number', p.passport) +
    infoRow('Current Address', p.address) +
    infoRow('Target Country', p.targetCountry) +
    infoRow('Target Level', p.targetLevel) + infoRow('Target Field', p.targetField);

  /* Education */
  var eduEl = document.getElementById('detail-education');
  if (eduEl) eduEl.innerHTML =
    infoRow('Education Level',  EDU_LABELS[e.level] || e.level) +
    infoRow('Institution',      e.institution) + infoRow('Major / Field', e.major) +
    infoRow('Graduation Year',  e.gradYear)    + infoRow('Duration', (e.duration ? e.duration + ' years' : '')) +
    infoRow('Total Years of Education', e.totalYears) +
    infoRow('GPA Scale',        e.gpaScale)    + infoRow('GPA / Score', e.gpaVal) +
    infoRow('GPA as Percentage', e.gpaPct ? e.gpaPct + '%' : '');

  /* Language */
  var langEl = document.getElementById('detail-language');
  if (langEl) langEl.innerHTML =
    infoRow('IELTS Score', e.ielts) + infoRow('TOEFL Score', e.toefl) +
    infoRow('Italian Level', e.italian) + infoRow('Other Languages', e.otherLang);

  /* Subjects table */
  var subjEl  = document.getElementById('detail-subjects');
  var subjects = ap.subjects || [];
  if (subjEl) {
    if (subjects.length) {
      var tbl = '<table class="subject-table">' +
        '<thead><tr><th>Subject</th><th>Grade / Mark</th><th>Out of / Scale</th></tr></thead><tbody>';
      subjects.forEach(function(s) {
        tbl += '<tr><td>' + s.name + '</td><td>' + s.grade + '</td><td>' + s.max + '</td></tr>';
      });
      tbl += '</tbody></table>';
      subjEl.innerHTML = tbl;
    } else {
      subjEl.innerHTML = '<p style="font-size:.83rem;color:var(--muted)">No subjects entered.</p>';
    }
  }

  /* Documents */
  var docEl  = document.getElementById('detail-documents');
  var allDocs = Object.values(ap.documents || {}).concat(ap.extraDocuments || []);
  if (docEl) {
    if (allDocs.length) {
      docEl.innerHTML = allDocs.map(function(doc) {
        return '<div class="doc-download-item">' +
          '<span class="doc-dl-name">&#128196; ' + doc.name + '</span>' +
          '<span style="font-size:.75rem;color:var(--muted);margin:0 .5rem">' + Math.round(doc.size / 1024) + 'KB</span>' +
          '<a href="' + doc.data + '" download="' + doc.name + '" class="btn btn-gold btn-sm" style="text-decoration:none">&#11015; Download</a>' +
        '</div>';
      }).join('');
    } else {
      docEl.innerHTML = '<p style="font-size:.83rem;color:var(--muted)">No documents uploaded by this applicant.</p>';
    }
  }

  /* Build university match select */
  var matchSel = document.getElementById('match-uni-select');
  if (matchSel) {
    matchSel.innerHTML = '<option value="">— Select university to check —</option>';
    UNIS.forEach(function(u, i) {
      matchSel.innerHTML += '<option value="' + i + '">' + u.n + ' (' + u.co + ')</option>';
    });
  }
  var matchRes = document.getElementById('match-result');
  if (matchRes) matchRes.innerHTML = '';

  /* Admin notes */
  var notesEl = document.getElementById('admin-notes-field');
  if (notesEl) notesEl.value = ap.notes || '';

  /* Wire save-notes button */
  var saveNotesBtn = document.getElementById('btn-save-notes');
  if (saveNotesBtn) {
    saveNotesBtn.onclick = function() {
      var id = (document.getElementById('admin-detail-view') || {}).getAttribute('data-apid');
      var notes = (document.getElementById('admin-notes-field') || {}).value || '';
      saveAdminNotes(id, notes);
    };
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToList() {
  var dash = document.getElementById('admin-dashboard');
  var detv = document.getElementById('admin-detail-view');
  if (dash) dash.style.display = 'block';
  if (detv) detv.style.display = 'none';
}

/* ============================================================
   UNIVERSITY MATCH ENGINE
   Runs inside admin — for a specific applicant vs a university
   ============================================================ */
function runMatch() {
  var detv = document.getElementById('admin-detail-view');
  var apId = detv ? detv.getAttribute('data-apid') : null;
  if (!apId) return;

  var ap = getApplicants().find(function(a) { return a.id === apId; });
  var uniIdxEl = document.getElementById('match-uni-select');
  if (!ap || !uniIdxEl || uniIdxEl.value === '') { alert('Please select a university to check.'); return; }

  var uni = UNIS[parseInt(uniIdxEl.value)];
  if (!uni) return;

  var e       = ap.education || {};
  var p       = ap.personal  || {};
  var results = [];
  var passCount = 0;
  var warnCount = 0;

  /* ── CHECK 1: Education Level ── */
  var appEduOrder = EDU_ORDER[e.level] || 0;
  var targetLevel = p.targetLevel || 'Bachelor';
  var levelOffered = uni.lv.indexOf(targetLevel) !== -1;
  var eduPass = false;
  var eduNote = '';

  if (!levelOffered) {
    eduNote = targetLevel + ' program is NOT offered at this university.';
  } else {
    if (targetLevel === 'Bachelor' && appEduOrder >= 1) { eduPass = true; }
    if (targetLevel === 'Master'   && appEduOrder >= 3) { eduPass = true; }
    if (targetLevel === 'Master'   && appEduOrder === 2) {
      /* 14-year Bachelor — warn but allow */
      eduNote = 'Your 14-year Bachelor (Pass degree) may need individual evaluation. Many Italian/German universities prefer 16-year (Hons) Bachelor for Master admission. Contact us to confirm acceptance.';
      warnCount++;
    }
    if (targetLevel === 'PhD' && appEduOrder >= 4) { eduPass = true; }
    if (!eduPass && !eduNote) eduNote = 'Your current education level may not qualify for a ' + targetLevel + ' program.';
  }

  if (eduPass) passCount++;
  results.push({
    label: 'Education Level',
    your:  EDU_LABELS[e.level] || e.level || 'Not provided',
    req:   'Required for ' + targetLevel + ' program',
    status: !levelOffered ? 'fail' : eduPass ? (eduNote ? 'warn' : 'pass') : 'fail',
    note:   eduNote
  });

  /* ── CHECK 2: GPA / Grade ── */
  var gpaPct  = parseFloat(e.gpaPct);
  var minGpa  = uni.req.minGpaPct || 60;
  var gpaStatus, gpaNote;

  if (isNaN(gpaPct)) {
    gpaStatus = 'warn';
    gpaNote   = 'GPA not provided. Please update the applicant profile with GPA details for accurate assessment.';
    warnCount++;
  } else if (gpaPct >= minGpa) {
    gpaStatus = 'pass';
    gpaNote   = 'GPA of ' + gpaPct + '% meets the minimum requirement of ' + minGpa + '%.';
    passCount++;
  } else {
    gpaStatus = 'fail';
    gpaNote   = 'GPA of ' + gpaPct + '% is below the minimum of ' + minGpa + '%. Some programs may still consider borderline cases — contact us.';
  }
  results.push({ label: 'GPA / Academic Grade', your: isNaN(gpaPct) ? 'Not provided' : gpaPct + '%', req: 'Minimum ' + minGpa + '%', status: gpaStatus, note: gpaNote });

  /* ── CHECK 3: English Language ── */
  var ielts     = parseFloat(e.ielts);
  var toefl     = parseInt(e.toefl);
  var minIelts  = uni.req.minIelts || 6.0;
  var minToefl  = uni.req.minToefl || 79;
  var langPass  = false;
  var langYour  = [];
  var langStatus, langNote;

  if (!isNaN(ielts)) langYour.push('IELTS ' + ielts);
  if (!isNaN(toefl)) langYour.push('TOEFL ' + toefl);
  if (!isNaN(ielts) && ielts >= minIelts) langPass = true;
  if (!isNaN(toefl) && toefl >= minToefl) langPass = true;

  if (!langYour.length) {
    langStatus = 'warn';
    langNote   = 'No language certificate provided. IELTS ' + minIelts + '+ or TOEFL ' + minToefl + '+ required.';
    warnCount++;
  } else if (langPass) {
    langStatus = 'pass';
    langNote   = 'Language scores meet the university requirement.';
    passCount++;
  } else {
    langStatus = 'fail';
    langNote   = 'Scores below requirement. Required: IELTS ' + minIelts + '+ or TOEFL ' + minToefl + '+. Consider retaking.';
  }
  results.push({ label: 'English Language Test', your: langYour.join(' / ') || 'Not provided', req: 'IELTS ' + minIelts + '+ or TOEFL ' + minToefl + '+', status: langStatus, note: langNote });

  /* ── CHECK 4: Field of Study ── */
  var targetField = p.targetField || '';
  var fieldMatch  = uni.f.indexOf(targetField) !== -1;
  if (fieldMatch) {
    passCount++;
    results.push({ label: 'Field of Study', your: targetField, req: 'Offered at this university', status: 'pass', note: 'Your target field is available at ' + uni.n + '.' });
  } else {
    results.push({ label: 'Field of Study', your: targetField || 'Not specified', req: 'Not offered in this field', status: 'fail', note: 'This university does not offer "' + targetField + '". Fields available: ' + uni.f.slice(0, 4).join(', ') + (uni.f.length > 4 ? ' and more.' : '.') });
  }

  /* ── CHECK 5: 14-year Bachelor for Master ── */
  if (e.level === 'ba14' && targetLevel === 'Master') {
    results.push({ label: 'Degree Recognition (14-year)', your: '14-year Bachelor (Pass degree)', req: 'Individual evaluation needed', status: 'warn', note: 'Many Italian and German universities prefer a 16-year Hons Bachelor for Master admission. We will contact the university admissions office to confirm whether your specific qualification is accepted.' });
    warnCount++;
  }

  /* ── Score and Render ── */
  var hardChecks = results.filter(function(r){ return r.status !== 'warn'; });
  var hardPass   = hardChecks.filter(function(r){ return r.status === 'pass'; }).length;
  var pct        = hardChecks.length > 0 ? Math.round((hardPass / hardChecks.length) * 100) : 0;
  var hasWarns   = warnCount > 0;

  var overallStatus, ringClass, matchClass, matchTitle, matchColor;
  if (pct === 100 && !hasWarns) {
    overallStatus = 'ELIGIBLE';
    ringClass     = 'ring-green';
    matchClass    = 'match-eligible';
    matchTitle    = 'ELIGIBLE — Profile Meets All Requirements';
    matchColor    = '#15803d';
  } else if (pct >= 60) {
    overallStatus = 'PARTIALLY ELIGIBLE';
    ringClass     = 'ring-amber';
    matchClass    = 'match-partial';
    matchTitle    = 'PARTIALLY ELIGIBLE — Some Requirements Need Attention';
    matchColor    = '#92400e';
  } else {
    overallStatus = 'NOT ELIGIBLE';
    ringClass     = 'ring-red';
    matchClass    = 'match-ineligible';
    matchTitle    = 'NOT ELIGIBLE — Key Requirements Not Met';
    matchColor    = '#dc2626';
  }

  var html =
    '<div class="match-box ' + matchClass + '" style="text-align:center">' +
    '<div class="match-score-ring ' + ringClass + '">' +
      '<div>' + hardPass + '/' + hardChecks.length + '</div>' +
      '<div style="font-size:.58rem;font-weight:600;letter-spacing:.5px">CRITERIA</div>' +
    '</div>' +
    '<div class="match-title" style="color:' + matchColor + '">' + matchTitle + '</div>' +
    '<p style="font-size:.82rem;color:var(--muted);margin-bottom:1.1rem">University: <strong style="color:var(--navy)">' + uni.n + '</strong> &nbsp;|&nbsp; ' + uni.ci + ', ' + uni.co + '</p>' +

    results.map(function(r) {
      var bc = r.status === 'pass' ? 'mb-pass' : r.status === 'fail' ? 'mb-fail' : 'mb-warn';
      var bl = r.status === 'pass' ? 'PASS'    : r.status === 'fail' ? 'FAIL'    : 'CHECK';
      return '<div class="match-row">' +
        '<div style="text-align:left;flex:1">' +
          '<div class="match-label">' + r.label + '</div>' +
          '<div class="match-val">Your profile: ' + r.your + '&nbsp;|&nbsp; Required: ' + r.req + '</div>' +
          (r.note ? '<div style="font-size:.75rem;color:var(--muted);margin-top:3px">' + r.note + '</div>' : '') +
        '</div>' +
        '<span class="match-badge ' + bc + '" style="margin-left:.75rem">' + bl + '</span>' +
      '</div>';
    }).join('') +

    '<div style="margin-top:1rem;background:rgba(255,255,255,.7);border-radius:var(--r);padding:.9rem;text-align:left">' +
      '<p style="font-size:.82rem;font-weight:600;color:var(--navy);margin-bottom:.4rem">Recommended Next Steps:</p>' +
      (pct === 100 && !hasWarns
        ? '<p style="font-size:.81rem;color:#166534">&#10003; This applicant meets all requirements. You can proceed with the application to ' + uni.n + '.</p>'
        : '<p style="font-size:.81rem;color:#92400e">&#9888; Some criteria need to be resolved before submitting. Contact us on WhatsApp to discuss the options.</p>'
      ) +
    '</div>' +
    '</div>';

  var matchRes = document.getElementById('match-result');
  if (matchRes) matchRes.innerHTML = html;
}

/* ============================================================
   SCHOLARSHIPS
   ============================================================ */
var scholRes = [];
function doSchols() {
  var c = (document.getElementById('s-country') || {}).value || '';
  var l = (document.getElementById('s-level')   || {}).value || '';
  var t = (document.getElementById('s-type')    || {}).value || '';

  scholRes = SCHOLS.filter(function(s) {
    if (c && s.co !== c && s.co.indexOf('Europe') === -1) return false;
    if (l && s.lv.indexOf(l) === -1) return false;
    if (t && s.ty !== t) return false;
    return true;
  });

  var el = document.getElementById('s-results');
  if (!el) return;

  if (!scholRes.length) {
    el.innerHTML = '<div class="empty-state">&#128176;<br>No scholarships match your filters. Try fewer filters.</div>';
    return;
  }

  el.innerHTML = scholRes.map(function(s, i) {
    var tc = s.ty === 'Fully funded' ? 'bgreen' : s.ty === 'Partial' ? 'bblue' : 'bamber';
    return '<div class="card">' +
      '<div class="ct">' + s.nm + '</div>' +
      '<div class="samt">' + s.amt + '</div>' +
      '<div class="bdgs">' +
        '<span class="bdg bnavy">&#128205; ' + s.co + '</span>' +
        '<span class="bdg ' + tc + '">' + s.ty + '</span>' +
        s.lv.map(function(lv){ return '<span class="bdg bgray">' + lv + '</span>'; }).join('') +
      '</div>' +
      '<div class="sbody">' + s.body + '</div>' +
      '<div class="sdl">&#128197; Deadline: ' + s.dl + '</div>' +
      '<button class="btn btn-out btn-sm" style="margin-top:.75rem" data-sci="' + i + '">Get Help Applying</button>' +
    '</div>';
  }).join('');

  el.querySelectorAll('[data-sci]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var s = scholRes[parseInt(this.getAttribute('data-sci'))];
      wa('Hi! I am interested in the ' + s.nm + ' scholarship. Can you help me with the application process?');
    });
  });
}

/* ============================================================
   VISA GUIDE ACCORDION
   ============================================================ */
function buildVisa() {
  var el = document.getElementById('visa-list');
  if (!el || typeof VISA === 'undefined') return;

  el.innerHTML = VISA.map(function(v, i) {
    return '<div class="acc">' +
      '<div class="ach" id="ach-' + i + '">' +
        '<span>' + v.title + '</span>' +
        '<span class="acarr" id="arr-' + i + '">&#9660;</span>' +
      '</div>' +
      '<div class="acb" id="acb-' + i + '">' + v.body + '</div>' +
    '</div>';
  }).join('');

  VISA.forEach(function(v, i) {
    var ach = document.getElementById('ach-' + i);
    if (!ach) return;
    ach.addEventListener('click', function() {
      var isOpen = document.getElementById('acb-' + i).classList.contains('on');
      document.querySelectorAll('.acb').forEach(function(b)  { b.classList.remove('on'); });
      document.querySelectorAll('.acarr').forEach(function(a){ a.classList.remove('on'); });
      if (!isOpen) {
        document.getElementById('acb-' + i).classList.add('on');
        document.getElementById('arr-' + i).classList.add('on');
      }
    });
  });
}

/* ============================================================
   PAYMENT
   ============================================================ */
function togglePm(id) {
  var el = document.getElementById('pm-' + id);
  if (el) el.classList.toggle('on');
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function sendMsg() {
  var name  = ((document.getElementById('c-name')  || {}).value || '').trim();
  var email = ((document.getElementById('c-email') || {}).value || '').trim();
  var msg   = ((document.getElementById('c-msg')   || {}).value || '').trim();
  if (!name || !email || !msg) { alert('Please fill in your name, email and message.'); return; }
  var country = (document.getElementById('c-country') || {}).value || '';
  var service = (document.getElementById('c-service') || {}).value || '';
  var body =
    'Enquiry from Global Study Hub\n\n' +
    'Name: '    + name    + '\n' +
    'Email: '   + email   + '\n' +
    'Country: ' + country + '\n' +
    'Service: ' + service + '\n\n' +
    'Message:\n' + msg + '\n\n' +
    'Date: ' + new Date().toLocaleString();
  window.location.href =
    'mailto:' + EMAIL +
    '?subject=' + encodeURIComponent('Enquiry from ' + name + ' — Global Study Hub') +
    '&body='    + encodeURIComponent(body);
  var succ = document.getElementById('c-succ');
  if (succ) succ.style.display = 'block';
}

/* ============================================================
   INIT — wires all static buttons on page load
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {

  function wireBtn(id, handler) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', handler);
  }

  wireBtn('btn-free-consult', function(){ wa('Hi! I would like to book a free consultation about studying abroad.'); });
  wireBtn('btn-visa-help',    function(){ wa('Hi! I need help with my Italian student visa application.'); });
  wireBtn('btn-schol-help',   function(){ wa('Hi! I am interested in the scholarship search and application service.'); });
  wireBtn('btn-free-wa',      function(){ wa('Hi! I would like a free 30-minute consultation about studying abroad.'); });
  wireBtn('btn-stripe-wa',    function(){ wa('Hi! I would like to pay by card. Please send me a secure Stripe payment link.'); });
  wireBtn('btn-wa-first',     function(){ wa('Hi! I would like to discuss your services and pricing before making any payment.'); });
  wireBtn('btn-contact-wa',   function(){ wa('Hello! I found Global Study Hub and I need help with my university application.'); });
  wireBtn('btn-visa-wa',      function(){ wa('Hi! I need help with my Italian student visa application. Can we go through the steps together?'); });
  wireBtn('btn-save-notes',   function(){
    var id    = (document.getElementById('admin-detail-view') || {}).getAttribute('data-apid');
    var notes = ((document.getElementById('admin-notes-field') || {}).value) || '';
    if (id) saveAdminNotes(id, notes);
  });

  /* Admin: enter key in password field */
  var pwEl = document.getElementById('admin-pw');
  if (pwEl) pwEl.addEventListener('keydown', function(e){ if (e.key === 'Enter') adminLogin(); });

  /* Admin: search and filter inputs */
  var searchIn = document.getElementById('admin-search-input');
  if (searchIn) searchIn.addEventListener('input', function(){ renderApplicantList(); });
  var filterIn = document.getElementById('admin-status-filter');
  if (filterIn) filterIn.addEventListener('change', function(){ renderApplicantList(); });

  /* If admin was already logged in (same browser session) — show dashboard */
  if (isAdminLoggedIn()) {
    var gate = document.getElementById('admin-gate');
    var dash = document.getElementById('admin-dashboard');
    if (gate) gate.style.display = 'none';
    if (dash) dash.style.display = 'block';
  }

  /* Build visa accordion */
  buildVisa();

  /* Run default search (shows first 10 universities) */
  doSearch();

  /* Run default scholarship display */
  doSchols();

  /* Init register form */
  initRegisterForm();
});
