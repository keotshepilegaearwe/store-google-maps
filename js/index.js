window.onload = () =>{
    displayStore();
}
var map;
var markers = [];
var infoWindow;
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

function initMap() {
    
    var sydney = {
        lat: -25.746019,
         lng: 28.187120
        };
    map = new google.maps.Map(document.getElementById('map'), {
        center: sydney,
         zoom: 11,
        mapTypeId: 'roadmap',
    });
    infoWindow = new google.maps.InfoWindow();
    showStoresMarkers();
}
function displayStore(){
    var storesHtml = '';
    for(const [index, store] of stores.entries()){
        var address = store["addressLines"];
        var phone = store['phoneNumber'];
        storesHtml +=`
            <div class="store-container">
                <div class="store-info-container">
                    <div class="store-address">
                        <span>${address[0]}</span>
                        <span>${address[1]}</span>
                    </div>
                    <div class="store-phone-number">${phone}</div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">
                        ${index+1}
                    </div>
                </div>
            </div>
        `
        document.querySelector('.store-list').innerHTML = storesHtml;

        console.log(store);
    }
}

function showStoresMarkers(){
    var bounds = new google.maps.LatLngBounds();
    for(const [index, store] of stores.entries()){
        var latlng = new google.maps.LatLng(
            store["coordinates"]["latitude"],
            store["coordinates"]["longitude"])
        var name =store['name'];
        var address = store['addressLines'][0];
        var phone = store['phoneNumber'];
        var openStatus = store["openStatusText"];
        bounds.extend(latlng);
        createMarker(latlng,name,address,index+1,phone,openStatus);
    }
    map.fitBounds(bounds);
}
function createMarker(latlng, name, address, index,phone,openStatus) {
    // var html = "<b>" + name + "</b> <br/>" + address + " <br/>"+ phone;
    
    var html = `
            <div class="info-container">
                <div class="info-address">
                    <span><strong>${name}</strong></span>
                    <span>
                        ${openStatus}
                    </span>
                    
                </div>
                <div class="info-phone-number"> 
                    <span>
                        <i class="fas fa-location-arrow my-border"></i>
                        <a target="-blank" href="https://www.google.com/maps/dir/Pretoria/${address},+CA+90004,+USA">${address}</a>
                    </span>
                    <span>
                        <i class="fas fa-phone my-border"></i>
                        ${phone}
                    </span>
                    
                </div>
            </div>
    `

    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      icon: iconBase + 'library_maps.png',
      label: index.toString()

    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
  }
