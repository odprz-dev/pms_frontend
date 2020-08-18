import { AbstractControl, ValidationErrors } from '@angular/forms';

export function eliminar(control: AbstractControl): ValidationErrors | null{
  const confirm = control.value;
  if (confirm === null)
    return null;
  if(confirm !== 'ELIMINAR')
    return {eliminar: true};
}
