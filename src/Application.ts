class Application {

    public main(): void {
        const audioContext: AudioContext = new AudioContext();
        const oscillator: OscillatorNode = audioContext.createOscillator();
        const bufferSize: number = 4096;
        const scriptProcessorNode: ScriptProcessorNode = audioContext.createScriptProcessor(bufferSize, 1, 1);
        const FREQUENCY: number = 440;
        let currentPhase: number = 0.0;
        const phaseIncrement: number = 2 * Math.PI * FREQUENCY / audioContext.sampleRate;
        scriptProcessorNode.onaudioprocess = (event: AudioProcessingEvent): void => {
            const output: Float32Array = event.outputBuffer.getChannelData(0);
            for (let i: number = 0; i < bufferSize; i++) {
                output[i] = Math.sin(currentPhase); // Math.random() * 2 - 1;
                currentPhase += phaseIncrement;
            }
        };
        scriptProcessorNode.connect(audioContext.destination);
    }

}

new Application().main();
