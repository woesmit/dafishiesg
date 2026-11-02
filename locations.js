// Official fishing-location directory for Singapore.
// Coordinates are approximate navigation references only; they are NOT legal-zone boundaries.
// Legal access is defined by the linked official guidance, official maps and on-site signs.
export const sources = {
 PUB: {label:'PUB fishing guidance and designated-area maps',url:'https://www.pub.gov.sg/Public/Places-of-Interest/Our-Reservoirs-and-Waterways/ABC-Waters/PUB-Fishing'},
 NParks: {label:'NParks fishing guidance',url:'https://www.nparks.gov.sg/visit/activities/fishing'}
};

export const locations = [
 // PUB: all 15 reservoirs/waterways currently listed on PUB's official fishing page.
 {id:'bedok-reservoir',name:'Bedok Reservoir',agency:'PUB',region:'East',lat:1.3412,lng:103.9246,kind:'Reservoir',detail:'Fishing only within PUB-designated areas marked by signage/blue railings. The fishing deck is temporarily closed to 28 Feb 2027; PUB indicates alternative fishing grounds.'},
 {id:'jurong-lake',name:'Jurong Lake',agency:'PUB',region:'West',lat:1.3386,lng:103.7225,kind:'Lake',detail:'Fishing only within PUB-designated areas marked by signage/blue railings.'},
 {id:'pandan-reservoir',name:'Pandan Reservoir',agency:'PUB',region:'West',lat:1.3215,lng:103.7444,kind:'Reservoir',detail:'Fishing only within PUB-designated areas marked by signage/blue railings. Check current PUB notices for pontoon/jetty closures before visiting.'},
 {id:'pang-sua-canal',name:'Pang Sua Canal',agency:'PUB',region:'West',lat:1.3875,lng:103.7627,kind:'Waterway',detail:'Fishing only at the designated PUB fishing deck/zone; other canal sections are not implied to be legal fishing areas.'},
 {id:'kranji-reservoir',name:'Kranji Reservoir',agency:'PUB',region:'North',lat:1.4387,lng:103.7365,kind:'Reservoir',detail:'Fish only at designated areas. Kranji Reservoir Park has Fishing Ground A and Fishing Ground B.'},
 {id:'lower-seletar',name:'Lower Seletar Reservoir',agency:'PUB',region:'North',lat:1.4105,lng:103.8322,kind:'Reservoir',detail:'Fishing only within PUB-designated areas marked by signage/blue railings.'},
 {id:'serangoon-reservoir',name:'Serangoon Reservoir',agency:'PUB',region:'North-East',lat:1.3995,lng:103.9128,kind:'Reservoir',detail:'Fishing only within PUB-designated areas marked by signage/blue railings.'},
 {id:'marina-reservoir',name:'Marina Reservoir',agency:'PUB',region:'Central',lat:1.2897,lng:103.8687,kind:'Reservoir',detail:'Fishing only within PUB-designated areas marked by signage/blue railings; this pin does not imply the whole Marina Reservoir shoreline is fishable.'},
 {id:'geylang-river',name:'Geylang River',agency:'PUB',region:'Central',lat:1.3074,lng:103.8736,kind:'Waterway',detail:'Fishing only at PUB-designated fishing deck/zone sections; other river/canal sections are not implied to be legal.'},
 {id:'kolam-ayer',name:'Kolam Ayer ABC Waterfront',agency:'PUB',region:'Central',lat:1.3202,lng:103.8680,kind:'Waterway',detail:'Designated fishing area along Kallang River at Kolam Ayer ABC Waterfront. Follow PUB signage and blue railings.'},
 {id:'lower-peirce',name:'Lower Peirce Reservoir',agency:'PUB',region:'Central',lat:1.3697,lng:103.8270,kind:'Reservoir',detail:'Fishing only within PUB-designated areas marked by signage/blue railings.'},
 {id:'macritchie',name:'MacRitchie Reservoir',agency:'PUB',region:'Central',lat:1.3448,lng:103.8224,kind:'Reservoir',detail:'Fishing only within PUB-designated areas marked by signage/blue railings.'},
 {id:'pelton-canal',name:'Pelton Canal',agency:'PUB',region:'Central',lat:1.3338,lng:103.8840,kind:'Waterway',detail:'Fishing only at the designated PUB fishing deck/zone; other canal sections are not implied to be legal fishing areas.'},
 {id:'rochor-canal',name:'Rochor Canal',agency:'PUB',region:'Central',lat:1.3068,lng:103.8615,kind:'Waterway',detail:'Fishing only at the designated PUB fishing deck/zone; other canal sections are not implied to be legal fishing areas.'},
 {id:'upper-seletar',name:'Upper Seletar Reservoir',agency:'PUB',region:'North',lat:1.4027,lng:103.8051,kind:'Reservoir',detail:'Fishing only within PUB-designated areas marked by signage/blue railings.'},

 // NParks: all locations currently surfaced on NParks' official Fishing page.
 {id:'jurong-lake-gardens',name:'Jurong Lake Gardens',agency:'NParks',region:'West',lat:1.3376,lng:103.7303,kind:'Park / Lake',detail:'Cast into Jurong Lake only within designated fishing areas. PUB reservoir rules also apply where relevant.'},
 {id:'pulau-ubin',name:'Pulau Ubin',agency:'NParks',region:'East',lat:1.4043,lng:103.9607,kind:'Coastal',detail:'NParks states fishing is permitted along coastal areas except Chek Jawa Wetlands. Check local prohibited-area signs and current guidance.'},
 {id:'punggol-park',name:'Punggol Park',agency:'NParks',region:'North-East',lat:1.3777,lng:103.8963,kind:'Park / Pond',detail:'Two designated fishing areas around the lake. Fish only within those designated areas.'},
 {id:'woodlands-jetty',name:'Woodlands Waterfront Park',agency:'NParks',region:'North',lat:1.4533,lng:103.7794,kind:'Jetty / Coastal',detail:'Fishing is allowed at the jetty specifically along the stretch after the F&B outlet.'},
 {id:'lower-seletar-park',name:'Lower Seletar Reservoir Park',agency:'NParks',region:'North',lat:1.4135,lng:103.8328,kind:'Park / Reservoir',detail:'Fish from designated areas at the jetty. NParks notes species including Speckled Peacock Bass, Indonesian Snakehead and Peacock Cichlid.'},
 {id:'east-coast-park',name:'East Coast Park / Bedok Jetty',agency:'NParks',region:'East',lat:1.3032,lng:103.9312,kind:'Beach / Jetty',detail:'Fishing along the beachfront is allowed only where there are no No Fishing signs. Bedok Jetty in Area F is a popular fishing location.'},
 {id:'changi-beach',name:'Changi Beach Park',agency:'NParks',region:'East',lat:1.3900,lng:103.9910,kind:'Beach / Coastal',detail:'NParks states fishing is allowed anywhere along the beach; follow current signs and protected-area restrictions.'},
 {id:'sembawang-park',name:'Sembawang Park',agency:'NParks',region:'North',lat:1.4615,lng:103.8366,kind:'Jetty / Coastal',detail:'Fishing is available at Sembawang Jetty; follow current park signs and restrictions.'},
 {id:'pasir-ris-town-park',name:'Pasir Ris Town Park',agency:'NParks',region:'East',lat:1.3724,lng:103.9517,kind:'Fishing Pond',detail:'Fishing is available at the park pond. This is a managed fishing-pond setting; check current operator arrangements and park guidance.'}
].map(p=>({...p,accuracy:'approximate',sourceVerifiedAt:'2026-11-02',source:sources[p.agency].url}));

export function distanceKm(a,b){const r=Math.PI/180;const h=Math.sin((b.lat-a.lat)*r/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin((b.lng-a.lng)*r/2)**2;return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));}
export function filterLocations(items,{query='',region='',agency='',position=null}={}){const q=query.trim().toLowerCase();const result=items.filter(p=>(!region||p.region===region)&&(!agency||p.agency===agency)&&`${p.name} ${p.region} ${p.agency} ${p.kind}`.toLowerCase().includes(q));return position?result.sort((a,b)=>distanceKm(position,a)-distanceKm(position,b)):result;}
