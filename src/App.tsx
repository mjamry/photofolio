import React, { useEffect, useState } from 'react';
import {makeStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import IconButton from "@material-ui/core/IconButton"
import ImageViewer from "./ImageViewer"
import './App.css';

declare global {
  interface Window { gapi: any; }
}

window.gapi = window.gapi || {};


const useStyles = makeStyles({
  horizontalMenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'fixed',
    top: '25px',
    right: '150px',
    width: '10vw'
  },
  verticatMenu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    top: 0,
    left: '20px',
    position: 'fixed',
  }, 

  downButton: {
    position: 'fixed',
    width: '100vw',
    height: '20px',
    bottom: '50px',
    textAlign: 'center'
  }
})

const App = () => {
  const [imagesList, setImagesList] = useState<any[]>([])
  const classes = useStyles();
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [curretnImageIndex, setImageIndex] = useState<number>(1);
  
  const handleDownButtonClick = () => {
    setImageIndex(curretnImageIndex+1);
    setImage(imagesList[curretnImageIndex].webContentLink);
  }

  useEffect(() => {

    gapi.load('client', () => {
      gapi.client
        .init({
          'apiKey': 'AIzaSyDwJ7EKjHmTfy44hQMbvR5HEdMgkUjn2fw',
          'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
          'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly'
        })
        .then(() => {
          return gapi.client.drive.files.list({
            "q": "'1ASghcPMnCDF7XzHKXl1I3lu01WqdVnuB' in parents",
            "fields": 'files(*)'
          });
        })
        .then((response: any) => {
          console.log(response)
          setImagesList(response.result.files)
        })
    });

  }, [])

  return (
    <div>
      <div className={classes.horizontalMenu}>
        <Button>About</Button>
        <Button>Contact</Button>

      </div>
      <div className={classes.verticatMenu}>
        <Button>Landscapes</Button>
        <Button>People</Button>

      </div>

      <ImageViewer imageSrc={image} />

      <div className={classes.downButton}>
        <IconButton onClick={()=>handleDownButtonClick()}>
          <ExpandMoreIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}

export default App;

