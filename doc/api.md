# inter.js API

The inter.js API provides utilities in three areas, generally -- statefulness, animation, and mathematics.

* `FSM` provides a Finite State Machine, so that objects have, and may change, state.
* `Animation`, and `Interpolation` allow objects to have animations that update their properties over time.
* `Maths` is a collection of efficient static methods that make those animations interesting by providing various ways to fill interpolations.

Inter.js does not render, it interpolates values. This library is intended to be used in conjunction with a rendering or visualization system, such as [three.js](https://threejs.org/) or [PixiJS](http://www.pixijs.com/).

## Animation

Complex animations are composed of collections of simple interpolations. Interpolations target a specific object, `let interp = new Interpolation(animateMyProperties)`, updating its properties over time. `Interpolation` is used to describe how those properties should be updated. These interpolations may be chained together, and looped. `Animation` is used to control the playback of interpolations.

The following example updates the `x` and `skew` properties over two seconds, looping three times, for an overall six second animation.

```
let minx = 0;
let maxx = 100;
let minskew = 0;
let maxskew = 30;

var animation = new Animation();

var objectToInterpolate = {x: minx, skew: minskew};


let interPos = new Interpolation(objectToInterpolate);
interPos.interpolate({x: maxx}, 1000)
        .interpolate({x: minx}, 1000);
interPos.loop = 3;

let interSkew = new Interpolation(objectToInterpolate);
interSkew.interpolate({skew: maxskew}, 500, Maths.QuadraticOut)
         .interpolate({skew: minskew}, 500)
         .interpolate({skew: -maxskew}, 500, Maths.QuadraticOut)
         .interpolate({skew: minskew}, 500);
interSkew.loop = 3;

animation.play(interPos);
animation.play(interSkew);

animationFrameCB();

let animationFrameCB = function() {
    animation.update();

    console.log('{x: '+ objectToInterpolate.x +', skew: '+ objectToInterpolate.skew +'}');

    requestAnimationFrame(animationFrameCB);
}
```

`Animation.update(now = Now())`

Update all active interpolations. The `now` parameter should be a timestamp with nanosecond resolution for best results, such as provided by `process.hrtime` or `performance.now`.

`Animation.play(inter)`

Adds the provided interpolation if required, and makes it active. Only active interpolations receive updates.

`Animation.pause(inter)`

If the provided interpolation is active, makes it inactive.

`Animation.remove(inter)`

Removes the provided interpolation.

`Animation.add(inter)`

Adds the provided interpolation if it is new. The added interpolation remains inactive.

`Interpolation.update(now)`

This method is usually called by `Animation`, but you may update interpolations manually if desired. See `Animation.update(now = Now())`.

`Interpolation.interpolate(properties, duration, easing=Maths.NoEasing, interpolation=Maths.lerp)`

Constructs a new keyframe for the desired interpolation. Calling this method multiple times will continue to push new kewframes onto the current interpolation. Once the current active keyframe reaches 100% progress through its motion, the next keyframe will become active.

`Interpolation.keyframe()`

Returns the currently active keyframe.

## Maths

`Maths.isPowerOfTwo(x)`, `Maths.nextPowerOfTwo(x)`,
`Maths.closestPowerOfTwo(x)`

These find their use in tasks such as dynamically resizing buffers.

`Maths.clip(x, lo, hi)`

Clips a value between a low and high range.

`Maths.clip01(x)`

Clips a value between a range of 0 and 1.

`Maths.lerp(a, b, t)`

Linear interpolation between a and b.

`Maths.lerpWithPrecision(a, b, t)`

Linear interpolation between a and b, for very large differences in values. If the distance between the numbers you are interpolating needs to be represented in scientific notation, this is the lerp to use.

`Maths.lerpAngle(a, b, t)`

Linear interpolation of the shortest angle between a and b, in degrees.

### Easing Functions

A visualization of these functions can be printed in the terminal using `npm run graph` in the root of the interjs repository.

`Maths.NoEasing(t)`, `Maths.QuadraticIn(t)`, `Maths.QuadraticOut(t)`,
`Maths.QuadraticInOut(t)`, `Maths.CubicIn(t)`, `Maths.CubicOut(t)`,
`Maths.QubicInOut(t)`, `Maths.QuarticIn(t)`, `Maths.QuarticOut(t)`,
`Maths.QuarticInOut(t)`, `Maths.QuinticIn(t)`, `Maths.QuinticOut(t)`,
`Maths.QuinticInOut(t)`

Run of the mill easing functions.

`Maths.Impulse(t, k)`

`Impulse` provides a value that reaches a maximum of `1.0` quickly then slowly deteriorates. The maximum is reached at `t=1/k`, meaning small values of `k` stretch the pulse while large values compress it.

`Maths.CubicPulse(t, p, k)`

`CubicPulse` provides a value that increases to a maximum of `1.0` then decreases symmetrically. The pulse can be shifted by a phase, `p`, and stretched by a proportion, `k`.

`Maths.PowerCurve(t, p, k)`

`PowerCurve` provides a slower, but more interesting, one dimensional motion that allows you to control the shape of the cubic pulse by changing the ratio of p and k. If p is larger than k, the cubic pulse will rise slowly and fall off quickly. If k is larger than p, the cubic pulse will rise quickly and fall off slowly.

`Maths.SymmetricPowerCurveA(t, k)`, `Maths.SymmetricPowerCurveB(t, k)`,
`Maths.SymmetricPowerCurveC(t, k)`, `Maths.SymmetricPowerCurveD(t, k)`,
`Maths.SymmetricPowerCurveE(t, k)`

These power curves are slower, but provide a wide array of symmetric "InOut" easing motion.
