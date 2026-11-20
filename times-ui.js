import {sgToday,currentWeek,buildWeek,bestWindow,formatTime,FORECAST_URL} from './fishing-times.js?v=20261121-1';
const $=id=>document.getElementById(id);
const state={weather:null,mode:'freshwater',loaded:false,updated:null,day:sgToday()};
const dateLabel=date=>new Intl.DateTimeFormat('en-SG',{weekday:'short',day:'numeric',month:'short',timeZone:'UTC'}).format(new Date(date+'T00:00:00Z'));
const shortLabel=date=>new Intl.DateTimeFormat('en-SG',{day:'numeric',month:'short',timeZone:'UTC'}).format(new Date(date+'T00:00:00Z'));
const rainLabel=p=>p===null?'Rain outlook unavailable':p<=30?'Lower shower risk':p<=60?'Possible showers':'Higher shower risk';
const range=w=>formatTime(w.start)+' – '+formatTime(w.end);
function render(){
 state.day=sgToday();
 const days=buildWeek(state.weather,state.day),dates=currentWeek(state.day);
 $('week-range').textContent=shortLabel(dates[0])+' – '+shortLabel(dates[6])+' · SGT';
 for(const b of document.querySelectorAll('[data-fishing-mode]')){const active=b.dataset.fishingMode===state.mode;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}
 $('times-context').textContent=state.mode==='freshwater'
  ?'Freshwater lures: morning and late-afternoon daylight windows are useful starting points for peacock bass and snakehead. These are not measured catch predictions.'
  :'Coast / jetty: daylight-based planning only — NOT tide-adjusted bite predictions. Check local tides and currents before choosing a session.';
 const best=bestWindow(days,state.day);
 $('times-pick').textContent=best
  ?'Lower-rain opportunity: '+dateLabel(best.date)+' · '+(best.slot==='am'?'morning':'evening')+' · '+range(best)+' ('+best.rain+'% peak forecast rain chance)'
  :'Start with morning or late-afternoon sessions; forecast-based ranking is currently unavailable.';
 $('times-grid').replaceChildren();
 for(const d of days){
  const card=document.createElement('article');card.className='time-day'+(d.past?' is-past':'')+(d.today?' is-today':'');
  const head=document.createElement('div');head.className='time-day-head';
  const title=document.createElement('h3');title.textContent=dateLabel(d.date);
  const status=document.createElement('span');status.className='time-day-status';status.textContent=d.past?'Passed':d.today?'Today':'Upcoming';head.append(title,status);card.append(head);
  for(const [key,description] of [['am','Morning · after sunrise'],['pm','Evening · before sunset']]){
   const w=d[key],session=document.createElement('div');session.className='time-session';
   const label=document.createElement('span');label.className='time-session-title';label.textContent=description;
   const time=document.createElement('strong');time.textContent=range(w);
   const risk=document.createElement('small');risk.textContent=d.past?'Past session':w.rain===null?'Rain: no forecast':rainLabel(w.rain)+' · '+w.rain+'%';
   if(!d.past&&w.rain!==null)risk.className='time-rain '+(w.rain<=30?'low':w.rain>60?'high':'mid');
   session.append(label,time,risk);
   if(best&&best.date===d.date&&best.slot===key){const badge=document.createElement('span');badge.className='time-pick-tag';badge.textContent='Lowest rain risk';session.append(badge);}
   card.append(session);
  }
  $('times-grid').append(card);
 }
 const solarFallback=days.some(d=>d.estimated);
 $('times-status').textContent=state.loaded?(state.weather
  ?'Weather forecast loaded · '+state.updated+' SGT · island-wide estimate'+(solarFallback?' · some sunrise/sunset times calculated':'')+'.'
  :'Live forecast unavailable. Showing calculated sunrise/sunset windows only; rain risk unknown.')
  :'Showing calculated daylight windows. Loading weather outlook…';
}
async function loadWeather(){
 const c=new AbortController(),timer=setTimeout(()=>c.abort(),10000);$('times-refresh').disabled=true;
 try{
  const response=await fetch(FORECAST_URL,{signal:c.signal,cache:'no-store'});if(!response.ok)throw new Error('Forecast failed');
  const payload=await response.json();
  if(!payload?.daily?.time?.length||!Array.isArray(payload?.hourly?.time)||!Array.isArray(payload?.hourly?.precipitation_probability))throw new Error('Incomplete forecast');
  state.weather=payload;state.updated=new Intl.DateTimeFormat('en-SG',{timeZone:'Asia/Singapore',hour:'numeric',minute:'2-digit',hour12:true}).format(new Date());
 }catch(_e){state.weather=null;}
 finally{clearTimeout(timer);state.loaded=true;$('times-refresh').disabled=false;render();}
}
for(const button of document.querySelectorAll('[data-fishing-mode]'))button.addEventListener('click',()=>{state.mode=button.dataset.fishingMode;render();});
$('times-refresh').addEventListener('click',loadWeather);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&sgToday()!==state.day){state.loaded=false;state.weather=null;render();loadWeather();}});
render();loadWeather();
