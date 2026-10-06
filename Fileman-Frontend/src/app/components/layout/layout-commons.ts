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
export class LayoutCommons {

  /** key (row index) of the row whose action menu (⋮) is open; null = all closed */
  openMenuKey: any = null;

  protected buildHtmlTooltipContentRow(title: string, content: string): string {
    return '<span class="inner-html-left-span">' + title + ':</span>'
        + '<span><b>' + content + '</b></span><br>';
  }

  /** fixed position of the open menu, next to its button (so a scrolling table can't clip it) */
  menuStyle: { [key: string]: string } = {};

  toggleMenu(key: any, event?: Event) {
    if (event) {
      event.stopPropagation();
      const button = event.currentTarget as HTMLElement;
      if (button && button.getBoundingClientRect) {
        const rect = button.getBoundingClientRect();
        const opensUpwards = rect.bottom + 260 > window.innerHeight;
        this.menuStyle = {
          right: (window.innerWidth - rect.right) + 'px',
          top: opensUpwards ? 'auto' : (rect.bottom + 4) + 'px',
          bottom: opensUpwards ? (window.innerHeight - rect.top + 4) + 'px' : 'auto'
        };
      }
    }
    this.openMenuKey = this.openMenuKey === key ? null : key;
  }

  isMenuOpen(key: any): boolean {
    return this.openMenuKey === key;
  }

  /** called by (clickedOutside) of the menu anchor and Escape inside it */
  closeMenu(key?: any) {
    if (key === undefined || this.openMenuKey === key) {
      this.openMenuKey = null;
    }
  }

  /** "1.2 KB" style size for the meta lines */
  formatSize(bytes: number): string {
    if (bytes == null || isNaN(bytes)) { return ''; }
    if (bytes < 1024) { return bytes + ' B'; }
    if (bytes < 1024 * 1024) { return (bytes / 1024).toFixed(1).replace('.0', '') + ' KB'; }
    return (bytes / 1024 / 1024).toFixed(1).replace('.0', '') + ' MB';
  }

  /** "30 Nov 2020" style date for the meta lines */
  formatShortDate(nativeDateString: string): string {
    if (!nativeDateString) { return ''; }
    const date = new Date(nativeDateString);
    if (isNaN(date.getTime())) { return ''; }
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  /** Initials for the avatar placeholder (max. 2 letters) */
  getInitials(name: string): string {
    if (!name) { return ''; }
    return name.split(/[\s._-]+/)
               .filter(part => part.length > 0)
               .map(part => part[0])
               .join('')
               .substr(0, 2)
               .toUpperCase();
  }
}
