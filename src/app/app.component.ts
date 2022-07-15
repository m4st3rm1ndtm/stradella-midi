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
    ['KeyQ', { name: 'Eb', notes: [] }], //Eflat
    ['KeyW', { name: '', notes: [] }], //Bflat
    ['KeyE', { name: '', notes: [] }], //F
    ['KeyR', { name: 'C', notes: [43, 48, 52] }], //C
    ['KeyT', { name: '', notes: [] }], //G
    ['KeyY', { name: '', notes: [] }],
    ['KeyU', { name: '', notes: [] }],
    ['KeyI', { name: '', notes: [] }],
    ['KeyO', { name: '', notes: [] }],
    ['KeyP', { name: '', notes: [] }],
    ['BracketLeft', { name: '', notes: [] }],
    ['BracketRight', { name: '', notes: [] }],
    ['KeyA', { name: '', notes: [] }],
    ['KeyS', { name: '', notes: [] }],
    ['KeyD', { name: '', notes: [] }],
    ['KeyF', { name: 'Cm', notes: [43, 48, 51] }], //Cm
    ['KeyG', { name: '', notes: [] }],
    ['KeyH', { name: '', notes: [] }],
    ['KeyJ', { name: '', notes: [] }],
    ['KeyK', { name: '', notes: [] }],
    ['KeyL', { name: '', notes: [] }],
    ['Semicolon', { name: '', notes: [] }],
    ['Quote', { name: '', notes: [] }],
    ['KeyZ', { name: '', notes: [] }],
    ['KeyX', { name: '', notes: [] }],
    ['KeyC', { name: '', notes: [] }],
    ['KeyV', { name: '', notes: [] }],
    ['KeyB', { name: '', notes: [] }],
    ['KeyN', { name: '', notes: [] }],
    ['KeyM', { name: '', notes: [] }],
    ['Comma', { name: '', notes: [] }],
    ['Period', { name: '', notes: [] }],
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

  stopChord(): void {
    WebMidi.outputs[0].channels[1].stopNote(this.chord);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    //console.log(event.code + ' ' + this.noteMapping.get(event.code));
    if (
      this.noteMapping.get(event.code) &&
      !this.currentlyHeld.includes(event.code)
    ) {
      this.currentlyHeld.push(event.code);
      WebMidi.outputs[0].channels[1].playNote(
        this.noteMapping.get(event.code).notes
      );
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (
      this.noteMapping.get(event.code) &&
      this.currentlyHeld.includes(event.code)
    ) {
      this.currentlyHeld.splice(this.currentlyHeld.indexOf(event.code), 1);
      WebMidi.outputs[0].channels[1].stopNote(
        this.noteMapping.get(event.code).notes
      );
    }
  }
}
