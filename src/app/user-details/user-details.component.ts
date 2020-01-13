import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, AuthenticationService, UserService} from '../_services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  updateUserForm: FormGroup;
  id: number = null;
  userRoles;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.view(this.activeRouter.snapshot.params.id);
    this.updateUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
  view(id: number) {
    this.userService.view(id)
      .pipe(first())
      .subscribe(data => {
        this.id = data.user.id;
        this.updateUserForm.setValue({
          firstName: data.user.firstName,
          lastName: data.user.lastName
        });
        this.userRoles = data.roles;
        console.log(data);
      });
  }
  updateUser(form: NgForm) {
    this.userService.update(this.id, form).subscribe(res => {
        this.router.navigate(['/']);
      }, (err) => {
        console.log(err);
      }
    );
  }
  deleteUserRole(roleId: number) {
    this.userService.deleteUserRole(this.id, roleId).subscribe(res => {
        this.router.navigate(['/']);
      }, (err) => {
        console.log(err);
      }
    );
  }
}
