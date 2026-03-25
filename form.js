// Stan formularza
let extraStylesOpen = false;
let cartAdded = false;
let photoUrl = null;
let F = {step:1, subject:null, childGender:null, style:null, concept:null, medium:null, size:null};

// Tematy które mają krok 1 (dla kogo)
const THEMES_WITH_SUBJECT = ['genz','millennial','klasyk'];
// Tematy które mają tylko wybór płci dziecka w kroku 1
const THEMES_WITH_CHILD = ['dzieci'];
// Tematy bez kroku 1
const THEMES_NO_STEP1 = ['zwierzaki'];

function getVisibleSteps() {
  // Numeracja kroków: 1=dlaKogo(warunkowy), 2=koncept, 3=styl, 4=upload, 5=wykonanie, 6=rozmiar(warunkowy), 7=podsumowanie
  if (THEMES_NO_STEP1.includes(currentTheme)) {
    if (F.medium === 'digital') return [2,3,4,5,7];
    return [2,3,4,5,6,7];
  }
  if (THEMES_WITH_CHILD.includes(currentTheme)) {
    if (F.medium === 'digital') return [1,2,3,4,5,7];
    return [1,2,3,4,5,6,7];
  }
  // normalne motywy
  if (F.medium === 'digital') return [1,2,3,4,5,7];
  return [1,2,3,4,5,6,7];
}

function getTotalSteps() {
  return getVisibleSteps().length;
}

function getPrice() {
  const m = MEDIA.find(x=>x.id===F.medium);
  if (!m) return 0;
  if (F.medium === 'digital') return m.base;
  const sArr = SIZES[F.medium];
  if (!sArr) return m.base;
  const s = sArr.find(x=>x.id===F.size);
  return m.base + (s ? s.add : 0);
}

// Toast notification
let toastTimeout = null;
function showToast(message) {
  let el = document.getElementById('toastNotification');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toastNotification';
    el.className = 'toast';
    el.addEventListener('click', () => {
      el.classList.remove('visible');
      if (toastTimeout) { clearTimeout(toastTimeout); toastTimeout = null; }
    });
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.remove('visible');
  void el.offsetWidth;
  el.classList.add('visible');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { el.classList.remove('visible'); toastTimeout = null; }, 3000);
}

function getVariationId() {
  if (F.medium === 'digital') {
    const m = MEDIA.find(x=>x.id==='digital');
    return m ? m.vid : null;
  }
  if (F.medium && F.size) {
    const sArr = SIZES[F.medium] || [];
    const s = sArr.find(x=>x.id===F.size);
    return s ? s.vid : null;
  }
  return null;
}

function getSubjectValue() {
  if (THEMES_NO_STEP1.includes(currentTheme)) return 'pet';
  if (THEMES_WITH_CHILD.includes(currentTheme)) return 'child';
  return F.subject || 'unknown';
}

function getCartUrl() {
  const vid = getVariationId();
  const subject = getSubjectValue();
  const dlaKogo = subject + (F.childGender ? '-'+F.childGender : '');
  const params = new URLSearchParams({
    'add-to-cart': WOO_PRODUCT_ID,
    'attribute_styl': F.style,
    'attribute_koncept': F.concept,
    'attribute_pa_wykonanie': F.medium,
    'attribute_pa_rozmiar': F.medium === 'digital' ? 'brak' : (F.size || ''),
    'attribute_dla-kogo': dlaKogo,
  });
  if (vid) params.append('variation_id', vid);
  if (photoUrl) params.append('photo_url', photoUrl);
  return `https://mojabajkowaprzygoda.pl/koszyk/?${params.toString()}`;
}

// Cloudinary upload
const CLOUDINARY_CLOUD = 'dzf7zridn';
const CLOUDINARY_PRESET = 'portret';

async function uploadToCloudinary(file) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', CLOUDINARY_PRESET);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, {
    method: 'POST',
    body: fd,
  });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.secure_url;
}

// Pomocnicza — generuje src dla podglądu stylu na podstawie wybranego konceptu
function getStylePreviewSrc(styleId) {
  if (!F.concept) return null;
  return `images/previews/${F.concept}-${styleId}.jpg`;
}

function renderForm() {
  const vs = getVisibleSteps();
  const totalSteps = vs.length;

  // Pasek postępu
  let pb = '';
  vs.forEach((stepNum, idx) => {
    const displayNum = idx + 1;
    const isDone = F.step > stepNum;
    const isActive = F.step === stepNum;
    const isSkipped = F.medium === 'digital' && stepNum === 6;
    let cls = '';
    if (isSkipped) cls = 'skipped';
    else if (isDone) cls = 'done';
    else if (isActive) cls = 'active';
    pb += `<div class="progress-step ${cls}">${displayNum}</div>`;
    if (idx < vs.length - 1) pb += `<div class="progress-line ${isDone && !isSkipped ? 'done' : ''}"></div>`;
  });
  document.getElementById('progressBar').innerHTML = pb;

  let html = '';

  // KROK 1: Dla kogo (warunkowy)
  if (!THEMES_NO_STEP1.includes(currentTheme)) {
    if (THEMES_WITH_CHILD.includes(currentTheme)) {
      html += `<div class="form-step ${F.step===1?'active':''}">
        <div class="step-heading">Portret dla...</div>
        <div class="step-subheading">Wybierz dla kogo tworzymy bajkowy portret</div>
        <div class="opt-grid" style="justify-content:center">
          <div class="opt-card ${F.childGender==='girl'?'selected':''}" onclick="selectChildGenderDirect('girl')">
            <span class="opt-icon">👧</span>
            <div class="opt-label">Dziewczynka</div>
          </div>
          <div class="opt-card ${F.childGender==='boy'?'selected':''}" onclick="selectChildGenderDirect('boy')">
            <span class="opt-icon">👦</span>
            <div class="opt-label">Chłopiec</div>
          </div>
        </div>
      </div>`;
    } else {
      html += `<div class="form-step ${F.step===1?'active':''}">
        <div class="step-heading">Dla kogo jest portret?</div>
        <div class="step-subheading">Wybierz osobę, którą sportretujemy</div>
        <div class="opt-grid">${SUBJECTS.map(s=>`
          <div class="opt-card ${F.subject===s.id?'selected':''}" onclick="selectSubject('${s.id}')">
            <span class="opt-icon">${s.icon}</span>
            <div class="opt-label">${s.label}</div>
          </div>`).join('')}
        </div>
      </div>`;
    }
  }

  // KROK 2: Koncept (TERAZ PRZED STYLEM)
  html += `<div class="form-step ${F.step===2?'active':''}">
    <div class="step-heading">Koncept zdjęcia</div>
    <div class="step-subheading">Jaki rodzaj ujęcia najlepiej oddaje Twój charakter?</div>
    <div class="opt-grid wide">${CONCEPTS.map(c=>`
      <div class="opt-card ${F.concept===c.id?'selected':''}" onclick="selectConcept('${c.id}')">
        <div class="style-preview">podgląd konceptu</div>
        <div class="opt-label">${c.name}</div>
        <div class="opt-desc">${c.desc}</div>
      </div>`).join('')}
    </div>
  </div>`;

  // KROK 3: Styl — podglądy warunkowe na podstawie wybranego konceptu
  const primaryStyles = STYLES[currentTheme] || STYLES.genz;
  const otherThemes = Object.keys(STYLES).filter(t=>t!==currentTheme);

  const stylePreviewHint = F.concept
    ? `Tak wygląda styl dla konceptu <strong>${CONCEPTS.find(c=>c.id===F.concept)?.name || ''}</strong>`
    : 'Wybierz koncept w poprzednim kroku, by zobaczyć podglądy';

  html += `<div class="form-step ${F.step===3?'active':''}">
    <div class="step-heading">Wybierz styl portretu</div>
    <div class="step-subheading">${stylePreviewHint}</div>
    <div class="opt-grid wide">${primaryStyles.map(s=>{
      const src = getStylePreviewSrc(s.id);
      const previewEl = src
        ? `<div class="style-preview" style="background-image:url('${src}');background-size:cover;background-position:center"></div>`
        : `<div class="style-preview style-preview--placeholder">podgląd stylu</div>`;
      return `<div class="opt-card ${F.style===s.id?'selected':''}" onclick="selectStyle('${s.id}')">
        ${previewEl}
        <div class="opt-label">${s.name}</div>
        <div class="opt-desc">${s.desc}</div>
      </div>`;
    }).join('')}
    </div>
    <button class="expand-btn" id="expandBtn" onclick="toggleExtra()">${extraStylesOpen?'Zwiń ▴':'Pokaż więcej stylów z innych motywów ▾'}</button>
    <div class="extra-styles ${extraStylesOpen?'visible':''}" id="extraStyles">
      ${otherThemes.map(t=>`
        <div class="extra-styles-group">
          <div class="extra-styles-group-label">${THEME_NAMES[t]}</div>
          <div class="opt-grid wide">${STYLES[t].map(s=>{
            const src = getStylePreviewSrc(s.id);
            const previewEl = src
              ? `<div class="style-preview" style="background-image:url('${src}');background-size:cover;background-position:center"></div>`
              : `<div class="style-preview style-preview--placeholder">podgląd stylu</div>`;
            return `<div class="opt-card ${F.style===s.id?'selected':''}" onclick="selectStyle('${s.id}')">
              ${previewEl}
              <div class="opt-label">${s.name}</div>
              <div class="opt-desc">${s.desc}</div>
            </div>`;
          }).join('')}
          </div>
        </div>`).join('')}
    </div>
  </div>`;

  // KROK 4: Upload zdjęcia
  const uploadState = photoUrl
    ? `<div class="upload-success">
        <div class="upload-success-icon">✓</div>
        <div class="upload-success-text">Zdjęcie przesłane!</div>
        <button class="expand-btn" onclick="resetPhoto()" style="margin-top:1rem">Zmień zdjęcie</button>
       </div>`
    : `<label class="upload-area" id="uploadArea">
        <input type="file" id="photoInput" accept="image/*" style="display:none" onchange="handlePhotoUpload(this)">
        <div class="upload-icon">📷</div>
        <div class="upload-label">Kliknij aby wybrać zdjęcie</div>
        <div class="upload-hint">JPG, PNG, HEIC · maks. 10MB</div>
       </label>
       <div id="uploadProgress" style="display:none;text-align:center;margin-top:1rem;color:var(--muted);font-size:.8rem">Przesyłam zdjęcie...</div>`;

  html += `<div class="form-step ${F.step===4?'active':''}">
    <div class="step-heading">Wyślij swoje zdjęcie</div>
    <div class="step-subheading">Na jego podstawie stworzymy Twój portret. Im wyraźniejsze, tym lepszy efekt.</div>
    ${uploadState}
  </div>`;

  // KROK 5: Sposób wykonania
  html += `<div class="form-step ${F.step===5?'active':''}">
    <div class="step-heading">Sposób wykonania</div>
    <div class="step-subheading">Na czym ma powstać Twój portret?</div>
    <div class="opt-grid">${MEDIA.map(m=>`
      <div class="opt-card ${F.medium===m.id?'selected':''}" onclick="selectMedium('${m.id}')">
        <div class="opt-label">${m.name}</div>
        <div class="opt-desc">${m.desc}</div>
        <div class="opt-price">od ${m.base} PLN</div>
      </div>`).join('')}
    </div>
  </div>`;

  // KROK 6: Rozmiar (warunkowy)
  if (F.medium && F.medium !== 'digital') {
    const sArr = SIZES[F.medium] || [];
    const mBase = MEDIA.find(x=>x.id===F.medium)?.base || 0;
    html += `<div class="form-step ${F.step===6?'active':''}">
      <div class="step-heading">Wybierz rozmiar</div>
      <div class="step-subheading">Cena zmienia się w zależności od rozmiaru</div>
      <div class="size-grid">${sArr.map(s=>`
        <div class="size-card ${F.size===s.id?'selected':''}" onclick="selectSize('${s.id}')">
          <span class="size-label">${s.label}</span>
          <span class="size-price">${mBase+s.add} PLN</span>
        </div>`).join('')}
      </div>
      <div class="live-price">Cena: ${getPrice()} PLN</div>
    </div>`;
  }

  // KROK 7: Podsumowanie
  const styleName = Object.values(STYLES).flat().find(s=>s.id===F.style)?.name || '—';
  const conceptName = CONCEPTS.find(c=>c.id===F.concept)?.name || '—';
  const mediumName = MEDIA.find(m=>m.id===F.medium)?.name || '—';
  const sizeName = F.medium==='digital' ? '—' : (SIZES[F.medium]?.find(s=>s.id===F.size)?.label || '—');
  const price = getPrice();

  let dlaKogoLabel = '—';
  if (THEMES_NO_STEP1.includes(currentTheme)) {
    dlaKogoLabel = 'Zwierzak';
  } else if (THEMES_WITH_CHILD.includes(currentTheme)) {
    dlaKogoLabel = F.childGender === 'girl' ? 'Dziewczynka' : F.childGender === 'boy' ? 'Chłopiec' : '—';
  } else {
    dlaKogoLabel = SUBJECTS.find(s=>s.id===F.subject)?.label || '—';
  }

  html += `<div class="form-step ${F.step===7?'active':''}">
    <div class="step-heading">Podsumowanie</div>
    <div class="step-subheading">Sprawdź swoje zamówienie przed dodaniem do koszyka</div>
    <div class="summary-box">
      <div class="summary-row"><span class="sr-label">Dla kogo</span><span class="sr-value">${dlaKogoLabel}</span></div>
      <div class="summary-row"><span class="sr-label">Koncept</span><span class="sr-value">${conceptName}</span></div>
      <div class="summary-row"><span class="sr-label">Styl</span><span class="sr-value">${styleName}</span></div>
      <div class="summary-row"><span class="sr-label">Zdjęcie</span><span class="sr-value">${photoUrl ? '✓ Przesłane' : '—'}</span></div>
      <div class="summary-row"><span class="sr-label">Wykonanie</span><span class="sr-value">${mediumName}</span></div>
      ${F.medium!=='digital'?`<div class="summary-row"><span class="sr-label">Rozmiar</span><span class="sr-value">${sizeName}</span></div>`:''}
      <div class="summary-total"><span>Razem</span><span>${price} PLN</span></div>
    </div>
    <div class="cart-action-area" id="cartActionArea">
      ${cartAdded
        ? `<div class="cart-confirmation">
            <div class="cart-confirmation-msg">✓ Dodano do koszyka!</div>
            <div class="cart-confirmation-btns">
              <a href="${getCartUrl()}" target="_blank" rel="noopener" class="cart-conf-btn cart-conf-btn-primary">Przejdź do koszyka →</a>
              <button class="cart-conf-btn cart-conf-btn-secondary" onclick="resetForm()">Stwórz kolejny portret</button>
            </div>
          </div>`
        : `<button class="form-nav-btn cart cart-add-btn" onclick="addToCart()">🛒 Dodaj do koszyka</button>`
      }
    </div>
  </div>`;

  document.getElementById('formSteps').innerHTML = html;
  updateNav();
}

function updateNav() {
  const vs = getVisibleSteps();
  const isFirst = F.step === vs[0];
  const isLast = F.step === vs[vs.length-1];
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');

  prev.disabled = isFirst;
  prev.style.visibility = isFirst ? 'hidden' : 'visible';

  if (isLast) {
    next.style.display = 'none';
    if (cartAdded) {
      prev.disabled = true;
      prev.style.visibility = 'hidden';
    }
  } else {
    next.style.display = '';
    next.textContent = 'Dalej →';
    next.className = 'form-nav-btn next';
    next.onclick = goNext;
    next.disabled = false;
  }
}

function scrollToForm() {
  const el = document.getElementById('formularz');
  if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
}

function getStepValidation() {
  if (F.step===1) {
    if (THEMES_WITH_CHILD.includes(currentTheme)) {
      return F.childGender ? null : 'Wybierz dla kogo jest portret';
    }
    return F.subject ? null : 'Wybierz dla kogo jest portret';
  }
  if (F.step===2) return F.concept ? null : 'Wybierz koncept zdjęcia';
  if (F.step===3) return F.style ? null : 'Wybierz styl artystyczny';
  if (F.step===4) return photoUrl ? null : 'Prześlij zdjęcie aby kontynuować';
  if (F.step===5) return F.medium ? null : 'Wybierz sposób wykonania';
  if (F.step===6) return F.size ? null : 'Wybierz rozmiar';
  return null;
}

function goNext() {
  const msg = getStepValidation();
  if (msg) { showToast(msg); return; }
  const vs = getVisibleSteps();
  const idx = vs.indexOf(F.step);
  if (idx < vs.length-1) { F.step = vs[idx+1]; cartAdded = false; renderForm(); scrollToForm(); }
}

function goPrev() {
  const vs = getVisibleSteps();
  const idx = vs.indexOf(F.step);
  if (idx > 0) { F.step = vs[idx-1]; renderForm(); scrollToForm(); }
}

function selectSubject(id) { F.subject = id; renderForm(); }
function selectChildGenderDirect(g) { F.childGender = g; renderForm(); }
function selectStyle(id) { F.style = id; renderForm(); }
function selectConcept(id) {
  // Reset stylu przy zmianie konceptu — podglądy się zmieniają
  if (F.concept !== id) F.style = null;
  F.concept = id;
  renderForm();
}
function selectMedium(id) {
  const prev = F.medium;
  F.medium = id;
  if (id === 'digital') F.size = null;
  else if (prev !== id) F.size = null;
  renderForm();
}
function selectSize(id) { F.size = id; renderForm(); }

function toggleExtra() {
  extraStylesOpen = !extraStylesOpen;
  const el = document.getElementById('extraStyles');
  const btn = document.getElementById('expandBtn');
  if (el) el.classList.toggle('visible', extraStylesOpen);
  if (btn) btn.textContent = extraStylesOpen ? 'Zwiń ▴' : 'Pokaż więcej stylów z innych motywów ▾';
}

function resetPhoto() {
  photoUrl = null;
  renderForm();
}

async function handlePhotoUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const progress = document.getElementById('uploadProgress');
  const area = document.getElementById('uploadArea');
  if (area) area.style.opacity = '.5';
  if (progress) progress.style.display = 'block';
  try {
    photoUrl = await uploadToCloudinary(file);
    renderForm();
  } catch(e) {
    showToast('Błąd przesyłania zdjęcia. Spróbuj ponownie.');
    if (area) area.style.opacity = '1';
    if (progress) progress.style.display = 'none';
  }
}

function addToCart() {
  const url = getCartUrl();
  cartAdded = true;
  renderForm();
  scrollToForm();
}

function resetForm() {
  F = {step:1, subject:null, childGender:null, style:null, concept:null, medium:null, size:null};
  extraStylesOpen = false;
  cartAdded = false;
  photoUrl = null;
  if (THEMES_NO_STEP1.includes(currentTheme)) F.step = 2;
  renderForm();
  scrollToForm();
}

// Inicjalizacja przycisków nawigacji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('prevBtn').onclick = goPrev;
});