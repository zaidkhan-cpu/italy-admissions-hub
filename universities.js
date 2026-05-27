/* ============================================================
   GLOBAL STUDY HUB — universities.js
   File 1 of 4

   HOW TO UPDATE (every September):
   1. Open this file in Notepad
   2. Press Ctrl+F to search for the university name
   3. Change: fee, op (opens), cl (deadline), req fields
   4. Save and upload to GitHub

   FIELD GUIDE:
   n   = University name
   co  = Country
   ci  = City
   f   = Fields of study offered (array)
   lg  = Language: 'Both', 'English', or 'Italian'
   lv  = Levels offered: 'Bachelor', 'Master', 'PhD'
   fee = Annual tuition fee
   op  = Application opens (month/year)
   cl  = Application deadline for non-EU students
   rk  = Short ranking/description note
   sc  = true if scholarships available
   docs = Required documents list
   req = Admission requirements object:
     age   = Age requirement
     edu   = Education level required
     gpa   = GPA/grade requirement
     lang  = Language test requirement
     other = Other important notes
     eduLvl    = Levels this entry covers (for matching)
     minGpaPct = Minimum GPA in percentage (for auto-match)
     minIelts  = Minimum IELTS score (for auto-match)
     minToefl  = Minimum TOEFL score (for auto-match)
   ============================================================ */

var UNIS = [

  // ╔══════════════════════════════════════════════════════╗
  // ║  ITALY — 25 universities (2026-2027 academic year)  ║
  // ║  ALL non-EU students must ALSO pre-enroll at:       ║
  // ║  www.universitaly.it (national deadline ~July 2026) ║
  // ╚══════════════════════════════════════════════════════╝

  {
    n: 'University of Bologna',
    co: 'Italy', ci: 'Bologna',
    f: ['Engineering','Business and Management','Natural Sciences','Law',
        'Medicine and Health','Economics and Finance','Arts and Humanities','Social Sciences'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–2,992 per year',
    op: 'December 2025', cl: 'April 30, 2026 (non-EU visa)',
    rk: 'Top 5 Italy — Founded 1088 — 100+ English programs', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate (IELTS/TOEFL)','Motivation Letter',
           'Bank Statement','Apostille Stamp','Dichiarazione di Valore'],
    req: {
      age:   'No minimum age. Must have completed secondary education.',
      edu:   'Bachelor: high school diploma (min 12 years total education). Master: relevant Bachelor degree (min 180 ECTS / 3 years). PhD: Master degree required.',
      gpa:   'No strict minimum published. Competitive programs average 65–70%+. Limited-entry programs are selective.',
      lang:  'English programs: IELTS 6.0+ or TOEFL 72+ or Cambridge B2. Italian programs: Italian B2 (CLA test accepted at university).',
      other: 'Max 2 applications per year on Universitaly. Dichiarazione di Valore required from Italian Embassy. Source: unibo.it/en/admissions',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 60, minIelts: 6.0, minToefl: 72
    }
  },

  {
    n: 'Sapienza University of Rome',
    co: 'Italy', ci: 'Rome',
    f: ['Engineering','Natural Sciences','Medicine and Health','Law',
        'Economics and Finance','Architecture and Design','Arts and Humanities'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 300–1,500 per year',
    op: 'December 22, 2025', cl: 'May 15, 2026 (non-EU visa)',
    rk: 'Largest university in Europe — 59 English programs', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement',
           'Apostille Stamp','Dichiarazione di Valore'],
    req: {
      age:   'No minimum age beyond completing secondary education.',
      edu:   'Bachelor: high school diploma (12+ years). Master: relevant Bachelor (min 180 ECTS / 3 years). PhD: Master degree.',
      gpa:   'No strict minimum. Upper-intermediate record expected (55%+). Competitive programs are selective.',
      lang:  'English programs: IELTS 6.0+ or TOEFL 72+ or Duolingo 100+. Italian programs: Italian B2.',
      other: 'Foundation Year available for students needing preparation. Source: uniroma1.it/en',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 55, minIelts: 6.0, minToefl: 72
    }
  },

  {
    n: 'Politecnico di Milano',
    co: 'Italy', ci: 'Milan',
    f: ['Engineering','Architecture and Design','Computer Science'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 900–2,800 per year',
    op: 'October 2025', cl: 'March 31, 2026',
    rk: 'Number 1 Engineering Italy — QS World Top 150', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate (IELTS 6.5+)','Motivation Letter',
           'CV','Bank Statement','Apostille Stamp'],
    req: {
      age:   'No age restriction. Must have completed secondary education.',
      edu:   'Bachelor: high school diploma with strong Maths and Sciences. Master: Bachelor in Engineering/Architecture/Design (min 180 ECTS).',
      gpa:   'Competitive. Bachelor: recommended 70%+. Master: 65%+ minimum. Maths and Sciences grades key.',
      lang:  'English programs: IELTS 6.5+ or TOEFL 90+ or Cambridge B2 First. No Italian required for English programs.',
      other: 'Some Bachelor programs require TOLC admission test (CISIA). Very competitive — apply early. Source: polimi.it/en',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 65, minIelts: 6.5, minToefl: 90
    }
  },

  {
    n: 'University of Padua',
    co: 'Italy', ci: 'Padua',
    f: ['Engineering','Natural Sciences','Medicine and Health',
        'Economics and Finance','Law','Agriculture'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–2,800 per year',
    op: 'November 2025', cl: 'April 30, 2026 (non-EU visa)',
    rk: '2nd oldest in Italy — Strong Sciences and Law', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement',
           'Apostille Stamp','Dichiarazione di Valore'],
    req: {
      age:   'No minimum age beyond secondary school completion.',
      edu:   'Bachelor: high school diploma (12+ years). Master: relevant Bachelor. Foreign degrees evaluated per Lisbon Convention.',
      gpa:   'No strict minimum. Competitive averages around 65%+. Medicine is highly selective.',
      lang:  'English programs: IELTS 6.0+ or TOEFL 79+ or equivalent B2. Italian programs: Italian B2.',
      other: 'Apply first via apply.unipd.it then pre-enroll on Universitaly. Multiple intake rounds available.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 60, minIelts: 6.0, minToefl: 79
    }
  },

  {
    n: 'Politecnico di Torino',
    co: 'Italy', ci: 'Turin',
    f: ['Engineering','Architecture and Design','Computer Science'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 800–2,500 per year',
    op: 'October 2025', cl: 'April 15, 2026',
    rk: 'Top Engineering Italy — Strong industry connections', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','CV',
           'Bank Statement','Apostille Stamp'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma with strong Maths/Physics/Sciences. Master: Engineering Bachelor (min 180 ECTS).',
      gpa:   'Recommended minimum 65%. Grades in Maths and Sciences particularly important.',
      lang:  'English programs: IELTS 6.0+ or TOEFL 78+. Italian programs: Italian B2.',
      other: 'Some Bachelor programs require TOLC-I admission test. Source: polito.it/en',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 65, minIelts: 6.0, minToefl: 78
    }
  },

  {
    n: 'University of Trento',
    co: 'Italy', ci: 'Trento',
    f: ['Engineering','Computer Science','Business and Management',
        'Economics and Finance','Law','Social Sciences'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–2,100 per year',
    op: 'November 2025', cl: 'May 31, 2026',
    rk: 'Top Research University Italy — High student satisfaction', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement','Apostille Stamp'],
    req: {
      age:   'No age restriction beyond secondary education.',
      edu:   'Bachelor: high school diploma (min 12 years). Master: relevant Bachelor degree.',
      gpa:   'No strict minimum. Average accepted GPA around 65–70%.',
      lang:  'English programs: IELTS 6.0+ or TOEFL 80+. Italian programs: Italian B2.',
      other: 'International grants available. Apply via international.unitn.it.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 60, minIelts: 6.0, minToefl: 80
    }
  },

  {
    n: 'University of Florence',
    co: 'Italy', ci: 'Florence',
    f: ['Architecture and Design','Natural Sciences','Business and Management',
        'Medicine and Health','Engineering','Arts and Humanities'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–2,500 per year',
    op: 'January 2026', cl: 'April 30, 2026 (non-EU via Universitaly)',
    rk: 'Historic university — Strong Art, Architecture and Sciences', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement','Apostille Stamp'],
    req: {
      age:   'No minimum age restriction.',
      edu:   'Bachelor: high school diploma. Master: relevant Bachelor (min 180 ECTS). Some programs require specific background.',
      gpa:   'Minimum 60% for most programs. Competitive programs prefer 70%+.',
      lang:  'English programs: IELTS 6.0+ or TOEFL 79+. Italian programs: Italian B2 (CLA test available).',
      other: 'Third intake not open to non-EU residents abroad. Apply in first or second round. Source: apply.unifi.it',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 60, minIelts: 6.0, minToefl: 79
    }
  },

  {
    n: 'University of Milan - La Statale',
    co: 'Italy', ci: 'Milan',
    f: ['Law','Medicine and Health','Natural Sciences',
        'Economics and Finance','Arts and Humanities','Social Sciences'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–2,800 per year',
    op: 'January 22, 2026', cl: 'April 30, 2026 (non-EU visa)',
    rk: 'Largest in Milan — 50+ English programs', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement',
           'Apostille Stamp','Dichiarazione di Valore'],
    req: {
      age:   'No minimum age restriction.',
      edu:   'Bachelor: high school diploma (12+ years). Master: relevant Bachelor degree. PhD: Master degree.',
      gpa:   'No strict minimum. 60%+ generally expected. Medicine is highly competitive.',
      lang:  'English programs: IELTS 6.0+ or TOEFL 79+. Italian programs: Italian B2.',
      other: 'Applications open January 22, 2026. Non-EU visa deadline April 30, 2026. Source: unimi.it',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 60, minIelts: 6.0, minToefl: 79
    }
  },

  {
    n: 'University of Turin',
    co: 'Italy', ci: 'Turin',
    f: ['Medicine and Health','Law','Economics and Finance',
        'Natural Sciences','Arts and Humanities'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–2,600 per year',
    op: 'February 19, 2026', cl: 'Universitaly deadline July 15, 2026',
    rk: 'Top 10 Italy — Strong Medicine and Law', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement',
           'Apostille Stamp','Dichiarazione di Valore'],
    req: {
      age:   'No age restriction. Foundation Programme if home country has less than 12 years schooling.',
      edu:   'Bachelor: high school diploma (min 12 years). All Bachelor programs require TOLC test. Master: relevant Bachelor. 14-year Pakistani Bachelor needs individual evaluation.',
      gpa:   'No strict minimum. Competitive average 65%+.',
      lang:  'English programs: IELTS 6.0+. Italian programs: CISIA ITA-L2 test (min 50/72) or CLIQ-certified Italian B2.',
      other: 'TOLC test required for all Bachelor programs. Universitaly deadline July 15, 2026. Apply via Apply@UniTo. Source: en.unito.it',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 60, minIelts: 6.0, minToefl: 79
    }
  },

  {
    n: 'University of Naples Federico II',
    co: 'Italy', ci: 'Naples',
    f: ['Engineering','Architecture and Design','Natural Sciences',
        'Agriculture','Economics and Finance','Law'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–2,200 per year',
    op: 'October 2025', cl: 'April 30, 2026',
    rk: 'Oldest state university in world — Largest in Southern Italy', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement',
           'Apostille Stamp','Dichiarazione di Valore'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma (12+ years). Master: relevant Bachelor degree.',
      gpa:   'Min 60% or equivalent for most programs.',
      lang:  'English programs: IELTS 6.0+ or TOEFL 79+. Italian programs: Italian B2.',
      other: 'Most affordable major city in Italy. Very strong DSU scholarship opportunities. Founded 1224.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 60, minIelts: 6.0, minToefl: 79
    }
  },

  {
    n: 'University of Pisa',
    co: 'Italy', ci: 'Pisa',
    f: ['Engineering','Computer Science','Natural Sciences',
        'Medicine and Health','Economics and Finance'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–2,500 per year',
    op: 'November 2025', cl: 'April 30, 2026',
    rk: 'Historic research university — Galileo studied here', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement','Apostille Stamp'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma. Master: relevant Bachelor degree.',
      gpa:   'No strict minimum. Strong academic record preferred.',
      lang:  'English programs: IELTS 6.0+. Italian programs: Italian B2.',
      other: 'Apply via admissions.unipi.it. Some programs have admission tests.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 55, minIelts: 6.0, minToefl: 79
    }
  },

  {
    n: 'University of Palermo',
    co: 'Italy', ci: 'Palermo',
    f: ['Engineering','Architecture and Design','Natural Sciences',
        'Economics and Finance','Law','Medicine and Health'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–1,800 per year (NO application fee)',
    op: 'September 2025', cl: 'April 30, 2026',
    rk: 'Largest in Sicily — No application fee for international students', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement',
           'Apostille Stamp','Dichiarazione di Valore'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma (12+ years). Master: relevant Bachelor.',
      gpa:   'No strict minimum. 60%+ generally accepted.',
      lang:  'Most programs in Italian — Italian B2 required. Some English programs available.',
      other: 'No application fee. Most affordable region in Italy. Mediterranean climate. Source: international.unipa.it',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 55, minIelts: 6.0, minToefl: 79
    }
  },

  {
    n: 'University of Verona',
    co: 'Italy', ci: 'Verona',
    f: ['Medicine and Health','Economics and Finance','Law',
        'Business and Management','Natural Sciences'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–2,100 per year (or EUR 1,000 flat for non-EU without ISEE)',
    op: 'October 2025', cl: 'March 31, 2026 (limited-entry)',
    rk: 'Top 20 Italy — Strong Medicine and Economics', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement','Apostille Stamp'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma. Master: relevant Bachelor.',
      gpa:   'Non-EU without Italian ISEE can pay EUR 1,000 flat fee (no income proof needed).',
      lang:  'English programs: IELTS 6.0+. Italian programs: Italian B2.',
      other: 'Less competitive than Milan/Rome. Close to Venice and Lake Garda. Source: univr.it/en',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 55, minIelts: 6.0, minToefl: 79
    }
  },

  {
    n: 'University of Brescia',
    co: 'Italy', ci: 'Brescia',
    f: ['Engineering','Medicine and Health','Economics and Finance','Law'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–1,800 per year',
    op: 'October 2025', cl: 'May 31, 2026',
    rk: 'Strong industry links — Lombardy manufacturing region', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement','Apostille Stamp'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma. Master: relevant Bachelor.',
      gpa:   'No strict minimum.',
      lang:  'English programs: IELTS 6.0+. Italian programs: Italian B2.',
      other: 'Strong links to manufacturing sector. 30 minutes from Milan by train.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 55, minIelts: 6.0, minToefl: 79
    }
  },

  {
    n: 'University of Bergamo',
    co: 'Italy', ci: 'Bergamo',
    f: ['Engineering','Economics and Finance','Business and Management','Law'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–1,600 per year',
    op: 'November 2025', cl: 'May 31, 2026',
    rk: 'Growing international reputation — Close to Milan', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement','Apostille Stamp'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma. Master: relevant Bachelor.',
      gpa:   'No strict minimum.',
      lang:  'English programs: IELTS 6.0+. Italian programs: Italian B2.',
      other: '30 minutes from Milan. Orio al Serio airport in the city. Good value.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 55, minIelts: 6.0, minToefl: 79
    }
  },

  {
    n: 'Ca Foscari University of Venice',
    co: 'Italy', ci: 'Venice',
    f: ['Business and Management','Economics and Finance',
        'Arts and Humanities','Law','Social Sciences'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–2,200 per year',
    op: 'October 2025', cl: 'Universitaly deadline September 30, 2026',
    rk: 'Top Economics and Humanities Italy — Located in Venice', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement','Apostille Stamp'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma. Master: relevant Bachelor.',
      gpa:   'No strict minimum.',
      lang:  'English programs: IELTS 6.0+. Italian programs: Italian B2.',
      other: 'Universitaly deadline September 30, 2026 (latest in Italy). In the heart of Venice.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 55, minIelts: 6.0, minToefl: 79
    }
  },

  {
    n: 'University of Perugia',
    co: 'Italy', ci: 'Perugia',
    f: ['Agriculture','Natural Sciences','Engineering',
        'Medicine and Health','Law','Arts and Humanities'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–2,000 per year',
    op: 'September 2025', cl: 'April 30, 2026',
    rk: 'Famous for Italian language programs — Affordable fees', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement',
           'Apostille Stamp','Dichiarazione di Valore'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma. Master: relevant Bachelor.',
      gpa:   'No strict minimum.',
      lang:  'English programs: IELTS 6.0+. Italian programs: Italian B2. Free Italian language courses available.',
      other: 'Very affordable city. Easy access to Florence and Rome. Universita per Stranieri di Perugia nearby.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 55, minIelts: 6.0, minToefl: 79
    }
  },

  {
    n: 'University of Camerino',
    co: 'Italy', ci: 'Camerino',
    f: ['Engineering','Natural Sciences','Medicine and Health','Law'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 156–1,500 per year (NO application fee)',
    op: 'September 2025', cl: 'April 30, 2026',
    rk: 'No application fee — Very welcoming to international students', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement','Apostille Stamp'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma. Master: relevant Bachelor.',
      gpa:   'No strict minimum. Very accessible for international students.',
      lang:  'English programs: IELTS 6.0+. Italian programs: Italian B2.',
      other: 'No application fee. Small and personal. Scholarships widely available. Free language courses on campus.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 50, minIelts: 6.0, minToefl: 79
    }
  },

  {
    n: 'LUISS Guido Carli',
    co: 'Italy', ci: 'Rome',
    f: ['Business and Management','Economics and Finance','Law','Social Sciences'],
    lg: 'English', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 8,000–14,500 per year',
    op: 'October 2025', cl: 'April 30, 2026',
    rk: 'Number 1 Private University Italy — Top Business and Law', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate (IELTS 6.5+)','Motivation Letter','CV','Bank Statement'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma with strong academic record. Master: relevant Bachelor.',
      gpa:   'Competitive. Bachelor: 75%+ recommended. Master: strong record required.',
      lang:  'All programs in English. IELTS 6.5+ or TOEFL 90+ required.',
      other: 'Entrance exam (LUISS Admission Test) required for Bachelor programs. Private university.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 70, minIelts: 6.5, minToefl: 90
    }
  },

  {
    n: 'Bocconi University',
    co: 'Italy', ci: 'Milan',
    f: ['Business and Management','Economics and Finance','Law'],
    lg: 'English', lv: ['Bachelor','Master'],
    fee: 'EUR 13,700–15,000 per year',
    op: 'October 2025', cl: 'January 15, 2026',
    rk: 'Number 1 Business School Italy — QS World Top 10 Business', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate (IELTS 7.0+)','Motivation Letter','CV','Bank Statement'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma with exceptional record. Master: relevant Bachelor degree.',
      gpa:   'Highly competitive. Bachelor: 80%+ strongly recommended.',
      lang:  'All programs in English. IELTS 7.0+ or TOEFL 100+ preferred.',
      other: 'Entrance exam required for all Bachelor applicants. Most competitive in Italy. Apply early.',
      eduLvl: ['Bachelor','Master'], minGpaPct: 75, minIelts: 7.0, minToefl: 100
    }
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║  GERMANY — Free tuition at all public universities  ║
  // ║  Only semester fee: EUR 100–350                     ║
  // ║  Pakistani FSc (12 yrs) may need Studienkolleg      ║
  // ║  Apply via uni-assist.de for most programs          ║
  // ╚══════════════════════════════════════════════════════╝

  {
    n: 'TU Munich (TUM)',
    co: 'Germany', ci: 'Munich',
    f: ['Engineering','Computer Science','Natural Sciences',
        'Economics and Finance','Business and Management'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 0 tuition + EUR 144 semester fee',
    op: 'October 2025', cl: 'January 15, 2026',
    rk: 'Number 1 Germany — QS World Top 30', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate (IELTS 6.5+)','Motivation Letter',
           'CV','Bank Statement','Apostille Stamp'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma (13 years total — Abitur equivalent). If only 12 years (Pakistani FSc), Studienkolleg (foundation year) required first. Master: relevant Bachelor (min 180 ECTS).',
      gpa:   'Very competitive. Min 70% or equivalent. Many programs require higher.',
      lang:  'English programs: IELTS 6.5+ or TOEFL 88+. German programs: C1 German (DSH-2 or TestDaF 4x4).',
      other: 'Apply via uni-assist.de. DAAD scholarship (EUR 861–1,200/month) widely available. Source: tum.de/en',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 70, minIelts: 6.5, minToefl: 88
    }
  },

  {
    n: 'Heidelberg University',
    co: 'Germany', ci: 'Heidelberg',
    f: ['Medicine and Health','Natural Sciences','Law','Social Sciences'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 0 tuition + EUR 180 semester fee',
    op: 'November 2025', cl: 'January 15, 2026',
    rk: 'Oldest German university — World Top 100 — Founded 1386', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: Abitur or equivalent (13 years). Pakistani FSc may need Studienkolleg. Master: relevant Bachelor.',
      gpa:   'Competitive. 70%+ recommended.',
      lang:  'English programs: IELTS 6.5+. German programs: C1 German (TestDaF or DSH).',
      other: 'DAAD scholarship widely available. Apply via uni-assist.de.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 70, minIelts: 6.5, minToefl: 88
    }
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║  UNITED KINGDOM                                     ║
  // ║  Undergrad: Apply via UCAS by January 29, 2026      ║
  // ║  Chevening scholarship available                    ║
  // ╚══════════════════════════════════════════════════════╝

  {
    n: 'University of Edinburgh',
    co: 'United Kingdom', ci: 'Edinburgh',
    f: ['Engineering','Business and Management','Medicine and Health','Natural Sciences'],
    lg: 'English', lv: ['Bachelor','Master','PhD'],
    fee: 'GBP 23,400–33,100 per year',
    op: 'September 2025', cl: 'January 29, 2026 (UCAS undergraduate)',
    rk: 'Top 20 World — QS World Top 30', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate (IELTS 6.5+)','Motivation Letter / Personal Statement',
           'CV','2 Reference Letters','Bank Statement'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: strong high school (A-levels or equivalent 12–13 years). Master: Bachelor 2:1 or above (65%+).',
      gpa:   'Bachelor: A–B grade equivalent. Master: 2:1 honours (65%+) minimum.',
      lang:  'IELTS 6.5–7.0 (min 6.0 each component) or TOEFL 92+.',
      other: 'Apply via UCAS for undergraduate. Personal statement required (4,000 characters). UK Student Visa required. Chevening Scholarship available.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 65, minIelts: 6.5, minToefl: 92
    }
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║  NETHERLANDS — Apply before February (fills fast)   ║
  // ╚══════════════════════════════════════════════════════╝

  {
    n: 'University of Amsterdam',
    co: 'Netherlands', ci: 'Amsterdam',
    f: ['Business and Management','Social Sciences','Economics and Finance','Law'],
    lg: 'English', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 14,900–18,000 per year (non-EU)',
    op: 'October 2025', cl: 'April 1, 2026',
    rk: 'Top 5 Netherlands — QS World Top 60', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate (IELTS 6.5+)','Motivation Letter','Bank Statement'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma. Master: relevant Bachelor.',
      gpa:   '65%+ recommended.',
      lang:  'All programs in English. IELTS 6.5+ or TOEFL 92+.',
      other: 'Holland Scholarship EUR 5,000 and Amsterdam Excellence Scholarship available.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 65, minIelts: 6.5, minToefl: 92
    }
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║  NORWAY — FREE tuition for ALL students (even non-EU)║
  // ╚══════════════════════════════════════════════════════╝

  {
    n: 'University of Oslo',
    co: 'Norway', ci: 'Oslo',
    f: ['Natural Sciences','Medicine and Health','Law','Social Sciences','Arts and Humanities'],
    lg: 'Both', lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 0 tuition (even non-EU!) + EUR 50 semester fee',
    op: 'October 2025', cl: 'March 1, 2026',
    rk: 'Top Norway — World Top 150 — FREE for ALL students', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate','Motivation Letter','Bank Statement'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school (12+ years). Master: relevant Bachelor.',
      gpa:   '65%+ recommended.',
      lang:  'English programs: IELTS 6.0+. Norwegian programs: B2 Norwegian.',
      other: 'Free tuition for ALL students at Norwegian public universities. Only semester fee EUR 50. High cost of living EUR 1,200–1,500/month.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 60, minIelts: 6.0, minToefl: 80
    }
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║  TURKEY — Affordable + Fully funded scholarship     ║
  // ╚══════════════════════════════════════════════════════╝

  {
    n: 'Bilkent University',
    co: 'Turkey', ci: 'Ankara',
    f: ['Engineering','Business and Management','Computer Science','Economics and Finance'],
    lg: 'English', lv: ['Bachelor','Master','PhD'],
    fee: 'USD 5,500–10,000 per year (scholarships widely available)',
    op: 'September and February intakes', cl: 'June 30 / December 31',
    rk: 'Number 1 Turkey — Turkiye Burslari scholarship available', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate (IELTS 6.0+)','Motivation Letter','Bank Statement'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school diploma. Master: relevant Bachelor.',
      gpa:   'Min 65% for most programs.',
      lang:  'All programs in English. IELTS 6.0+ or TOEFL 79+.',
      other: 'Turkiye Burslari scholarship: fully funded (tuition + accommodation + monthly stipend + round-trip flight + health insurance). Apply at turkiyeburslari.gov.tr.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 65, minIelts: 6.0, minToefl: 79
    }
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║  CANADA                                             ║
  // ╚══════════════════════════════════════════════════════╝

  {
    n: 'University of Toronto',
    co: 'Canada', ci: 'Toronto',
    f: ['Engineering','Computer Science','Business and Management','Medicine and Health'],
    lg: 'English', lv: ['Bachelor','Master','PhD'],
    fee: 'CAD 45,000–60,000 per year',
    op: 'September 2025', cl: 'January 15, 2026',
    rk: 'Top 25 World — QS World Top 25', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate (IELTS 6.5+)','Motivation Letter','CV',
           '2 Reference Letters','Bank Statement','Medical Certificate'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: high school (12 years) with strong grades. Master: relevant Bachelor with min 75%.',
      gpa:   'Highly competitive. Bachelor: 80%+. Master: 75%+ minimum.',
      lang:  'IELTS 6.5+ (min 6.0 per band) or TOEFL 100+.',
      other: 'Study Permit (not a visa) required. Apply via OUAC for Ontario. Police clearance may be needed.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 75, minIelts: 6.5, minToefl: 100
    }
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║  AUSTRALIA — Two main intakes: February and July   ║
  // ╚══════════════════════════════════════════════════════╝

  {
    n: 'University of Melbourne',
    co: 'Australia', ci: 'Melbourne',
    f: ['Engineering','Business and Management','Medicine and Health','Natural Sciences'],
    lg: 'English', lv: ['Bachelor','Master','PhD'],
    fee: 'AUD 38,000–50,000 per year',
    op: 'February and July intakes',
    cl: 'October 31 (Feb intake) / April 30 (July intake)',
    rk: 'Top 3 Australia — QS World Top 15', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate',
           'English Certificate (IELTS 6.5+)','Motivation Letter',
           'CV','Bank Statement','Medical Certificate'],
    req: {
      age:   'No age restriction.',
      edu:   'Bachelor: Year 12 equivalent (12 years). Master: Bachelor with 65%+.',
      gpa:   'Competitive. Bachelor: 70%+. Master: 65%+.',
      lang:  'IELTS 6.5+ (no band below 6.0) or TOEFL 79+.',
      other: 'Student Visa Subclass 500 required. Genuine Temporary Entrant (GTE) statement required. Australia Awards Scholarship available.',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 65, minIelts: 6.5, minToefl: 79
    }
  }

  /*
   ============================================================
   TO ADD A NEW UNIVERSITY — copy the block below and paste
   before the last ] then fill in the values:

  ,{
    n: 'University Name',
    co: 'Country', ci: 'City',
    f: ['Field 1','Field 2'],
    lg: 'Both',  // 'Both', 'English', or 'Italian'
    lv: ['Bachelor','Master','PhD'],
    fee: 'EUR 000–000 per year',
    op: 'Month Year', cl: 'Deadline info',
    rk: 'Short description', sc: true,
    docs: ['Passport','Academic Transcripts','Degree Certificate','English Certificate','Motivation Letter','Bank Statement'],
    req: {
      age:   'Age requirement',
      edu:   'Education requirement',
      gpa:   'GPA requirement',
      lang:  'Language test requirement',
      other: 'Other notes',
      eduLvl: ['Bachelor','Master','PhD'], minGpaPct: 60, minIelts: 6.0, minToefl: 79
    }
  }
   ============================================================
  */
];
