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

// Return 1 if a pixel is withing a rectangular area, 0 if it is not
float rect(in vec2 coord, in vec2 size){
    vec2 uv = step(size, coord * (1.0 - coord));

    return uv.x * uv.y;
}

void main() {
    // the pixel coordinates
    vec2 coord = vTexCoord;

    // change the background color based on the y position of the mouse. Using
    // hsb makes this simpler by allowing us to map the mouse Y position to
    // the hue value.
    vec3 backgroundColor = hsb2rgb(vec3(mouse.y, 1, 1));

    // use the inverted hue on the foreground color by using the mouse y position
    // in the opposite direction.
    vec3 foregroundColor = hsb2rgb(vec3(1.0 - mouse.y, 1, 1));

    // Mix uses the third parameter to interpolate between two values
    // https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/mix.xhtml
    vec3 color = mix(
        backgroundColor,
        foregroundColor,

        // use the pixel coordinates to mix between the foreground and background color.
        // Uses the mouse X position to determine when the break should happen, simulating
        // a shape within a shape.
        rect(coord, vec2(1.0 - (mouse.x)))
    );

    gl_FragColor = vec4(color, 1.0);
}