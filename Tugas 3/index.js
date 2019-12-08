(function() {

  glUtils.SL.init({ callback: function() { main(); } });
  var thetaLoc,transLoc,sizeLoc,size,theta,vec,ex,ye,zet,nrp,thetaLocKubus,thetaKubus, program, programKubus, canvas, gl;
  var flag=0;
  function main() {
    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);
    window.addEventListener('resize', resizer);
    // Inisialisasi shaders dan program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
  
    var vertexShaderKubus = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShaderKubus = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);

    program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    programKubus = glUtils.createProgram(gl, vertexShaderKubus, fragmentShaderKubus);

    //huruf
    thetaLoc = gl.getUniformLocation(program, 'theta'); 
    transLoc = gl.getUniformLocation(program, 'vec');
    sizeLoc = gl.getUniformLocation(program, 'size');
    size = 0.3;
    theta = [20, 40, 0];
    vec = [0, 0, 0];
    ex = 0.0135
    ye = 0.0113;
    zet = 0.153;
    nrp = 1.35;
  
    //Kubus
    thetaLocKubus = gl.getUniformLocation(programKubus, 'theta');
    thetaKubus = [20, 40, 0];
  
    resizer();
  }
  function Kubus(){
    gl.useProgram(programKubus);

    // Definisi verteks dan buffer

    // Missing Lines : AD, DC, EF, DH
    var KubusVertices = [
      // x, y, z             r, g, b

      //ABCD
      -0.5, -0.5, 0.5,    1.0, 1.0, 1.0,    //A
      -0.5, 0.5, 0.5,     1.0, 1.0, 1.0,    //B
      -0.5, 0.5, 0.5,     1.0, 1.0, 1.0,    //B
      0.5, 0.5, 0.5,      1.0, 1.0, 1.0,    //C
      0.5, 0.5, 0.5,      1.0, 1.0, 1.0,    //C
      0.5, -0.5, 0.5,     1.0, 1.0, 1.0,    //D
      0.5, -0.5, 0.5,     1.0, 1.0, 1.0,    //D
      -0.5, -0.5, 0.5,    1.0, 1.0, 1.0,    //A
      
      //DCGH
      0.5, 0.5, 0.5,      1.0, 1.0, 1.0,    //C
      0.5, 0.5, -0.5,     1.0, 1.0, 1.0,    //G
      0.5, -0.5, 0.5,     1.0, 1.0, 1.0,    //D
      0.5, -0.5, -0.5,    1.0, 1.0, 1.0,    //H

      //ABFE
      -0.5, -0.5, 0.5,    1.0, 1.0, 1.0,    //A
      -0.5, -0.5, -0.5,   1.0, 1.0, 1.0,    //E
      -0.5, 0.5, 0.5,     1.0, 1.0, 1.0,    //B
      -0.5, 0.5, -0.5,    1.0, 1.0, 1.0,    //F

      //EFGH
      -0.5, -0.5, -0.5,   1.0, 1.0, 1.0,    //E
      -0.5, 0.5, -0.5,    1.0, 1.0, 1.0,    //F
      -0.5, 0.5, -0.5,    1.0, 1.0, 1.0,    //F
      0.5, 0.5, -0.5,     1.0, 1.0, 1.0,    //G
      0.5, 0.5, -0.5,     1.0, 1.0, 1.0,    //G
      0.5, -0.5, -0.5,    1.0, 1.0, 1.0,    //H
      0.5, -0.5, -0.5,    1.0, 1.0, 1.0,    //H
      -0.5, -0.5, -0.5,   1.0, 1.0, 1.0,    //E

    ];

    var KubusVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, KubusVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(KubusVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(programKubus, 'vPosition');
    var vColor = gl.getAttribLocation(programKubus, 'vColor');
    gl.vertexAttribPointer(
      vPosition,  // variabel yang memegang posisi attribute di shader
      3,          // jumlah elemen per attribute
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
      6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    gl.uniform3fv(thetaLocKubus, thetaKubus);

  }

  function triangle(){
    gl.useProgram(program);

    // Definisi vertex and buffer
    var triangleVertices = [
      //x,y         r,g,b
          0.05, 0.63, 0.808, 0.820, 1.0,
          -0.05, 0.6,  0.808, 0.820, 1.0,
          0.05, 0.53,    0.808, 0.820, 1.0,
          -0.05, 0.6,    0.808, 0.820, 1.0,
          0.05, 0.53,    0.808, 0.820, 1.0,
          -0.05, 0.5,    0.808, 0.820, 1.0,
          -0.15, 0.4,    0.808, 0.820, 1.0,
          0.15, 0.5,    0.808, 0.820, 1.0,
          -0.15, 0.3,    0.808, 0.820, 1.0, 
          0.15, 0.5,    0.808, 0.820, 1.0,
          -0.15, 0.3,    0.808, 0.820, 1.0,
          0.15, 0.4,    0.808, 0.820, 1.0,
          0.05, 0.33,    0.808, 0.820, 1.0,
          -0.05, 0.3,    0.808, 0.820, 1.0,
          0.05, -0.33,    0.808, 0.820, 1.0,
          -0.05, 0.3,    0.808, 0.820, 1.0,
          0.05, -0.33,    0.808, 0.820, 1.0,
          -0.05, -0.3,   0.808, 0.820, 1.0,
          -0.15, -0.4,   0.808, 0.820, 1.0,
          0.15, -0.5,   0.808, 0.820, 1.0,
          -0.15, -0.3,   0.808, 0.820, 1.0,
          0.15, -0.5,   0.808, 0.820, 1.0,
          -0.15, -0.3,   0.808, 0.820, 1.0,
          0.15, -0.4,   0.808, 0.820, 1.0,
    ];

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');

    gl.vertexAttribPointer(
      vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
    );
    gl.vertexAttribPointer(
      vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.uniform1f(sizeLoc, size);

    //Hit the Wall

    if(vec[0] > 0.5*(1-size) || vec[0] < -0.5*(1-size) ){
      ex = ex * -1;
    }
    vec[0] += ex;

    if(vec[1] > 0.5*(1-size) || vec[1] < -0.5*(1-size) ){
      ye = ye * -1;
    }
    vec[1] += ye;

    if(vec[2] > 0.5*(1-size) || vec[2] < -0.5*(1-size) ){
      zet = zet * -1;
    }
    vec[2] += zet;

    gl.uniform3fv(transLoc, vec);

    // gl.enableVertexAttribArray(vPosition);
    // gl.enableVertexAttribArray(vColor);

    //Y Rotation

    theta[1] += ( nrp * 3 );

    gl.uniform3fv(thetaLoc, theta);
  }

  
  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    if(flag==0)
    {
        render();
        flag=1;
    }  
  }

  function render() {
    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    // Bersihkan buffernya canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    triangle();
    gl.drawArrays(gl.TRIANGLES, 0, 24);

    Kubus();
    gl.drawArrays(gl.LINES, 0, 24);

    requestAnimationFrame(render);
  }
  
})(window || this);