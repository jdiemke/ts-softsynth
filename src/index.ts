import { Synthesizer } from './synthesizer';
import font from './assets/Green-Font.bmp';

class Application {

    private static readonly BUFFER_SIZE: number = 4096;
    private analyser: AnalyserNode;
    private lastTime: number = 0;
    private dataArray: Uint8Array;
    private image: HTMLImageElement;
    private image2: HTMLImageElement;
    private activeChannel: number = 0;
    private activeRow: number = 0;
    private synthesizer: Synthesizer;
    private currentOctave: number = 5;
    public main(): void {
        const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('synth');
        const context: CanvasRenderingContext2D = canvas.getContext('2d');

        const audioContext: AudioContext = new AudioContext(/*{sampleRate: 8000}*/);

        let scriptProcessorNode: ScriptProcessorNode;
        scriptProcessorNode = audioContext.createScriptProcessor(Application.BUFFER_SIZE, 1, 1);

        this.synthesizer = new Synthesizer(audioContext.sampleRate);

        scriptProcessorNode.onaudioprocess = (audioProcessingEvent: AudioProcessingEvent): void => {
            const outputBuffer: Float32Array = audioProcessingEvent.outputBuffer.getChannelData(0);
            this.synthesizer.getSamples(outputBuffer);
        };


        audioContext.audioWorklet.addModule('synthesizer.audio-worklet.js').then(() => {
            const whiteNoiseNode = new AudioWorkletNode(
                audioContext,
                "synthesizer-processor"
              );
              whiteNoiseNode.connect(audioContext.destination);
              
      
              this.analyser = audioContext.createAnalyser();
      
              this.analyser.fftSize = 2048;
              const bufferLength: number = this.analyser.frequencyBinCount;
              this.dataArray = new Uint8Array(bufferLength);
      
              whiteNoiseNode.connect(this.analyser);
              this.analyser.connect(audioContext.destination);
        });
      

        window.onkeydown = (e: KeyboardEvent): any => {
            const code: number = e.keyCode ? e.keyCode : e.which;
            /* LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
             */
            console.log('key: ' + code);

            if (code === 39) { //up key
                console.log('right');
                this.activeChannel = (this.activeChannel + 1) % 4;
            } else if (code === 37) { //down key
                console.log('left');
                this.activeChannel = (this.activeChannel + 4 - 1) % 4;
            } else if (code === 38) { //up key
                console.log('up');
                this.activeRow = (this.activeRow + 32 - 1) % 32;
            } 
            
            else if (code === 107) { //+
                console.log('left');
                this.currentOctave = (this.currentOctave  + 1) % 12;
            } else if (code === 109) { //-
                console.log('up');
                this.currentOctave = (this.currentOctave + 12 - 1) % 12;
            } 
            
            
            else if (code === 40) { //down key
                console.log('down');
                this.activeRow = (this.activeRow + 1) % 32;
            } else if (code === 46) {
                console.log('del');
                const pattern: Array<Array<number>> = this.synthesizer.getPattern();
                console.log(pattern[this.activeChannel][this.activeRow]);
                pattern[this.activeChannel][this.activeRow] = 255;
                console.log(pattern[this.activeChannel][this.activeRow]);
                this.activeRow = (this.activeRow + 1) % 32;
            } else if (code === 89) { // C4
                const pattern: Array<Array<number>> = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 0 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            } else if (code === 83) { // Y
                const pattern: Array<Array<number>> = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 1 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            } else if (code === 88) { // Y
                const pattern: Array<Array<number>> = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 2 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            } else if (code === 68) { // Y
                const pattern: Array<Array<number>> = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 3 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            } else if (code === 67) { // Y
                const pattern: Array<Array<number>> = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 4 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            } else if (code === 86) { // Y
                const pattern: Array<Array<number>> = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 5 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            } else if (code === 71) { // Y
                const pattern: Array<Array<number>> = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 6 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            } else if (code === 66) { // Y
                const pattern: Array<Array<number>> = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 7 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            } else if (code === 72) { // Y
                const pattern: Array<Array<number>> = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 8 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            } else if (code === 78) { // Y
                const pattern: Array<Array<number>> = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 9 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            } else if (code === 74) { // Y
                const pattern: Array<Array<number>> = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 10 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            } else if (code === 77) { // Y
                const pattern: Array<Array<number>> = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 11 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            }
        };

        this.image = new Image();
        this.image.onload = (ev: Event): any => {
            this.image2 = new Image();
            this.image2.onload = (ev2: Event): any => {
                requestAnimationFrame(() => this.draw(context));
            };
            
            this.image2.src =font;
        };
        this.image.src = require('./assets/Knob.bmp');
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = '#333333';
        context.fillRect(0, 0, 640, 480);
        this.analyser && this.drawOscilloscop(context, 200, 50);
        const pos: number = Math.floor(Date.now() * 0.02) % 63;
        context.drawImage(this.image, pos * 32, 0, 32, 32, 240, 0, 32, 32);
        context.fillStyle = '#b3c13f';
        context.fillRect(10, 70, 8 * 46, 8 * 32);
        this.drawPattern(context, 10, 70);
        this.drawActivePos(context, this.activeChannel, this.activeRow);
        requestAnimationFrame(() => this.draw(context));
    }

    public drawActivePos(context: CanvasRenderingContext2D, channel: number, pos: number): void {
        // not correct since only the rendered songpos not the currently played one :)
        const songPos: number = this.synthesizer.getSongPos() % 32;


        context.strokeStyle = '#00ff00';
        context.lineWidth = 2.0;
        context.strokeRect(10. - 2 + (12 * 8 * channel), 70. - 2 + (songPos * 8), (10 * 8 + 4) * 3, 8 + 3);

        context.strokeStyle = '#ff1100';
        context.lineWidth = 2.0;
        context.strokeRect(10. - 2 + (12 * 8 * channel), 70. - 2 + (pos * 8), 10 * 8 + 4, 8 + 3);

        // TODO: use inverted FONT!
    }

    public drawText(context: CanvasRenderingContext2D, x: number, y: number, text: string): void {
        for (let i = 0; i < text.length; i++) {
            this.drawChar(context, x + i * 8, y, text.charCodeAt(i));
        }
    }

    private static readonly noteRepresentations: Array<string> = ["C-", "C#", "D-", "D#", "E-", "F-", "F#", "G-",
        "G#", "A-", "A#", "B-"];

    public drawPattern(context: CanvasRenderingContext2D, x: number, y: number): void {
        const pattern: Array<Array<number>> = this.synthesizer.getPattern();
        for (let k = 0; k < 3; k++) {
            for (let i = 0; i < 32; i++) {
                if (pattern[k][i] === 255)
                    this.drawText(context, x + k * 12 * 8, y + i * 8, '--- -- --');
                else {
                    let note: number = pattern[k][i];
                    this.drawText(context, x + k * 12 * 8, y + i * 8, Application.noteRepresentations[note % 12] + (Math.floor(note / 12))+' -- --');
                }
            }
        }
    }

    public drawChar(context: CanvasRenderingContext2D, x: number, y: number, char: number): void {
        const index: number = char - ' '.charCodeAt(0);
        const xoff: number = index % 16;
        const yoff: number = Math.floor(index / 16);
        context.drawImage(this.image2, xoff * 8, yoff * 8, 8, 8, x, y, 8, 8);
    }

    public drawOscilloscop(context: CanvasRenderingContext2D, width: number, height: number): void {
        context.save();
        context.translate(10.5, 10.5);

        context.fillStyle = '#002200';
        context.fillRect(0, 0, width, height);



        if ((Date.now() - this.lastTime) > 80) {
            this.analyser && this.analyser.getByteTimeDomainData(this.dataArray);
            this.lastTime = Date.now();
        }

        context.lineWidth = 3.0;
        context.strokeStyle = 'rgb(0.3, 1, 0.3)';

        context.beginPath();
        context.strokeStyle = '#BBFF00';
        const STEPS: number = 90;
        const clearance: number = 4;

        for (let i: number = 0; i < STEPS; i++) {
            const x: number = width * i / (STEPS);

            const pos: number = Math.floor(this.dataArray.length / STEPS * i);
            const y: number = clearance + this.dataArray[pos] / 256 * (height - 2 * clearance);

            if (i === 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }
        }
        context.stroke();

        context.strokeStyle = '#001100';
        context.lineWidth = 1.0;
        context.strokeRect(0, 0, width, height);

        context.restore();
    }

}
const button = document.getElementById('button');
button.onclick = () => new Application().main();
