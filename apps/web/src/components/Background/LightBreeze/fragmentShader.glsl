precision highp float;

uniform vec2 iResolution;
uniform float iTime;

#define FC gl_FragCoord.xy
#define T iTime
#define R iResolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p = fract(p * vec2(12.9898, 78.233));
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = rnd(i);
  float b = rnd(i + vec2(1.0, 0.0));
  float c = rnd(i + vec2(0.0, 1.0));
  float d = rnd(i + 1.0);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float t = 0.0;
  float a = 1.0;
  mat2 m = mat2(1.0, -0.5, 0.2, 1.2);
  for (int i = 0; i < 5; i++) {
    t += a * noise(p);
    p *= 2.0 * m;
    a *= 0.5;
  }
  return t;
}

float clouds(vec2 p) {
  float d = 1.0;
  float t = 0.0;
  for (float i = 0.0; i < 3.0; i++) {
    float a = d * fbm(i * 10.0 + p.x * 0.2 + 0.2 * (1.0 + i) * p.y + d + i * i + p);
    t = mix(t, d, a);
    d = a;
    p *= 2.0 / (i + 1.0);
  }
  return t;
}

void main(void) {
  vec2 uv = (FC - 0.5 * R) / MN;
  float sy = clamp(uv.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 skyColor = mix(vec3(0.50, 0.81, 1.00), vec3(0.13, 0.60, 1.00), sy);
  float cloud = clouds(uv * 1.6 + vec2(0.0, T * 0.02));
  float c = 1.0 - smoothstep(0.55, 0.8, cloud);
  vec3 color = mix(skyColor, vec3(1.0), c);
  gl_FragColor = vec4(color, 1.0);
}

