import { Synthesizer } from "./synthesizer/synthesizer";

class SynthesizerAudioWorklet extends AudioWorkletProcessor {

    private synthesizer: Synthesizer;

    public constructor() {
        super();
        this.synthesizer = new Synthesizer(sampleRate);
    }

    public process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean {
        const output = outputs[0];

        output.forEach((channel) => {
            this.synthesizer.getSamples(channel);
        });
        
        return true;
    }
}

registerProcessor("synthesizer-processor", SynthesizerAudioWorklet);
