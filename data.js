const STYLES = {
  genz: [
    {id:'neon-noir',name:'Neon Noir',desc:'Ciemne tło, neonowe akcenty, cyberpunk vibe'},
    {id:'anime-glow',name:'Anime Glow',desc:'Styl anime z efektem glow i dynamiczną pozą'},
    {id:'glitch-pop',name:'Glitch Pop',desc:'Cyfrowe glitche, nasycone kolory, pop-art energia'},
    {id:'ink-minimal',name:'Ink Minimal',desc:'Czarny tusz na białym, minimalistyczna linia'},
  ],
  millennial: [
    {id:'watercolor',name:'Akwarela',desc:'Subtelne przejścia, ciepłe tony, organiczna faktura'},
    {id:'oil-modern',name:'Olej współczesny',desc:'Nowoczesna technika olejna, ekspresyjne pociągnięcia'},
    {id:'pencil-soft',name:'Ołówek miękki',desc:'Realistyczny rysunek ołówkiem, cieniowanie sfumato'},
    {id:'mixed-media',name:'Mixed media',desc:'Kolaż technik — tusz, akwarela i kolorowy papier'},
  ],
  klasyk: [
    {id:'charcoal',name:'Węgiel klasyczny',desc:'Tradycyjny portret węglem na papierze archiwalnym'},
    {id:'oil-classical',name:'Olej renesansowy',desc:'Klasyczna technika warstwowa, ciemne tło, złote tony'},
    {id:'sepia-ink',name:'Tusz w sepii',desc:'Ciepła sepia, technika lawowania, akcentowane detale'},
    {id:'pastel-portrait',name:'Pastel suchy',desc:'Delikatne tony pastelowe, miękkie przejścia'},
  ],
  dzieci: [
    {id:'fairytale',name:'Bajkowa ilustracja',desc:'Kolorowy styl książeczki z bajkami, ciepłe tło'},
    {id:'cartoon-fun',name:'Wesoły cartoon',desc:'Duże oczy, jasne kolory, zabawne proporcje'},
    {id:'watercolor-kids',name:'Akwarela dziecięca',desc:'Delikatna akwarela w pastelowych tonach'},
    {id:'storybook',name:'Ze świata baśni',desc:'Styl rodem z ilustracji braci Grimm — magiczny las'},
  ],
  zwierzaki: [
    {id:'pet-royal',name:'Królewski portret',desc:'Twój pupil w szlacheckim stroju, klasyczne tło olejne'},
    {id:'pet-watercolor',name:'Akwarela zwierzęca',desc:'Delikatna akwarela oddająca charakter i osobowość pupila'},
    {id:'pet-comic',name:'Komiksowy bohater',desc:'Dynamiczny styl komiksowy — Twój pupil jako superbohater'},
    {id:'pet-botanical',name:'Portret botaniczny',desc:'Pupil wśród kwiatów i roślin, styl ilustracji przyrodniczej'},
  ],
};

const SUBJECTS = [
  {id:'woman',icon:'👩',label:'Kobieta'},
  {id:'man',icon:'👨',label:'Mężczyzna'},
  {id:'couple',icon:'💑',label:'Para'},
];

const CONCEPTS = [
  {id:'solo',name:'Portret solo',desc:'Popiersie na neutralnym tle — klasyka gatunku'},
  {id:'outdoor',name:'W plenerze',desc:'Naturalne światło, nieformalna poza, rozmyte tło'},
  {id:'studio',name:'Sesja studyjna',desc:'Kontrolowane oświetlenie, profesjonalne ujęcie'},
  {id:'lifestyle',name:'Lifestyle',desc:'W domowym otoczeniu, z ulubionymi przedmiotami'},
  {id:'artistic',name:'Artystyczny',desc:'Kreatywna kompozycja, niecodzienne kadry i rekwizyty'},
];

const MEDIA = [
  {id:'canvas',name:'Płótno',desc:'Naciągnięte na blejtram, gotowe do powieszenia',base:249},
  {id:'poster',name:'Plakat',desc:'Druk premium na papierze 300g/m², mat lub połysk',base:149},
  {id:'digital',name:'Plik cyfrowy',desc:'PNG + SVG w rozdzielczości galeryjnej',base:99,vid:540},
];

const SIZES = {
  canvas:[
    {id:'40x50',label:'40×50 cm',add:0,  vid:524},
    {id:'50x70',label:'50×70 cm',add:80, vid:525},
    {id:'60x80',label:'60×80 cm',add:180,vid:526},
    {id:'70x100',label:'70×100 cm',add:320,vid:527},
  ],
  poster:[
    {id:'A4',label:'A4 (21×30)',add:0,  vid:535},
    {id:'A3',label:'A3 (30×42)',add:40, vid:536},
    {id:'A2',label:'A2 (42×59)',add:90, vid:537},
  ],
};

const THEME_NAMES = {genz:'Gen Z',millennial:'Millenialsi',klasyk:'Klasyk',dzieci:'Dzieci',zwierzaki:'Zwierzaki'};

const WOO_PRODUCT_ID = '522';

const CONTENT = {
  genz:{
    logo:'MÓJ PORTRET',bgText:'PORTRET',
    heroTag:'// Personalizowane portrety nowej generacji',
    heroTitle:'<span class="stroke">TWOJA</span> TWARZ<br><span class="accent" data-text="TWOJA">TWOJA</span> <span class="stroke">SZTUKA</span>',
    heroSub:'Nie kolejny filtr. Nie AI slop. Prawdziwy portret tworzony dla Ciebie — cyfrowy, drukowany, w ramce. Sztuka, która wygląda jak Ty, ale lepiej.',
    ctaBtn:'Wybierz swój styl',scrollText:'Jak to działa',
    marquee:['Cyfrowy portret','Druk premium','Spersonalizowany styl','Unikatowe dzieło','Idealny prezent','Gotowe w 48h'],
    formLabel:'// Konfigurator portretu',formTitle:'STWÓRZ SWÓJ<br>PORTRET',
    processLabel:'// 002 — Proces',
    steps:[
      {num:'01',title:'Wyślij zdjęcie',desc:'Jedno selfie, zdjęcie z wakacji, cokolwiek. Im bardziej Ty, tym lepiej.'},
      {num:'02',title:'Wybierz styl',desc:'Neon noir, anime glow, oil classical, ink minimal — Ty decydujesz o vibe\'ie.'},
      {num:'03',title:'Tworzymy',desc:'Nasz artysta pracuje nad Twoim portretem. Gotowe w 48 godzin.'},
      {num:'04',title:'Dostajesz sztukę',desc:'Plik cyfrowy od razu, druk w 3–5 dni roboczych. Tracking included.'},
    ],
    ctaLabel:'// 003 — Let\'s go',
    ctaHeadline:'ZRÓB SOBIE<br><span style="color:var(--accent)">SZTUKĘ</span>',
    ctaSub:'Wrzuć zdjęcie, wybierz styl, reszta po naszej stronie. Zero cringe, pełen portret w 48h.',
    ctaFinalBtn:'Zamów teraz →',
    footerLinks:['Instagram','TikTok','Kontakt'],
  },
  millennial:{
    logo:'Mój Portret',bgText:'Portret',
    heroTag:'Personalizowana sztuka portretowa',
    heroTitle:'Portret, który<br><span class="accent" data-text="opowiada">opowiada</span><br><span class="stroke">Twoją historię</span>',
    heroSub:'Nie masowa produkcja, nie algorytm. Ręcznie tworzone portrety, które łapią to, czym naprawdę jesteś — ciepło, charakter, tę jedną rzecz, której aparat nigdy nie złapie.',
    ctaBtn:'Odkryj kolekcję',scrollText:'Poznaj proces',
    marquee:['Ręcznie tworzone','Papier archiwalny','Dębowe ramy','Personalizacja stylu','Prezent z duszą','Darmowa dostawa'],
    formLabel:'Konfigurator — Twój portret krok po kroku',formTitle:'Zaprojektuj swój<br>portret',
    processLabel:'Proces — Cztery kroki do Twojego portretu',
    steps:[
      {num:'01',title:'Podziel się zdjęciem',desc:'Wybierz zdjęcie, które mówi coś o Tobie. Uśmiech, zamyślenie, moment — wszystko działa.'},
      {num:'02',title:'Dopasuj estetykę',desc:'Akwarela, olej, węgiel, tusz. Razem dobieramy styl, który pasuje do Twojej przestrzeni.'},
      {num:'03',title:'Artysta tworzy',desc:'Każdy portret powstaje z uważnością. Zatwierdzasz szkic zanim przejdziemy do finalnej wersji.'},
      {num:'04',title:'Dostarczamy z troską',desc:'Bezpieczna wysyłka, piękne opakowanie. Druki w 5–7 dni roboczych, ramy w 10–14 dni.'},
    ],
    ctaLabel:'Twój portret czeka',
    ctaHeadline:'Sztuka, która<br><span style="color:var(--accent)">zostanie</span>',
    ctaSub:'Prezent dla bliskiej osoby albo dla siebie. Portret, który za dwadzieścia lat będzie znaczył jeszcze więcej niż dziś.',
    ctaFinalBtn:'Zamów portret →',
    footerLinks:['Instagram','Pinterest','Kontakt'],
  },
  klasyk:{
    logo:'Mój Portret',bgText:'Portret',
    heroTag:'Pracownia portretowa — od 2024 roku',
    heroTitle:'Portret malowany<br><span class="accent" data-text="z szacunkiem">z szacunkiem</span><br><span class="stroke">dla człowieka</span>',
    heroSub:'Wierzymy, że każda twarz niesie w sobie historię. Nasi artyści tworzą portrety, które oddają godność, charakter i piękno lat przeżytych z sensem.',
    ctaBtn:'Zobacz kolekcję',scrollText:'Jak zamawiamy',
    marquee:['Technika olejna','Papier muzealny','Ramy ręcznie robione','Certyfikat autentyczności','Gwarancja satysfakcji','Darmowa konsultacja'],
    formLabel:'Zamówienie portretu',formTitle:'Trzy kroki do<br>Twojego portretu',
    processLabel:'Nasz proces — spokojny i przemyślany',
    steps:[
      {num:'I',title:'Konsultacja',desc:'Rozmawiamy o Państwa oczekiwaniach. Pomagamy wybrać zdjęcie, styl i format. Bez pośpiechu, bez zobowiązań.'},
      {num:'II',title:'Szkic do akceptacji',desc:'Artysta przygotowuje wstępny szkic kompozycji. Zatwierdzają Państwo kierunek zanim zaczniemy właściwą pracę.'},
      {num:'III',title:'Realizacja',desc:'Portret powstaje w pracowni. Na każdym etapie mogą Państwo zobaczyć postępy i zgłosić uwagi.'},
      {num:'IV',title:'Odbiór',desc:'Starannie zapakowany portret dostarczamy pod wskazany adres. Możliwy odbiór osobisty w Warszawie.'},
    ],
    ctaLabel:'Zamówienie portretu',
    ctaHeadline:'Portret, który<br><span style="color:var(--accent)">przetrwa</span>',
    ctaSub:'Dla siebie, dla bliskich, dla kolejnych pokoleń. Zapraszamy do rozmowy — chętnie doradzimy i pomożemy wybrać najlepszą formę.',
    ctaFinalBtn:'Umów konsultację →',
    footerLinks:['Facebook','Telefon','Kontakt'],
  },
  dzieci:{
    logo:'Moja Przygoda',bgText:'Bajka',
    heroTag:'Portrety dla małych bohaterów!',
    heroTitle:'Twoje dziecko<br><span class="accent" data-text="w bajce">w bajce</span><br><span class="stroke">na obrazku!</span>',
    heroSub:'Zamieniamy zdjęcie Twojego dziecka w bajkowy portret, który można powiesić nad łóżeczkiem, podarować babci albo po prostu się nim zachwycać!',
    ctaBtn:'Stwórz portret!',scrollText:'Jak to robimy?',
    marquee:['Bajkowy portret','Kolorowe światy','Idealny prezent','Imię na obrazku','Bezpieczne materiały','Uśmiech gwarantowany'],
    formLabel:'Stwórz bajkowy portret!',formTitle:'Krok po kroku<br>do magii!',
    processLabel:'Jak powstaje bajkowy portret?',
    steps:[
      {num:'01',title:'Wyślij zdjęcie',desc:'Jedno zdjęcie Twojego dziecka — uśmiechnięte, zamyślone, w czapce czy z pluszakiem. Wszystko pasuje!'},
      {num:'02',title:'Wybierz bajkę',desc:'Las elfów, podwodny świat, zamek w chmurach, kosmos — Ty wybierasz świat, a my rysujemy przygodę!'},
      {num:'03',title:'Malujemy!',desc:'Nasz ilustrator tworzy bajkowy portret. Pokazujemy szkic do zatwierdzenia, żebyś mógł powiedzieć „super!"'},
      {num:'04',title:'Przesyłka pełna radości',desc:'Plik cyfrowy od razu na maila, druk w kolorowym pudełku w 5–7 dni. Uśmiech w zestawie!'},
    ],
    ctaLabel:'Gotowi na przygodę?',
    ctaHeadline:'Stwórz bajkę<br><span style="color:var(--accent)">dla malucha!</span>',
    ctaSub:'Wystarczy jedno zdjęcie i odrobina wyobraźni. My zajmiemy się resztą — i obiecujemy, że Twoje dziecko będzie zachwycone!',
    ctaFinalBtn:'Zamów bajkowy portret!',
    footerLinks:['Instagram','Facebook','Kontakt'],
  },
  zwierzaki:{
    logo:'Portret Pupila',bgText:'PUPIL',
    heroTag:'Portrety, które łapią charakter Twojego zwierzaka',
    heroTitle:'<span class="stroke">TWÓJ</span> PUPIL<br><span class="accent" data-text="jak dzieło">jak dzieło</span> <span class="stroke">SZTUKI</span>',
    heroSub:'Każdy zwierzak ma swoją osobowość — figlarną, dostojną, szaloną albo pełną spokoju. Tworzymy portrety, które tę osobowość łapią i zamieniają w obraz wart powieszenia na ścianie.',
    ctaBtn:'Zamów portret pupila',scrollText:'Zobacz jak to robimy',
    marquee:['Portret psa','Portret kota','Każda rasa','Unikatowe dzieło','Idealny prezent','Druk galeryjny','Z charakterem'],
    formLabel:'Konfigurator portretu zwierzaka',formTitle:'STWÓRZ PORTRET<br>PUPILA',
    processLabel:'Jak powstaje portret Twojego zwierzaka?',
    steps:[
      {num:'01',title:'Wyślij zdjęcie pupila',desc:'Jedno wyraźne zdjęcie Twojego zwierzaka — mordka z przodu, profil, w akcji. Im bardziej „to on", tym lepiej.'},
      {num:'02',title:'Dobierz styl',desc:'Królewski portret w oleju, lekka akwarela, komiksowy bohater albo ilustracja botaniczna — Ty decydujesz o klimacie.'},
      {num:'03',title:'Artysta tworzy',desc:'Nasz ilustrator pracuje nad portretem pupila. Zatwierdzasz szkic zanim przejdziemy do pełnej wersji.'},
      {num:'04',title:'Odbiór portretu',desc:'Plik cyfrowy na maila, druk premium w bezpiecznym opakowaniu w 5–7 dni roboczych.'},
    ],
    ctaLabel:'Twój pupil zasługuje na portret',
    ctaHeadline:'PORTRET<br><span style="color:var(--accent)">Z PAZUREM</span>',
    ctaSub:'Zdjęcie na telefonie to za mało. Daj swojemu pupilowi portret, który odda jego charakter — i będzie wyglądał świetnie nad kanapą.',
    ctaFinalBtn:'Zamów portret pupila →',
    footerLinks:['Instagram','Facebook','Kontakt'],
  },
};