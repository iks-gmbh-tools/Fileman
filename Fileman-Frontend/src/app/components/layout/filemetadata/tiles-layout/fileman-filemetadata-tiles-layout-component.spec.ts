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
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs';

import { FilemetadataTilesLayout } from './fileman-filemetadata-tiles-layout-component';
import { FilemanIconComponent } from 'src/app/components/ui/fileman-icon.component';
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';
import { FavouriteSetting } from 'src/app/common/domainobjects/gen/FavouriteSetting';
import { Icon } from 'src/app/common/fileman-constants';
import { FilemanPreviewService } from 'src/app/services/fileman-preview-service.service';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';

describe('FilemanTilesLayout', () => {
  let component: FilemetadataTilesLayout;
  let fixture: ComponentFixture<FilemetadataTilesLayout>;

  beforeEach(() => {

    let previewService: FilemanPreviewService =
      jasmine.createSpyObj<FilemanPreviewService>(
      'FilemanPreviewService', ['fetchFileFromServer', 'hasPreview']);

    TestBed.configureTestingModule({
      declarations: [ FilemetadataTilesLayout, FilemanIconComponent ],
      imports: [ RouterTestingModule, HttpClientModule ],
      providers: [
        { provide: FilemanFileService, useClass: MockFilemanFileService },
        { provide: FilemanPreviewService, useValue: previewService }
      ]
    });

    fixture = TestBed.createComponent(FilemetadataTilesLayout);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  class MockFilemanFileService extends FilemanFileService {
    getHistory() {
      return new Observable();
    }
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should offer all actions to writers', () => {
    component.readOnly = false;
    component.favouriteSettings = new Map<string, FavouriteSetting>();
    const testFile: FileMetaData = new FileMetaData({name: 'test.txt', fileGroups: []});
    component.viewedFiles = [testFile];
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-option="download"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-option="edit"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-option="delete"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-option="show-history"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-option="change-favourite"]'))).toBeTruthy();
  });

  it('should hide edit and delete from readers', () => {
    component.readOnly = true;
    component.favouriteSettings = new Map<string, FavouriteSetting>();
    const testFile: FileMetaData = new FileMetaData({name: 'test.txt', fileGroups: []});
    component.viewedFiles = [testFile];
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-option="download"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-option="edit"]'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('[data-option="delete"]'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('[data-option="show-history"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-option="change-favourite"]'))).toBeTruthy();
  });

  it('should show the favourite star as unset for a file that is no favourite', () => {
    component.readOnly = false;
    component.favouriteSettings = new Map<string, FavouriteSetting>();
    component.viewedFiles = [new FileMetaData({name: 'test.txt', fileGroups: []})];
    fixture.detectChanges();

    const star = fixture.debugElement.query(By.css('[data-option="change-favourite"] fileman-icon'));
    expect(star.nativeElement.getAttribute('data-icon')).toEqual(Icon.FavouriteFilterInactive);
  });
});
