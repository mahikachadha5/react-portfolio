uniform float pixelSize;
uniform bool offset;
uniform bool useLuma;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 offsetUv = uv;

    float rowIndex = floor(uv.y / normalizedPixelSize.y);
    if (offset && mod(rowIndex, 2.0) == 1.0) {
        offsetUv.x += normalizedPixelSize.x * 0.5;
    }
    
    vec2 uvPixel = normalizedPixelSize * floor(offsetUv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luminance = dot(vec3(0.2126, 0.7152, 0.0722), color.rgb);

    vec2 cellUV = fract(offsetUv / normalizedPixelSize);

    float radius = 0.5;
    if (useLuma) {
      radius = pow(max(luminance * 0.7, 0.0), 1.75) + 0.08;
    }

    vec2 circleCenter = vec2(0.5, 0.5);

    float distanceFromCenter = distance(cellUV, circleCenter);

    float circleMask = smoothstep(radius, radius - 0.05, distanceFromCenter);
    
    color.rgb = useLuma ? vec3(circleMask) : vec3(circleMask * color.rgb);

    outputColor = color;
}
