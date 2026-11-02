// Navigation references only. No surveyed legal-zone boundaries.
export const sources = {
 PUB: {label:'PUB fishing guidance and designated-area maps',url:'https://www.pub.gov.sg/Public/WaterLoop/OurWaterStory/Reservoirs/Fishing'},
 NParks: {label:'NParks fishing guidance',url:'https://www.nparks.gov.sg/activities/fun-and-recreation/fishing'}
};
export const locations = [
 {id:'bedok-reservoir',name:'Bedok Reservoir',agency:'PUB',region:'East',lat:1.3412,lng:103.9246,kind:'Reservoir',detail:'Fishing is restricted to designated sections. This pin is a reservoir reference point, not an entrance or a legal fishing spot.'},
 {id:'lower-seletar',name:'Lower Seletar Reservoir',agency:'PUB',region:'North',lat:1.4105,lng:103.8322,kind:'Reservoir',detail:'Use only the designated fishing area. This reservoir reference pin does not identify its permitted boundary.'},
 {id:'jurong-lake',name:'Jurong Lake',agency:'PUB',region:'West',lat:1.3386,lng:103.7225,kind:'Reservoir',detail:'Only designated fishing sections are permitted. The lake reference pin does not make the surrounding shoreline a fishing zone.'},
 {id:'bedok-jetty',name:'Bedok Jetty',agency:'NParks',region:'East',lat:1.3032,lng:103.9312,kind:'Jetty',detail:'Approximate jetty location in East Coast Park. Check current signs and restrictions on the jetty; this listing does not designate the adjoining beach.'},
 {id:'woodlands-jetty',name:'Woodlands Waterfront Jetty',agency:'NParks',region:'North',lat:1.4533,lng:103.7794,kind:'Jetty',detail:'Approximate jetty location in Woodlands Waterfront Park. Follow designated fishing sections and on-site signs; this pin does not designate the entire park waterfront.'}
].map(p=>({...p,accuracy:'approximate',sourceVerifiedAt:null,source:sources[p.agency].url}));
export function distanceKm(a,b){const r=Math.PI/180;const h=Math.sin((b.lat-a.lat)*r/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin((b.lng-a.lng)*r/2)**2;return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));}
export function filterLocations(items,{query='',region='',agency='',position=null}={}){const q=query.trim().toLowerCase();const result=items.filter(p=>(!region||p.region===region)&&(!agency||p.agency===agency)&&`${p.name} ${p.region} ${p.agency} ${p.kind}`.toLowerCase().includes(q));return position?result.sort((a,b)=>distanceKm(position,a)-distanceKm(position,b)):result;}
