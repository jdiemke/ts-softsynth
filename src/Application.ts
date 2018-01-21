import { Synthesizer } from './Synthesizer';

class Application {

    private static readonly BUFFER_SIZE: number = 4096;
    private analyser: AnalyserNode;
    private lastTime: number = 0;
    private dataArray: Uint8Array;

    public main(): void {
        const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('synth');
        const context: CanvasRenderingContext2D = canvas.getContext('2d');

        const audioContext: AudioContext = new AudioContext();

        let scriptProcessorNode: ScriptProcessorNode;
        scriptProcessorNode = audioContext.createScriptProcessor(Application.BUFFER_SIZE, 1, 1);

        const synthesizer: Synthesizer = new Synthesizer(audioContext.sampleRate);

        scriptProcessorNode.onaudioprocess = (audioProcessingEvent: AudioProcessingEvent): void => {
            const outputBuffer: Float32Array = audioProcessingEvent.outputBuffer.getChannelData(0);
            synthesizer.getSamples(outputBuffer);
        };

        this.analyser = audioContext.createAnalyser();

        this.analyser.fftSize = 2048;
        const bufferLength: number = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);

        scriptProcessorNode.connect(this.analyser);
        this.analyser.connect(audioContext.destination);

        requestAnimationFrame(() => this.draw(context));
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = '#bbbbbb';
        context.fillRect(0, 0, 640, 480);
        this.drawOscilloscop(context, 200, 50);
        requestAnimationFrame(() => this.draw(context));
    }

    public drawOscilloscop(context: CanvasRenderingContext2D, width: number, height: number): void {
        context.save();
        context.translate(10, 10);

        context.fillStyle = '#000000';
        context.fillRect(0, 0, width, height);

        if ((Date.now() - this.lastTime) > 50) {
            this.analyser.getByteTimeDomainData(this.dataArray);
            this.lastTime = Date.now();
        }

        context.lineWidth = 1.5;
        context.strokeStyle = 'rgb(1, 0, 0)';

        context.beginPath();
        context.strokeStyle = '#FFA500';
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
        context.restore();
    }

}

new Application().main();
