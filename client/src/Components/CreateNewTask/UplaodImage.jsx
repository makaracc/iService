import React, { useState } from "react";
import { Button, Input } from "semantic-ui-react";

const UploadImage = (props) =>{
    const [show, setShow] = useState(false)
    var onFieldChange = (event) => {
        const fieldName = event.target.name;
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let fileInfo = {
              name: file.name,
              type: file.type,
              size: Math.round(file.size / 1000) + ' kB',
              base64: reader.result,
              file: file,
            };
        props.onChange(fieldName, fileInfo.base64);
        }
    }
    var uploadImg = ()=>{
        if(props.img !== null){
            if(!show){
                setShow(true);
            }
        }
    }
    return (
        <div>
            <br/>
            Add your Image:<br/>
            <Input type='file' name='file' onChange={onFieldChange}/>
            <br/>
            <Button onClick={uploadImg}>Upload</Button>
            <br/>
            {console.log(props.img)}
            {show ? <div><br/><img alt='imgage' width={100} src={props.img}/> <br/></div> : ''}
            <br/>
        </div>
    )
}

export default UploadImage;