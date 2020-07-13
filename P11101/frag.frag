// Based on: http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_1_1_01
// Implementation is slighlty different on the saturation / mouse y
// due to the different nature of grids in webgl. If you can take it closer
// to the example, by all means!
precision mediump float;

varying vec2 vTexCoord;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

//  HSB to RGB function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


// http://www.flong.com/texts/code/shapers_exp/
float exponentialEasing(in float x, in float a){
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = max(min_param_a, min(max_param_a, a));

    if (a < 0.5){
        // emphasis
        a = 2.0*(a);
        float y = pow(x, a);
        return y;
    } else {
        // de-emphasis
        a = 2.0*(a-0.5);
        float y = pow(x, 1.0/(1.0-a));
        return y;
    }
}

vec3 getColor(in vec2 coords, in float xGridCount) {
    return hsb2rgb(vec3(coords.x, 1, 1));
}

void main() {
    vec2 pixel = vTexCoord;

    // Instead of using the mouse position linearly, we are using an
    // ease function so the visualization interaction feels smoother.
    // Test different values [0-1.0] and notice how the change feels different.
    float easeFactor = 0.1;
    float mouseXSmoothed = exponentialEasing(mouse.x, easeFactor);
    float mouseYSmoothed = exponentialEasing(mouse.y, easeFactor);

    // The purpose of this sketch is to bring in the concept of the grid.
    // We will take it a step further by adding mouse interaction, but the "Using the chaos" section
    // from the book of shaders makes it very easy to see how grids can be accomplished:
    // https://thebookofshaders.com/10/
    // The following means when the mouse is at the minumum [0], scale the axis to 300 segments
    // When the mouse is at the maximum [1], scale the axis to 1 segment
    // Try `mouseXScaled = mouseXSmooted * scaleFactor` and see what happens
    float scaleFactor = 300.0;
    float mouseXScaled = (1.0 - mouseXSmoothed) * scaleFactor;
    float mouseYScaled = (1.0 - mouseYSmoothed) * scaleFactor;

    // Now that the mouse variable keeps track of how many segments our grid is divided into
    // we multiply the pixel by the total number of segments and only get the whole number
    // value by using floor: https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/floor.xhtml
    // Again, if this breaks your braina bit, take a look at "Mosaic" example in https://thebookofshaders.com/10/
    float pixelX = floor(pixel.x * mouseXScaled);
    float pixelY = floor(pixel.y * mouseYScaled);

    // using max to not let the saturation value fall to less than 0.1, avoiding complete white
    vec3 color = hsv2rgb(vec3(pixelX / mouseXScaled, max(0.1, pixelY / mouseYScaled), 1));

    gl_FragColor = vec4(color, 1);
}