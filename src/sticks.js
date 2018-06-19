
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
        requestAnimationFrame(this.render);
    }

    field() {
        this.controllerCtx.fillStyle = '#f0f0f0';
        this.controllerCtx.fillRect(0,0,this.dimensions.width,this.dimensions.height);

        this.controllerCtx.strokeStyle = '#ddd';
        this.controllerCtx.lineWidth = 1;
        
        this.controllerCtx.beginPath();
        this.controllerCtx.moveTo(this.dimensions.width * 0.5, 0);
        this.controllerCtx.lineTo(this.dimensions.width * 0.5, this.dimensions.height);
        this.controllerCtx.stroke();
    }

    sticks() {
        this.state.touches.forEach((t)=>{

            this.controllerCtx.lineWidth = 2;
            this.controllerCtx.strokeStyle = '#ccc';
            this.controllerCtx.fillStyle = '#eee';
  
            this.controllerCtx.beginPath();
            this.controllerCtx.arc(t.ix, t.iy, 120, 0, 2*Math.PI);
            this.controllerCtx.fill();
            this.controllerCtx.stroke();

            if (Math.hypot(t.x - t.ix, t.y - t.iy) < 120) {

                this.controllerCtx.strokeStyle = '#ddd';
                this.controllerCtx.lineWidth = 3;
                this.controllerCtx.beginPath();
                this.controllerCtx.moveTo(t.ix, t.iy);
                this.controllerCtx.lineTo(t.x, t.y);
                this.controllerCtx.stroke();

                this.controllerCtx.fillStyle = '#8f8';
                if (t.x > this.dimensions.width * 0.5) {
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
                this.controllerCtx.lineTo(t.x, t.y);
                this.controllerCtx.stroke();

                this.controllerCtx.fillStyle = '#dfd';
                if (t.x > this.dimensions.width * 0.5) {
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

    attach(){

        this.controllerEl.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.state.touches.push({
                identifier: 0,
                ix: e.pageX,
                iy: e.pageY,
                x: e.pageX,
                y: e.pageY
            });
        });

        this.controllerEl.addEventListener('mousemove', (e) => {
            e.preventDefault();
            if (this.state.touches.length > 0) {
                this.state.touches[0].x = e.pageX;
                this.state.touches[0].y = e.pageY;
            }
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
                    x: e.changedTouches[i].pageX,
                    y: e.changedTouches[i].pageY
                });
            }
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
                this.state.touches[index].x = e.changedTouches[i].pageX;
                this.state.touches[index].y = e.changedTouches[i].pageY;
            }
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
