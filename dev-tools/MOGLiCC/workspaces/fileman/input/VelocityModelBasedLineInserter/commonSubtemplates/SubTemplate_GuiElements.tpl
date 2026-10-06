#set( $guiType = $attribute.getMetaInfoValueFor("guiType") )
#set( $isSelectBoxWithFixedOptions = $guiType.startsWith("Selectbox:") )
#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attribute.name) ) 
#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) ) 

## Fileman redesign: form controls use the classes fm-input, fm-textarea, fm-select, fm-checkbox
## and fm-file-input/fm-drop from src/styles/fileman.css.

#if ( $isSelectBoxWithFixedOptions) 
	#set( $optionString = $TemplateStringUtility.cutLeadingChars($guiType, 10) )
	#set( $options = $TemplateStringUtility.commaSeparatedStringToStringList($optionString) )
	#set( $guiType = "Selectbox" )
#end

#if ( $guiType.equals("TextField"))

'                <input id="$attributeName" type="text" class="fm-input" formControlName="${attributeName}Control"/>

#elseif ( $guiType.equals("PasswordField"))

'                <input id="$attributeName" type="password" class="fm-input" formControlName="${attributeName}Control"/>

#elseif ( $guiType.equals("TextArea"))

'                <textarea id="$attributeName" class="fm-textarea" rows="3" formControlName="${attributeName}Control"></textarea>

#elseif ( $guiType.equals("Selectbox"))

'                <select id="$attributeName" class="fm-select" formControlName="${attributeName}Control" (change)="${attributeName}C.markAsTouched()">

	#if ( $isSelectBoxWithFixedOptions)
		#foreach ($option in $options)
'                    <option [value]="'$option'">$option</option>
		#end
	#else
'                    <option *ngFor="let ${attributeName} of ${attributeName}s" [value]="${attributeName}.id">{{${attributeName}.name}}</option>
	#end

'                </select>

#elseif ( $guiType.equals("Checkbox"))

'                    <input id="$attributeName" type="checkbox" class="fm-checkbox" formControlName="${attributeName}Control"/>

#elseif ( $guiType.equals("FileSelector"))

	'                <input id="$attributeName" class="fm-file-input" type="file"
	'                       formControlName="${attributeName}Control"
	'                       (change)="on${AttributeName}Change($event)"
	'                       (focus)="setFocusOnFileSelector(true)" (blur)="setFocusOnFileSelector(false)"/>
	'                <div class="fm-drop">
	'                    <fileman-icon name="upload"></fileman-icon>
	'                    <label for="$attributeName" class="fm-btn">Choose file</label>
	'                </div>

#elseif ( $guiType.equals("MultiSelectBox"))

	'                <ng-multiselect-dropdown
	'                  id="${attributeName}"
	'                  formControlName="${attributeName}Control"
	'                  [placeholder]="'Choose…'"
	'                  [data]="${attributeName}"
	'                  (onSelect)="${attributeName}C.markAsTouched()"
	'                  (onSelectAll)="${attributeName}C.markAsTouched()"
	'                  (onDeSelect)="${attributeName}C.markAsTouched()"
	'                  (onDeSelectAll)="${attributeName}C.markAsTouched()"
	'                  [settings]="${attributeName}MultiselectDropdownSettings">
	'                </ng-multiselect-dropdown>

#else

	Type of GUI Field "$guiType" is not yet supported in the MOGLiCC template "SubTemplate_GuiElements.tpl".	

#end
