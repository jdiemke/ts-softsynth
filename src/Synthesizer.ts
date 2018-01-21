// https://noisehack.com/generate-noise-web-audio-api/
// https://noisehack.com/custom-audio-effects-javascript-web-audio-api/
// https://noisehack.com/how-to-build-supersaw-synth-web-audio-api/
// https://noisehack.com/build-music-visualizer-web-audio-api/
// https://noisehack.com/how-to-build-monotron-synth-web-audio-api/
// https://davidwalsh.name/web-audio-api
// https://codepen.io/gregh/post/recreating-legendary-8-bit-games-music-with-web-audio-api
// https://developer.mozilla.org/en-US/docs/Games/Techniques/Audio_for_Web_Games
// https://www.html5rocks.com/en/tutorials/webaudio/intro/
class Instrument {
    public on: boolean;
    public currentPhase: number;
    public envelope: number;
    public phaseIncrement: number;
}

export class Synthesizer {

    private sampleRate: number;
    private currentPhase: number;
    private phaseIncrement: number;
    private currentSample: number;
    private stepSize: number;
    private currentStep: number;
    private patternPosition: number;

    private songPos: number = 0;
    private songTime: number = 0;
    private tempo: number;
    private status: boolean = false;
    private noise: number = 0;
    private instruments: Array<Instrument> = [new Instrument(), new Instrument(), new Instrument()];
    private pattern: Array<Array<number>> = [
        [255, 255, 255, 255, 1, 255, 255, 255, 255, 255, 255, 255, 1, 255, 255, 255, 1, 255, 1, 255, 1, 1, 255, 1, 1, 255, 1,1, 1, 255, 1, 255],
        [32, 255, 32, 30, 255, 30, 255, 30, 255, 255, 32, 30, 255, 30, 44, 20, 32, 255, 32, 30, 255, 30, 255, 30, 255, 255, 32, 30, 255, 30, 44, 20],
        [32 * 2, 255, 32 * 2, 30, 255, 30, 255, 30, 255, 255, 32, 30, 255, 30, 44, 20, 32 * 2, 255, 32 * 2, 30, 64, 52, 76, 30, 255, 255, 32, 30, 255, 30, 44, 20],
    ];

    private envelope: number;

    constructor(sampleRate: number) {
        this.sampleRate = sampleRate;
        this.currentPhase = 0.0;
        this.tempo = Math.floor(sampleRate / 8);
    }

    /**
     * TODO:
     * * create different oscillator classes
     * * create different ADSR envelopes
     */
    public getSamples(buffer: Float32Array): void {
        for (let i: number = 0; i < buffer.length; i++) {


            if ((this.songTime % this.tempo) === 0) {
                for (let inst = 0; inst < 3; inst++) {
                    this.instruments[inst].on = false;
                    let note = this.pattern[inst][(this.songPos % this.pattern[inst].length)];
                    if (note !== 255) {
                        this.instruments[inst].on = true;
                        this.instruments[inst].currentPhase = 0;
                        this.instruments[inst].envelope = 0;
                        this.instruments[inst].phaseIncrement = 2 * Math.PI * this.pitchToFrequency(note) / this.sampleRate;
                    }
                }
                this.songPos++;
            }

            let wave: number = 0.0;

            /**
             * TODO:
             * - SQUARE WAVE
             * - TRIANGLE
             * - SAWTOOTH
             * - NOISE
             * - SINE
             */
            for (let inst = 0; inst < 3; inst++) {
                if (this.instruments[inst].on) {
                    this.instruments[inst].currentPhase += this.instruments[inst].phaseIncrement;
                    if ((this.songTime % this.tempo) < this.tempo * 0.05) this.instruments[inst].envelope += 1 / (this.tempo * 0.05);
                    if ((this.songTime % this.tempo) >= this.tempo * 0.05) this.instruments[inst].envelope -= 1 / (this.tempo * 0.95);
                    this.instruments[inst].envelope = Math.max(0.0, Math.min(this.instruments[inst].envelope, 1.0));

                    //wave += Math.sin(this.currentPhase) * this.envelope; // Math.random() * 2 - 1;
                    if (inst === 0)
                        wave += (Math.random() * 2 - 1) * this.instruments[inst].envelope*0.7;
                    else if (inst === 1)
                        wave += (Math.sin(this.instruments[inst].currentPhase) > 0 ? 1 : -1) * this.instruments[inst].envelope * 0.5; // Math.random() * 2 - 1;
                    else if (inst === 2)
                        wave += Math.sin(this.instruments[inst].currentPhase) * this.instruments[inst].envelope;
                }
            }

            buffer[i] = this.clipSignal(wave*0.5);
            this.songTime++;
        }
    }

    private clipSignal(wave: number): number {
        return Math.min(Math.max(wave, -1), 1);
    }

    /**
     * MIDI pitch number to frequency conversion
     *
     * @description
     * The note A4 has a frequency of 440 Hz and is represented by the
     * midi number 69
     *
     * @see
     * http://newt.phys.unsw.edu.au/jw/notes.html
     *
     * @param midiPitch
     */
    private pitchToFrequency(midiPitch: number): number {
        const exponent: number = (midiPitch - 69.0) / 12.0;
        return Math.pow(2, exponent) * 440.0;
    }

}
