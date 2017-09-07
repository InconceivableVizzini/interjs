import {Maths} from '../src/inter.js';
let resolution = .101
let Chart = require('cli-chart');

function easingGraph() {
  return new Chart({
    direction: 'y',
    width: 30,
    height: 8,
    step: 3,
    ymin: 0.0,
    ymax: 1.0
  });
}

function graphEaseFn(ease, easeFn) {
  console.log(ease);
  let graph = easingGraph();
  for (let i = 0; i < 1.0; i += resolution) {
    graph.addBar(easeFn(i));
  }
  graph.draw();
}

function graphSymmetricEaseFn(ease, easeFn) {
  for (let k = 0.5; k<=3.5; k+=0.5) {
    graphEaseFn(ease+', k='+k, function(i) {
      return easeFn(-1*(0.91-i*2), k);
    });
  }
}

graphEaseFn('NoEasing', Maths.NoEasing);
graphEaseFn('QuadraticIn', Maths.QuadraticIn);
graphEaseFn('QuadraticOut', Maths.QuadraticOut);
graphEaseFn('QuadraticInOut', Maths.QuadraticInOut);
graphEaseFn('CubicIn', Maths.CubicIn);
graphEaseFn('CubicOut', Maths.CubicOut);
graphEaseFn('CubicInOut', Maths.CubicInOut);
graphEaseFn('QuarticIn', Maths.QuarticIn);
graphEaseFn('QuarticOut', Maths.QuarticOut);
graphEaseFn('QuarticInOut', Maths.QuarticInOut);
graphEaseFn('QuinticIn', Maths.QuinticIn);
graphEaseFn('QuinticOut', Maths.QuinticOut);
graphEaseFn('QuinticInOut', Maths.QuinticInOut);
graphEaseFn('Impulse, k=2', function(i) { return Maths.Impulse(i, 2); });
graphEaseFn('Impulse, k=4', function(i) { return Maths.Impulse(i, 4); });
graphEaseFn('Impulse, k=6', function(i) { return Maths.Impulse(i, 6); });
graphEaseFn('Impulse, k=8', function(i) { return Maths.Impulse(i, 8); });
graphEaseFn('Impulse, k=10', function(i) { return Maths.Impulse(i, 10); });
graphEaseFn('Impulse, k=12', function(i) { return Maths.Impulse(i, 12); });
graphEaseFn('Impulse, k=24', function(i) { return Maths.Impulse(i, 24); });
graphEaseFn('CubicPulse, p=0.0 k=0.5', function(i) { return Maths.CubicPulse(i, 0.0, 0.5); });
graphEaseFn('CubicPulse, p=0.5 k=0.5', function(i) { return Maths.CubicPulse(i, 0.5, 0.5); });
graphEaseFn('CubicPulse, p=1.0 k=0.5', function(i) { return Maths.CubicPulse(i, 1.0, 0.5); });
graphEaseFn('CubicPulse, p=0.5 k=0.1', function(i) { return Maths.CubicPulse(i, 0.5, 0.1); });
graphEaseFn('CubicPulse, p=0.5 k=0.5', function(i) { return Maths.CubicPulse(i, 0.5, 0.5); });
graphEaseFn('CubicPulse, p=0.5 k=0.9', function(i) { return Maths.CubicPulse(i, 0.5, 0.9); });
graphSymmetricEaseFn('SymmetricPowerCurveA', Maths.SymmetricPowerCurveA);
graphSymmetricEaseFn('SymmetricPowerCurveB', Maths.SymmetricPowerCurveB);
graphSymmetricEaseFn('SymmetricPowerCurveC', Maths.SymmetricPowerCurveC);
graphSymmetricEaseFn('SymmetricPowerCurveD', Maths.SymmetricPowerCurveD);
graphSymmetricEaseFn('SymmetricPowerCurveE', Maths.SymmetricPowerCurveE);

process.exit()
