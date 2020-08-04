// Based on http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_2_2_01
// Todo Pixel Sorting
// https://www.shadertoy.com/view/4dd3Wj, https://www.shadertoy.com/view/4dcGDf, https://www.shadertoy.com/view/XdcGWf
// https://www.shadertoy.com/view/WlyXDt
precision mediump float;

varying vec2 vTexCoord;
uniform vec2 mouse;
uniform sampler2D tex;

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

vec2 smoothMouse(vec2 mouse, float easeFactor) {
    return vec2(exponentialEasing(mouse.x, easeFactor), exponentialEasing(mouse.y, easeFactor));
}

void main() {
    vec2 coord = vec2(vTexCoord.x, 1.0 - vTexCoord.y);

    vec2 mouseSmoothed = smoothMouse(mouse, 0.7);

    float scaleFactor = floor(300.0 * mouseSmoothed.x);

    float pixelX = floor(coord.x * scaleFactor);
    float pixelY = floor(coord.y * scaleFactor);

    vec4 image = texture2D(tex, vec2(pixelX / scaleFactor, pixelY / scaleFactor));
    vec3 color = vec3(image.r, image.g, image.b);

    gl_FragColor = vec4(color, 1.0);
}