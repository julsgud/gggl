precision mediump float;

varying vec2 vTexCoord;

uniform vec2 mouse;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

void main() {
    vec2 pixel = vTexCoord;
    vec3 color = vec3(0.0);

    float segments = 3.0;

    float scaledX = floor(pixel.x * segments);

    // figure out the ceil?
    color = mix(colorA, colorB, (scaledX + 1.0) / segments);

    gl_FragColor = vec4(color,1.0);
}