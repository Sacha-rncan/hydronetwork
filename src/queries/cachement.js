import axios from 'axios';
export async function getCachement(long, lat, projection){
  const mapId = 'mapWM';
  //activate loader icon
  document.getElementById('loader').style.visibility = "visible";;

  const defaultId = cgpv.api.map(mapId).layer.vector?.defaultGeometryGroupId;
  console.log(long + " " + lat + " " + projection)
  axios.get('http://localhost:3000/users/neo2/'+long+'/'+lat+'/'+projection)   
  .then(function (response) {
    console.log(response);
    cgpv.api.map(mapId).layer.vector?.deleteGeometriesFromGroup(defaultId);
    if (response.data[0].row_to_json.features[0].geometry.type=='Polygon'){
      const geom = cgpv.api.map(mapId).layer.vector?.addPolygon(
        response.data[0].row_to_json.features[0].geometry.coordinates,{
          style: {
            strokeColor: '#3d85c6',
            strokeWidth: 5,
            strokeOpacity: 1,
          },
        }
      );
    }
    else{
      cgpv.api.map(mapId).layer.vector?.deleteGeometriesFromGroup(defaultId);
      for (const element of response.data[0].row_to_json.features[0].geometry.coordinates){
        const geom = cgpv.api.map(mapId).layer.vector?.addPolygon(
          element,{
            style: {
              strokeColor: '#3d85c6',
              strokeWidth: 5,
              strokeOpacity: 1,
            },
          }
        );
    };
    }
    document.getElementById('loader').style.visibility = "hidden";;
  })
  .catch(function (error) { 
    document.getElementById('loader').style.visibility = "hidden";;    
    console.log(error);   })   
}


export async function getDownstream(long, lat, projection){
  const mapId = 'mapWM';
  console.log(long + " " + lat + " " + projection)
  axios.get('http://localhost:3000/users/downstream/'+long+'/'+lat+'/'+projection)   
  .then(function (response) {
    console.log(response);
    const defaultId = cgpv.api.map(mapId).layer.vector?.defaultGeometryGroupId;
    cgpv.api.map(mapId).layer.vector?.deleteGeometriesFromGroup(defaultId);
    if (response.data[0].row_to_json.features[0].geometry.type=='Polygon'){
        const geom = cgpv.api.map(mapId).layer.vector?.addPolygon(
          response.data[0].row_to_json.features[0].geometry.coordinates,{
            style: {
              strokeColor: '#3d85c6',
              strokeWidth: 5,
              strokeOpacity: 1,
            },
          }
        );
    }
    else{
      cgpv.api.map(mapId).layer.vector?.deleteGeometriesFromGroup(defaultId);
      for (const element of response.data[0].row_to_json.features[0].geometry.coordinates){
        const geom = cgpv.api.map(mapId).layer.vector?.addPolygon(
          element,{
            style: {
              strokeColor: '#3d85c6',
              strokeWidth: 5,
              strokeOpacity: 1,
            },
          }
        );
      };
    }
  })
  .catch(function (error) {     
    console.log(error);
  })   
}

