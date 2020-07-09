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

vec3 getColor(in vec2 coords, in float xGridCount) {
    return hsb2rgb(vec3(coords.x, 1, 1));
}

void main() {
    vec2 pixel = vTexCoord;

    float mouseXScaled = (1.0 - mouse.x) * 200.0;
    float mouseYScaled = (1.0 - mouse.y) * 200.0;

    float pixelXScaled = pixel.x * mouseXScaled;
    float pixelYScaled = pixel.y * mouseYScaled;

    float pixelX = floor(pixelXScaled);
    float pixelY = floor(pixelYScaled);

    // y should move down and end @ 1.0

    vec3 color = hsb2rgb(vec3(pixelX / mouseXScaled, max(0.5, pixelY / pixelYScaled), 1));

    gl_FragColor = vec4(color, 1);
}