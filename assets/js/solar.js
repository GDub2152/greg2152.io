const NOAA_BASE = 'https://services.swpc.noaa.gov/json/';
function bandCondition(kp, flux, band){
  if(kp >= 6) return 'poor';
  if(['10m','12m','15m'].includes(band)) return flux >= 150 && kp < 4 ? 'good' : flux >= 110 ? 'fair' : 'poor';
  if(['17m','20m'].includes(band)) return kp < 4 ? 'good' : 'fair';
  if(['30m','40m','80m'].includes(band)) return kp < 5 ? 'good' : 'fair';
  return kp < 4 ? 'fair' : 'poor';
}
async function loadSolar(){
  const set=(id,v)=>{const el=document.getElementById(id); if(el) el.textContent=v;};
  let kp=2, flux=120;
  try{
    const [kpRes, fluxRes] = await Promise.all([
      fetch(NOAA_BASE+'planetary_k_index_1m.json',{cache:'no-store'}),
      fetch(NOAA_BASE+'f107_cm_flux.json',{cache:'no-store'})
    ]);
    const kpData = await kpRes.json();
    const fluxData = await fluxRes.json();
    const lastKp = kpData[kpData.length-1];
    const lastFlux = fluxData[fluxData.length-1];
    kp = Number(lastKp.kp_index ?? lastKp.estimated_kp ?? kp);
    flux = Number(lastFlux.flux ?? lastFlux.observed_flux ?? flux);
    set('kpIndex', kp.toFixed(1));
    set('solarFlux', Math.round(flux));
    set('solarUpdated', lastKp.time_tag || lastFlux.time_tag || 'Live NOAA data');
  }catch(e){
    set('solarUpdated','Using fallback values until live NOAA data loads.');
  }
  const bands=['160m','80m','40m','30m','20m','17m','15m','12m','10m','6m'];
  const holder=document.getElementById('bandGrid');
  if(holder){
    holder.innerHTML=bands.map(b=>{
      const c=bandCondition(kp,flux,b);
      return `<div class="band ${c}"><strong>${b}</strong><span>${c.toUpperCase()}</span></div>`;
    }).join('');
  }
}
loadSolar();
