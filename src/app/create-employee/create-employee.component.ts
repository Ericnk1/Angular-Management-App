
import {Component, OnInit} from '@angular/core';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  form: FormGroup;
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: null,
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      imageUrl: ['', Validators.required]

    });

  }

  onSubmit(): void {
    const newEmployee: Employee = {
      id: null,
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      email: this.form.get('email').value,
      jobTitle: this.form.get('jobTitle').value,
      imageUrl: this.form.get('imageUrl').value,

    };
    this.employeeService.createEmployee(newEmployee).subscribe(data => {
        this.goToEmployeeList();
      }
    );
  }

  InvalidInput(fieldName): boolean {
    return this.form.controls[fieldName].invalid && (this.form.controls[fieldName].dirty || this.form.controls[fieldName].touched);
  }

  goToEmployeeList(): void {
    this.router.navigate(['/employees']);
  }

}
