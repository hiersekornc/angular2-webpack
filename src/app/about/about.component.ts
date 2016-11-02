import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Entity }    from '../shared';

@Component({
  selector: 'my-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  formStructure: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.formStructure = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      account: this.fb.group({
        email: ['', [Validators.required]],
        confirm: ['', [Validators.required]]
      })
    });
  }

  onSubmit() {
    console.log(this.formStructure.value, this.formStructure.valid);
  }
}
