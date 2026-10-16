(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))e(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&e(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const ee="modulepreload",te=function(o){return"/contacalorie/"+o},C={},oe=function(t,n,e){let a=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),c=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));a=Promise.allSettled(n.map(d=>{if(d=te(d),d in C)return;C[d]=!0;const r=d.endsWith(".css"),u=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const l=document.createElement("link");if(l.rel=r?"stylesheet":ee,r||(l.as="script"),l.crossOrigin="",l.href=d,c&&l.setAttribute("nonce",c),document.head.appendChild(l),r)return new Promise((p,f)=>{l.addEventListener("load",p),l.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${d}`)))})}))}function i(s){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s}return a.then(s=>{for(const c of s||[])c.status==="rejected"&&i(c.reason);return t().catch(i)})},x={app:{dailyGoalKcal:2e3,language:"it-IT"}};class ne{constructor(t="it-IT"){this.language=t,this._SR=window.SpeechRecognition||window.webkitSpeechRecognition||null}isSupported(){return this._SR!==null}listen(){return new Promise((t,n)=>{if(!this._SR){n(new Error("SpeechRecognition non supportato da questo browser"));return}const e=new this._SR;e.lang=this.language,e.continuous=!1,e.interimResults=!1,e.maxAlternatives=1,e.onresult=a=>{const i=a.results[0][0].transcript;t(i)},e.onerror=a=>{let i="Errore nel riconoscimento vocale";a.error==="not-allowed"?i="Permesso microfono negato":a.error==="no-speech"?i="Nessun audio rilevato":a.error==="network"&&(i="Errore di rete"),n(new Error(i))},e.onnomatch=()=>{n(new Error("Nessuna corrispondenza trovata"))},e.start()})}}const b={pane:270,"pane integrale":224,"pane bianco":265,pasta:350,"pasta cotta":157,"pasta integrale":335,riso:339,"riso cotto":139,"riso integrale":330,farro:335,avena:389,"fiocchi di avena":389,cereali:376,cornflakes:357,muesli:368,"fette biscottate":410,crackers:430,grissini:410,pizza:271,"pizza margherita":271,"cous cous":376,polenta:83,"polenta cotta":83,orzo:354,"pane di segale":259,tortilla:234,cornetto:350,brioche:380,biscotti:440,"biscotti secchi":420,wafer:490,ciambella:370,muffin:375,plumcake:355,croissant:406,pandoro:400,panettone:365,latte:61,"latte intero":61,"latte parzialmente scremato":46,"latte scremato":34,"latte di soia":33,yogurt:61,"yogurt magro":36,"yogurt greco":97,"yogurt bianco":61,mozzarella:253,ricotta:146,parmigiano:392,"grana padano":384,fontina:343,stracchino:255,mascarpone:430,burrata:285,feta:264,gorgonzola:324,provola:277,scamorza:334,caciotta:317,formaggio:350,panna:337,"panna da cucina":190,pollo:165,"petto di pollo":110,"coscia di pollo":185,tacchino:135,"petto di tacchino":105,manzo:250,bistecca:207,vitello:175,maiale:242,"lonza di maiale":182,salsiccia:380,hamburger:254,agnello:234,coniglio:136,wurstel:290,"prosciutto cotto":215,"prosciutto crudo":269,bresaola:151,speck:338,mortadella:311,salame:408,coppa:330,pancetta:420,guanciale:655,salmone:208,"salmone affumicato":117,tonno:184,"tonno in scatola":103,"tonno al naturale":103,merluzzo:82,orata:121,branzino:82,gamberi:85,cozze:84,vongole:74,polpo:82,calamari:92,sardine:208,acciughe:131,sgombro:205,baccalà:74,"pesce spada":121,uovo:155,uova:155,albume:52,tuorlo:352,lenticchie:116,"lenticchie cotte":116,fagioli:127,"fagioli cotti":127,"fagioli in scatola":90,ceci:164,"ceci cotti":164,"ceci in scatola":120,piselli:81,"piselli surgelati":77,tofu:76,soia:173,edamame:121,hummus:166,insalata:17,lattuga:14,spinaci:23,"spinaci cotti":35,broccoli:34,"broccoli cotti":35,zucchina:17,zucchine:17,melanzana:24,melanzane:24,peperone:31,peperoni:31,pomodoro:18,pomodori:18,"pomodori pelati":20,cetriolo:15,cetrioli:15,carota:35,carote:35,funghi:22,"funghi champignon":22,asparagi:20,fagiolini:31,patata:77,patate:77,"patate lesse":73,cavolfiore:25,cavolo:25,cipolla:40,aglio:149,sedano:16,finocchio:31,radicchio:23,rucola:25,carciofo:47,carciofi:47,zucca:26,mais:86,"mais in scatola":86,mela:52,pera:57,banana:89,arancia:47,kiwi:61,fragole:32,uva:69,anguria:30,melone:34,pesca:39,avocado:160,mirtilli:57,ananas:50,ciliegine:50,ciliegie:50,prugne:46,albicocche:48,lamponi:52,more:43,melograno:83,limone:29,pompelmo:42,mandarino:53,papaya:43,mango:60,fico:74,fichi:74,mandorle:579,noci:654,anacardi:553,pistacchi:562,nocciole:628,arachidi:567,pinoli:673,"semi di girasole":584,"semi di zucca":559,olio:884,"olio di oliva":884,"olio extravergine":884,burro:717,maionese:680,ketchup:112,senape:66,aceto:21,"aceto balsamico":88,"salsa di soia":53,cioccolato:546,"cioccolato fondente":598,"cioccolato al latte":535,nutella:539,miele:304,marmellata:260,gelato:207,"gelato alla crema":207,patatine:536,chips:536,popcorn:375,torta:340,crostata:346,tiramisù:280,"panna cotta":216,budino:115,merendina:380,caffè:2,tè:1,"succo di arancia":45,"succo di frutta":48,acqua:0,"latte di mandorla":24,"latte di riso":47,"coca cola":42,aranciata:40,birra:43,vino:85,"vino rosso":85,"vino bianco":77,spritz:60,ragù:150,besciamella:130,pesto:454,"sugo al pomodoro":50,brodo:15,minestra:45,minestrone:55},F={caffè:150,tè:200,acqua:250,uovo:60,uova:60,cornetto:80,brioche:80,mela:150,pera:150,banana:120,arancia:150,kiwi:80,pesca:130,prugne:50,albicocche:40,"fetta biscottata":10,"fette biscottate":20,crackers:25,grissini:30,ciambella:50,muffin:80};function E(o){if(!o)return null;const t=o.toLowerCase().trim();if(b[t]!==void 0)return{name:t,caloriesPer100g:b[t]};for(const[e,a]of Object.entries(b))if(e.startsWith(t))return{name:e,caloriesPer100g:a};for(const[e,a]of Object.entries(b))if(e.includes(t))return{name:e,caloriesPer100g:a};const n=Object.keys(b).sort((e,a)=>a.length-e.length);for(const e of n)if(t.includes(e))return{name:e,caloriesPer100g:b[e]};return null}const ae=Object.freeze(Object.defineProperty({__proto__:null,DEFAULT_PORTIONS:F,FOODS:b,searchFood:E},Symbol.toStringTag,{value:"Module"})),se={colazione:"breakfast",pranzo:"lunch",cena:"dinner",spuntino:"snack",merenda:"snack","prima colazione":"breakfast"},B={zero:0,uno:1,una:1,due:2,tre:3,quattro:4,cinque:5,sei:6,sette:7,otto:8,nove:9,dieci:10,undici:11,dodici:12,tredici:13,quattordici:14,quindici:15,sedici:16,diciassette:17,diciotto:18,diciannove:19,venti:20,trenta:30,quaranta:40,cinquanta:50,sessanta:60,settanta:70,ottanta:80,novanta:90,cento:100,centocinquanta:150,duecento:200,duecentocinquanta:250,trecento:300,quattrocento:400,cinquecento:500};function ie(o){let t=o;const n=Object.keys(B).sort((e,a)=>a.length-e.length);for(const e of n){const a=new RegExp(`\\b${e}\\b`,"gi");t=t.replace(a,B[e].toString())}return t}function ce(o){let t=o.toLowerCase();for(const e of Object.keys(se))t=t.replace(new RegExp(`\\b${e}\\b`,"gi"),"");return t=t.replace(/\b(ho mangiato|ho bevuto|ho preso|per la|per il|per lo|a|con|durante)\b/gi,""),t=ie(t),t.split(/,|;\s*|\be\b|\bpoi\b|\banche\b|\boltre a\b/i).map(e=>e.trim()).filter(e=>e.length>1)}function re(o){const t=o.trim();if(!t)return null;const n=t.match(/^(\d+)\s*(?:grammi?|g\b|gr\b|ml\b)\s+di\s+(.+)/i);if(n){const c=parseInt(n[1],10),d=n[2].trim(),r=E(d);return w(t,r,c)}const e=t.match(/^(.+?)\s+(\d+)\s*(?:grammi?|g\b|gr\b|ml\b)/i);if(e){const c=e[1].trim(),d=parseInt(e[2],10),r=E(c);return w(t,r,d)}const a=t.match(/^(\d+)\s+di\s+(.+)/i);if(a){const c=parseInt(a[1],10),d=a[2].trim(),r=E(d);return w(t,r,c)}const i=E(t),s=F[i?i.name:t]||null;return w(t,i,s)}function w(o,t,n){if(t){const e=n!=null?Math.round(t.caloriesPer100g*n/100):0;return{raw:o,food:t.name,grams:n,caloriesPer100g:t.caloriesPer100g,calories:e,found:!0}}return{raw:o,food:o,grams:n,caloriesPer100g:null,calories:0,found:!1}}function le(o){const t=ce(o),n=[];for(const e of t){const a=re(e);a&&n.push(a)}return n}const H="contacalorie_meals";function W(){const o=new Date,t=o.getFullYear(),n=String(o.getMonth()+1).padStart(2,"0"),e=String(o.getDate()).padStart(2,"0");return`${t}-${n}-${e}`}function M(){try{return JSON.parse(localStorage.getItem(H)||"{}")}catch{return{}}}function j(o){localStorage.setItem(H,JSON.stringify(o))}function U(){return{breakfast:[],lunch:[],dinner:[],snack:[]}}function Y(o){return M()[o]||U()}function de(o,t,n){const e=M();e[o]||(e[o]=U()),e[o][t]||(e[o][t]=[]);const a=n.map(i=>({food:i.food,grams:i.grams,calories:i.calories,addedAt:new Date().toISOString()}));e[o][t].push(...a),j(e)}function ue(o,t,n){const e=M();!e[o]||!e[o][t]||(e[o][t].splice(n,1),j(e))}function G(o){const t=Y(o);let n=0;for(const e of Object.values(t))for(const a of e)n+=a.calories||0;return n}class me{async parseFoods(t){return null}}const pe={breakfast:{label:"Colazione",icon:"🌅"},snack:{label:"Spuntino",icon:"🍎"},lunch:{label:"Pranzo",icon:"🍝"},dinner:{label:"Cena",icon:"🌙"}},fe=["breakfast","snack","lunch","dinner"];function ge(o){const[t,n,e]=o.split("-").map(Number);return new Date(t,n-1,e).toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}function he(o,{onAddMeal:t,onDeleteItem:n}){const e=W(),a=Y(e),i=G(e),s=x.app.dailyGoalKcal,c=Math.min(100,Math.round(i/s*100)),d=i>s?"#f57c00":"#2e7d32";let r=`
    <div class="header">
      <div class="header-title">ContaCalorie</div>
      <div class="header-date">${ge(e)}</div>
    </div>

    <div class="progress-card">
      <div class="progress-totals">
        <span class="progress-kcal">${i} kcal</span>
        <span class="progress-goal">/ ${s} kcal</span>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width:${c}%; background:${d};"></div>
      </div>
      <div class="progress-pct">${c}% dell'obiettivo giornaliero</div>
    </div>
  `;for(const u of fe){const{label:l,icon:p}=pe[u],f=a[u]||[],h=f.reduce((g,y)=>g+(y.calories||0),0);r+=`
      <div class="meal-section">
        <div class="meal-header">
          <div class="meal-title">
            <span class="meal-icon">${p}</span>
            <span class="meal-label">${l}</span>
          </div>
          <div class="meal-right">
            <span class="meal-kcal">${h} kcal</span>
            <button class="add-meal-btn" data-meal="${u}" aria-label="Aggiungi a ${l}">+</button>
          </div>
        </div>
    `,f.length===0?r+='<div class="meal-empty">Nessun alimento registrato</div>':(r+='<ul class="food-list">',f.forEach((g,y)=>{const _=g.grams!=null?`${g.grams}g`:"—";r+=`
          <li class="food-item">
            <div class="food-info">
              <span class="food-name">${g.food}</span>
              <span class="food-grams">${_}</span>
            </div>
            <div class="food-right">
              <span class="food-kcal">${g.calories} kcal</span>
              <button class="delete-btn" data-date="${e}" data-meal="${u}" data-idx="${y}" aria-label="Elimina">🗑</button>
            </div>
          </li>
        `}),r+="</ul>"),r+="</div>"}o.innerHTML=r,o.querySelectorAll(".add-meal-btn").forEach(u=>{u.addEventListener("click",()=>t(u.dataset.meal))}),o.querySelectorAll(".delete-btn").forEach(u=>{u.addEventListener("click",()=>{const{date:l,meal:p,idx:f}=u.dataset;ue(l,p,parseInt(f,10)),n()})})}const be=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"];function ve(){const o=[];for(let t=6;t>=0;t--){const n=new Date;n.setDate(n.getDate()-t);const e=n.getFullYear(),a=String(n.getMonth()+1).padStart(2,"0"),i=String(n.getDate()).padStart(2,"0"),s=`${e}-${a}-${i}`,c=be[n.getDay()];o.push({key:s,label:c,dayNum:n.getDate()})}return o}function ye(o,t,n){const e=o.getContext("2d"),a=window.devicePixelRatio||1,i=o.clientWidth,s=o.clientHeight;o.width=i*a,o.height=s*a,e.scale(a,a);const c=i,d=s,r=50,u=12,l=32,p=50,f=c-r-u,h=d-l-p,g=Math.max(n*1.25,...t.map(m=>m.total),100);function y(m){return l+h-m/g*h}e.clearRect(0,0,c,d),e.strokeStyle="#e0e0e0",e.lineWidth=1,[0,500,1e3,1500,2e3,2500].filter(m=>m<=g*1.05).forEach(m=>{const S=y(m);e.beginPath(),e.moveTo(r,S),e.lineTo(c-u,S),e.stroke(),e.fillStyle="#999",e.font="10px system-ui",e.textAlign="right",e.fillText(m===0?"0":`${m}`,r-4,S+4)});const A=y(n);e.strokeStyle="#f57c00",e.lineWidth=1.5,e.setLineDash([5,5]),e.beginPath(),e.moveTo(r,A),e.lineTo(c-u,A),e.stroke(),e.setLineDash([]),e.fillStyle="#f57c00",e.font="bold 10px system-ui",e.textAlign="left",e.fillText(`Obiettivo ${n}`,r+4,A-4);const Z=t.length,z=f/Z,L=Math.min(z*.55,36);t.forEach((m,S)=>{const k=r+S*z+z/2,I=m.total/g*h,T=l+h-I,q=m.total>n?"#f57c00":"#2e7d32";e.fillStyle=q,e.beginPath(),e.roundRect?e.roundRect(k-L/2,T,L,I,[4,4,0,0]):e.rect(k-L/2,T,L,I),e.fill(),m.total>0&&(e.fillStyle=q,e.font="bold 10px system-ui",e.textAlign="center",e.fillText(m.total,k,T-4)),e.fillStyle="#444",e.font="11px system-ui",e.textAlign="center",e.fillText(m.label,k,l+h+18),e.fillStyle="#999",e.font="10px system-ui",e.fillText(m.dayNum,k,l+h+32)})}function Se(o){const t=ve().map(d=>({...d,total:G(d.key)})),n=x.app.dailyGoalKcal,e=t.reduce((d,r)=>d+r.total,0),a=Math.round(e/7);o.innerHTML=`
    <div class="header">
      <div class="header-title">Trend calorie</div>
      <div class="header-date">Ultimi 7 giorni</div>
    </div>
    <div class="trends-stats">
      <div class="stat-card">
        <div class="stat-value">${e}</div>
        <div class="stat-label">kcal settimana</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${a}</div>
        <div class="stat-label">kcal media/giorno</div>
      </div>
    </div>
    <div class="chart-card">
      <canvas id="trend-canvas" style="width:100%;height:240px;display:block;"></canvas>
    </div>
    <div class="legend">
      <span class="legend-item"><span class="legend-dot" style="background:#2e7d32;"></span>Sotto obiettivo</span>
      <span class="legend-item"><span class="legend-dot" style="background:#f57c00;"></span>Sopra obiettivo</span>
    </div>
  `;const i=o.querySelector("#trend-canvas");function s(){ye(i,t,n)}requestAnimationFrame(s),new ResizeObserver(s).observe(i)}function ke(){return new me}const Ee=ke(),N=new ne(x.app.language),$e=document.getElementById("dashboard-content"),Le=document.getElementById("trends-content"),D=document.getElementById("overlay"),K=document.getElementById("bottom-sheet"),v=document.getElementById("sheet-content"),we=document.getElementById("fab-mic"),V=document.querySelectorAll(".nav-btn"),Pe=document.querySelectorAll(".page"),Ae=[{from:5*60,to:10*60+30,type:"breakfast"},{from:10*60+30,to:12*60,type:"snack"},{from:12*60,to:15*60,type:"lunch"},{from:15*60,to:18*60+30,type:"snack"},{from:18*60+30,to:23*60,type:"dinner"}];function ze(){const o=new Date,t=o.getHours()*60+o.getMinutes();for(const n of Ae)if(t>=n.from&&t<n.to)return n.type;return"snack"}const O={breakfast:{label:"Colazione",icon:"🌅"},snack:{label:"Spuntino",icon:"🍎"},lunch:{label:"Pranzo",icon:"🍝"},dinner:{label:"Cena",icon:"🌙"}};function J(o){Pe.forEach(t=>t.classList.toggle("active",t.id===`page-${o}`)),V.forEach(t=>t.classList.toggle("active",t.dataset.page===o)),o==="trends"&&Se(Le)}V.forEach(o=>{o.addEventListener("click",()=>J(o.dataset.page))});function Q(){D.classList.remove("hidden"),K.classList.add("open")}function $(){D.classList.add("hidden"),K.classList.remove("open")}D.addEventListener("click",$);function Ie(o){const t=ze();v.innerHTML=`
    <div class="sheet-title">Che pasto è?</div>
    <div class="meal-type-grid">
      ${Object.entries(O).map(([n,{label:e,icon:a}])=>`
        <button class="meal-type-btn ${n===t?"selected":""}" data-type="${n}">
          <span class="meal-type-icon">${a}</span>
          <span class="meal-type-label">${e}</span>
        </button>
      `).join("")}
    </div>
    <button class="sheet-cancel" id="cancel-btn">Annulla</button>
  `,document.getElementById("cancel-btn").addEventListener("click",$),v.querySelectorAll(".meal-type-btn").forEach(n=>{n.addEventListener("click",()=>P(n.dataset.type))})}function P(o){const{label:t,icon:n}=O[o];if(v.innerHTML=`
    <div class="sheet-title">${n} ${t}</div>
    <div class="listening-state">
      <div class="mic-pulse">🎤</div>
      <div class="listening-text">Sto ascoltando…</div>
      <div class="listening-hint">Dì gli alimenti con i grammi<br><em>es. "pasta 80 grammi, insalata 100g"</em></div>
    </div>
    <button class="sheet-cancel" id="cancel-btn">Annulla</button>
  `,document.getElementById("cancel-btn").addEventListener("click",$),!N.isSupported()){v.querySelector(".listening-text").textContent="Microfono non supportato da questo browser";return}N.listen().then(e=>Te(o,e)).catch(e=>X(o,e.message))}async function Te(o,t){v.innerHTML=`
    <div class="sheet-title">Ho capito…</div>
    <div class="transcript-box">"${t}"</div>
    <div class="parsing-spinner">⏳ Analisi in corso…</div>
  `;let n=null;try{const s=await Ee.parseFoods(t);if(s&&s.length>0){const{searchFood:c,DEFAULT_PORTIONS:d}=await oe(async()=>{const{searchFood:r,DEFAULT_PORTIONS:u}=await Promise.resolve().then(()=>ae);return{searchFood:r,DEFAULT_PORTIONS:u}},void 0);n=s.map(({food:r,grams:u})=>{const l=c(r),p=u??(d[l?l.name:r]||null),f=l&&p!=null?Math.round(l.caloriesPer100g*p/100):0;return{raw:`${r}${u!=null?` ${u}g`:""}`,food:l?l.name:r,grams:p,caloriesPer100g:l?l.caloriesPer100g:null,calories:f,found:!!l}})}}catch{}if(n||(n=le(t)),n.length===0){X(o,"Nessun alimento riconosciuto. Riprova.");return}const e=n.reduce((s,c)=>s+c.calories,0),{label:a,icon:i}=O[o];v.innerHTML=`
    <div class="sheet-title">${i} ${a}</div>
    <ul class="results-list">
      ${n.map((s,c)=>`
        <li class="result-item ${s.found?"item-found":"item-not-found"}">
          <span class="result-icon">${s.found?"✅":"⚠️"}</span>
          <div class="result-info">
            <span class="result-food">${s.food}</span>
            <span class="result-detail">
              ${s.grams!=null?`${s.grams}g`:"porzione non specificata"}
              ${s.found?`· ${s.caloriesPer100g} kcal/100g`:"· non trovato nel DB"}
            </span>
          </div>
          <span class="result-kcal">${s.found&&s.grams!=null?`${s.calories} kcal`:"—"}</span>
        </li>
      `).join("")}
    </ul>
    <div class="session-total">Totale sessione: <strong>${e} kcal</strong></div>
    <div class="sheet-actions">
      <button id="retry-btn" class="btn-secondary">🔄 Riprova</button>
      <button id="confirm-btn" class="btn-primary">✅ Conferma</button>
    </div>
  `,document.getElementById("retry-btn").addEventListener("click",()=>P(o)),document.getElementById("confirm-btn").addEventListener("click",()=>{const s=n.filter(c=>c.found&&c.grams!=null);s.length>0&&de(W(),o,s),$(),R()})}function X(o,t){v.innerHTML=`
    <div class="sheet-title">Errore</div>
    <div class="error-msg">⚠️ ${t}</div>
    <div class="sheet-actions">
      <button id="retry-btn" class="btn-secondary">🔄 Riprova</button>
      <button id="cancel-btn2" class="btn-secondary">Annulla</button>
    </div>
  `,document.getElementById("retry-btn").addEventListener("click",()=>P(o)),document.getElementById("cancel-btn2").addEventListener("click",$)}we.addEventListener("click",()=>{Q(),Ie()});function R(){he($e,{onAddMeal:o=>{Q(),P(o)},onDeleteItem:()=>R()})}"serviceWorker"in navigator&&(location.protocol==="https:"||location.hostname==="localhost")&&navigator.serviceWorker.register("/contacalorie/sw.js").catch(()=>{});R();J("dashboard");
