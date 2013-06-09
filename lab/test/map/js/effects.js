
var postprocessing = { enabled: true,
    opacity: 1.3


};

function initPostprocessing() {
        postprocessing.scene = new THREE.Scene();

        postprocessing.camera = new THREE.Camera();
        postprocessing.camera.projectionMatrix = THREE.Matrix4.makeOrtho( window.innerWidth / - 2, window.innerWidth / 2,  window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
        postprocessing.camera.position.z = 100;

        var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };
        postprocessing.rtTexture1 = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, pars );
        postprocessing.rtTexture2 = new THREE.WebGLRenderTarget( 512, 512, pars );
        postprocessing.rtTexture3 = new THREE.WebGLRenderTarget( 512, 512, pars );

        var screen_shader = THREE.ShaderUtils.lib["screen"];
        var screen_uniforms = THREE.UniformsUtils.clone( screen_shader.uniforms );

        screen_uniforms["tDiffuse"].texture = postprocessing.rtTexture1;
        screen_uniforms["opacity"].value = 4.3;

        postprocessing.materialScreen = new THREE.MeshShaderMaterial( {

            uniforms: screen_uniforms,
            vertexShader: screen_shader.vertexShader,
            fragmentShader: screen_shader.fragmentShader,
            blending: THREE.AdditiveBlending,
            transparent: true

        } );

        var convolution_shader = THREE.ShaderUtils.lib["convolution"];
        var convolution_uniforms = THREE.UniformsUtils.clone( convolution_shader.uniforms );

        postprocessing.blurx = new THREE.Vector2( 0.001953125, 0.0 ),
        postprocessing.blury = new THREE.Vector2( 0.0, 0.001953125 );

        convolution_uniforms["tDiffuse"].texture = postprocessing.rtTexture1;
        convolution_uniforms["uImageIncrement"].value = postprocessing.blurx;
        convolution_uniforms["cKernel"].value = THREE.ShaderUtils.buildKernel( 4.0 );

        postprocessing.materialConvolution = new THREE.MeshShaderMaterial( {

            uniforms: convolution_uniforms,
            vertexShader:   "#define KERNEL_SIZE 25.0\n" + convolution_shader.vertexShader,
            fragmentShader: "#define KERNEL_SIZE 25\n"   + convolution_shader.fragmentShader

        } );

        postprocessing.quad = new THREE.Mesh( new THREE.PlaneGeometry( window.innerWidth, window.innerHeight ), postprocessing.materialConvolution );
        postprocessing.quad.position.z = -500;
        postprocessing.scene.addObject( postprocessing.quad );

}
