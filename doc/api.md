# inter.js api

The inter.js api provides utilities in three areas, generally -- statefulness, animation, and mathematics.

* `FSM` provides a Finite State Machine, so that objects have, and may change, state.
* `Interpolation`, `Keyframe`, and `Animation` allow objects to have animations that update their properties over time.
* `Maths` is a collection of efficient static methods that make those animations interesting by providing various ways to fill in the gaps between keyframes.


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

