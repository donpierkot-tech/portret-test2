let currentTheme = 'genz';
let isTransitioning = false;
let animObserver;

function renderContent(theme) {
  const c = CONTENT[theme];
  document.getElementById('navLogo').textContent = c.logo;
  document.getElementById('heroBgText').textContent = c.bgText;
  document.getElementById('heroTag').innerHTML = c.heroTag;
  document.getElementById('heroTitle').innerHTML = c.heroTitle;
  document.getElementById('heroSub').textContent = c.heroSub;
  document.getElementById('ctaBtnText').textContent = c.ctaBtn;
  document.getElementById('scrollText').textContent = c.scrollText;

  const dot = theme==='klasyk' ? '·' : theme==='dzieci' ? '⭐' : '◆';
  document.getElementById('marqueeTrack').innerHTML = [...c.marquee,...c.marquee]
    .map(m=>`<span class="marquee-item">${m} <span class="dot">${dot}</span></span>`).join('');

  document.getElementById('formLabel').innerHTML = c.formLabel;
  document.getElementById('formTitle').innerHTML = c.formTitle;

  // Reset formularza przy zmianie motywu
  F = {step:1, subject:null, childGender:null, style:null, concept:null, medium:null, size:null, shipping:{}};
  extraStylesOpen = false;
  renderForm();

  // Sekcja porównania stylów
  const ts = STYLES[theme] || STYLES.genz;
  document.getElementById('scStyle1Name').textContent = ts[0].name;
  document.getElementById('scStyle1Note').textContent = ts[0].desc;
  document.getElementById('scStyle2Name').textContent = ts[1].name;
  document.getElementById('scStyle2Note').textContent = ts[1].desc;

  document.getElementById('processLabel').innerHTML = c.processLabel;
  document.getElementById('processGrid').innerHTML = c.steps.map(s=>`
    <div class="process-step">
      <div class="step-num">${s.num}</div>
      <h4 class="step-title">${s.title}</h4>
      <p class="step-desc">${s.desc}</p>
    </div>`).join('');

  document.getElementById('ctaLabel').innerHTML = c.ctaLabel;
  document.getElementById('ctaHeadline').innerHTML = c.ctaHeadline;
  document.getElementById('ctaSub').textContent = c.ctaSub;
  document.getElementById('ctaFinalBtn').textContent = c.ctaFinalBtn;
  document.getElementById('footerLinks').innerHTML = c.footerLinks.map(l=>`<a href="#">${l}</a>`).join('');

  initObservers();
  initMagnetics();
}

function getTransitionPanels(theme) {
  if (theme==='millennial') return {type:'vertical', classes:['curtain-panel-1','curtain-panel-2','curtain-panel-3']};
  if (theme==='genz') return {type:'vertical', classes:['curtain-genz-1','curtain-genz-2','curtain-genz-3']};
  if (theme==='klasyk') return {type:'theater', classes:['curtain-klasyk-left','curtain-klasyk-right','curtain-klasyk-gold']};
  if (theme==='dzieci') return {type:'kite', classes:[]};
  if (theme==='zwierzaki') return {type:'bone', classes:[]};
  return {type:'vertical', classes:['curtain-genz-1','curtain-genz-2','curtain-genz-3']};
}

function transitionTo(theme) {
  if (isTransitioning || theme === currentTheme) return;
  isTransitioning = true;
  const curtain = document.getElementById('transitionCurtain');
  const {type, classes} = getTransitionPanels(theme);

  if (type === 'kite') {
    curtain.innerHTML = `
      <div class="curtain-panel curtain-dzieci-sky" style="transform:translateY(100%)"></div>
      <div class="curtain-dzieci-kite">
        <svg viewBox="0 0 220 280" width="220" height="280" xmlns="http://www.w3.org/2000/svg">
          <polygon points="110,0 220,110 110,180 0,110" fill="#E8896A" opacity=".95"/>
          <polygon points="110,0 110,180 220,110" fill="#F5D060" opacity=".7"/>
          <line x1="110" y1="0" x2="110" y2="180" stroke="#4A6B2A" stroke-width="1.5" opacity=".4"/>
          <line x1="0" y1="110" x2="220" y2="110" stroke="#4A6B2A" stroke-width="1.5" opacity=".4"/>
          <path d="M110 180C115 200 105 220 112 240C108 255 115 265 110 280" stroke="#E8896A" stroke-width="2" fill="none"/>
          <ellipse cx="105" cy="210" rx="6" ry="4" fill="#5BA3C9" opacity=".8" transform="rotate(-15 105 210)"/>
          <ellipse cx="115" cy="235" rx="5" ry="3.5" fill="#8FD14F" opacity=".8" transform="rotate(10 115 235)"/>
          <ellipse cx="108" cy="258" rx="5" ry="3" fill="#F5D060" opacity=".8" transform="rotate(-8 108 258)"/>
        </svg>
      </div>`;
    const sky = curtain.querySelector('.curtain-dzieci-sky');
    const kite = curtain.querySelector('.curtain-dzieci-kite');
    sky.style.transition = 'none'; sky.style.transform = 'translateY(100%)';
    kite.style.transition = 'none'; kite.style.transform = 'translate(120vw,-20vh) scale(.5) rotate(-15deg)';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      sky.style.transition = 'transform .6s cubic-bezier(.76,0,.24,1)';
      sky.style.transform = 'translateY(0%)';
      kite.style.transition = 'transform 1s cubic-bezier(.22,1,.36,1) .2s';
      kite.style.transform = 'translate(-50%,-50%) scale(1) rotate(-5deg)';
    }));
    setTimeout(()=>{
      document.body.setAttribute('data-theme', theme);
      currentTheme = theme;
      document.getElementById('pageContent').classList.add('hiding');
      renderContent(theme);
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.tab===theme));
      window.scrollTo(0,0);
      setTimeout(()=>{
        document.getElementById('pageContent').classList.remove('hiding');
        kite.style.transition = 'transform .8s cubic-bezier(.76,0,.24,1)';
        kite.style.transform = 'translate(-120vw,-30vh) scale(.5) rotate(15deg)';
        setTimeout(()=>{ sky.style.transition='transform .5s cubic-bezier(.76,0,.24,1)'; sky.style.transform='translateY(-100%)'; }, 300);
        setTimeout(()=>triggerEntrance(), 400);
        setTimeout(()=>{ curtain.innerHTML=''; isTransitioning=false; }, 1200);
      }, 350);
    }, 900);

  } else if (type === 'bone') {
    curtain.innerHTML = `
      <div class="curtain-panel curtain-zwierzaki-sky" style="transform:translateY(100%)"></div>
      <div class="curtain-zwierzaki-bone">
        <svg viewBox="0 0 180 80" width="180" height="80" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="25" cy="20" rx="20" ry="18" fill="#fff" stroke="#2C1810" stroke-width="3"/>
          <ellipse cx="25" cy="60" rx="20" ry="18" fill="#fff" stroke="#2C1810" stroke-width="3"/>
          <ellipse cx="155" cy="20" rx="20" ry="18" fill="#fff" stroke="#2C1810" stroke-width="3"/>
          <ellipse cx="155" cy="60" rx="20" ry="18" fill="#fff" stroke="#2C1810" stroke-width="3"/>
          <rect x="30" y="15" width="120" height="50" rx="8" fill="#fff" stroke="#2C1810" stroke-width="3"/>
          <rect x="32" y="17" width="116" height="46" rx="6" fill="#fff"/>
        </svg>
      </div>`;
    const sky = curtain.querySelector('.curtain-zwierzaki-sky');
    const bone = curtain.querySelector('.curtain-zwierzaki-bone');
    sky.style.transition = 'none'; sky.style.transform = 'translateY(100%)';
    bone.style.transition = 'none'; bone.style.transform = 'translate(120vw,-20vh) scale(.5) rotate(-15deg)';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      sky.style.transition = 'transform .6s cubic-bezier(.76,0,.24,1)';
      sky.style.transform = 'translateY(0%)';
      bone.style.transition = 'transform 1s cubic-bezier(.22,1,.36,1) .2s';
      bone.style.transform = 'translate(-50%,-50%) scale(1) rotate(-5deg)';
    }));
    setTimeout(()=>{
      document.body.setAttribute('data-theme', theme);
      currentTheme = theme;
      document.getElementById('pageContent').classList.add('hiding');
      renderContent(theme);
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.tab===theme));
      window.scrollTo(0,0);
      setTimeout(()=>{
        document.getElementById('pageContent').classList.remove('hiding');
        bone.style.transition = 'transform .8s cubic-bezier(.76,0,.24,1)';
        bone.style.transform = 'translate(-120vw,-30vh) scale(.5) rotate(15deg)';
        setTimeout(()=>{ sky.style.transition='transform .5s cubic-bezier(.76,0,.24,1)'; sky.style.transform='translateY(-100%)'; }, 300);
        setTimeout(()=>triggerEntrance(), 400);
        setTimeout(()=>{ curtain.innerHTML=''; isTransitioning=false; }, 1200);
      }, 350);
    }, 900);

  } else if (type === 'theater') {
    curtain.innerHTML = classes.map(c=>`<div class="curtain-panel ${c}"></div>`).join('');
    const left = curtain.querySelector('.curtain-klasyk-left');
    const right = curtain.querySelector('.curtain-klasyk-right');
    const gold = curtain.querySelector('.curtain-klasyk-gold');
    left.style.transition='none'; right.style.transition='none'; gold.style.transition='none';
    left.style.transform='translateX(-100%)'; right.style.transform='translateX(100%)'; gold.style.transform='translateX(-50%) scaleY(0)';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      left.style.transition='transform .7s cubic-bezier(.76,0,.24,1)';
      right.style.transition='transform .7s cubic-bezier(.76,0,.24,1)';
      gold.style.transition='transform .6s cubic-bezier(.16,1,.3,1) .35s';
      left.style.transform='translateX(0%)'; right.style.transform='translateX(0%)'; gold.style.transform='translateX(-50%) scaleY(1)';
    }));
    setTimeout(()=>{
      document.body.setAttribute('data-theme', theme);
      currentTheme = theme;
      document.getElementById('pageContent').classList.add('hiding');
      renderContent(theme);
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.tab===theme));
      window.scrollTo(0,0);
      setTimeout(()=>{
        document.getElementById('pageContent').classList.remove('hiding');
        gold.style.transition='transform .4s cubic-bezier(.76,0,.24,1)'; gold.style.transform='translateX(-50%) scaleY(0)';
        setTimeout(()=>{
          left.style.transition='transform .7s cubic-bezier(.76,0,.24,1)';
          right.style.transition='transform .7s cubic-bezier(.76,0,.24,1)';
          left.style.transform='translateX(-100%)'; right.style.transform='translateX(100%)';
        }, 200);
        setTimeout(()=>triggerEntrance(), 350);
        setTimeout(()=>{ curtain.innerHTML=''; isTransitioning=false; }, 1200);
      }, 350);
    }, 850);

  } else {
    curtain.innerHTML = classes.map(c=>`<div class="curtain-panel ${c}"></div>`).join('');
    const panels = curtain.querySelectorAll('.curtain-panel');
    panels.forEach((p,i)=>{
      p.style.transition='none'; p.style.transform='translateY(100%)';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        p.style.transition=`transform .5s cubic-bezier(.76,0,.24,1) ${i*.08}s`;
        p.style.transform='translateY(0%)';
      }));
    });
    setTimeout(()=>{
      document.body.setAttribute('data-theme', theme);
      currentTheme = theme;
      document.getElementById('pageContent').classList.add('hiding');
      renderContent(theme);
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.tab===theme));
      window.scrollTo(0,0);
      setTimeout(()=>{
        document.getElementById('pageContent').classList.remove('hiding');
        panels.forEach((p,i)=>{
          p.style.transition=`transform .5s cubic-bezier(.76,0,.24,1) ${i*.08}s`;
          p.style.transform='translateY(-100%)';
        });
        setTimeout(()=>triggerEntrance(), 150);
        setTimeout(()=>{ curtain.innerHTML=''; isTransitioning=false; }, 800);
      }, 200);
    }, 600);
  }
}

function triggerEntrance() {
  const d = currentTheme==='klasyk' ? 150 : 100;
  document.querySelectorAll('.animate-in').forEach((el,i)=>{
    el.classList.remove('shown');
    setTimeout(()=>el.classList.add('shown'), i*d);
  });
}

function initObservers() {
  if (animObserver) animObserver.disconnect();
  animObserver = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if (e.isIntersecting) { e.target.classList.add('shown'); animObserver.unobserve(e.target); }
    });
  }, {threshold:.1});
  document.querySelectorAll('.animate-in').forEach(el=>animObserver.observe(el));
}

function initMagnetics() {
  document.querySelectorAll('.btn-primary').forEach(btn=>{
    btn.onmousemove = e=>{
      if (currentTheme==='klasyk') return;
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.15}px,${(e.clientY-r.top-r.height/2)*.15}px)`;
    };
    btn.onmouseleave = ()=>{ btn.style.transform=''; };
  });
}

// Inicjalizacja po załadowaniu DOM
document.addEventListener('DOMContentLoaded', ()=>{
  const glow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', e=>{
    glow.style.left = e.clientX+'px';
    glow.style.top = e.clientY+'px';
  });
  window.addEventListener('scroll', ()=>{
    const bg = document.getElementById('heroBgText');
    if (bg) {
      const s = currentTheme==='klasyk' ? .15 : .3;
      bg.style.transform = `translate(-50%,calc(-50% + ${window.pageYOffset*s}px))`;
    }
  });
  document.addEventListener('click', e=>{
    const a = e.target.closest('a[href^="#"]');
    if (a) { e.preventDefault(); const t=document.querySelector(a.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth'}); }
  });
  document.querySelectorAll('.tab-btn').forEach(b=>b.addEventListener('click', ()=>transitionTo(b.dataset.tab)));
  renderContent('genz');
  requestAnimationFrame(()=>triggerEntrance());
});