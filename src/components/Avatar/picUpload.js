import { axiosInstance as axios, toBase64 } from 'helpers/index';

const validateFileType = () => {
  var fileName = document.getElementById('fileToUpload').value;
  var idxDot = fileName.lastIndexOf('.') + 1;
  var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  if (extFile === 'jpg' || extFile === 'jpeg' || extFile === 'png') {
    return true;
  } else {
    alert('Only jpg/jpeg and png files are allowed!');
    return false;
  }
};

const checkFileSize = event => {
  let files = event.target.files;
  let size = 10913079; // aproximately  10 megabytes
  let err = '';
  for (var x = 0; x < files.length; x++) {
    if (files[x].size > size) {
      err +=
        files[x].type +
        '  is too large, please pick a smaller file less than 10 megabytes\n';
    }
  }
  if (err !== '') {
    alert(err);
    return false;
  }

  return true;
};

const handleFileUpload = async (e, arrayOfFunc) => {

    if(Array.isArray(arrayOfFunc) && arrayOfFunc.length ===  3){
        const  email = arrayOfFunc[0]
        const  setUploadProgress = arrayOfFunc[2];
        const  setProgressBarVisiblity = arrayOfFunc[1]
    
        const { files } = e.target;
      if (validateFileType() && checkFileSize(e)) {
    
        const img = await toBase64(files[0]);
        const data = new FormData();
        data.append('file', files[0]);

        document.getElementById('fileToUpload').value = '';
        setProgressBarVisiblity(true);
        axios
          .put('/user', {
              email,
              photo: img
          }, {
            onUploadProgress: ProgressEvent => {
                setUploadProgress( (ProgressEvent.loaded / ProgressEvent.total) * 100);
                return ProgressEvent.loaded / ProgressEvent.total === 1 ?  setProgressBarVisiblity(false) : null;
            }
          })
          .then(({data}) => {
          }).catch(err => alert(err?.message || 'Failed to upload try again later'))
      }
     }

};

export default handleFileUpload;
