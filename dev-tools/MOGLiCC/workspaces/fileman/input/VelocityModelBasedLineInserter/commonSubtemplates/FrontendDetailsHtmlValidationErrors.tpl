#set( $quotes = '"' )
#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )

## Fileman redesign: one plain sentence per problem, saying how to fix it (shown inside the fm-alert box).

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiType"))
	
		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) ) 
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
		#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiLabel"))
			#set( $guiLabel = $attributeDescriptor.getMetaInfoValueFor("guiLabel") )
		#else
			#set( $guiLabel = $TemplateStringUtility.firstToUpperCase($attributeName) )
		#end
		
		#if ( $attributeDescriptor.doesHaveMetaInfo( "Mandatory", "true") )
'            <div *ngIf="${attributeName}C.errors?.required && ${attributeName}C.touched">
'               $guiLabel is required.
'            </div>		
		#end
		
		#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName( "MinLength" ))
'            <div *ngIf="${attributeName}C.errors?.minlength && ${attributeName}C.touched">
'               $guiLabel needs at least {{${attributeName}C.errors.minlength.requiredLength}} characters.
'            </div>
        #end
		
		#if ( $attributeDescriptor.doesHaveMetaInfo( "allowSpace", "false") )
'            <div *ngIf="${attributeName}C.errors?.doesNotContainSpace">
'               $guiLabel can't contain spaces.
'            </div>	
		#end
			
		#if ( $attributeDescriptor.doesHaveMetaInfo( "unique", "true") || $attributeDescriptor.doesHaveMetaInfo( "unique", "for-client"))
'            <div *ngIf="${attributeName}C.errors?.isNotUnique">
'               $guiLabel “{{${attributeName}C.value}}” already exists. Choose another one.
'            </div>
		#end

	#end
	
#end
