export class Synthesizer {

    private sampleRate: number;
    private currentPhase: number;
    private phaseIncrement: number;

    constructor(sampleRate: number) {
        this.sampleRate = sampleRate;
        const FREQUENCY: number = 440;
        this.currentPhase = 0.0;
        this.phaseIncrement = 2 * Math.PI * FREQUENCY / sampleRate;
    }

    public getSamples(buffer: Float32Array): void {
        for (let i: number = 0; i < buffer.length; i++) {
            buffer[i] = Math.sin(this.currentPhase); // Math.random() * 2 - 1;
            this.currentPhase += this.phaseIncrement;
        }
    }

}
