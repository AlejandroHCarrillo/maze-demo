export const fileUpload = async (file:any) => {
    // console.log("Archivo a subir: ", file);
    // const uploadUrl = 'https://api.cloudinary.com/v1_1/alexthegreat/upload';
    const uploadUrl = 'http://localhost:4200/assets/mazelibrary';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(uploadUrl, {
                                method: 'POST', 
                                body: formData
                                });
        if( resp.ok ){
            console.log('subio OK');
            const response = await resp.json();
            // console.log(cloudResp.secure_url);            
            return response.secure_url;
        } else {
            console.log('No subio', await resp.json());
            throw await resp.json();
            return null;       
        }
    } catch (error) {
        console.log(error);
        throw error;            
    }
}