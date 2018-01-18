import { Synthesizer } from './Synthesizer';

class Application {

    private static readonly BUFFER_SIZE: number = 4096;

    public main(): void {
        const audioContext: AudioContext = new AudioContext();

        let scriptProcessorNode: ScriptProcessorNode;
        scriptProcessorNode = audioContext.createScriptProcessor(Application.BUFFER_SIZE, 1, 1);

        const synthesizer: Synthesizer = new Synthesizer(audioContext.sampleRate);

        scriptProcessorNode.onaudioprocess = (audioProcessingEvent: AudioProcessingEvent): void => {
            const outputBuffer: Float32Array = audioProcessingEvent.outputBuffer.getChannelData(0);
            synthesizer.getSamples(outputBuffer);
        };

        scriptProcessorNode.connect(audioContext.destination);
    }

}

new Application().main();
