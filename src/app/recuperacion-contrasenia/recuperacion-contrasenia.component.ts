import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-recuperacion-contrasenia',
  templateUrl: './recuperacion-contrasenia.component.html',
  styleUrls: ['./recuperacion-contrasenia.component.css']
})
export class RecuperacionContraseniaComponent {

  cambioContrasenaForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    
    this.cambioContrasenaForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      codigo: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasena: ['', Validators.required]
    });
  }

  correo: string = '';
  codigo: string = '';
  password: string = '';
  confirmPassword: string = '';
  enviarCorreo(){

  }

  cambiarContrasenia(){
    console.log(this.correo);
    this.codigo="asdasd";
  }

}
