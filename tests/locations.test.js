import test from 'node:test';
import assert from 'node:assert/strict';
import {locations,filterLocations,distanceKm} from '../locations.js';

test('all 24 official PUB and NParks records have unique IDs and honest map-pin accuracy',()=>{
  assert.equal(locations.length,24);
  assert.equal(new Set(locations.map(p=>p.id)).size,24);
  assert.equal(locations.filter(p=>p.agency==='PUB').length,15);
  assert.equal(locations.filter(p=>p.agency==='NParks').length,9);
  for(const p of locations){
    assert.equal(p.accuracy,'approximate');
    assert.match(p.sourceVerifiedAt,/^\d{4}-\d{2}-\d{2}$/);
    assert.ok(p.lat>1.2&&p.lat<1.5&&p.lng>103.6&&p.lng<104.1);
    assert.ok(['www.pub.gov.sg','www.nparks.gov.sg'].includes(new URL(p.source).hostname));
  }
});
test('search and combined region/agency filters reflect expanded directory',()=>{
  assert.equal(filterLocations(locations,{query:' BEDOK '}).length,2);
  const eastParks=filterLocations(locations,{region:'East',agency:'NParks'});
  assert.deepEqual(eastParks.map(p=>p.id),['pulau-ubin','east-coast-park','changi-beach','pasir-ris-town-park']);
  assert.ok(filterLocations(locations,{region:'Central'}).length>0);
  assert.equal(filterLocations(locations,{query:'no such spot'}).length,0);
});
test('near me orders by distance without mutating directory',()=>{
  const before=locations.map(p=>p.id),position={lat:1.3032,lng:103.9312};
  assert.equal(filterLocations(locations,{position})[0].id,'east-coast-park');
  assert.equal(distanceKm(position,position),0);
  assert.ok(distanceKm(position,locations[1])>10);
  assert.deepEqual(locations.map(p=>p.id),before);
});
