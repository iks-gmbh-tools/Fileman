#set( $classDescriptor = $model.getClassDescriptor("Tenant") )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName)) 

@TargetFileName fileman-${className}-details.component.html
@TargetDir ..\\..\\Fileman-Frontend\\src\app\components\details\fileman-${className}-details
@NameOfValidModel SpringBootBackendAngularFrontModel
@ReplaceStart "<!-- The table section below is generated: Do not modify manually! -->"
@ReplaceEnd "<!-- The table section above is generated: Do not modify manually! -->"

#parse("commonSubtemplates/FrontendDetailsHtmlTable.tpl")

