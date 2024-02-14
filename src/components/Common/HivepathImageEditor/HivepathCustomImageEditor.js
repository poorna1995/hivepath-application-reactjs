/* eslint-disable no-lone-blocks */
import React from "react";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog/index";
import { DialogTitle, Grid } from "@mui/material";

const HivepathCustomImageEditor = ({ open, handleClose }) => {
  return (
    <HivepathBaseDialog open={open} handleClose={handleClose}>
      <DialogTitle>Hivepath Image Editor</DialogTitle>
      <Grid container>
        <Grid item xs={12}></Grid>
      </Grid>
    </HivepathBaseDialog>
  );
};

export default HivepathCustomImageEditor;

{
  /* <body>

<p>Image to use:</p>

<img id="image" width="220" height="277"
src="https://images.unsplash.com/photo-1642013352363-c3506e3106d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="The Scream">

<p>Canvas:</p>

<canvas id="myCanvas" width="240" height="297"
style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.
</canvas>

<script>
window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("image");
    ctx.font = "30px Arial white";
ctx.fillText("Hello World",0,0, 10, 50);
ctx.fillStyle = "red";
ctx.textAlign = "center";
   ctx.drawImage(img, 10, 10);
   ctx.fillRect(0, 0, 150, 75);
   ctx.fillText("Hello World", canvas.width/2, canvas.height/2);
   
};
</script>

</body> */
}

{
  /**
   * var inputURL ="";
  
    var blobObject = blobCreationFromURL(inputURL);
  
    // Create Blob file from URL
    function blobCreationFromURL(inputURI) {
  
        var binaryVal;
  
        // mime extension extraction
        var inputMIME = inputURI.split(',')[0].split(':')[1].split(';')[0];
  
        // Extract remaining part of URL and convert it to binary value
        if (inputURI.split(',')[0].indexOf('base64') >= 0)
            binaryVal = atob(inputURI.split(',')[1]);
  
        // Decoding of base64 encoded string
        else
            binaryVal = unescape(inputURI.split(',')[1]);
  
        // Computation of new string in which hexadecimal
        // escape sequences are replaced by the character 
        // it represents
  
        // Store the bytes of the string to a typed array
        var blobArray = [];
        for (var index = 0; index < binaryVal.length; index++) {
            blobArray.push(binaryVal.charCodeAt(index));
        }
  
        return new Blob([blobArray], {
            type: inputMIME
        });
    }
  
    var fdataobj = new FormData();
  
    // Create formdata object and append the object
    // file to the name 'Blob file'
    fdataobj.append("Blob File", blobObject);
  
    // FormData object content is displayed in alert box.
    for (var pair of fdataobj.entries()) {
        alert('GeeksforGeeks\n' + pair[0] + '–' + pair[1])
    }
   */
}
