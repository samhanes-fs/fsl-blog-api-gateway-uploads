// replace this with the URL for your API
var UPLOAD_URL = 'https://hfdkrnzzha.execute-api.us-east-1.amazonaws.com/upload/signed-putobject';

var uppy = Uppy.Core()
  .use(Uppy.Dashboard, {
    inline: true,
    target: '#drag-drop-area'
  })
  .use(Uppy.AwsS3, {
    getUploadParameters(file) {
      return (
        fetch(UPLOAD_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            contentType: file.type,
          }),
        })
        .then((response) => response.json())
        .then((data) => ({
          method: data.uploadMethod,
          url: data.uploadUrl,
          headers: {
            'Content-Type': file.type,
          },
        }))
      );
    },
  });

uppy.on('complete', (result) => {
  console.log('Upload complete! We\'ve uploaded these files:', result.successful)
})
