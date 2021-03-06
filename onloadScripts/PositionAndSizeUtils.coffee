require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"PositionAndSizeUtils":[function(require,module,exports){
exports.copyPositionAndSize = function(from, to) {
  to.width = from.width;
  to.height = from.height;
  to.x = from.x;
  return to.y = from.y;
};

exports.logLayerInfo = function(layer) {
  print('Layer: ' + layer.name);
  #return print('x: ' + layer.x + ', y: ' + layer.y + ', width: ' + layer.width + ', height: ' + layer.height);
};

exports.dragAndLog = function(layer) {
  var draggerH, draggerSize, draggerW, setDraggerPositions;
  layer.draggable = true;
  layer.backgroundColor = "rgba(254, 209, 54, 0.5)";
  draggerSize = 20;
  setDraggerPositions = function() {
    draggerW.x = layer.maxX - draggerSize;
    draggerW.y = layer.y + (layer.height / 2) - draggerSize;
    draggerH.x = layer.x + (layer.width / 2) - draggerSize;
    return draggerH.y = layer.maxY - draggerSize;
  };
  draggerW = new Layer({
    width: draggerSize * 2,
    height: draggerSize * 2,
    borderRadius: draggerSize * 2
  });
  draggerW.draggable.horizontal = true;
  draggerH = draggerW.copy();
  draggerH.draggable.vertical = true;
  draggerW.on(Events.DragMove, function() {
    layer.width = draggerW.x - layer.x + draggerSize;
    return setDraggerPositions();
  });
  draggerH.on(Events.DragMove, function() {
    layer.height = draggerH.y - layer.y + draggerSize;
    return setDraggerPositions();
  });
  layer.on(Events.DragMove, function() {
    return setDraggerPositions();
  });
  layer.on(Events.DragEnd, function() {
    return exports.logLayerInfo(layer);
  });
  draggerW.on(Events.DragEnd, function() {
    return exports.logLayerInfo(layer);
  });
  draggerH.on(Events.DragEnd, function() {
    return exports.logLayerInfo(layer);
  });
  return setDraggerPositions();
};
 },{}]},{},[])
// ---
// generated by coffee-script 1.9.2