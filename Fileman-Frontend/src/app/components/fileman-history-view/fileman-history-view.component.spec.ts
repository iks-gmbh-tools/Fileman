import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { of } from 'rxjs';
import { FilemanHistoryViewComponent } from './fileman-history-view.component';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';

describe('FilemanHistoryViewComponent', () => {
  let component: FilemanHistoryViewComponent;
  let fixture: ComponentFixture<FilemanHistoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilemanHistoryViewComponent ],
      imports: [ RouterTestingModule, HttpClientModule, FormsModule ],
      // no backend in unit tests: the history request answers with an empty list
      providers: [{ provide: FilemanFileService, useValue: { getHistory: () => of([]) } }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilemanHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
