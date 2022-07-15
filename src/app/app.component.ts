import { Component, HostListener, VERSION } from '@angular/core';
import { WebMidi } from 'webmidi';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //outputs!: IterableIterator<WebMidi.MIDIOutput>;
  chord: number[] = [48, 52, 55]; // C major

  currentlyHeld: number[] = [];
  noteMapping: Map<string, number> = new Map<string, number>([
    ['KeyZ', 0],
    ['KeyX', 0],
    ['KeyC', 0],
    ['KeyV', 0],
    ['KeyB', 0],
    ['KeyN', 0],
    ['KeyM', 0],
    ['Comma', 0],
    ['Period', 0],
    ['Slash', 0],
    ['KeyA', 0],
    ['KeyS', 0],
    ['KeyD', 0],
    ['KeyF', 0],
    ['KeyG', 0],
    ['KeyH', 0],
    ['KeyJ', 0],
    ['KeyK', 0],
    ['KeyL', 0],
    ['Semicolon', 0],
    ['Quote', 0],
    ['KeyQ', 0],
    ['KeyW', 0],
    ['KeyE', 0],
    ['KeyR', 0],
    ['KeyT', 0],
    ['KeyY', 0],
    ['KeyU', 0],
    ['KeyI', 0],
    ['KeyO', 0],
    ['KeyP', 0],
    ['BracketLeft', 0],
    ['BracketRight', 0],
    ['Digit1', 0],
    ['Digit2', 0],
    ['Digit3', 0],
    ['Digit4', 0],
    ['Digit5', 0],
    ['Digit6', 0],
    ['Digit7', 0],
    ['Digit8', 0],
    ['Digit9', 0],
    ['Digit0', 0],
    ['Minus', 0],
    ['Equal', 0],
  ]);

  ngOnInit() {
    // update note mapping
    let entries = Array.from(this.noteMapping.entries());
    console.log(entries);
    let start = 33;
    for (let i = 0; i < 10; i++) {
      this.noteMapping.set(entries[i][0], start + i * 2);
    }
    start = 38;
    for (let i = 0; i < 11; i++) {
      this.noteMapping.set(entries[i + 10][0], start + i * 2);
    }
    start = 43;
    for (let i = 0; i < 12; i++) {
      this.noteMapping.set(entries[i + 21][0], start + i * 2);
    }
    start = 48;
    for (let i = 0; i < 12; i++) {
      this.noteMapping.set(entries[i + 33][0], start + i * 2);
    }
    console.log(this.noteMapping);
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
      !this.currentlyHeld.includes(this.noteMapping.get(event.code))
    ) {
      this.currentlyHeld.push(this.noteMapping.get(event.code));
      WebMidi.outputs[0].channels[1].playNote(this.noteMapping.get(event.code));
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (
      this.noteMapping.get(event.code) &&
      this.currentlyHeld.includes(this.noteMapping.get(event.code))
    ) {
      this.currentlyHeld.splice(
        this.currentlyHeld.indexOf(this.noteMapping.get(event.code)),
        1
      );
      WebMidi.outputs[0].channels[1].stopNote(this.noteMapping.get(event.code));
    }
  }
}
