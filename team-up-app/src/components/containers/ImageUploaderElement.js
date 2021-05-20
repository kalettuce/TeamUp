import React from 'react';
import ImageUploader from 'react-images-upload';
 
function ImageUploaderElement(props) { 
    return (
        <ImageUploader
            withIcon={false}
            buttonStyles={{
                fontSize: '1rem',
                fontWeight: 700,
                color: "black",
                background: '#FFFFFF',
                border: '1px solid',
                borderRadius: 0,
            }}
            withPreview={true}
            label={"Accepted types: JPG, PNG"}
            buttonText={"UPLOAD IMAGE"}
            onChange={props.onDrop}
            imgExtension={['.jpg', '.png']}
            maxFileSize={5242880}
            singleImage={true}
        />
    );
}

export default ImageUploaderElement;