import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import '../../TagsInputFieldStyles.css';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function TagsInputField(props) {
    const handleDelete = (i) => {
        props.setTags(
            props.tags.filter((tag, index) => index !== i),
        );
    }

    const handleAddition = (tag) => {
        tag.id = tag.id.toLowerCase();
        tag.text = tag.text.toLowerCase();
        props.setTags([...props.tags, tag]);
    }

    return (
        <ReactTags
            tags={props.tags}
            autofocus={false}
            maxLength={20}
            placeholder={props.placeholder || "Add relevant tags by pressing enter"}
            inputFieldPosition={"top"}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            allowDragDrop={false}
            delimiters={delimiters}/>
    )
}
export default TagsInputField;