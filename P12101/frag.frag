precision mediump float;

varying vec2 vTexCoord;
uniform vec2 mouse;

bool shouldShakeColors = true;
vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float maxRows = 2.0;
float maxColumns = 100.0;

const int index = 1;

vec3 colorsLeft[10];
vec3 colorsRight[10];

void fillColors() {
    colorsLeft[0] = vec3(0.149,0.141,0.912);
    colorsRight[0] = vec3(1.000,0.833,0.224);
    colorsLeft[1] = vec3(0.749,0.541,0.812);
    colorsRight[2] = vec3(1.000,0.633,0.624);
    shouldShakeColors = false;
}

void main() {
    if (shouldShakeColors) fillColors();
    vec2 pixel = vTexCoord;
    vec3 color = vec3(0.0);

    float columns = mouse.x * maxColumns;
    pixel = vec2(pixel.x * (columns + 1.0), pixel.y * (columns + 1.0));

    float x = floor(pixel.x) / columns;

    float row = mouse.y * maxRows;
    const int y = int(floor(row));

    color = mix(colorsLeft[index], colorsRight[index], min(1.0, x));

    gl_FragColor = vec4(color,1.0);
}