
export default class Sticks {

    constructor(el){

        this.state = {
            touches: []
        };

        this.controllerEl = document.querySelector(el);
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
        this.controllerCtx.fillStyle = '#e0e0e0';
        this.controllerCtx.fillRect(0,0,this.dimensions.width,this.dimensions.height);

        this.controllerCtx.strokeStyle = '#f00';
        this.controllerCtx.lineWidth = 1;
        
        this.controllerCtx.beginPath();
        this.controllerCtx.moveTo(this.dimensions.width * 0.5, 0);
        this.controllerCtx.lineTo(this.dimensions.width * 0.5, this.dimensions.height);
        this.controllerCtx.stroke();
    }

    sticks() {
        this.state.touches.forEach((t)=>{

            this.controllerCtx.strokeStyle = '#00f';
            if (t.x > this.dimensions.width * 0.5) {
                this.controllerCtx.strokeStyle = '#0f0';
            }
          
            this.controllerCtx.beginPath();
            this.controllerCtx.arc(t.x, t.y, 150, 0, 2*Math.PI);
            this.controllerCtx.stroke();

        });

    }

    attach(){

        this.controllerEl.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.state.touches.push({
                x: e.targetTouches[0].pageX,
                y: e.targetTouches[0].pageY
            })
        });

    }

}
