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
import { FileMetaData } from 'src/app/common/domainobjects/gen/FileMetaData';
import { FileContentData } from 'src/app/common/domainobjects/gen/FileContentData';

export class FileData
{
    metaData: FileMetaData;
    contentData: FileContentData;

    constructor(untypedFileData: any) {
        if (untypedFileData != null) {
            this.metaData = untypedFileData.metaData;
            this.contentData = untypedFileData.contentData;
        }
    }

    getMetaData() {
        return this.metaData;
    }

    getContentData() {
        return this.contentData;
    }

    setMetaData(metaData: FileMetaData) {
        this.metaData = metaData;
    }

    setContentData(contentData: FileContentData) {
        this.contentData = contentData;
    }

    public equals(obj: FileData): boolean {
        if (this === obj) { return true; }
        if (obj == null) { return false; }

        if (this.metaData !== obj.metaData) { return false; }
        if (this.contentData !== obj.contentData) { return false; }

        return true;
    }
}