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
    ['KeyQ', { name: 'Eb', notes: [51, 43, 46] }], //3 5 1
    ['KeyW', { name: 'Bb', notes: [46, 50, 53] }], //1 3 5
    ['KeyE', { name: 'F', notes: [53, 45, 48] }], //3 5 1
    ['KeyR', { name: 'C', notes: [48, 52, 43] }], //5 1 3
    ['KeyT', { name: 'G', notes: [43, 47, 50] }], //1 3 5
    ['KeyY', { name: 'D', notes: [50, 42, 45] }], // 3 5 1
    ['KeyU', { name: 'A', notes: [45, 49, 52] }], // 1 3 5
    ['KeyI', { name: 'E', notes: [52, 44, 47] }], // 3 5 1
    ['KeyO', { name: 'B', notes: [47, 51, 42] }], // 3 5 1
    ['KeyP', { name: '', notes: [] }],
    ['BracketLeft', { name: '', notes: [] }],
    ['BracketRight', { name: '', notes: [] }],
    ['KeyA', { name: 'Ebm', notes: [51, 42, 46] }],
    ['KeyS', { name: 'Bbm', notes: [46, 49, 53] }],
    ['KeyD', { name: 'Fm', notes: [45, 49, 53] }],
    ['KeyF', { name: 'Cm', notes: [43, 48, 51] }], //
    ['KeyG', { name: 'Gm', notes: [43, 46, 50] }],
    ['KeyH', { name: 'Dm', notes: [50, 41, 45] }],
    ['KeyJ', { name: 'Am', notes: [45, 48, 52] }],
    ['KeyK', { name: 'Em', notes: [52, 42, 47] }],
    ['KeyL', { name: 'Bm', notes: [47, 50, 42] }],
    ['Semicolon', { name: '', notes: [] }],
    ['Quote', { name: '', notes: [] }],
    ['KeyZ', { name: 'Eb7', notes: [51, 43, 49] }], // 1 3 7
    ['KeyX', { name: 'Bb7', notes: [44, 46, 50] }], // 7 1 3
    ['KeyC', { name: 'F7', notes: [45, 51, 53] }],
    ['KeyV', { name: 'C7', notes: [46, 48, 52] }],
    ['KeyB', { name: 'G7', notes: [43, 47, 53] }],
    ['KeyN', { name: 'D7', notes: [50, 42, 48] }], // 3 7 1
    ['KeyM', { name: 'A7', notes: [45, 49, 43] }], // 3 7 1
    ['Comma', { name: 'E7', notes: [52, 44, 50] }], // 3 7 1
    ['Period', { name: 'B7', notes: [47, 51, 45] }],
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
