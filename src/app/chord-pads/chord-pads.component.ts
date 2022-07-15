import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chord-pads',
  templateUrl: './chord-pads.component.html',
  styleUrls: ['./chord-pads.component.css'],
})
export class ChordPadsComponent implements OnInit {
  chordRows: number[][][] = [
    [
      [10, 11, 12],
      [13, 14, 15],
    ],
    [
      [16, 17, 18],
      [19, 20, 21],
    ],
  ];
  constructor() {}

  ngOnInit() {}
}
