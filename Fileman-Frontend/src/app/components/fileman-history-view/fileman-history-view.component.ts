import { Component, OnInit } from '@angular/core';
import { FileContentData } from 'src/app/common/domainobjects/gen/FileContentData';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilemanMetadataService } from 'src/app/services/fileman-metadata-service.service';
import { FilemanPreviewService } from 'src/app/services/fileman-preview-service.service';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { UserRole } from 'src/app/common/fileman-constants';
import { Utils } from 'src/app/common/Utils';
import { FilemanDialogService } from 'src/app/services/fileman-dialog.service';
import { FilemanToastService } from 'src/app/services/fileman-toast.service';

@Component({
  selector: 'file-history',
  templateUrl: './fileman-history-view.component.html',
  styleUrls: ['./fileman-history-view.component.css']
})
export class FilemanHistoryViewComponent implements OnInit {

  selectedFile: string;
  selectedUUID: number;
  contentVersions: FileContentData[];
  response;
  readOnly = false;
  viewTouched = false;

  constructor(private fileService: FilemanFileService,
              private filesMetaDataService: FilemanMetadataService,
              private previewService: FilemanPreviewService,
              private authService: FilemanAuthserviceService,
              private router: Router,
              private route: ActivatedRoute,
              private dialogService: FilemanDialogService,
              private toastService: FilemanToastService) { }

  ngOnInit(): void {
    this.readOnly = this.authService.getCurrentUserRole() === UserRole.Reader;
    this.contentVersions = [] as FileContentData[];
    this.route.params.subscribe((params) => {
      this.selectedFile = params.filename;
    });
    this.fileService.getHistory(this.selectedFile).subscribe(response => {
                                    this.response = response;
                                    this.response.forEach(setting => {
                                      const contentVersion = new FileContentData(setting);
                                      this.contentVersions.push(contentVersion);
                                    })
                                });

  }

  isActive(filename: string, uuid: number) {
    const metadata = this.filesMetaDataService.getFileFromCache(filename);
    if (metadata != null && metadata.activeUUID === uuid) {
      if (this.selectedUUID == null) {this.selectedUUID = uuid};
      return 'checked';
    }
    return '';
  }

  save() {
    const index = this.contentVersions.findIndex(version => version.uuid === this.selectedUUID);
    const versionLabel = index === -1 ? 'the selected version' : 'version ' + (this.contentVersions.length - index);
    this.dialogService.confirm({
      title: 'Make ' + versionLabel + ' active?',
      message: 'Systems that fetch ' + this.selectedFile + ' will get ' + versionLabel + '. The other versions stay in the history.',
      confirmLabel: 'Make active',
      icon: 'layers'
    }).then(ok => {
      if (!ok) { return; }
      this.filesMetaDataService.setActive(this.selectedFile, this.selectedUUID).subscribe(() => {
        this.previewService.preparePreview(this.selectedFile);
        this.toastService.success(this.selectedFile + ': ' + versionLabel + ' is active now.');
      });
      this.backToOverview();
    });
  }

  setSelected(uuid: number) {
    if (this.selectedUUID !== uuid) {
      this.viewTouched = true;
      this.selectedUUID = uuid;
    }
  }

  backToOverview() {
    this.router.navigate(['/fileman/overview']);
  }

  cancel() {
    this.backToOverview();
  }

  formatCreationDate(creationDate: string) {
    return Utils.getFormattedDateString(creationDate);
  }
}
