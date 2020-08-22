import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import {makeStyles} from '@material-ui/core/styles'
import Loader from './Loader'

type Props = {
    imageSrc: string
}

//image loading progress
interface Image {
    load(url: string): void;
  }
  
  Image.prototype.load = function(url : string){
    var thisImg = this;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url, true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {
        var blob = new Blob([this.response]);
        thisImg.src = window.URL.createObjectURL(blob);
    };
    xmlHTTP.onprogress = function(e: any) {
        thisImg.completedPercentage = parseInt(`${(e.loaded / e.total) * 100}`);
    };
    xmlHTTP.onloadstart = function() {
        thisImg.completedPercentage = 0;
    };
    xmlHTTP.send();
  };
  
  Image.prototype.completedPercentage = 0;
  

const useStyles = makeStyles({
    image: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
      },
      imageContainer: {
        height: '80vh',
        width: '80vw',
        border: 'solid 1px black',
        gridColumn: 1,
        gridRow: 1
      },
      loaderContainer: {
        height: '80vh',
        width: '80vw',
        border: 'solid 1px black',
        gridColumn: 1,
        gridRow: 1,
        zIndex: 999
      },
      container: {
          display: 'grid'
      }
})

const ImageViewer = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(()=>{
        setIsLoading(true);
    }, [props.imageSrc])

    const handleIsLoaded = ():void => {
        setIsLoading(false);
    }

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.loaderContainer}>
                <Loader numberOfElements={4} show={isLoading}/> 
            </div>
            <div className={classes.imageContainer}>
                <img src={props.imageSrc} 
                    className={classes.image} 
                    onLoad={()=>handleIsLoaded()}
                    onError={()=>console.log("error")}
                    />
            </div>
        </div>
    )
}

export default ImageViewer