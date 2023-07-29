import React, { useState } from 'react'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useTranslation } from 'react-i18next'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

// Our app
export default function FilePondImage({files,setFiles,maxFiles,multiple,handleError}) {
  const { t } = useTranslation()
  return (
    <div className="App">
      <FilePond
        onaddfile={handleError}
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={multiple}
        maxFiles={maxFiles}
        // server="/api"
        name="files" 
        credits={""}
        labelIdle={t('Drag & Drop your files or')+ `<span class="filepond--label-action">${t('Browse')}</span>`}
      />
    </div>
  )
}