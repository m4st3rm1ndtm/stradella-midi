import { Component, HostListener, VERSION } from '@angular/core';
import { WebMidi } from 'webmidi';
import { Chord } from './models/chord';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //outputs!: IterableIterator<WebMidi.MIDIOutput>;
  chord: number[] = [48, 52, 55]; // C major

  currentlyHeld: string[] = [];
  alreadyReleased: string[] = [];
  noteMapping: Map<string, Chord> = new Map<string, Chord>([
    ['Digit1', { name: '', notes: [] }],
    ['Digit2', { name: '', notes: [] }],
    ['Digit3', { name: '', notes: [] }],
    ['Digit4', { name: '', notes: [] }],
    ['Digit5', { name: '', notes: [] }],
    ['Digit6', { name: '', notes: [] }],
    ['Digit7', { name: '', notes: [] }],
    ['Digit8', { name: '', notes: [] }],
    ['Digit9', { name: '', notes: [] }],
    ['Digit0', { name: '', notes: [] }],
    ['Minus', { name: '', notes: [] }],
    ['Equal', { name: '', notes: [] }],
    ['KeyQ', { name: 'Eb', notes: [63, 55, 58] }], //3 5 1
    ['KeyW', { name: 'Bb', notes: [58, 62, 65] }], //1 3 5
    ['KeyE', { name: 'F', notes: [65, 57, 60] }], //3 5 1
    ['KeyR', { name: 'C', notes: [60, 64, 55] }], //5 1 3
    ['KeyT', { name: 'G', notes: [55, 59, 62] }], //1 3 5
    ['KeyY', { name: 'D', notes: [62, 54, 57] }], // 3 5 1
    ['KeyU', { name: 'A', notes: [57, 61, 64] }], // 1 3 5
    ['KeyI', { name: 'E', notes: [64, 56, 59] }], // 3 5 1
    ['KeyO', { name: 'B', notes: [59, 63, 54] }], // 3 5 1
    ['KeyP', { name: '', notes: [] }],
    ['BracketLeft', { name: '', notes: [] }],
    ['BracketRight', { name: '', notes: [] }],
    ['KeyA', { name: 'Ebm', notes: [63, 54, 58] }],
    ['KeyS', { name: 'Bbm', notes: [58, 61, 65] }],
    ['KeyD', { name: 'Fm', notes: [65, 56, 60] }],
    ['KeyF', { name: 'Cm', notes: [60, 63, 55] }], //
    ['KeyG', { name: 'Gm', notes: [55, 58, 62] }],
    ['KeyH', { name: 'Dm', notes: [62, 53, 57] }], ///////
    ['KeyJ', { name: 'Am', notes: [57, 60, 64] }], /////////// 1 octave higher
    ['KeyK', { name: 'Em', notes: [64, 55, 59] }],
    ['KeyL', { name: 'Bm', notes: [59, 62, 54] }],
    ['Semicolon', { name: '', notes: [] }],
    ['Quote', { name: '', notes: [] }],
    ['KeyZ', { name: 'Eb7', notes: [63, 55, 61] }], // 3 7 1
    ['KeyX', { name: 'Bb7', notes: [58, 62, 56] }], // 7 1 3
    ['KeyC', { name: 'F7', notes: [65, 57, 63] }], // 3 7 1
    ['KeyV', { name: 'C7', notes: [60, 64, 58] }], // 7 1 3
    ['KeyB', { name: 'G7', notes: [55, 59, 65] }], // 1 3 7
    ['KeyN', { name: 'D7', notes: [62, 54, 60] }], // 3 7 1
    ['KeyM', { name: 'A7', notes: [57, 61, 55] }], // 3 7 1
    ['Comma', { name: 'E7', notes: [64, 56, 62] }], // 3 7 1
    ['Period', { name: 'B7', notes: [59, 63, 57] }],
    ['Slash', { name: '', notes: [] }],
  ]);

  ngOnInit() {
    // update note mapping
    WebMidi.enable().then(() => {
      if (WebMidi.outputs.length < 1) {
        console.log('No midi output');
      } else {
        //WebMidi.outputs[0].channels[1].playNote(this.chord);
      }
    });
    //.catch(err => alert(err));
  }
  stop(): void {
    //WebMidi.outputs[0].channels[1].stopNote(this.chord);
    for (let chordName of this.alreadyReleased) {
      WebMidi.outputs[0].channels[1].stopNote(
        this.noteMapping.get(chordName).notes
      );
    }
    this.alreadyReleased = [];
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    //console.log(event.code + ' ' + this.noteMapping.get(event.code));
    if (event.code == 'Space') {
      // stop everything
      this.stop();
    } else if (
      this.noteMapping.get(event.code)
      //&& !this.currentlyHeld.includes(event.code)
    ) {
      this.keyDown(event.code);
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (
      this.noteMapping.get(event.code)
      //&& this.currentlyHeld.includes(event.code)
    ) {
      this.keyUp(event.code);
    }
  }

  keyDown(keyName: string) {
    for (let chordName of this.alreadyReleased) {
      WebMidi.outputs[0].channels[1].stopNote(
        this.noteMapping.get(chordName).notes
      );
    }
    this.alreadyReleased = [];
    //this.currentlyHeld.push(event.code);
    WebMidi.outputs[0].channels[1].playNote(
      this.noteMapping.get(keyName).notes
    );
  }
  keyUp(keyName: string) {
    this.alreadyReleased.push(keyName);
  }

  getChordName(name: string): string {
    return this.noteMapping.get(name).name;
  }
}
