import Maths from './maths.js';
import Now from './time.js';

class Animation {
  constructor() {
    this.interpolations = [];
    this.active_interpolations = [];
  }
  update(now = Now()) {    
    for (let inter_index of this.active_interpolations) {
      if (!this.interpolations[inter_index].update(now)) {
	this.remove(this.interpolations[inter_index])
      }
    }
  }
  play(inter) {
    inter.keyframe().started = Now();
    let i = this.interpolations.indexOf(inter);
    let j = this.active_interpolations.indexOf(i);
    if(i == -1) this.interpolations.push(inter);
    if(j == -1) this.active_interpolations.push(
                   ((i == -1) ? this.interpolations.length-1 : i));
  }
  pause(inter) {
    let i = this.interpolations.indexOf(inter);
    let j = this.active_interpolations.indexOf(i);
    if (j > -1) this.active_interpolations.splice(j, 1);
  }
  remove(inter) {
    let i = this.interpolations.indexOf(inter);
    let j = this.active_interpolations.indexOf(i);
    if (i > -1) this.interpolations.splice(i, 1);
    if (j > -1) this.active_interpolations.splice(j, 1);

    for (let k in this.active_interpolations) {
      if (this.active_interpolations[k] > i) --this.active_interpolations[k];
    }
  }
  add(inter) {
    let i = this.interpolations.indexOf(inter);
    if(i == -1) this.interpolations.push(inter);
  }
}

class Keyframe {
  constructor(props, duration, easing, interpolation, started) {
    this.properties = props;
    this.duration  = duration;
    this.easing = easing;
    this.interpolation = interpolation;
    this.started = 0.0;
  }
}

class Interpolation {
  constructor(obj) {
    this.props = obj;
    this.startingProps = Object.assign({}, obj);
    
    this.keyframes = [];
    this.active = 0;
    this.loop = 0;
  }
  keyframe() {
    return this.keyframes[this.active]||false;
  }
  update(now) {
    let keyframe = this.keyframes[this.active]||false;
    let prevKeyframe = this.keyframes[this.active - 1]||false;
    if (!keyframe) return;
    let progress = Maths.clip01((now-keyframe.started)/keyframe.duration);
    for (let prop in keyframe.properties) {
      let start = this.startingProps[prop] || 0.0;
      if (prevKeyframe !== false &&
	  prevKeyframe.properties[prop] !== undefined) {
	start = prevKeyframe.properties[prop];
      }
      this.props[prop] = keyframe.interpolation(start,
                                                keyframe.properties[prop],
                                                keyframe.easing(progress));
    }
    if (progress == 1) {
      if (keyframe == this.keyframes[this.keyframes.length - 1]) {
	if (this.loop == 0) {
	  return false;
	} else {
	  this.active = 0;
	  keyframe = this.keyframes[this.active]||false;
	  if (keyframe) keyframe.started = Now();
	  if (this.loop > 0) --this.loop;
	}
      } else {
	++this.active;
	let keyframe = this.keyframes[this.active]||false;
	if (keyframe) keyframe.started = Now();
      }
    }
    return true;
  }
  interpolate(properties, duration, easing=Maths.NoEasing, interpolation=Maths.lerp) {
    this.keyframes.push(new Keyframe(properties, duration, easing, interpolation));

    return this;
  }
}

export {Animation, Interpolation};
