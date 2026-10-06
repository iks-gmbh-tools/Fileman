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
import { HttpHeaders } from '@angular/common/http';
import { TooltipOptions } from 'ng2-tooltip-directive';
// import sampleData from './properties.json';
// import * as data from './properties.json';

export enum SortType {ASC = 'asc', DESC = 'desc'}
export enum UserRole {Reader = 'Reader',
                    Writer = 'Writer',
                    Admin = 'Admin'}
export enum Content {Files = 'content_type_files',
                    Users = 'content_type_users',
                    Tenants = 'content_type_tenants',
                    FileGroups = 'content_type_file_groups'}
export enum Layout {List = 'layout_type_list',
                    Table = 'layout_type_table',
                    Tiles = 'layout_type_tiles'}
export enum PreviewType {Text = 'preview_type_text',
                    Image = 'preview_type_image',
                    PDF = 'preview_type_pdf',
                    DOCX = 'preview_type_docx'}
// Names of the inline SVG icons drawn by <fileman-icon> (see components/ui/fileman-icon.component.ts).
export enum Icon {List = 'list',
                    Table = 'table',
                    Tiles = 'tiles',
                    New = 'plus',
                    Reload = 'refresh',
                    Database = 'database',
                    Logout = 'logout',
                    Download = 'download',
                    Edit = 'edit',
                    Delete = 'trash',
                    ShowHistory = 'layers',
                    FavouriteFilterActive = 'star-filled',
                    FavouriteFilterInactive = 'star',
                    More = 'more',
                    Search = 'search',
                    Close = 'close',
                    Check = 'check',
                    Alert = 'alert',
                    Upload = 'upload',
                    File = 'file',
                    Folder = 'folder',
                    User = 'user',
                    Tenant = 'building',
                    SortAscending = 'arrow-up',
                    SortDescending = 'arrow-down'}

export const FilemanTooltipOptions: TooltipOptions = {
  'placement': 'right',
  'theme': 'light',
  'width': 300,
  'max-width': 600,
  'show-delay': 500,
  'tooltip-class': 'global-tooltip-style'
}

export const MultiselectDropdownSettings = {
  singleSelection: false,
  idField: 'id',
  textField: 'name',
  enableCheckAll: true,
  selectAllText: 'Select all',
  unSelectAllText: 'Unselect all',
  allowSearchFilter: true,
  limitSelection: -1,
  clearSearchFilter: true,
  maxHeight: 197,
  itemsShowLimit: 3,
  searchPlaceholderText: 'Search',
  noDataAvailablePlaceholderText: 'No data available',
  closeDropDownOnSelection: false,
  showSelectedItemsAtTop: false,
  defaultOpen: false
}

export class FilemanConstants
{
  static VERSION = '1.1.0';

  public static getRestCallHeaderOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return { headers };
  }

  // public static getProperty(key) {
  //   return sampleData.get(key);
  // }
}
