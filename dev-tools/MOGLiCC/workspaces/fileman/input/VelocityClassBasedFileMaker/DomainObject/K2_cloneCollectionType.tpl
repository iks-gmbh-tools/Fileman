#set( $collectionMetaType = $TemplateJavaUtility.getCollectionMetaType($javaType) )
#set( $collectionElementType = $TemplateJavaUtility.getCollectionElementType($javaType) )

'
'		if ( this.${attributeName} != null )  
'		{
			#if ( $collectionMetaType == "java.util.List" || $collectionMetaType == "List")

				#set( $collectionIdentifier = "list" + $collectionElementType )

				'			final  $collectionMetaType<$collectionElementType> $collectionIdentifier = new java.util.ArrayList<$collectionElementType>();
				
			#elseif ( $collectionMetaType == "java.util.Set" || $collectionMetaType == "Set")

				#set( $collectionIdentifier = "list" + $collectionElementType )

				'			final  $collectionMetaType<$collectionElementType> $collectionIdentifier = new java.util.HashSet<$collectionElementType>();

			#else

				#set( $collectionIdentifier = "collection" )
				'			// probably, here is need of manual adaptation to correct the generated implementation 
				'			final  $collectionMetaType<$collectionElementType> $collectionIdentifier = new $collectionMetaType<$collectionElementType>();

			#end

			'			for (final $collectionElementType element : $attributeName) {
			'				${collectionIdentifier}.add(element);
			'			}
'		}
