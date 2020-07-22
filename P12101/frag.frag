precision mediump float;

varying vec2 vTexCoord;

uniform vec2 mouse;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

void main() {
    vec2 pixel = vTexCoord;
    vec3 color = vec3(0.0);

    float segmentsX = mouse.x * 100.0;
    pixel = pixel * (segmentsX + 1.0);

    float roundedDownX = floor(pixel.x);

    color = mix(colorA, colorB, roundedDownX / segmentsX);

    gl_FragColor = vec4(color,1.0);
}