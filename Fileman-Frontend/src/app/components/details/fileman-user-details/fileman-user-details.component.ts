/*
 * Copyright 2020 IKS Gesellschaft fuer Informations- und Kommunikationssysteme mbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/common/Utils';
import { User } from 'src/app/common/domainobjects/gen/User';
import { FilemanLoginService } from 'src/app/services/fileman-login.service';
import { UserService } from 'src/app/services/fileman-user-service';

@Component({
  selector: 'fileman-user-details',
  templateUrl: './fileman-user-details.component.html',
  styleUrls: ['./fileman-user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  readOnly: boolean;
  metaDataForm: FormGroup;
  currentlyLoggedInUser: any;
  newMode: boolean;
  toEdit: User;
  form: any;

  constructor(private router: Router,
              private loginService: FilemanLoginService,
              private userService: UserService) {
      this.form = this.createFormGroup();
      this.currentlyLoggedInUser = loginService.getCurrentUserName();
  }

  ngOnInit(): void {
    this.readOnly = this.loginService.getCurrentUserRole() === 'Reader';
    this.newMode = this.router.url.endsWith('new');
    if ( ! this.newMode ) {
      const index = this.router.url.lastIndexOf('/') + 1;
      const id = this.router.url.substring(index);
      this.toEdit = this.userService.getUser(id);
      if (this.toEdit == null) {
        alert('No data available for user "' + id + '"!');
        this.backToOverview();  // no data to edit avaible - happends for page reload - reason unclear
      } else {
        this.setDataToControls(this.toEdit);
      }
    }
  }

  getToolTip() {
    if (! this.readOnly) { return ''; }
    return 'No permission!';
  }

  save() {
    const toSave = this.form.value as User;
    console.log('Saving ');
    console.log(toSave);

    if (this.newMode)
    {
      this.userService.create(toSave)
          .subscribe(() => {}, error => {
            alert('Error saving new user "' + toSave.getId() + '"!');
          });
    }
    else
    {
      this.userService.update(toSave)
          .subscribe(() => {}, error => {
            alert('Error saving new user "' + toSave.getId() + '"!');
          });

    }

    this.backToOverview();
  }

  backToOverview() {
    this.router.navigate(['/fileman/overview']);
  }

  cancel() {
    this.backToOverview();
  }

  // The form control block below is generated - do not modify manually!
  createFormGroup() {
    return new FormGroup({
        nameControl: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(64),
              ],
              this.isNotUnique.bind(this)),
        roleControl: new FormControl('', [
                Validators.required,
              ]),
        passwordControl: new FormControl('', [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(32),
              ]),
        passwordRepetitionControl: new FormControl('', [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(32),
              ]),
        avatarControl: new FormControl('', [
              ]),
    });
  }

  get nameC() {
    return this.form.get('inputFieldControl.metaDataForm.nameControl');
  }

  get roleC() {
    return this.form.get('inputFieldControl.metaDataForm.roleControl');
  }

  get passwordC() {
    return this.form.get('inputFieldControl.metaDataForm.passwordControl');
  }

  get passwordRepetitionC() {
    return this.form.get('inputFieldControl.metaDataForm.passwordRepetitionControl');
  }

  get avatarC() {
    return this.form.get('inputFieldControl.metaDataForm.avatarControl');
  }

  private getUser() {
    const user = new User(null);

    user.setName(this.nameC.value);
    user.setRole(this.roleC.value);
    user.setPassword(this.passwordC.value);
    user.setPasswordRepetition(this.passwordRepetitionC.value);
    user.setAvatar(this.avatarC.value);

    return user;
  }

  private setDataToControls(user: User) {
    this.nameC.setValue(user.getName());
    this.roleC.setValue(user.getRole());
    this.passwordC.setValue(user.getPassword());
    this.passwordRepetitionC.setValue(user.getPasswordRepetition());
    this.avatarC.setValue(user.getAvatar());
  }
  // The form control block above is generated - do not modify manually!
}