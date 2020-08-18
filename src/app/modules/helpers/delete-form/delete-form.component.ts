import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { eliminar } from '../validators/validators';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.scss']
})
export class DeleteFormComponent implements OnInit {

  @Output() cancel = new EventEmitter();
  @Output() confirmDelete = new EventEmitter();

  deleteForm: FormGroup;

  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    this.deleteForm = this.fb.group({
      confirm: [null, [Validators.required, Validators.pattern('[a-zA-z]*'), eliminar]]
    });
  }

  onCancel(){
    this.cancel.emit();
  }

  onConfirmDelete(){
    this.confirmDelete.emit();
  }

}
