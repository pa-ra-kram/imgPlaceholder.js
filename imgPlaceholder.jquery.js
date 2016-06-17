/*!
imgPlaceholder.jquery.js - Javscript Image placeholder
Version 1.0.0
License:  MIT
Author: Nitin
URL: https://github.com/xNitin/imgPlaceholder.js
Jquery Required.
*/
if (typeof jQuery != 'undefined') { // Proceed only if jQuery is loaded
    $('img').each(function(){ //Going through each image on the page

        //Select data parameters from 'data-src' first. If 'data-src' attribute is not present, look in the 'src' attribute
        var attrb = typeof($(this).attr('data-src')) != 'undefined' ? 'data-src' : 'src';
        var data = $(this).attr(attrb);
        if(data.match('^imgholder.js')){ //If the attribute value starts with imgholder.js tag
            var m1 = data.match(/r\.js\/(\d+)(.*)/); //Match to find the first parameter
            var w = m1[1]; //The first parameter is set as width
            var arr = {};
            if(m1[2]==''){ //If height is not provided
                var h=w; //Set height equal to the width
            }
            else{ //Height is also provided
                //Match to find second parameter
                var m2 = m1[2].match(/x(\d+)(.*)/);

                var h=m2[1]; //Set second parameter as height

                if (m2[2] !=''){ //if other parameters are also provided
                    var param = m2[2].slice(1); //Remove the '?' from the string
                    var m3 = param.split('&'); //Split string by '&'

                    for(var i=0;i<m3.length;i++){ //Go through all the paramters
                        //Convert 'a=b' into a:b key-value pair
                        var t = m3[i].split('='); //Split string by '='
                        arr[t[0]]=t[1]; //Store in array
                    }
                }
            }
            //Change default color and text if you want to
            var col = '#777'; //Default text color
            var bgcol = '#ccc'; //Default background color
            var txt = w+'x'+h; //Default image text, width x height. Ex: 300x200
            var size = 11; //Default font size
            var font = 'Arial';


            //If text color is passed, and is a valid color, use it. Else, use default color, #777.
            col = (('color' in arr) && (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(arr['color']))) ? arr['color'] : col;

            //If background color is passed, and is a valid color, use it. Else, use default color, #CCC.
            bgcol = (('bg' in arr) && (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(arr['bg']))) ? arr['bg'] : bgcol;
            //If image text is passed, use it. Else, use default, width x height.
            txt = ('text' in arr) ? arr['text'] : txt;

            //If font is passed, use it. Else, use default font, Arial.
            font = ('font' in arr) ? arr['font'] : font;

            //If font size is not provided, use default font size, 11px
            size = (('size' in arr) && (/(\d+)$/i.test(arr['size']))) ? arr['size'] : size;

            //Create the svg
            var svg = '<svg width="'+w+'" height="'+h+'" xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css">.imgsvg text { fill:'+col+';font-family:'+font+';font-size:'+size+'pt } </style></defs><g class="imgsvg"><rect width="100%" height="100%" fill="'+bgcol+'"></rect><text x="'+w/2+'" y="'+h/2+'" text-anchor="middle" alignment-baseline="central">'+txt+'</text></g></svg>';

            //Replace source attribute of image with svg
            $(this).attr('src',"data:image/svg+xml;charset=utf-8,"+svg);
        }
    });
} else {
    //jQuery not present. Display a message in console
    console.log('This script requires jQuery. If you are not using jQuery, try the non-jQuery version');
}

