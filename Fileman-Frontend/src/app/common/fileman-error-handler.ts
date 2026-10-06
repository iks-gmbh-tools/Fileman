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
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { FilemanUrlNotReachable } from './errors/fileman-url-not-reachable-error';
import { FilemanBadRequestError } from './errors/fileman-bad-request-error';
import { FilemanDialogService } from '../services/fileman-dialog.service';

/**
 * Shows unexpected errors in the design system's dialog instead of window.alert().
 * The dialog service is looked up lazily because the ErrorHandler is created very early.
 */
@Injectable()
export class FilemanErrorHandler extends ErrorHandler
{
    constructor(private injector: Injector) {
        super();
    }

    handleError(error: any)
    {
        if (error.status === 0) {
            this.show('Server not reachable', 'Fileman can\'t reach ' + error.url + '. Check the connection and try again.');
        } else if (error.status === 500) {
            this.show('Server error', 'The server reported an error for ' + error.url + '. Try again; if it keeps happening, tell your administrator.');
        } else if (error.status === 400 || error instanceof FilemanBadRequestError) {
            console.log(error);
            this.show('Request rejected', 'The server rejected the request to ' + error.url + '.');
        } else if (error.status === 404 || error instanceof FilemanUrlNotReachable) {
            this.show('Not found', 'Nothing was found at ' + error.url + '.');
        } else if (error.cause != null && (error.cause.status === 404 || error.cause instanceof FilemanUrlNotReachable)) {
            this.show('Not found', 'Nothing was found at ' + error.cause.url + '.');
        } else {
            console.log('Unexpected ERROR: ');
            console.log(error);
            this.show('Something went wrong', 'An unexpected error occurred. Reload the page and try again.');
        }
    }

    private show(title: string, message: string) {
        try {
            const zone = this.injector.get(NgZone);
            const dialogService = this.injector.get(FilemanDialogService);
            zone.run(() => dialogService.alert(title, message));
        } catch (e) {
            alert(title + ': ' + message);   // fallback if the app isn't up yet
        }
    }
}
