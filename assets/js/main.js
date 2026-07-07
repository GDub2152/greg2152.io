const bands=[['160m','Fair',45],['80m','Good',70],['40m','Good',75],['30m','Good',70],['20m','Excellent',92],['17m','Good',78],['15m','Fair',55],['12m','Fair',50],['10m','Poor',32],['6m','Fair',48],['2m','Good',72]];
function set(id,v){const e=document.getElementById(id); if(e)e.textContent=v}
function bandsRender(){const el=document.getElementById('bandGrid'); if(!el)return; el.innerHTML=bands.map(b=>`<div class="band"><b>${b[0]}</b><div class="bar"><div class="fill" style="width:${b[2]}%"></div></div><span>${b[1]}</span></div>`).join('')}
async function solar(){try{const r=await fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json');const k=await r.json();const last=k[k.length-1];set('kpIndex',last[1]);set('solarUpdated',new Date().toLocaleString());}catch(e){set('kpIndex','—');set('solarUpdated','NOAA offline/blocked')}}
async function adsb(){try{const r=await fetch('assets/data/adsb.json');const d=await r.json();set('aircraftNow',d.aircraft_now);set('aircraftToday',d.aircraft_today);set('msgSec',d.messages_sec);set('maxRange',d.max_range_nm+' NM');set('adsbStatus',d.status);set('adsbUpdate',d.last_update)}catch(e){}}
bandsRender(); solar(); adsb();
