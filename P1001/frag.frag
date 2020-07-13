// Based on: http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_0_01
precision mediump float;

varying vec2 vTexCoord;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

//  HSB to RGB function by Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

// Returns 1 if a pixel is within a central rectangular
// area of size
float rect(in vec2 coord, in vec2 size){
    size = size * (1.0 - size);
    vec2 _coord = step(size, coord * (1.0 - coord));

    return _coord.x * _coord.y;
}

void main() {
    // the pixel coordinates
    vec2 pixel = vTexCoord;

    // change the hue of the background color based on the y position of the mouse. Using
    // hsb makes this much simpler by allowing us to use mouse Y (which is normalized in p5 to be [0-1.0]
    // to the hue value
    vec3 backgroundColor = hsb2rgb(vec3(mouse.y, 1, 1));

    // using the inverted mouse Y value for the foreground color
    vec3 foregroundColor = hsb2rgb(vec3(1.0 - mouse.y, 1, 1));

    // We use the third parameter on mix to switch between the background and foreground color
    // https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/mix.xhtml
    vec3 color = mix(
        backgroundColor,
        foregroundColor,
        // Uses the mouse X position to determine the size of the rectangular area.
        // If the pixel is within the rectangular area, show the froegroundColor,
        // if not, show the background color
        rect(pixel, vec2(mouse.x / 2.0))
    );

    gl_FragColor = vec4(color, 1.0);
}