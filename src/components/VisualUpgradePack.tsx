import { useEffect } from 'react';

const VisualUpgradePack = () => {
  useEffect(() => {
    // Add the enhancement script
    const script = document.createElement('script');
    script.innerHTML = `
/* ===== No Plan B: Safe Enhancer Script ===== */
document.addEventListener('DOMContentLoaded', () => {
  /* 1) Background layer */
  if(!document.querySelector('.site-bg')){
    const bg = document.createElement('div'); bg.className = 'site-bg';
    document.body.prepend(bg);
  }

  /* 2) Upgrade hero if present: add classes, wrap B with accent */
  const hero = document.querySelector('.hero, [data-hero], .Hero, .section-hero') || null;
  if(hero){
    hero.classList.add('npb-hero','card');
    let wrap = hero.querySelector('.wrap');
    if(!wrap){
      wrap = document.createElement('div');
      wrap.className = 'wrap';
      while(hero.firstChild) wrap.appendChild(hero.firstChild);
      hero.appendChild(wrap);
    }
    const mediaHost = wrap.querySelector('.hero-media') || (()=>{ const d=document.createElement('div'); d.className='hero-media'; wrap.appendChild(d); return d; })();
    if(!mediaHost.querySelector('.frame') && mediaHost.querySelector('img')){
      const frame = document.createElement('div'); frame.className='frame';
      const img = mediaHost.querySelector('img'); frame.appendChild(img.cloneNode(true));
      mediaHost.innerHTML=''; mediaHost.appendChild(frame);
      const badge = document.createElement('div'); badge.className='on-air'; badge.textContent='On Air'; mediaHost.appendChild(badge);
    }
    const h1 = wrap.querySelector('h1');
    if(h1 && !h1.querySelector('.accent-underline')){
      const txt = h1.textContent;
      const idx = txt.indexOf('B');
      if(idx>=0){
        h1.innerHTML = txt.slice(0,idx) + '<span class="accent-underline">B</span>' + txt.slice(idx+1);
      }
    }
    if(h1) h1.classList.add('h-hero');
  }

  /* 3) Nav magic line (attach to first nav) */
  const nav = document.querySelector('nav') || document.querySelector('.nav');
  if(nav && !nav.classList.contains('nav-magic')){
    nav.classList.add('nav-magic');
    const ml = document.createElement('span'); ml.className='magic-line'; nav.appendChild(ml);
    const links = [...nav.querySelectorAll('a')];
    const active = links.find(a=>a.classList.contains('is-active')) || links[0];
    const setLine = (el)=>{
      const r = el.getBoundingClientRect(), nr = nav.getBoundingClientRect();
      ml.style.left = (r.left - nr.left) + 'px';
      ml.style.width = r.width + 'px';
    };
    if(active) setLine(active);
    links.forEach(a=>a.addEventListener('mouseenter',()=>setLine(a)));
    nav.addEventListener('mouseleave',()=>active && setLine(active));
    window.addEventListener('resize', ()=>active && setLine(active));
  }

  /* 4) Scroll reveal setup */
  const revealTargets = document.querySelectorAll('section, .section, .card, [data-episode], [class*="episode-card"], .reel, [data-reel], .sponsor-card, [data-sponsor]');
  revealTargets.forEach(el=>el.classList.add('reveal'));
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(ents=>{
      ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{threshold:.15});
    revealTargets.forEach(el=>io.observe(el));
  } else { revealTargets.forEach(el=>el.classList.add('in')); }

  /* 5) Sticky subscribe bar (non-destructive) */
  if(!document.querySelector('.sticky-sub')){
    const ss=document.createElement('div');
    ss.className='sticky-sub';
    ss.innerHTML = \`
      <strong>Get new episodes first.</strong>
      <form class="ss-form" onsubmit="event.preventDefault(); this.reset(); alert('Thanks for subscribing!');">
        <input type="email" placeholder="Your email" required>
        <button class="btn btn-primary" type="submit">Subscribe</button>
      </form>\`;
    document.body.appendChild(ss);
    
    let ticking = false;
    const checkScroll = () => {
      if (window.scrollY > 320) ss.classList.add('show');
      else ss.classList.remove('show');
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(checkScroll); ticking = true; }
    });
  }

  /* 6) WhatsApp FAB enhancement */
  const fab = document.querySelector('[href*="wa.me"], .whatsapp-fab');
  if(fab) fab.classList.add('whatsapp-fab');
});
`;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
/* ========== TOKENS / BASE ========== */
:root{
  --npb-black:#000; --npb-white:#fff; --npb-red:#E11D2E;
  --npb-surface-1:#0B0D12; --npb-surface-2:#0F1218;
  --npb-border:rgba(255,255,255,.08); --npb-text-dim:rgba(255,255,255,.82);
  --shadow-1:0 10px 30px rgba(0,0,0,.45); --shadow-2:0 20px 40px rgba(0,0,0,.55);
  --r-xl:22px; --r-lg:16px; --r:12px; --pill:999px;
}
html,body{background:#000;color:#fff}

/* Global vignette + subtle red aura (auto-injected .site-bg) */
.site-bg{
  position:fixed; inset:0; z-index:-2; pointer-events:none;
  background:
    radial-gradient(1100px 700px at 85% 8%, rgba(225,29,46,.18), transparent 60%),
    radial-gradient(900px 600px at 12% 18%, rgba(255,255,255,.06), transparent 65%),
    linear-gradient(180deg, #000, #0b0d12);
}
body::before{
  content:""; position:fixed; inset:-10%; z-index:-1; pointer-events:none;
  background:radial-gradient(120% 120% at 50% -10%, rgba(255,255,255,.10), transparent 55%),
             radial-gradient(120% 120% at 50% 120%, rgba(0,0,0,.65), rgba(0,0,0,.95) 65%);
}

/* Utility shells (applies to your existing sections/cards if present) */
.section { position:relative; margin:clamp(28px,4vw,64px) 0; }
.card{
  background:linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02));
  border:1px solid var(--npb-border); border-radius:var(--r-lg);
  box-shadow:var(--shadow-1); transition:transform .14s ease, box-shadow .2s ease;
}
.card:hover{ transform:translateY(-3px); box-shadow:var(--shadow-2) }

/* Stronger type hierarchy & buttons */
.h-hero{font-weight:900; letter-spacing:-.02em; line-height:.95; font-size:clamp(40px,6.6vw,96px)}
.h-2{font-weight:800; letter-spacing:-.01em; font-size:clamp(22px,3vw,38px)}
.subtle{color:var(--npb-text-dim)}
.btn{display:inline-flex;align-items:center;gap:10px;padding:12px 18px;border-radius:var(--pill);font-weight:700;border:1px solid transparent}
.btn-primary{background:var(--npb-red);color:#fff;box-shadow:0 8px 18px rgba(225,29,46,.35)}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 12px 24px rgba(225,29,46,.45)}
.btn-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.18)}
.btn-ghost:hover{background:rgba(255,255,255,.06)}

/* ========== HERO ENHANCEMENTS ========== */
.npb-hero{background:
  radial-gradient(120% 120% at 90% 0%, rgba(225,29,46,.16) 0, rgba(225,29,46,0) 55%),
  linear-gradient(180deg, var(--npb-surface-1), #050608);
  border-radius:var(--r-xl); box-shadow:var(--shadow-2); overflow:hidden;
}
.npb-hero .wrap{display:grid;grid-template-columns:1.1fr .9fr;align-items:center;gap:clamp(22px,4vw,52px);padding:clamp(22px,5vw,64px)}
.npb-hero .hero-media{position:relative;min-height:360px;display:grid;place-items:center}
.npb-hero .frame{position:relative;width:100%;max-width:640px;aspect-ratio:16/11;border-radius:var(--r-xl);overflow:hidden;background:linear-gradient(180deg,#0B0D12,#050608);box-shadow:var(--shadow-2), inset 0 0 0 1px rgba(255,255,255,.04)}
.npb-hero .frame::after{content:"";position:absolute;inset:0;background:radial-gradient(50% 70% at 50% 0%, rgba(255,255,255,.10), transparent 60%)}
.npb-hero .frame img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.95) contrast(1.05) brightness(.96)}
.npb-hero .on-air{position:absolute;top:16px;right:16px;padding:8px 12px;border-radius:var(--pill);background:rgba(225,29,46,.14);border:1px solid rgba(225,29,46,.45);color:var(--npb-red);font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.npb-hero .accent-underline{position:relative;display:inline-block}
.npb-hero .accent-underline::after{
  content:""; position:absolute; left:-6px; right:-6px; height:10px; bottom:0.04em;
  background:linear-gradient(90deg, rgba(225,29,46,0), rgba(225,29,46,1), rgba(225,29,46,0));
  transform:skewY(-6deg) scaleX(0); transform-origin:left; border-radius:6px;
  animation:npb-strike .9s .3s ease forwards;
}
@keyframes npb-strike{to{transform:skewY(-6deg) scaleX(1)}}
@media(max-width:1024px){ .npb-hero .wrap{grid-template-columns:1fr} .npb-hero .hero-media{order:-1} }

/* ========== NAV "MAGIC LINE" ========== */
.nav-magic{position:relative;display:flex;gap:26px}
.nav-magic a{position:relative;padding:16px 2px;opacity:.9}
.nav-magic a:hover{opacity:1}
.nav-magic .magic-line{
  position:absolute; bottom:8px; height:2px; width:0; background:var(--npb-red);
  border-radius:2px; transition:left .22s ease, width .22s ease; box-shadow:0 0 14px rgba(225,29,46,.6)
}

/* ========== EPISODE CARDS (neon edge, 3D hover) ========== */
.episodes-grid,[data-section="episodes"] .grid{display:grid;gap:22px}
@media(min-width:901px){ .episodes-grid,[data-section="episodes"] .grid{grid-template-columns:repeat(3,1fr)} }
@media(max-width:900px){ .episodes-grid,[data-section="episodes"] .grid{grid-template-columns:1fr 1fr} }
@media(max-width:560px){ .episodes-grid,[data-section="episodes"] .grid{grid-template-columns:1fr} }

.episode-card, [class*="episode-card"], [data-episode]{
  position:relative; border-radius:16px; overflow:hidden;
  background:linear-gradient(180deg,#0C0F14,#090B0F);
  border:1px solid rgba(255,255,255,.06);
  box-shadow:var(--shadow-1); transform-style:preserve-3d; perspective:800px;
  transition:transform .18s ease, box-shadow .2s ease, border-color .2s ease;
}
.episode-card::before, [class*="episode-card"]::before, [data-episode]::before{
  content:""; position:absolute; inset:-1px; border-radius:inherit; pointer-events:none; opacity:.55;
  background:linear-gradient(120deg, rgba(225,29,46,.75), rgba(255,255,255,.10), rgba(225,29,46,.75));
  padding:1px; -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite:xor; mask-composite:exclude;
}
.episode-card:hover, [class*="episode-card"]:hover, [data-episode]:hover{
  transform:translateY(-4px) rotateX(2deg) rotateY(-2deg);
  box-shadow:var(--shadow-2); border-color:rgba(225,29,46,.6);
}
.episode-cover{aspect-ratio:16/9; background:#121418}
.episode-body{padding:14px 16px}
.episode-eyebrow{color:var(--npb-red); font-size:12px; letter-spacing:.08em; text-transform:uppercase; font-weight:800}
.episode-title{margin:6px 0 8px; font-size:18px; line-height:1.25}
.episode-actions{display:flex; gap:10px; margin-top:12px}

/* ========== REELS (hover affordance) ========== */
.reels-grid,[data-section="reels"] .grid{display:grid; gap:16px}
@media(min-width:901px){ .reels-grid,[data-section="reels"] .grid{grid-template-columns:repeat(3,1fr)} }
@media(max-width:900px){ .reels-grid,[data-section="reels"] .grid{grid-template-columns:1fr 1fr} }
@media(max-width:560px){ .reels-grid,[data-section="reels"] .grid{grid-template-columns:1fr} }

.reel,[data-reel]{position:relative; border-radius:14px; overflow:hidden; aspect-ratio:9/16;
  background:#0E1116; border:1px solid var(--npb-border)}
.reel::after,[data-reel]::after{
  content:"Watch on Instagram ↗"; position:absolute; left:50%; bottom:10px;
  transform:translateX(-50%) translateY(12px); background:rgba(0,0,0,.6);
  padding:6px 12px; border-radius:8px; color:#fff; font-size:12px; opacity:0; transition:all .18s ease;
}
.reel:hover::after,[data-reel]:hover::after{opacity:1; transform:translateX(-50%) translateY(0)}

/* ========== SPONSORS (shine) ========== */
.sponsor-card,[data-sponsor]{
  background:linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02));
  border:1px solid var(--npb-border); border-radius:16px; padding:18px;
  transition:transform .18s ease, box-shadow .2s ease;
}
.sponsor-card:hover,[data-sponsor]:hover{
  transform:translateY(-4px);
  box-shadow:0 12px 28px rgba(0,0,0,.45), 0 0 12px rgba(225,29,46,.4);
}

/* ========== Player preview strip (optional) ========== */
.player-strip{
  background:linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
  border:1px solid var(--npb-border); border-radius:16px; padding:14px 16px;
  display:flex; align-items:center; gap:12px; backdrop-filter:blur(6px)
}
.player-strip .bar{height:6px;width:100%;margin-top:8px;border-radius:6px;background:rgba(255,255,255,.12);position:relative;overflow:hidden}
.player-strip .bar::after{content:"";position:absolute;inset:0;width:38%;background:var(--npb-red);border-radius:6px;box-shadow:0 0 12px rgba(225,29,46,.6)}

/* ========== Scroll reveal ========== */
.reveal{opacity:0; transform:translateY(16px); transition:opacity .55s ease, transform .55s ease}
.reveal.in{opacity:1; transform:none}

/* ========== Sticky subscribe bar (auto-injected) ========== */
.sticky-sub{
  position:fixed; left:0; right:0; bottom:-100px; z-index:60;
  background:linear-gradient(180deg, rgba(225,29,46,.10), rgba(0,0,0,.92));
  border-top:1px solid rgba(225,29,46,.45); backdrop-filter:blur(8px);
  display:flex; justify-content:center; align-items:center; gap:14px; padding:12px;
  transition:transform .25s ease; transform:translateY(100%);
}
.sticky-sub.show{ transform:translateY(0) }
.sticky-sub .ss-form{display:flex; gap:8px; flex-wrap:wrap}
.sticky-sub input{
  background:#0C0F14; border:1px solid var(--npb-border); color:#fff;
  padding:10px 12px; border-radius:10px; min-width:240px
}
@media(max-width:560px){ .sticky-sub{flex-direction:column} .sticky-sub input{min-width:100%} }

/* ========== WhatsApp FAB pulse (if your FAB uses .whatsapp-fab) ========== */
.whatsapp-fab{
  animation:npb-pulse 2.6s ease-in-out infinite; box-shadow:0 16px 30px rgba(225,29,46,.45)!important;
}
@keyframes npb-pulse{
  0%,100%{ box-shadow:0 16px 30px rgba(225,29,46,.45), 0 0 0 0 rgba(225,29,46,.38) }
  60%{ box-shadow:0 16px 30px rgba(225,29,46,.45), 0 0 0 16px rgba(225,29,46,0) }
}
        `
      }} />
    </>
  );
};

export default VisualUpgradePack;