
export default class Sticks {

    constructor(id){

        console.log("Init");

        this.state = {
            touches: []
        };

        this.controllerEl = document.getElementById(id);

        this.controllerCtx = this.controllerEl.getContext('2d');
        this.dimensions = this.controllerEl.getBoundingClientRect();

        this.controllerEl.width = this.dimensions.width;
        this.controllerEl.height = this.dimensions.height;

        this.controllerCtx.width = this.dimensions.width;
        this.controllerCtx.height = this.dimensions.height;

        this.render = this.render.bind(this);

        this.attach();

        requestAnimationFrame(this.render);

    }

    render(){
        this.field();
        this.sticks();
        this.log();
        requestAnimationFrame(this.render);
    }

    field() {
        // this.controllerCtx.fillStyle = '#f0f0f0';
        // this.controllerCtx.fillRect(0,0,this.dimensions.width,this.dimensions.height);

        this.controllerCtx.clearRect(0,0,this.dimensions.width,this.dimensions.height);

        this.controllerCtx.strokeStyle = '#ddd';
        this.controllerCtx.lineWidth = 1;
        
        this.controllerCtx.beginPath();
        this.controllerCtx.moveTo(this.dimensions.width * 0.5, 0);
        this.controllerCtx.lineTo(this.dimensions.width * 0.5, this.dimensions.height);
        this.controllerCtx.stroke();
    }

    log() {
        this.controllerCtx.fillStyle = '#000';
        this.controllerCtx.font = '12px sans-serif';
        this.state.touches.forEach((t)=>{
            let l = `${ t.magX }, ${ t.magY }`;
            let o = 0.25;
            if (t.ix > this.dimensions.width * 0.5) { o = 0.75; }
            this.controllerCtx.fillText(l, (this.dimensions.width * o) - 50, this.dimensions.height - 50);
        });

      }
  
    sticks() {
        this.state.touches.forEach((t)=>{

            this.controllerCtx.lineWidth = 2;
            this.controllerCtx.strokeStyle = '#ccc';
            this.controllerCtx.fillStyle = 'rgba(255,255,255,0.1)';
  
            this.controllerCtx.beginPath();
            this.controllerCtx.arc(t.ix, t.iy, 120, 0, 2*Math.PI);
            this.controllerCtx.fill();
            this.controllerCtx.stroke();

            if (t.active) {

                this.controllerCtx.strokeStyle = '#ddd';
                this.controllerCtx.lineWidth = 3;
                this.controllerCtx.beginPath();
                this.controllerCtx.moveTo(t.ix, t.iy);
                this.controllerCtx.lineTo(t.cx, t.cy);
                this.controllerCtx.stroke();

                this.controllerCtx.fillStyle = 'rgba(0,0,0,0.5)';
                this.controllerCtx.beginPath();
                this.controllerCtx.arc(t.cx, t.cy, 5, 0, 2*Math.PI);
                this.controllerCtx.fill();

                this.controllerCtx.fillStyle = '#8f8';
                if (t.ix > this.dimensions.width * 0.5) {
                    this.controllerCtx.fillStyle = '#f88';
                }
    
                this.controllerCtx.beginPath();
                this.controllerCtx.arc(t.x, t.y, 25, 0, 2*Math.PI);
                this.controllerCtx.fill();
    
                this.controllerCtx.strokeStyle = '#444';
                this.controllerCtx.lineWidth = 2;
                this.controllerCtx.stroke();

            } else {

                this.controllerCtx.strokeStyle = '#ddd';
                this.controllerCtx.lineWidth = 3;
                this.controllerCtx.beginPath();
                this.controllerCtx.moveTo(t.ix, t.iy);
                this.controllerCtx.lineTo(t.cx, t.cy);
                this.controllerCtx.stroke();

                this.controllerCtx.fillStyle = '#000';
                this.controllerCtx.beginPath();
                this.controllerCtx.arc(t.cx, t.cy, 5, 0, 2*Math.PI);
                this.controllerCtx.fill();

                this.controllerCtx.fillStyle = '#dfd';
                if (t.ix > this.dimensions.width * 0.5) {
                    this.controllerCtx.fillStyle = '#fdd';
                }
    
                this.controllerCtx.beginPath();
                this.controllerCtx.arc(t.x, t.y, 25, 0, 2*Math.PI);
                this.controllerCtx.fill();
    
                this.controllerCtx.strokeStyle = '#bbb';
                this.controllerCtx.lineWidth = 2;
                this.controllerCtx.stroke();

            }
  
          });
    }

    updateMag(){

        this.state.touches.forEach((t)=>{
            let magX = Math.round((t.cx - t.ix) / 120 * 1000 ) / 1000;
            let magY = Math.round((1 - (t.cy - t.iy)) / 120 * 1000 ) / 1000;

            if (magX < -1) { magX = -1; }
            if (magX > 1)  { magX = 1; }

            if (magY < -1) { magY = -1; }
            if (magY > 1)  { magY = 1; }

            t.magX = magX;
            t.magY = magY;
        });
    }

    attach(){

        this.controllerEl.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.state.touches.push({
                identifier: 0,
                ix: e.pageX,
                iy: e.pageY,
                x: e.pageX,
                y: e.pageY,
                magX: 0,
                magY: 0,
                active: true
            });
            this.updateMag();
        });

        this.controllerEl.addEventListener('mousemove', (e) => {
            e.preventDefault();
            if (this.state.touches.length > 0) {
                if (Math.hypot(e.pageX - this.state.touches[0].ix, e.pageY - this.state.touches[0].iy) < 120) {
                    this.state.touches[0].active = true;
                    this.state.touches[0].cx = e.pageX;
                    this.state.touches[0].cy = e.pageY;
                } else {
                    this.state.touches[0].active = false;
                }
                this.state.touches[0].x = e.pageX;
                this.state.touches[0].y = e.pageY;
            }
            this.updateMag();
        });

        this.controllerEl.addEventListener('mouseup', (e) => {
            e.preventDefault();
            this.state.touches = [];
        });

        this.controllerEl.addEventListener('touchstart', (e) => {
            e.preventDefault();
            for (let i = 0; i < e.changedTouches.length; i++) {
                this.state.touches.push({
                    identifier: e.changedTouches[i].identifier,
                    ix: e.changedTouches[i].pageX,
                    iy: e.changedTouches[i].pageY,
                    cx: e.changedTouches[i].pageX,
                    cy: e.changedTouches[i].pageY,
                    x: e.changedTouches[i].pageX,
                    y: e.changedTouches[i].pageY,
                    magX: 0,
                    magY: 0,
                    active: true
                });
            }
            this.updateMag();

        });
        this.controllerEl.addEventListener('touchmove', (e) => {
            e.preventDefault();
            for (let i = 0; i < e.changedTouches.length; i++) {
                let index;
                for (var j = 0; j < this.state.touches.length; j++) {
                    if (this.state.touches[j].identifier == e.changedTouches[i].identifier) {
                        index = j;
                    }
                }
                if (Math.hypot(e.changedTouches[i].pageX - this.state.touches[index].ix, e.changedTouches[i].pageY - this.state.touches[index].iy) < 120) {
                    this.state.touches[index].active = true;
                    this.state.touches[index].cx = e.changedTouches[i].pageX;
                    this.state.touches[index].cy = e.changedTouches[i].pageY;
                } else {
                    this.state.touches[index].active = false;
                }
                this.state.touches[index].x = e.changedTouches[i].pageX;
                this.state.touches[index].y = e.changedTouches[i].pageY;
            }
            this.updateMag();
        });
        this.controllerEl.addEventListener('touchend', (e) => {
            e.preventDefault();
            for (let i = 0; i < e.changedTouches.length; i++) {
                let index;
                for (var j = 0; j < this.state.touches.length; j++) {
                    if (this.state.touches[j].identifier == e.changedTouches[i].identifier) {
                        index = j;
                    }
                }
                this.state.touches.splice(index, 1);
            }
        });
    }

}
