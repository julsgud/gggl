// Based on: http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_1_1_01
// Implementation is slighlty different on the saturation / mouse y
// due to the different nature of grids in webgl. If you can take it closer
// to the example, by all means!
precision mediump float;

varying vec2 vTexCoord;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

const float TWO_PI = 6.28318530718;

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
float easing (float x, float a, float b){

    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    float min_param_b = 0.0;
    float max_param_b = 1.0;
    a = min(max_param_a, max(min_param_a, a));
    b = min(max_param_b, max(min_param_b, b));

    float y = 0.0;
    if (x <= a){
        y = b - b*pow(1.0-x/a, 3.0);
    } else {
        y = b + (1.0-b)*pow((x-a)/(1.0-a), 3.0);
    }
    return y;
}

vec3 getColor(in vec2 coords, in float xGridCount) {
    return hsb2rgb(vec3(coords.x, 1, 1));
}

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st - vec2(0.5);
    return 1.0-smoothstep(_radius-(_radius*0.8), _radius+(_radius*0.01), dot(dist,dist)*4.0);
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}


void main()
{
    float scale = .007;
    float rise_speed = 100.0;
    float density = .5+.5*abs(fract(time*.01)*2.-1.);
    float layer_speed_scale = 1.0;
    vec2 uv = gl_FragCoord.xy * vec2(2.,2.);
    vec2 x = uv;
    x *= .001;
    uv.y -= time*rise_speed;
    vec2 a = uv * scale;
    float s = fract(x.y*.5);
    s += s - 1.;
    float w = fract(time*.3+.9*a.y*.1);
    w += w - 1.;
    w *= 1.;
    float c = fract(a.y*.5);
    c += c - 1.;
    c *= .2;
    a.x += a.y * abs(w) * .3 * abs(c);
    vec2 i = floor(a);
    float it = fract(time * (i.x+10.)*.03);
    it += it - 1.;
    a.y += ((1.+i.x)*(1.+i.x)*.3213+.2*abs(it)); // Wave pattern
    a.y -= time*layer_speed_scale*fract(abs(i.x*.312)); // Multi speed "layers"
    a.y *= .5+.5*fract(i.x*.5);
    a.y *= 2.;
    a.x += 0.5;
    vec2 i2 = floor(a+.5);
    vec2 f = fract(a);
    f += f - 1.;
    f = abs(f);
    float v = step(density,fract((fract(i2.y*.1)+fract(i.x*.01))*63.232));
    float e = v*smoothstep(.5+.2*fract(-i.x*.3+.5),.99,f.x) * smoothstep(.75+.14*fract(i.x*.25+.23),.99,f.y);
    vec3 col = mix(vec3(1.,.8,.0),vec3(.5,.05,.05),clamp(x.y*2.+1.+fract(i.x*.3),0.,1.));
    vec3 bg = mix(vec3(.03,.01,.08),vec3(.0,.0,.0),x.y*5.);
    //e = f.y; // Uncomment to see underlying field structure
    col = mix(bg,e*col,e);
    gl_FragColor = vec4(col,1.);
}