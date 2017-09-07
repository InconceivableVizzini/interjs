import test from 'ava';
import Now from './src/time.js';
import {Maths, Animation, Interpolation} from './src/inter.js';

let animation = new Animation();
let obj = {x: 0, y: 0};
let inter = new Interpolation(obj);
inter.interpolate({x: 50, y: 50}, 1000);

function testEaseInBounds(t, eased) {
  t.true(eased>=0.0 && eased<=1.0);
}

function testEasingFn(t, fn) {
  t.plan(10);
  for (let i=0; i<1.0; i+=.101) {
    testEaseInBounds(t, fn(i));
  }
}

function testSymmetricEasingFn(t, fn) {
  t.plan(70);
  for (let i=0; i<1.0; i+=.101) {
    for (let k = 0.5; k<=3.5; k+=0.5) {
      testEaseInBounds(t, fn(-1*(0.9-i*2), k));
    }
  }
}




test('Add interpolation to animation', function(t) {
  t.plan(2);
  t.is(animation.interpolations.length, 0);
  animation.add(inter);
  t.is(animation.interpolations.length, 1);
});
test('Added interpolations are not active', function(t) {
  t.plan(1);
  t.is(animation.active_interpolations.length, 0);
});
test('Remove interpolation from animation', function(t) {
  t.plan(1);
  animation.remove(inter);
  t.is(animation.interpolations.length, 0);
});
test('Interpolations become active when played', function(t) {
  t.plan(2);
  animation.play(inter);
  t.is(animation.interpolations.length, 1);
  t.is(animation.active_interpolations.length, 1);
});
test('Interpolations are removed from animations when complete', function(t) {
  t.plan(2);
  animation.update(Now()+1001);
  t.is(animation.interpolations.length, 0);
  t.is(animation.active_interpolations.length, 0);
});
test('Maths.isPowerOfTwo', function(t) {
  t.plan(7);
  t.true(Maths.isPowerOfTwo(0));
  t.true(Maths.isPowerOfTwo(0.5));
  t.true(Maths.isPowerOfTwo(1));
  t.true(Maths.isPowerOfTwo(1.2));
  t.false(Maths.isPowerOfTwo(3));
  t.false(Maths.isPowerOfTwo(5));
  t.true(Maths.isPowerOfTwo(8));
});
test('Maths.nextPowerOfTwo', function(t) {
  t.plan(7);
  t.is(Maths.nextPowerOfTwo(0), 0);
  t.is(Maths.nextPowerOfTwo(0.5), 0);
  t.is(Maths.nextPowerOfTwo(1), 1);
  t.is(Maths.nextPowerOfTwo(1.2), 1);
  t.is(Maths.nextPowerOfTwo(3), 4);
  t.is(Maths.nextPowerOfTwo(5), 8);
  t.is(Maths.nextPowerOfTwo(8), 8);
});
test('Maths.closestPowerOfTwo', function(t) {
  t.plan(7);
  t.is(Maths.closestPowerOfTwo(0), 0);
  t.is(Maths.closestPowerOfTwo(0.5), 0);
  t.is(Maths.closestPowerOfTwo(1), 1);
  t.is(Maths.closestPowerOfTwo(1.2), 1);
  t.is(Maths.closestPowerOfTwo(3), 4);
  t.is(Maths.closestPowerOfTwo(5), 4);
  t.is(Maths.closestPowerOfTwo(8), 8);
});
test('Maths.clip', function(t) {
  t.plan(3);
  t.is(Maths.clip(5.5, 5.1, 5.9), 5.5);
  t.is(Maths.clip(5.5, 5.6, 5.9), 5.6);
  t.is(Maths.clip(5.5, 5.1, 5.4), 5.4);
});
test('Maths.clip01', function(t) {
  t.plan(3);
  t.is(Maths.clip01(-0.5), 0.0);
  t.is(Maths.clip01(0.5), 0.5);
  t.is(Maths.clip01(1.5), 1.0);
});
test('Maths.lerp', function(t) {
  t.plan(3);
  t.is(Maths.lerp(0, 100, 0), 0);
  t.is(Maths.lerp(0, 100, 0.5), 50);
  t.is(Maths.lerp(0, 100, 1), 100);
});
test('Maths.lerpWithPrecision', function(t) {
  t.plan(2);
  t.is(Maths.lerp(-42.0e30, 42.0, 1.0), 0);
  t.is(Maths.lerpWithPrecision(-42.0e30, 42.0, 1.0), 42.0);
});
test('Maths.lerpAngle', function(t) {
  t.plan(8);
  t.is(Maths.lerpAngle(0, 90, 0), 0);
  t.is(Maths.lerpAngle(0, 90, 0.2), 18);
  t.is(Maths.lerpAngle(0, 90, 0.4), 36);
  t.is(Maths.lerpAngle(0, 90, 0.8), 72);
  t.is(Maths.lerpAngle(0, 90, 1.0), 90);
  t.is(Maths.lerpAngle(100, 90, 0.8), -8);
  t.is(Maths.lerpAngle(30, 862, 0.5), 56);
  t.is(Maths.lerpAngle(30, 862, 1.0), 112);
});
test('Maths.NoEasing', function(t) {
  t.plan(10);
  for (let i=0; i<1.0; i+=.101) {
    let eased = Maths.NoEasing(i);
    t.is(eased, i);
  }
});
test('Maths.QuadraticIn', function(t) {
  testEasingFn(t, Maths.QuadraticIn);
});
test('Maths.QuadraticOut', function(t) {
  testEasingFn(t, Maths.QuadraticOut);
});
test('Maths.QuadraticInOut', function(t) {
  testEasingFn(t, Maths.QuadraticInOut);
});
test('Maths.CubicIn', function(t) {
  testEasingFn(t, Maths.CubicIn);
});
test('Maths.CubicOut', function(t) {
  testEasingFn(t, Maths.CubicOut);
});
test('Maths.CubicInOut', function(t) {
  testEasingFn(t, Maths.CubicInOut);
});
test('Maths.QuarticIn', function(t) {
  testEasingFn(t, Maths.QuarticIn);
});
test('Maths.QuarticOut', function(t) {
  testEasingFn(t, Maths.QuarticOut);
});
test('Maths.QuarticInOut', function(t) {
  testEasingFn(t, Maths.QuarticInOut);
});
test('Maths.QuinticIn', function(t) {
  testEasingFn(t, Maths.QuinticIn);
});
test('Maths.QuinticOut', function(t) {
  testEasingFn(t, Maths.QuinticOut);
});
test('Maths.QuinticInOut', function(t) {
  testEasingFn(t, Maths.QuinticInOut);
});
test('Maths.Impulse', function(t) {
  t.plan(7);
  t.is(Maths.Impulse(0.0, 2), 0);
  t.is(Maths.Impulse(0.5, 2), 1);
  t.is(parseFloat(Maths.Impulse(1.0, 2).toFixed(2)), 0.74);
  t.is(Maths.Impulse(0.0, 24), 0);
  t.is(parseFloat(Maths.Impulse(0.1, 24).toFixed(2)), 0.59);
  t.is(parseFloat(Maths.Impulse(0.5, 24).toFixed(4)), 0.0002);
  t.is(parseFloat(Maths.Impulse(1.0, 24).toFixed(2)), 0);
});
test('Maths.CubicPulse', function(t) {
  t.plan(9);
  t.is(Maths.CubicPulse(0.0, 0.0, 0.5), 1);
  t.is(Maths.CubicPulse(0.5, 0.0, 0.5), 0);
  t.is(Maths.CubicPulse(1.0, 0.0, 0.5), 0);
  t.is(Maths.CubicPulse(0.0, 0.5, 0.5), 0);
  t.is(Maths.CubicPulse(0.5, 0.5, 0.5), 1);
  t.is(Maths.CubicPulse(1.0, 0.5, 0.5), 0);
  t.is(Maths.CubicPulse(0.0, 1.0, 0.5), 0);
  t.is(Maths.CubicPulse(0.5, 1.0, 0.5), 0);
  t.is(Maths.CubicPulse(1.0, 1.0, 0.5), 1);
});
test('Maths.PowerCurve', function(t) {
  t.plan(6);
  t.is(Maths.PowerCurve(0.0, 2.0, 1.0), 0);
  t.is(parseFloat(Maths.PowerCurve(0.2, 2.0, 1.0).toFixed(3)), 0.216);
  t.is(parseFloat(Maths.PowerCurve(0.4, 2.0, 1.0).toFixed(3)), 0.648);
  t.is(Maths.PowerCurve(0.6, 2.0, 1.0), 0.972);
  t.is(Maths.PowerCurve(0.8, 2.0, 1.0), 0.864);
  t.is(Maths.PowerCurve(1.0, 2.0, 1.0), 0);
});

test('Maths.SymmetricPowerCurveA', function(t) {
  testSymmetricEasingFn(t, Maths.SymmetricPowerCurveA);
});
test('Maths.SymmetricPowerCurveB', function(t) {
  testSymmetricEasingFn(t, Maths.SymmetricPowerCurveB);
});
test('Maths.SymmetricPowerCurveC', function(t) {
  testSymmetricEasingFn(t, Maths.SymmetricPowerCurveC);
});
test('Maths.SymmetricPowerCurveD', function(t) {
  testSymmetricEasingFn(t, Maths.SymmetricPowerCurveD);
});
test('Maths.SymmetricPowerCurveE', function(t) {
  testSymmetricEasingFn(t, Maths.SymmetricPowerCurveE);
});
