import React from 'react';
import ImageUploader from 'react-images-upload';
 
function ImageUploaderElement(props) { 
    return (
        <ImageUploader
            withIcon={false}
            buttonStyles={{
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                textTransform: "uppercase",
                letterSpacing: "0.02857em",
                fontSize: '0.875rem',
                fontWeight: 700,
                color: "black",
                background: '#FFFFFF',
                border: '1px solid',
                borderRadius: 0,
            }}
            labelStyles={{
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                letterSpacing: "0.02857em",
                opacity: 0.6,
            }}
            fileContainerStyle={{
                boxShadow: 'none',
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