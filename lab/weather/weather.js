
function geocoder(address, callback) {

  var geo = new google.maps.Geocoder();
  geo.geocode({ address: address }, function(request) {
    request && callback(request[0]);
  });

}

function Plots (_) {
  var plots = {};
  var mail = _;
  var plots = [];

  plots.addPlot = function(pos) {
    plots.push(pos);
  };

  return plots;
}

function app() {

  var map;
  var start_dialog = $('#start');
  var search_dialog = $('#search');
  var button_start = $('#create_plots');
  var address = $('#address');
  var mail = $('#mail');
  var help = $('#help');

  var infowindow = new google.maps.InfoWindow({
    maxWidth: 300
  });

  function map_init() {
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 16,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  }


  function start() {
    start_dialog.fadeOut();
    search_dialog.fadeIn();
    plots = Plots(mail.val());
    help.fadeIn();
    geocoder(address.val(), function(pos) {
      if (pos.geometry.bounds)  {
        map.fitBounds(pos.geometry.bounds);
      } else {
        map.setCenter(pos.geometry.pos);
      }
      bindAddPlot();
    });
  }


  function bindAddPlot() {
      var onMarkerClick = function() {
        var marker = this;
        var latLng = marker.getPosition();
      };

      google.maps.event.addListener(map, 'click', function(e) {
        help.fadeOut();
        var marker = new google.maps.Marker({
          map: map,
          position: e.latLng
        });

        infowindow.setContent('<h3>Nombre de la parcela:</h3><input id="plot_name" type="text"></input> <button id="add_plot">añadir</button>');

        infowindow.open(map, marker);
      });

      //google.maps.event.addListener(marker1, 'click', onMarkerClick);
  }



  google.maps.event.addListener(infowindow, 'domready', function() {
    $('#add_plot').click(function() {
      var pos = infowindow.getAnchor().getPosition();
      plots.addPlot({
        name: $('#plot_name').val(),
        lat: pos.lat(),
        lon: pos.lng()
      })
      infowindow.close();
    });
  });




  // events
  button_start.click(start);


  map_init();

}





$(document).ready(function(){
  app();
});
 //]]>
