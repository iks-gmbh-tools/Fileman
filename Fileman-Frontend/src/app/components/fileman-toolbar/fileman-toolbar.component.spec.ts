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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { FilemanToolbarComponent } from './fileman-toolbar.component';
import { FilemanIconComponent } from 'src/app/components/ui/fileman-icon.component';
import { FilemanLogoComponent } from 'src/app/components/fileman-logo.component';
import { Icon } from 'src/app/common/fileman-constants';
import { FilemanUserPreferencesService } from 'src/app/services/fileman-user-preferences-service.service';
import { UserPreferences } from 'src/app/common/domainobjects/gen/UserPreferences';

describe('FilemanToolbarComponent', () => {
  let component: FilemanToolbarComponent;
  let fixture: ComponentFixture<FilemanToolbarComponent>;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {navigate: jasmine.createSpy('navigate')};

    TestBed.configureTestingModule({
      declarations: [ FilemanToolbarComponent, FilemanIconComponent, FilemanLogoComponent ],
      imports: [ RouterTestingModule, HttpClientModule, FormsModule ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: FilemanUserPreferencesService, useClass: MockFilemanUserPreferencesService }
      ],
    });

    fixture = TestBed.createComponent(FilemanToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  class MockFilemanUserPreferencesService extends FilemanUserPreferencesService {
    fetchUserPreferencesFromServer(userId: any) {
      return new Observable();
    }
    create(userPreferences: UserPreferences) {
      return new Observable();
    }
    update(userPreferences: UserPreferences) {
      return new Observable();
    }
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow new-file dialog when not read-only', () => {
    component.readOnly = false;
    component.onNewClick();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should not allow new-file dialog when read-only', () => {
    component.readOnly = true;
    component.onNewClick();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should offer the database console only to admins', () => {
    component.isAdmin = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#toolbar-database'))).toBeTruthy();

    component.isAdmin = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#toolbar-database'))).toBeFalsy();
  });

  it('should show the content tabs only to admins', () => {
    component.isAdmin = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.fm-tabs'))).toBeFalsy();

    component.isAdmin = true;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.fm-tab')).length).toEqual(4);
  });

  it('should hide the New button from readers', () => {
    component.readOnly = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#toolbar-new'))).toBeFalsy();

    component.readOnly = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#toolbar-new'))).toBeTruthy();
  });

  it('should show the layout switch, reload and logout', () => {
    fixture.detectChanges();
    const icons: string[] = fixture.debugElement.queryAll(By.css('fileman-icon'))
                                   .map((debugElement: DebugElement) => debugElement.nativeElement.getAttribute('data-icon'));
    expect(icons).toContain(Icon.Reload);
    expect(icons).toContain(Icon.Logout);
    expect(fixture.debugElement.query(By.css('#toolbar-layout-list'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#toolbar-layout-table'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#toolbar-layout-tiles'))).toBeTruthy();
  });
});
