( function(window){

  // Takes the THREE camera and applies controls to it
  window.CameraControl = function(camera){

    this.camera = camera
    this.state = ''

    var keyDownHandler = (e) => {
      var keyCode = e.code
      var rotateAngle = 2*Math.PI/360

      keyCode = this.state+keyCode
      console.log(keyCode)

      switch(keyCode){
        case 'ArrowDown':
        case 'ShiftArrowDown':
          //console.log('Down.')
          camera.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
          break
        case 'ArrowUp':
        case 'ShiftArrowUp':
          //console.log('Up.')
          camera.rotateOnAxis( new THREE.Vector3(-1,0,0), rotateAngle);
          break
        case 'ArrowLeft':
          //console.log('Left.')
          camera.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
          break
        case 'ArrowRight':
          //console.log('Right.')
          camera.rotateOnAxis( new THREE.Vector3(0,-1,0), rotateAngle);
          break

        case 'ShiftArrowLeft':
          //console.log('Left.')
          camera.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngle);
          break
        case 'ShiftArrowRight':
          //console.log('Right.')
          camera.rotateOnAxis( new THREE.Vector3(0,0,-1), rotateAngle);
          break

        case 'ShiftLeft':
        case 'ShiftRight':
          this.state = 'Shift'
          break
      }

    }
    var keyUpHandler = (e) => {

      var keyCode = e.code

      console.log(keyCode)

      switch(keyCode){

        case 'ShiftLeft':
        case 'ShiftRight':
          this.state = ''
          break
      }
    }

    document.body.addEventListener('keydown', keyDownHandler)
    document.body.addEventListener('keyup', keyUpHandler)
  }


})(window)
