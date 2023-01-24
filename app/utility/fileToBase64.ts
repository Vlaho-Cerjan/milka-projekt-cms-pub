export const fileToBase64 = (file: File | Blob) => {
    return new Promise((resolve) => {
        var reader = new FileReader();    // Read file content on file loaded event
        reader.onload = function(event: ProgressEvent<FileReader>) {
        if(event.target) resolve(event.target.result);
        };
        // Convert data to base64
        reader.readAsDataURL(file);
    });
};