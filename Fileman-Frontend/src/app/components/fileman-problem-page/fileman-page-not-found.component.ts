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
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fileman-page-not-found',
  templateUrl: './fileman-page-not-found.component.html',
  styleUrls: ['./fileman-page-not-found.component.css']
})
export class FilemanProblemPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
  }

  private getType(): string {
    return this.route.snapshot.queryParamMap.get('type');
  }

  getCode(): string {
    const type = this.getType();
    if (!type) { return 'Error 404'; }
    if (type === '2') { return 'Error 403'; }
    return 'Error';
  }

  getTitle(): string {
    const type = this.getType();
    if (!type) { return 'This page doesn\'t exist'; }
    if (type === '2') { return 'You don\'t have access to this page'; }
    return 'Something went wrong';
  }

  getMessage(): string {
    const type = this.getType();
    if (!type) { return 'Nothing is stored at this address. The item may have been renamed or deleted, or the link has a typo.'; }
    if (type === '2') { return 'Your role doesn\'t allow this page. Ask an admin if you need access.'; }
    return 'An unexpected error occurred. Go back to the files and try again.';
  }

  goBack() {
    this.location.back();
  }
}
