/* ============================================================
   GLOBAL STUDY HUB — scholarships.js
   File 2 of 4

   Contains:
   - SCHOLS  : All scholarship data
   - VISA    : Visa guide steps (Italy)

   HOW TO UPDATE:
   1. Open this file in Notepad
   2. Find the scholarship by name (Ctrl+F)
   3. Change: amt (amount), dl (deadline), body (description)
   4. Save and upload to GitHub

   To ADD a new scholarship — copy any block below
   and paste before the last ]; then fill in values.
   ============================================================ */

/* ============================================================
   SCHOLARSHIPS
   nm   = Scholarship name
   co   = Country / Region
   lv   = Levels: 'Bachelor', 'Master', 'PhD'
   ty   = Type: 'Fully funded', 'Partial', 'Fee waiver'
   amt  = Amount / what is covered
   body = Description shown to students
   dl   = Application deadline (update every year)
   ============================================================ */
var SCHOLS = [

  {
    nm: 'DSU Regional Scholarship (Italy - All Regions)',
    co: 'Italy',
    lv: ['Bachelor','Master','PhD'],
    ty: 'Fully funded',
    amt: 'Up to EUR 6,300 per year + free university cafeteria meals',
    body: 'Income and merit-based. Covers full tuition fee waiver PLUS monthly living allowance (amount varies by region and family income ISEE). Available at almost all Italian public universities. Apply as soon as you enroll. One of the best grants for non-EU students in Italy. Amount: approx EUR 2,600/year for students with accommodation, up to EUR 6,300 for students from lower-income families.',
    dl: 'August-September each year — apply immediately after university enrollment. Check your regional DSU website (e.g. dsu.toscana.it for Tuscany, dsu.unibocconi.it for Bocconi).'
  },

  {
    nm: 'MAECI Italian Government Scholarship',
    co: 'Italy',
    lv: ['Bachelor','Master','PhD'],
    ty: 'Fully funded',
    amt: 'EUR 900 per month + full tuition waiver',
    body: 'Offered by the Italian Ministry of Foreign Affairs (MAECI) to non-EU students. Covers tuition, monthly living allowance and travel costs. Apply through the Italian Embassy in your country. Very competitive — requires strong academic record.',
    dl: 'March-April each year. Apply at esteri.it/en/diplomazia-culturale-e-pubblica/borse-di-studio'
  },

  {
    nm: 'University of Bologna - Unibo Action 2',
    co: 'Italy',
    lv: ['Master'],
    ty: 'Fully funded',
    amt: 'EUR 11,059 per year (full grant)',
    body: 'Full scholarship covering tuition and living stipend for top international Master students. Very competitive — requires very high academic grades. Awarded at the time of enrollment.',
    dl: 'April each year. Check unibo.it/en/international/study-at-unibo/international-scholarship'
  },

  {
    nm: 'Politecnico di Milano - PoliMi International Fellowships',
    co: 'Italy',
    lv: ['Master'],
    ty: 'Fully funded',
    amt: 'EUR 5,000–8,000 per year',
    body: 'For high-achieving international students applying to Master programs at Politecnico di Milano. Competitive — based on academic merit and test scores.',
    dl: 'March each year. Check polimi.it/en/education/masters-of-science/scholarships'
  },

  {
    nm: 'DAAD Scholarship (Germany)',
    co: 'Germany',
    lv: ['Master','PhD'],
    ty: 'Fully funded',
    amt: 'EUR 861–1,200 per month + health insurance + travel allowance',
    body: 'Germany largest scholarship program for international students. Covers living expenses, health insurance and travel. Apply via DAAD office in your country or directly at daad.de. Wide range of programs. Very competitive but many slots available each year.',
    dl: 'October each year for the following year. Check daad.de/en/study-and-research-in-germany/scholarships'
  },

  {
    nm: 'Erasmus Mundus Joint Master (Europe - Multiple Countries)',
    co: 'Europe',
    lv: ['Master'],
    ty: 'Fully funded',
    amt: 'EUR 800–1,200 per month + EUR 4,500 travel allowance + tuition waiver',
    body: 'European Commission scholarship for joint Master programs. You study in at least 2 different EU countries. Over 200 programs available in Engineering, Sciences, Business, Arts and more. Apply 1 year before your program starts. Very competitive.',
    dl: 'January-February each year. Check eacea.ec.europa.eu/erasmus-plus/actions/erasmus-mundus'
  },

  {
    nm: 'Chevening Scholarship (United Kingdom)',
    co: 'United Kingdom',
    lv: ['Master'],
    ty: 'Fully funded',
    amt: 'Full tuition + GBP 1,169 per month living allowance + travel + extras',
    body: 'UK Government scholarship for future global leaders. Covers 1-year Master at any UK university. Requires minimum 2 years work experience and strong leadership record. Highly competitive. Apply at chevening.org.',
    dl: 'November each year — 1 year before your studies start. Check chevening.org/apply'
  },

  {
    nm: 'Holland Scholarship (Netherlands)',
    co: 'Netherlands',
    lv: ['Bachelor','Master'],
    ty: 'Partial',
    amt: 'EUR 5,000 one-time payment',
    body: 'For non-EU students applying to Dutch universities for the first time. Merit-based. Multiple Dutch universities participate including University of Amsterdam, Delft, Leiden and others. Apply through your chosen university admissions office.',
    dl: 'February each year. Check studyinholland.nl/scholarships/find-a-scholarship/holland-scholarship'
  },

  {
    nm: 'Swedish Institute Scholarship',
    co: 'Sweden',
    lv: ['Master'],
    ty: 'Fully funded',
    amt: 'SEK 11,000 per month + tuition waiver + travel grant',
    body: 'For students from specific eligible countries including Pakistan, Afghanistan, Bangladesh, Nigeria and many others. Focus on leadership and global development. Apply at si.se. Very competitive — requires leadership experience.',
    dl: 'February each year. Check si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals'
  },

  {
    nm: 'Turkiye Burslari - Turkish Government Scholarship',
    co: 'Turkey',
    lv: ['Bachelor','Master','PhD'],
    ty: 'Fully funded',
    amt: 'Monthly stipend + full tuition + government accommodation + round-trip flight + health insurance',
    body: 'Turkish Government fully funded scholarship covering literally everything. Tuition, accommodation in government dormitory, monthly allowance, international flights and health insurance. Open to students from 180+ countries. Very popular with Pakistani and Afghan students. Apply at turkiyeburslari.gov.tr.',
    dl: 'February each year. Apply at turkiyeburslari.gov.tr. Results announced May-June.'
  },

  {
    nm: 'Australia Awards Scholarship',
    co: 'Australia',
    lv: ['Bachelor','Master','PhD'],
    ty: 'Fully funded',
    amt: 'Full tuition + AUD 30,000 per year living allowance + return flights + health insurance',
    body: 'Australian Government scholarship for students from developing countries. Covers everything: tuition, living expenses, return flights and health insurance. Leadership focused. Very competitive. Apply at dfat.gov.au/australiaawards.',
    dl: 'April-May each year. Check dfat.gov.au/people-to-people/australia-awards'
  },

  {
    nm: 'MEXT Japanese Government Scholarship',
    co: 'Japan',
    lv: ['Bachelor','Master','PhD'],
    ty: 'Fully funded',
    amt: 'JPY 117,000–145,000 per month + tuition waiver + round-trip flight',
    body: 'Japanese Government fully funded scholarship. Apply via Japanese Embassy in your country (Embassy recommendation) or directly through a Japanese university (university recommendation). Includes 1 year free Japanese language training before degree starts.',
    dl: 'March-May each year via Japanese Embassy. Check mext.go.jp/en/policy/education/highered/title02'
  },

  {
    nm: 'Eiffel Excellence Scholarship (France)',
    co: 'France',
    lv: ['Master','PhD'],
    ty: 'Fully funded',
    amt: 'EUR 1,181 per month (Master) / EUR 1,400 per month (PhD)',
    body: 'French Ministry of Foreign Affairs scholarship for top international students at French universities. Covers living allowance, health insurance, return flight and cultural activities. Apply through your chosen French university.',
    dl: 'January each year. Check campusfrance.org/en/eiffel-excellence-scholarship-program'
  },

  {
    nm: 'KTH Global Scholarship (Sweden)',
    co: 'Sweden',
    lv: ['Master'],
    ty: 'Fee waiver',
    amt: 'Full tuition fee waiver (worth SEK 80,000–120,000 per year)',
    body: 'For academically excellent non-EU students applying to Master programs at KTH Royal Institute of Technology. Merit-based. Does not cover living costs — you need to show proof of funds for accommodation.',
    dl: 'January each year. Check kth.se/en/studies/master/general/scholarships'
  }

];

/* ============================================================
   VISA GUIDE — Italy Type D Student Visa
   Step-by-step accordion content
   Source: Italian Embassy guidelines + universitaly.it
   Update when Ministry circulars published (usually May each year)

   title = Step title shown in accordion header
   body  = HTML content shown when accordion opens
   ============================================================ */
var VISA = [

  {
    title: 'Step 1 — Apply to the university and get an acceptance letter',
    body: '<p>Before anything else, apply directly to the Italian university and receive an official <strong>acceptance letter or conditional offer</strong>. Without this you cannot proceed to the visa step.<br><br>' +
          'Most universities have their own online portal. Check programs at <strong><a href="https://www.universitaly.it" target="_blank">www.universitaly.it</a></strong> — the official Italian Ministry portal. Also check individual university websites for their specific deadlines.<br><br>' +
          'Non-EU visa applicant deadlines are typically <strong>April–May 2026</strong> for the September 2026 intake. Apply as early as possible — some programs have limited places for non-EU students.</p>'
  },

  {
    title: 'Step 2 — Dichiarazione di Valore (Critical for Pakistan and Afghanistan)',
    body: '<p>The <strong>Dichiarazione di Valore (DoV)</strong> is an official document issued ONLY by the Italian Embassy in your home country. It certifies that your degree is valid and equivalent to an Italian qualification. <strong>Without it, you cannot enroll at an Italian university.</strong><br><br>' +
          '<strong>For Pakistani students:</strong><br>' +
          '&bull; A <strong>16-year Bachelor (Hons / 4-year)</strong> is fully recognised for Master admission<br>' +
          '&bull; A <strong>14-year Bachelor (Pass / 2-year)</strong> may NOT be accepted for Master at most universities. Some accept it with conditions — contact us to check.<br>' +
          '&bull; FSc / Intermediate / Matric alone qualifies for Bachelor programs<br><br>' +
          '<strong>Request your DoV from the Italian Embassy in Islamabad or Karachi at least 3–4 months before your application deadline.</strong> It takes significant time to process. This is completely separate from the visa application itself.</p>'
  },

  {
    title: 'Step 3 — Pre-enroll on Universitaly.it (MANDATORY for visa)',
    body: '<p>After receiving your acceptance letter, ALL non-EU students who need an Italian study visa MUST complete pre-enrollment on <strong><a href="https://www.universitaly.it" target="_blank">www.universitaly.it</a></strong> — the official Italian Ministry of University and Research (MUR) portal.<br><br>' +
          '<strong>This is required by Italian law. The Embassy will NOT issue your visa without Universitaly confirmation.</strong><br><br>' +
          'For 2026–2027 intake: national Universitaly deadline is approximately <strong>July 2026</strong>. Some universities have earlier individual deadlines — always check both.<br><br>' +
          'Documents to upload on Universitaly: passport, degree certificates with translation, transcripts, acceptance letter, passport photo, Dichiarazione di Valore.</p>'
  },

  {
    title: 'Step 4 — Apply for your student visa (Type D) at the Italian Embassy',
    body: '<p>After Universitaly processes your pre-enrollment, apply for a <strong>Visto Nazionale Type D</strong> at the Italian Embassy or Consulate in your home country.<br><br>' +
          '<strong>Documents required:</strong></p>' +
          '<div>' +
          ['Valid passport (valid at least 3 months beyond your course end date)',
           'Universitaly pre-enrollment confirmation printout',
           'Official university acceptance letter',
           'Proof of financial means — minimum EUR 448.07 per month of your stay in Italy',
           'Proof of accommodation in Italy (rental contract or university dorm confirmation letter)',
           '2–4 recent passport photos (white background, full face visible)',
           'Health insurance valid in Italy or EU for the full study period',
           'Visa fee approximately EUR 50–116 depending on your country',
           'Academic transcripts and degree certificates — officially translated and apostilled',
           'Dichiarazione di Valore',
           'Completed and signed Italian visa application form (available at Embassy)'
          ].map(function(d){ return '<div class="drow"><div class="ddot"></div><span>' + d + '</span></div>'; }).join('') +
          '</div>'
  },

  {
    title: 'Step 5 — Financial proof — how much money must you show',
    body: '<p>You must prove financial means of <strong>at least EUR 448.07 per month</strong> of your planned stay in Italy.<br><br>' +
          'For a 9-month academic year = roughly <strong>EUR 4,000–4,500 minimum</strong>.<br><br>' +
          '<strong>Accepted proof:</strong><br>' +
          '&bull; Personal or family bank statements (last 3–6 months)<br>' +
          '&bull; Scholarship award letter (DSU, MAECI, etc.) — this alone is usually sufficient<br>' +
          '&bull; Sponsor letter with their bank statements<br>' +
          '&bull; Combination of the above<br><br>' +
          '<strong>Important:</strong> Large deposits made shortly before the application are questioned by Embassies. Money should have been in the account for at least 3 months and its source must be explainable (salary, savings, family funds etc.)</p>'
  },

  {
    title: 'Key dates for 2026–2027 academic year',
    body: '<p><strong>September 2026 intake (main intake — most students):</strong><br>' +
          'Apply to university: December 2025 to April/May 2026<br>' +
          'Complete Universitaly pre-enrollment: by approximately July 2026<br>' +
          'Visa appointment at Embassy: May to August 2026<br>' +
          'Italian Ministry visa deadline: November 30, 2026<br>' +
          'Arrive in Italy: August to September 2026<br><br>' +
          '<strong>February 2027 intake (smaller — not all universities):</strong><br>' +
          'Apply to university: June to October 2026<br>' +
          'Visa appointment: November to December 2026<br>' +
          'Arrive in Italy: January 2027<br><br>' +
          '<strong>Book your Embassy appointment early. Slots fill up very fast especially in Pakistan and Afghanistan — sometimes 2–3 months in advance.</strong></p>'
  },

  {
    title: 'After arrival in Italy — your first 8 days checklist',
    body: '<div>' +
          ['DAYS 1–8 (MANDATORY BY LAW): Go to any Poste Italiane (Post Office) with your Immigration Kit envelope — apply for Permesso di Soggiorno per Motivi di Studio. You will receive a receipt. Your actual card arrives in 1–3 months.',
           'DAYS 1–5: Get your Codice Fiscale (Italian tax number) at Agenzia delle Entrate — completely free, takes 15 minutes. Required for everything: phone SIM card, bank account, university enrollment, renting a room.',
           'DAYS 3–10: Register at your university International Students Office with your passport, visa, and acceptance letter. Get your student ID and activate your university email address.',
           'DAYS 5–14: Open a bank account — N26 (free, fully online, English language) or Buddybank are easiest for new international students. You need Codice Fiscale first.',
           'FIRST MONTH: Apply for DSU regional scholarship if your family income qualifies — up to EUR 6,300 per year plus free cafeteria meals. Application opens after university enrollment.',
           'WITHIN 60 DAYS: Your Permesso di Soggiorno card will be issued and sent to the Post Office. You will receive a notification. Collect it and always carry it with you.'
          ].map(function(d){ return '<div class="drow"><div class="ddot"></div><span>' + d + '</span></div>'; }).join('') +
          '</div>'
  }

];
