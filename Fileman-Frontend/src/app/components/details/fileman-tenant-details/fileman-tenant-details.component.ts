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
import { Tenant } from 'src/app/common/domainobjects/gen/Tenant';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { TenantService } from 'src/app/services/fileman-tenant-service.service';
import { FilemanDialogService } from 'src/app/services/fileman-dialog.service';
import { FilemanToastService } from 'src/app/services/fileman-toast.service';

@Component({
  selector: 'fileman-tenant-details',
  templateUrl: './fileman-tenant-details.component.html',
  styleUrls: ['./fileman-tenant-details.component.css']
})
export class TenantDetailsComponent implements OnInit {

  readOnly: boolean;
  currentlyLoggedInUser: any;
  form: FormGroup;
  detailsForm: FormGroup;
  newMode: boolean;
  toEdit: Tenant;

  constructor(private router: Router,
              private authService: FilemanAuthserviceService,
              private tenantService: TenantService,
              private dialogService: FilemanDialogService,
              private toastService: FilemanToastService) {
      this.form = this.createFormGroup();
      this.currentlyLoggedInUser = authService.getCurrentUserName();
  }

  ngOnInit(): void {
    this.readOnly = this.authService.getCurrentUserRole() === 'Reader';
    this.newMode = this.router.url.endsWith('new');
    if ( ! this.newMode ) {
      const index = this.router.url.lastIndexOf('/') + 1;
      const id = this.router.url.substring(index);
      this.tenantService.getTenant(id).subscribe(tenant => {
        this.toEdit = new Tenant(tenant);
        if (this.toEdit == null) {
          this.dialogService.alert('Tenant not available', 'No data is loaded for this tenant. Open it again from the overview.');
          this.backToOverview();  // no data to edit available - happens for page reload - reason unclear
        } else {
          this.setDataToControls(this.toEdit);
        }
      });
    }
  }

  getToolTip() {
    if (! this.readOnly) { return ''; }
    return 'No permission!';
  }

  save() {
    const toSave = new Tenant({
      id: this.toEdit != null ? this.toEdit.getId() : null,
      name: this.nameC.value.trim()
    });

    if (this.newMode) {
      this.tenantService.create(toSave)
          .subscribe(() => {
            this.toastService.success('Created tenant ' + toSave.getName() + '.');
          }, error => {
            this.toastService.error('Creating tenant ' + toSave.getName() + ' failed. Try again.');
          });
    } else {
      this.tenantService.update(toSave)
          .subscribe(() => {
            this.toastService.success('Saved tenant ' + toSave.getName() + '.');
          }, error => {
            this.toastService.error('Saving tenant ' + toSave.getName() + ' failed. Try again.');
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

  createFormGroup() {
    this.detailsForm = this.createDetailsFormGroup();
    return new FormGroup({
      inputFieldControl: new FormGroup({
        detailsForm: this.detailsForm
      })
    });
  }

  isNotUnique(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.tenantService.getAllTenants()
        .pipe(map((tenantArray: Tenant[]) => {

      const foundItem = tenantArray.find(
        tenantItem => tenantItem.name === control.value
      );

      if (foundItem) {
        return {isNotUnique: true};
      }

      return null;
    }));
  }

  // The form control block below is generated - do not modify manually!
  createDetailsFormGroup() {
    return new FormGroup({
        nameControl: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(64),
              ],
              this.isNotUnique.bind(this)),
    });
  }

  get nameC() {
    return this.form.get('inputFieldControl.detailsForm.nameControl');
  }

  private getTenant() {
    const tenant = new Tenant(null);

    tenant.setName(this.nameC.value);

    return tenant;
  }

  private setDataToControls(tenant: Tenant) {
    this.nameC.setValue(tenant.getName());
  }
  // The form control block above is generated - do not modify manually!
}
