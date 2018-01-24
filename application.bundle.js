/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Synthesizer_1 = __webpack_require__(1);
class Application {
    constructor() {
        this.lastTime = 0;
        this.activeChannel = 0;
        this.activeRow = 0;
        this.currentOctave = 5;
    }
    main() {
        const canvas = document.getElementById('synth');
        const context = canvas.getContext('2d');
        const audioContext = new AudioContext();
        let scriptProcessorNode;
        scriptProcessorNode = audioContext.createScriptProcessor(Application.BUFFER_SIZE, 1, 1);
        this.synthesizer = new Synthesizer_1.Synthesizer(audioContext.sampleRate);
        scriptProcessorNode.onaudioprocess = (audioProcessingEvent) => {
            const outputBuffer = audioProcessingEvent.outputBuffer.getChannelData(0);
            this.synthesizer.getSamples(outputBuffer);
        };
        this.analyser = audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        scriptProcessorNode.connect(this.analyser);
        this.analyser.connect(audioContext.destination);
        window.onkeydown = (e) => {
            const code = e.keyCode ? e.keyCode : e.which;
            /* LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
             */
            console.log('key: ' + code);
            if (code === 39) {
                console.log('right');
                this.activeChannel = (this.activeChannel + 1) % 4;
            }
            else if (code === 37) {
                console.log('left');
                this.activeChannel = (this.activeChannel + 4 - 1) % 4;
            }
            else if (code === 38) {
                console.log('up');
                this.activeRow = (this.activeRow + 32 - 1) % 32;
            }
            else if (code === 107) {
                console.log('left');
                this.currentOctave = (this.currentOctave + 1) % 12;
            }
            else if (code === 109) {
                console.log('up');
                this.currentOctave = (this.currentOctave + 12 - 1) % 12;
            }
            else if (code === 40) {
                console.log('down');
                this.activeRow = (this.activeRow + 1) % 32;
            }
            else if (code === 46) {
                console.log('del');
                const pattern = this.synthesizer.getPattern();
                console.log(pattern[this.activeChannel][this.activeRow]);
                pattern[this.activeChannel][this.activeRow] = 255;
                console.log(pattern[this.activeChannel][this.activeRow]);
                this.activeRow = (this.activeRow + 1) % 32;
            }
            else if (code === 89) {
                const pattern = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 0 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            }
            else if (code === 83) {
                const pattern = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 1 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            }
            else if (code === 88) {
                const pattern = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 2 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            }
            else if (code === 68) {
                const pattern = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 3 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            }
            else if (code === 67) {
                const pattern = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 4 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            }
            else if (code === 86) {
                const pattern = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 5 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            }
            else if (code === 71) {
                const pattern = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 6 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            }
            else if (code === 66) {
                const pattern = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 7 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            }
            else if (code === 72) {
                const pattern = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 8 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            }
            else if (code === 78) {
                const pattern = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 9 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            }
            else if (code === 74) {
                const pattern = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 10 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            }
            else if (code === 77) {
                const pattern = this.synthesizer.getPattern();
                pattern[this.activeChannel][this.activeRow] = 11 + this.currentOctave * 12;
                this.activeRow = (this.activeRow + 1) % 32;
            }
        };
        this.image = new Image();
        this.image.onload = (ev) => {
            this.image2 = new Image();
            this.image2.onload = (ev2) => {
                requestAnimationFrame(() => this.draw(context));
            };
            this.image2.src = __webpack_require__(2);
        };
        this.image.src = __webpack_require__(3);
    }
    draw(context) {
        context.fillStyle = '#333333';
        context.fillRect(0, 0, 640, 480);
        this.drawOscilloscop(context, 200, 50);
        const pos = Math.floor(Date.now() * 0.02) % 63;
        context.drawImage(this.image, pos * 32, 0, 32, 32, 240, 0, 32, 32);
        context.fillStyle = '#b3c13f';
        context.fillRect(10, 70, 8 * 46, 8 * 32);
        this.drawPattern(context, 10, 70);
        this.drawActivePos(context, this.activeChannel, this.activeRow);
        requestAnimationFrame(() => this.draw(context));
    }
    drawActivePos(context, channel, pos) {
        // not correct since only the rendered songpos not the currently played one :)
        const songPos = this.synthesizer.getSongPos() % 32;
        context.strokeStyle = '#00ff00';
        context.lineWidth = 2.0;
        context.strokeRect(10. - 2 + (12 * 8 * channel), 70. - 2 + (songPos * 8), (10 * 8 + 4) * 3, 8 + 3);
        context.strokeStyle = '#ff1100';
        context.lineWidth = 2.0;
        context.strokeRect(10. - 2 + (12 * 8 * channel), 70. - 2 + (pos * 8), 10 * 8 + 4, 8 + 3);
        // TODO: use inverted FONT!
    }
    drawText(context, x, y, text) {
        for (let i = 0; i < text.length; i++) {
            this.drawChar(context, x + i * 8, y, text.charCodeAt(i));
        }
    }
    drawPattern(context, x, y) {
        const pattern = this.synthesizer.getPattern();
        for (let k = 0; k < 3; k++) {
            for (let i = 0; i < 32; i++) {
                if (pattern[k][i] === 255)
                    this.drawText(context, x + k * 12 * 8, y + i * 8, '--- -- --');
                else {
                    let note = pattern[k][i];
                    this.drawText(context, x + k * 12 * 8, y + i * 8, Application.noteRepresentations[note % 12] + (Math.floor(note / 12)) + ' -- --');
                }
            }
        }
    }
    drawChar(context, x, y, char) {
        const index = char - ' '.charCodeAt(0);
        const xoff = index % 16;
        const yoff = Math.floor(index / 16);
        context.drawImage(this.image2, xoff * 8, yoff * 8, 8, 8, x, y, 8, 8);
    }
    drawOscilloscop(context, width, height) {
        context.save();
        context.translate(10.5, 10.5);
        context.fillStyle = '#002200';
        context.fillRect(0, 0, width, height);
        if ((Date.now() - this.lastTime) > 80) {
            this.analyser.getByteTimeDomainData(this.dataArray);
            this.lastTime = Date.now();
        }
        context.lineWidth = 3.0;
        context.strokeStyle = 'rgb(0.3, 1, 0.3)';
        context.beginPath();
        context.strokeStyle = '#BBFF00';
        const STEPS = 90;
        const clearance = 4;
        for (let i = 0; i < STEPS; i++) {
            const x = width * i / (STEPS);
            const pos = Math.floor(this.dataArray.length / STEPS * i);
            const y = clearance + this.dataArray[pos] / 256 * (height - 2 * clearance);
            if (i === 0) {
                context.moveTo(x, y);
            }
            else {
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
Application.BUFFER_SIZE = 4096;
Application.noteRepresentations = ["C-", "C#", "D-", "D#", "E-", "F-", "F#", "G-",
    "G#", "A-", "A#", "B-"];
new Application().main();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
}
class Synthesizer {
    constructor(sampleRate) {
        this.songPos = 0;
        this.songTime = 0;
        this.status = false;
        this.noise = 0;
        this.instruments = [new Instrument(), new Instrument(), new Instrument()];
        this.pattern = [
            [255, 255, 255, 255, 1, 255, 255, 255, 255, 255, 255, 255, 1, 255, 255, 255, 1, 255, 1, 255, 1, 1, 255, 1, 1, 255, 1, 1, 1, 255, 1, 255],
            [32, 255, 32, 30, 255, 30, 255, 30, 255, 255, 32, 30, 255, 30, 44, 20, 32, 255, 32, 30, 255, 30, 255, 30, 255, 255, 32, 30, 255, 30, 44, 20],
            [32 * 2, 255, 32 * 2, 30, 255, 30, 255, 30, 255, 255, 32, 30, 255, 30, 44, 20, 32 * 2, 255, 32 * 2, 30, 64, 52, 76, 30, 255, 255, 32, 30, 255, 30, 44, 20],
        ];
        this.sampleRate = sampleRate;
        this.currentPhase = 0.0;
        this.tempo = Math.floor(sampleRate / 8);
    }
    getPattern() {
        return this.pattern;
    }
    getSongPos() {
        return this.songPos;
    }
    /**
     * TODO:
     * * create different oscillator classes
     * * create different ADSR envelopes
     */
    getSamples(buffer) {
        for (let i = 0; i < buffer.length; i++) {
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
            let wave = 0.0;
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
                    if ((this.songTime % this.tempo) < this.tempo * 0.05)
                        this.instruments[inst].envelope += 1 / (this.tempo * 0.05);
                    if ((this.songTime % this.tempo) >= this.tempo * 0.05)
                        this.instruments[inst].envelope -= 1 / (this.tempo * 0.95);
                    this.instruments[inst].envelope = Math.max(0.0, Math.min(this.instruments[inst].envelope, 1.0));
                    //wave += Math.sin(this.currentPhase) * this.envelope; // Math.random() * 2 - 1;
                    if (inst === 0)
                        wave += (Math.random() * 2 - 1) * this.instruments[inst].envelope * 0.7;
                    else if (inst === 1)
                        wave += (Math.sin(this.instruments[inst].currentPhase) > 0 ? 1 : -1) * this.instruments[inst].envelope * 0.5; // Math.random() * 2 - 1;
                    else if (inst === 2)
                        wave += Math.sin(this.instruments[inst].currentPhase) * this.instruments[inst].envelope;
                }
            }
            buffer[i] = this.clipSignal(wave * 0.5);
            this.songTime++;
        }
    }
    clipSignal(wave) {
        const clip = 1.0;
        return Math.min(Math.max(wave, -clip), clip);
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
    pitchToFrequency(midiPitch) {
        const exponent = (midiPitch - 69.0) / 12.0;
        return Math.pow(2, exponent) * 440.0;
    }
}
exports.Synthesizer = Synthesizer;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "17de366b4f79a9e413d3cc0561a8dd12.bmp";

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5164ab0b657406fadaa783b3b552f5f7.bmp";

/***/ })
/******/ ]);