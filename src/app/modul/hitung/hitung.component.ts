import { Component } from '@angular/core';

@Component({
  selector: 'app-hitung',
  template: `
  <h1>{{title}}</h1>
  <mat-tab-group class="demo-tab-group">
  <mat-tab label="Tab 1">
    <div class="demo-tab-content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
      Phasellus volutpat neque ac dui mattis vulputate. Etiam consequat aliquam cursus.
      In sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur felis nec,
      feugiat ultricies mi. Aliquam erat volutpat. Nam placerat, tortor in ultrices porttitor,
      orci enim rutrum enim, vel tempor sapien arcu a tellus.
    </div>
  </mat-tab>
  <mat-tab label="Tab 2">
    <ng-template mat-tab-label>
      ⭐
    </ng-template>
    <div class="demo-tab-content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
      Phasellus volutpat neque ac dui mattis vulputate. Etiam consequat aliquam cursus.
      In sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur felis nec,
      feugiat ultricies mi. Aliquam erat volutpat. Nam placerat, tortor in ultrices porttitor,
      orci enim rutrum enim, vel tempor sapien arcu a tellus.
    </div>
  </mat-tab>
  <mat-tab label="Tab 3" disabled>
    No content
  </mat-tab>
  <mat-tab label="Tab 4">
   <div class="demo-tab-content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
      Phasellus volutpat neque ac dui mattis vulputate. Etiam consequat aliquam cursus.
      In sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur felis nec,
      feugiat ultricies mi. Aliquam erat volutpat. Nam placerat, tortor in ultrices porttitor,
      orci enim rutrum enim, vel tempor sapien arcu a tellus.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
      Phasellus volutpat neque ac dui mattis vulputate. Etiam consequat aliquam cursus.
      In sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur felis nec,
      feugiat ultricies mi. Aliquam erat volutpat. Nam placerat, tortor in ultrices porttitor,
      orci enim rutrum enim, vel tempor sapien arcu a tellus.
    </div>
  </mat-tab>
  <mat-tab label="Tab 5">
    No content
  </mat-tab>
  <mat-tab label="Tab 6">
    No content
  </mat-tab>
</mat-tab-group>
  `
})
export class HitungComponent {
  title = 'Hitung';
}
