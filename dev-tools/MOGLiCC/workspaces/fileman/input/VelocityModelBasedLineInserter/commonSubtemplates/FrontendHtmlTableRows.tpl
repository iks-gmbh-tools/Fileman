'

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName) )
#set( $quote = "'" ) 


#foreach ($attributeDescriptor in $attributeDescriptorList)

	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeDescriptor.name, " ", "") ) 
	#if ( ! $attributeDescriptor.doesHaveMetaInfo("hideFromClientOverview", "true"))
		#if ( $attributeDescriptor.doesHaveMetaInfo("guiType", "MultiSelectBox"))
			'        <td>{{format${TemplateStringUtility.firstToUpperCase($attributeName)}(${className}.${attributeName})}}</td>
		#elseif ( $attributeName.equals("name"))
			'        <td class="fm-strong">{{${className}.${attributeName}}}</td>
		#elseif ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiType") && $attributeDescriptor.getMetaInfoValueFor("guiType").startsWith("Selectbox:"))
			'        <td><span class="fm-role" [ngClass]="'fm-role--' + (${className}.${attributeName} || '').toLowerCase()">{{${className}.${attributeName}}}</span></td>
		#elseif ( ! $attributeDescriptor.doesHaveMetaInfo("guiType", "FileSelector"))
			'        <td>{{${className}.${attributeName}}}</td>
		#end
	#end 
		
#end

'