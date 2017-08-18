'use strict';
// Read /docs. These methods do nothing to preserve
// readability.
class Maths {
  static isPowerOfTwo(x) {
    return (((x|0) & ((x|0)-1))|0) === 0;
  }
  static nextPowerOfTwo(x) {
    x = x|0;
    --x|0;
    x |= (x >> 1)|0;
    x |= (x >> 2)|0;
    x |= (x >> 4)|0;
    x |= (x >> 8)|0;
    x |= (x >> 16)|0;
    return ++x|0;
  }
  static closestPowerOfTwo(x) {
    let j = Maths.nextPowerOfTwo(x);
    if ((j-x)>(j>>2)) j = j>>1;
    return j;
  }
  static clip(x, lo, hi) {
    x = +(x);
    lo = +(lo);
    hi = +(hi);
    return +(x < lo ? lo : +(x > hi ? hi : x));
  }
  static clip01(x) {
    x = +(x);
    return +(x < 0  ? 0  : +(x > 1  ? 1  : x));
  }
  static lerp(a, b, t) {
    a = +(a);
    b = +(b);
    t = +(t);
    return +(a+t*(b-a));
  }
  static lerpWithPrecision(a, b, t) {
    a = +(a);
    b = +(b);
    t = +(t);
    return +((a*(1-t))+(b*t));
  }
  static lerpAngle(a, b, t) {
    a = +(a);
    b = +(b);
    t = +(t);
    return +(+(+(+(+((b-a)%360)+540)%360)-180)*t);
  }
  static NoEasing(t) { t = +(t); return +(t); }
  static QuadraticIn(t) { t = +(t); return +(t*t); }
  static QuadraticOut(t) { t = +(t); return +(t*(2-t)); }
  static QuadraticInOut(t) {
    t = +(t);
    return +(t*=2)<1?+(0.5*t*t):+(-0.5*(--t*(t-2)-1));
  }
  static CubicIn(t) { t = +(t); return +(t*t*t); }
  static CubicOut(t) { t = +(t); return +(--t * t * t + 1); }
  static CubicInOut(t) {
    t = +(t);
    return +(t*=2)<1?+(0.5*t*t*t):+(0.5*((t-=2)*t*t+2));
  }
  static QuarticIn(t) { t = +(t); return +(t*t*t*t); }
  static QuarticOut(t) { t = +(t); return +(1-(--t*t*t*t)); }
  static QuarticInOut(t) {
    t = +(t);
    return +(t*=2)<1?+(0.5*t*t*t*t):+(-0.5*((t-=2)*t*t*t-2));
  }
  static QuinticIn(t) { t = +(t); return +(t*t*t*t*t); }
  static QuinticOut(t) { t = +(t); return +(--t*t*t*t*t+1); }
  static QuinticInOut(t) {
    t = +(t);
    return +(t*=2)<1?+(0.5*t*t*t*t*t):+(0.5*((t-=2)*t*t*t*t+2));
  }
  static Impulse(t, k) {
    t = +(t);
    k = +(k);
    let h = +(k*t);
    return +(h*Math.exp(1.0-h));
  }
  static CubicPulse(t, p, k) {
    t = +(t);
    p = +(p);
    k = +(k);
    t = +(Math.abs(+(t-p)));
    if (t>k) return 0.0;
    t /= k;
    return +(1.0-t*t*(3.0-2.0*t));
  }
}
class FSM {
}
class Animation {
}
class Keyframe {
}
class Interpolation {
}
export { Maths, FSM, Interpolation, Keyframe, Animation }
