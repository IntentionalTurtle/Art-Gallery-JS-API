
const getData = async (img_id) => {
    //https://www.artic.edu/artworks/90048/distant-view-of-niagara-falls image you want
    //https://api.artic.edu/api/v1/artworks/27992?fields=id,title,image_id example
    let response = await axios.get(`https://api.artic.edu/api/v1/artworks/${img_id}`)
    console.log(response.data.data)
    return response.data.data
}

const DOM_Elements = {
    art_info: '.art-info',
}

const load_data = async (img_id) => {
    const artData = await getData(img_id);
    let techs = ""
    for (let i = 0; i < artData.term_titles.length; i++){
        techs += artData.term_titles[i] + "<br>";
    }
    //Could have picked a different picture but wanted to try this...
    //the real name is over 100 characters long and disrupts the formatting hugely
    //don't know how to make the text wrap around to a new line without creating separate 
    //containers for each called info object
    if (artData.id == 24645){
        artData.title = "Under the Wave off Kanagawa"
    }
    const html = `
    <pre style="font-family: Arial, Helvetica, sans-serif; display:flex; flex-wrap: wrap"> 
    Image Title: ${artData.title}
    Image ID: ${artData.id}
    Artist Name: ${artData.artist_display}
    Techniques and Related Search Terms: 
    ${techs}
    </pre>
    `
    clear_data();
    document.querySelector(DOM_Elements.art_info).insertAdjacentHTML('beforeend', html)
} 

const clear_data = () => {
    document.querySelector(DOM_Elements.art_info).innerHTML = '';
}