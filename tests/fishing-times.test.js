import test from 'node:test';
import assert from 'node:assert/strict';
import { nextFourteenDays, buildFortnight, sgToday, FORECAST_URL } from '../fishing-times.js';
test('rolling fortnight spans exactly 14 consecutive calendar days',()=>{
  const dates=nextFourteenDays('2026-11-22');
  assert.equal(dates.length,14);
  assert.equal(dates[0],'2026-11-22');
  assert.equal(dates[6],'2026-11-28');
  assert.equal(dates[7],'2026-11-29');
  assert.equal(dates[13],'2026-12-05');
  assert.equal(new Set(dates).size,14);
});
test('year boundary and Singapore timezone work',()=>{
  assert.deepEqual([nextFourteenDays('2026-12-29')[0],nextFourteenDays('2026-12-29')[13]],['2026-12-29','2027-01-11']);
  assert.equal(sgToday(new Date('2026-11-21T16:05:00Z')),'2026-11-22');
});
test('forecast request covers 14 days without past-day bias',()=>{
  assert.match(FORECAST_URL,/forecast_days=14/);
  assert.doesNotMatch(FORECAST_URL,/past_days/);
});
test('light windows exist throughout the fortnight, even if forecast is unavailable',()=>{
  const days=buildFortnight(null,'2026-11-22');
  assert.equal(days.length,14);
  assert.ok(days.every(d=>Number.isFinite(d.am.start)&&Number.isFinite(d.pm.end)&&d.am.rain===null));
});
test('forecast rain probability applies to second week',()=>{
  const dates=nextFourteenDays('2026-11-22');
  const hours=dates.flatMap(date=>[date+'T07:00',date+'T17:00']);
  const forecast={daily:{time:dates,sunrise:dates.map(d=>d+'T06:55'),sunset:dates.map(d=>d+'T19:00')},hourly:{time:hours,precipitation_probability:hours.map((_,i)=>i===15?64:20)}};
  const days=buildFortnight(forecast,'2026-11-22');
  assert.equal(days[7].pm.rain,64);
  assert.equal(days[13].am.rain,20);
});
