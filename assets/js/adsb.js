async function loadAdsb(){
  try{
    const res = await fetch('assets/data/adsb.json',{cache:'no-store'});
    const d = await res.json();
    const set=(id,v)=>{const el=document.getElementById(id); if(el) el.textContent=v;};
    set('aircraftNow', d.aircraft_now ?? '—');
    set('msgRate', d.messages_per_second ?? '—');
    set('maxRange', (d.max_range_nm ?? '—') + (d.max_range_nm ? ' nm' : ''));
    set('receiverArea', d.receiver_area ?? 'Private');
    set('adsbUpdate', d.last_update ?? '—');
    set('adsbNote', d.note ?? '');
  }catch(e){
    const el=document.getElementById('adsbNote'); if(el) el.textContent='ADSB data file not available yet.';
  }
}
loadAdsb();
