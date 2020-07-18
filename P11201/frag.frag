// Based on: http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_1_2_01

precision mediump float;

varying vec2 vTexCoord;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
// Keyboard Control made easy by p5.js
// 1 = 360
// 2 = 45
// 3 = 24
// 4 = 12
// 5 = 6
uniform float segments;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

//  HSB to RGB function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

// Polar coordinates are easier to understand by example.
// This sketch is the union of two chapters from the
// book of shaders: https://thebookofshaders.com/06/, https://thebookofshaders.com/07/
// Reading through them will be very helpful in understanding the concepts used below:
// 1. Polar shapes and HSB (used for coloring and creating circles and polygons)
// 2. Distance Fields (used for creating foreground/background)

void main() {
    vec2 pixel = vTexCoord;

    // map dimensions from [0-1] to [-1,1]
    pixel = pixel * 2. - 1.;

    // angle and radius from current pixel
    float a = atan(pixel.x, pixel.y) + PI;
    float r = TWO_PI/segments;

    // Divide the angle into segments to achieve triangle fans,
    // offset them to fit the hexagon just like the example sketch
    float angleOffset = .5;
    float segmentedAngle = ((a / TWO_PI) * segments) + angleOffset;

    float hue = floor(segmentedAngle) / segments;
    float saturation = max(0.5, mouse.y * 2.0);
    float brightness = max(0.5, mouse.x * 1.0);
    vec3 shapeColor = hsb2rgb(vec3(hue, saturation, brightness));

    // Distance fields for calculating distance to center for each pixel
    float d = cos(floor(.5 + a/r) * r - a) * length(pixel);

    // Use the distance field to draw color OR white
    vec3 color = mix(shapeColor, vec3(1.0), step(.8, d));

    gl_FragColor = vec4(color,1.0);
}