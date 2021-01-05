import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-self',
  templateUrl: './self.component.html',
  styleUrls: ['./self.component.scss']
})
export class SelfComponent implements OnInit {
  selfTestForm!: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.selfTestForm = new FormGroup({
      travel: new FormControl(null, Validators.required),
      contact: new FormControl(null, Validators.required),
      symptoms: new FormControl(null)
    });
  }

  onSubmit(): any {

  }

}
