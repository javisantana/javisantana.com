
Projector = function(map) { 
    this.setMap(map); 
    this.map = map;
}
Projector.prototype = new google.maps.OverlayView(); 
Projector.prototype.draw = function() {};
Projector.prototype.project = function(point) {
  return this.getProjection().fromLatLngToContainerPixel(point);
 // return this.map.getProjection().fromLatLngToPoint(point);
};
Projector.prototype.unproject = function(point) {
  return this.getProjection().fromContainerPixelToLatLng(point);
  //return this.map.getProjection().fromPointToLatLng(point);
};
    

