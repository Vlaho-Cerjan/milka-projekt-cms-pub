import fs from 'fs';
export const SaveImageToDir = async (image: string, name?: string) => {
    const path = process.cwd() + '/public/images/';
    const tempName = name || Math.random().toString(36).substring(7);
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const pathToSave = path + tempName + ".png";
    fs.writeFile(pathToSave, base64Data, 'base64', function(err) {
        if(err) {
            console.log(err);
        }
    });
}