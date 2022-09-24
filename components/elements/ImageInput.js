import React, {createRef} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from 'next/image';

export const ImageInput = (props) => {
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        isDragActive,
        getInputProps
      } = useDropzone({    
        maxFiles:1,
        maxSize: 1000000,
        accept: {
          'image/*': [],
        },
        onDrop: (acceptedFiles) =>{
          props.setArt(acceptedFiles[0])
        },
        onDropRejected: () =>{
          alert("max image size 1mb")
        }
      });
    
      const inputRef = React.createRef()

    
      return (
          <div {...getRootProps({ className: 'dropzone border-2 rounded-md border-dashed w-[196px] h-[196px] flex items-center justify-center cursor-pointer' })}>
            <input {...getInputProps()} name="art" />
            {acceptedFiles.length > 0 ? 
            (
              <Image src={URL.createObjectURL(acceptedFiles[0])} width={196} height={196} className="object-cover" />
            ):
            (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

            )
            }
          </div>
      );
}