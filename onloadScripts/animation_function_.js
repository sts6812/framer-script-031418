animtemplate = function(layer1, layer2, posOffsetX, posOffsetY,iteration, html, time, delay, tension, friction, velocity, animControl, scaleX, scaleY, marginLeft_, marginRight_, marginTop_, marginBottom_) {
  var animation1;
  animation1 = new Animation(layer1, {
    html: html,
    x: layer2.x+(posOffsetX*iteration),
    y: layer2.y+(posOffsetY*iteration),
    opacity: layer2.opacity,
    width: layer2.width,
    height: layer2.height,
    scaleX: scaleX,
    scaleY: scaleY,
    options: {
      time: time,
      delay: delay,
      curve: Spring({
        tension: tension,
        friction: friction,
        velocity: velocity
      })
    }
  });
  return eval(animControl);
};