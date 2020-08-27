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
        gridColumn: 1,
        gridRow: 1
      },
      loaderContainer: {
        height: '80vh',
        width: '80vw',
        gridColumn: 1,
        gridRow: 1,
        zIndex: 999
      },
      contentContainer: {
          display: 'grid',
          boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)",
      },
      container: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10vh',
          
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
            <div className={classes.contentContainer}>
                <div className={classes.loaderContainer}>
                    <Loader numberOfElements={6} color="white" show={isLoading}/> 
                </div>
                <div className={classes.imageContainer}>
                    <img src={props.imageSrc} 
                        className={classes.image} 
                        onLoad={()=>handleIsLoaded()}
                        onError={(e)=>console.log(e)}
                        />
                </div>
            </div>
        </div>
    )
}

export default ImageViewer