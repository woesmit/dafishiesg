// Singapore weekly daylight fishing planner. Light-window suggestions, not bite predictions.
export const FORECAST_URL='https://api.open-meteo.com/v1/forecast?latitude=1.3521&longitude=103.8198&daily=sunrise,sunset&hourly=precipitation_probability&timezone=Asia%2FSingapore&forecast_days=7&past_days=6';
const pad=v=>String(v).padStart(2,'0');
const isoOf=d=>`${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`;
export function sgToday(now=new Date()){return isoOf(new Date(now.getTime()+8*3600000));}
export function addDays(iso,n){const d=new Date(iso+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+n);return isoOf(d);}
export function currentWeek(today=sgToday()){const dow=new Date(today+'T00:00:00Z').getUTCDay();const mon=addDays(today,-((dow+6)%7));return Array.from({length:7},(_,i)=>addDays(mon,i));}
const rad=n=>n*Math.PI/180,norm=n=>(n%360+360)%360;
// NOAA sunrise/sunset approximation at Singapore centre; a few minutes variance possible.
export function solarMinutes(date,sunrise){
 const lat=1.3521,lon=103.8198,offset=8,d=new Date(date+'T00:00:00Z');
 const N=Math.floor((d-new Date(Date.UTC(d.getUTCFullYear(),0,1)))/86400000)+1;
 const lngHour=lon/15,t=N+((sunrise?6:18)-lngHour)/24,M=0.9856*t-3.289;
 const L=norm(M+1.916*Math.sin(rad(M))+0.02*Math.sin(rad(2*M))+282.634);
 let RA=norm(Math.atan(0.91764*Math.tan(rad(L)))*180/Math.PI);
 RA+=Math.floor(L/90)*90-Math.floor(RA/90)*90;RA/=15;
 const sinDec=.39782*Math.sin(rad(L)),cosDec=Math.cos(Math.asin(sinDec));
 const cosH=(Math.cos(rad(90.833))-sinDec*Math.sin(rad(lat)))/(cosDec*Math.cos(rad(lat)));
 if(cosH>1||cosH<-1)return null;
 const H=(sunrise?360-Math.acos(cosH)*180/Math.PI:Math.acos(cosH)*180/Math.PI)/15;
 return Math.round(((H+RA-.06571*t-6.622-lngHour+offset+48)%24)*60);
}
function fromIsoTime(s){const m=/T(\d{2}):(\d{2})/.exec(s||'');return m?+m[1]*60+(+m[2]):null;}
export function formatTime(v){if(v==null||!Number.isFinite(v))return '—';const n=(v+1440)%1440,h=Math.floor(n/60);return `${h%12||12}:${pad(n%60)} ${h<12?'am':'pm'}`;}
function rainRisk(data,date,start,end){
 const t=data?.hourly?.time,p=data?.hourly?.precipitation_probability;
 if(!Array.isArray(t)||!Array.isArray(p)||t.length!==p.length)return null;
 const readings=[];
 for(let i=0;i<t.length;i++){if(!t[i].startsWith(date+'T'))continue;const at=fromIsoTime(t[i]);if(at!==null&&at>=start-30&&at<=end+30&&Number.isFinite(p[i]))readings.push(p[i]);}
 return readings.length?Math.max(...readings):null;
}
export function buildWeek(data,today=sgToday()){
 return currentWeek(today).map(date=>{
  const ix=data?.daily?.time?.indexOf(date)??-1;
  const rise=ix>=0?fromIsoTime(data?.daily?.sunrise?.[ix]):null;
  const set=ix>=0?fromIsoTime(data?.daily?.sunset?.[ix]):null;
  const sunrise=rise??solarMinutes(date,true),sunset=set??solarMinutes(date,false);
  const am={start:sunrise+15,end:sunrise+105},pm={start:sunset-105,end:sunset-15};
  am.rain=rainRisk(data,date,am.start,am.end);pm.rain=rainRisk(data,date,pm.start,pm.end);
  return {date,sunrise,sunset,am,pm,past:date<today,today:date===today,estimated:rise===null||set===null};
 });
}
export function bestWindow(days,today=sgToday(),now=new Date()){
 const sg=new Date(now.getTime()+8*3600000),minutes=sg.getUTCHours()*60+sg.getUTCMinutes();
 return days.flatMap(d=>['am','pm'].map(slot=>({date:d.date,slot,...d[slot]}))).filter(w=>(w.date>today||(w.date===today&&w.end>minutes))&&w.rain!==null).sort((a,b)=>a.rain-b.rain||a.date.localeCompare(b.date)||a.start-b.start)[0]||null;
}
