export const Ease = {
    // no easing, no acceleration
    linear: function (t: number) { return t },
    // accelerating from zero velocity
    easeInQuad: function (t: number) { return t * t },
    // decelerating to zero velocity
    easeOutQuad: function (t: number) { return t * (2 - t) },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function (t: number) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
    // accelerating from zero velocity 
    easeInCubic: function (t: number) { return t * t * t },
    // decelerating to zero velocity 
    easeOutCubic: function (t: number) { return (--t) * t * t + 1 },
    // acceleration until halfway, then deceleration 
    easeInOutCubic: function (t: number) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
    // accelerating from zero velocity 
    easeInQuart: function (t: number) { return t * t * t * t },
    // decelerating to zero velocity 
    easeOutQuart: function (t: number) { return 1 - (--t) * t * t * t },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t: number) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
    // accelerating from zero velocity
    easeInQuint: function (t: number) { return t * t * t * t * t },
    // decelerating to zero velocity
    easeOutQuint: function (t: number) { return 1 + (--t) * t * t * t * t },
    // acceleration until halfway, then deceleration 
    easeInOutQuint: function (t: number) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t },
    // elastic bounce effect at the beginning
    easeInElastic: function (t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 },
    // elastic bounce effect at the end
    easeOutElastic: function (t) { return .04 * t / (--t) * Math.sin(25 * t) },
    // elastic bounce effect at the beginning and end
    easeInOutElastic: function (t) { return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1 }

}
