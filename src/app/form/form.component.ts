import { Component, OnInit } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.css"]
})

export class FormComponent implements OnInit {
    
    registrationForm!: FormGroup;

    ngOnInit() {
        this.registrationForm = new FormGroup({
            firstName: new FormControl("", [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(8),
              Validators.pattern("^[A-Z][a-z]{3,19}$")
            ]),
            lastName: new FormControl("", [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(8),
                Validators.pattern("^[A-Z][a-z]{3,19}$")
              ]),
            dateOfBirth: new FormControl("", [
              Validators.required,
            ]),
            framework: new FormControl("", [
                Validators.required
              ]),
            frameworkVersion: new FormControl("", [
              Validators.required,
              Validators.maxLength(6)
            ]),
            email: new FormControl("", [
                Validators.required,
                //Validators.email
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") // custom validator pattern
              ]),
            hobby: new FormControl("", [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(50)
              ])
        });
    }
    // Unlocking second <select> 
    removeSelectDisable() {
        const versionData: any = {
            angular: ['1.1.1', '1.2.1', '1.3.3'],
            react: ['2.1.2', '3.2.4', '4.3.1'],
            vue: ['3.3.1', '5.2.1', '5.1.3'],
        }  
        const selectedFrame = (<HTMLSelectElement>document.querySelector("#technology")).value;
        const frameworkVersionSelect = document.querySelector("#technology-version");
        if (frameworkVersionSelect != null) {
            frameworkVersionSelect.removeAttribute('disabled');
            frameworkVersionSelect.setAttribute("style", "pointer-events: all;");
            frameworkVersionSelect.innerHTML = "<option>Choose framework version:</option>";
            for (let i = 0; i < versionData[selectedFrame].length; i++) {
                frameworkVersionSelect.innerHTML += `<option value="${versionData[selectedFrame][i]}">${versionData[selectedFrame][i]}</option>`;
            }
        }
    }
    // Sending form to server
    onSubmit() {
        this.registrationForm.value.dateOfBirth = this.registrationForm.value.dateOfBirth.toString().slice(4, 15);
        console.log(this.registrationForm.value);
        // Sending:
        let xhr = new XMLHttpRequest;
        xhr.open("POST", "/server", true);
        xhr.send(this.registrationForm.value);
        // Some logic after successful send:
        xhr.onreadystatechange = function() { 
            const formTitle = document.querySelector(".form-title");
            if (xhr.readyState === 4 && xhr.status === 200) {
                formTitle?.classList.add("successfully-sent");
            }
            else {
                // ...
            }
        }
    }
}