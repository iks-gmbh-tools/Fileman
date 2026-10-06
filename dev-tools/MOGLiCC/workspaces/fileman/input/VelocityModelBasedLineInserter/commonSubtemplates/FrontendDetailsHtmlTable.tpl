'        <div class="fm-form-grid" formGroupName="detailsForm">

## Fileman redesign: one fm-field per GUI attribute in a responsive two-column grid
## (classes from src/styles/fileman.css). Label text: metainfo "guiLabel" if given, else the attribute name.

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )

#foreach ($attribute in $attributeDescriptorList)

	#if ( $attribute.doesHaveAnyMetaInfosWithName("guiType"))

		#set( $fieldName = $TemplateStringUtility.firstToLowerCase($attribute.name) )
		#set( $fieldName = $TemplateStringUtility.replaceAllIn($fieldName, " ", "") )
		#if ( $attribute.doesHaveAnyMetaInfosWithName("guiLabel"))
			#set( $guiLabel = $attribute.getMetaInfoValueFor("guiLabel") )
		#else
			#set( $guiLabel = $TemplateStringUtility.firstToUpperCase($fieldName) )
		#end

		#if ( $attribute.doesHaveAnyMetaInfosWithName("guiCondition"))
'            <div class="fm-field" *ngIf="${attribute.getMetaInfoValueFor("guiCondition")}">
		#else
'            <div class="fm-field">
		#end

		#if ( $attribute.doesHaveMetaInfo("guiType", "Checkbox"))
'                <label class="fm-checkfield" for="$fieldName">
			#parse("commonSubtemplates/SubTemplate_GuiElements.tpl")
'                    <span class="fm-label">$guiLabel</span>
'                </label>
		#else
'                <label class="fm-label" for="$fieldName">$guiLabel</label>
			#parse("commonSubtemplates/SubTemplate_GuiElements.tpl")
		#end
'            </div>

	#end

#end

'        </div>
