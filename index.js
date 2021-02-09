
const memeList = document.getElementById('memeList');
const form = document.querySelector('#form');
const form1 = document.querySelector('#form1');
const updateCap = document.querySelector('#updateCap');
console.log(memeList);
var id=0;


const getMemes =  ()=>{
    axios.get('https://xmemeeapi.herokuapp.com/memes')
    .then(res=>{
        console.log(res);
        showMemes(res.data);
    })
    .catch(err=>{
        console.log(err);
    })
}
const showMemes = (Memes)=>{
    for(const memeObj of Memes){
        const editButton = document.createElement('a');
        editButton.innerHTML="edit";
        //editButton.classList.add("far");
        //editButton.classList.add("fa-edit");
        //edit functionality here
        editButton.setAttribute('href',"editMeme.html");
        editButton.addEventListener('click',(e)=>{
            updateCap.style.display="block";
            form1.style.display="block";
            e.preventDefault();
            form1.elements.NAME.setAttribute('readOnly',true);
            form1.elements.NAME.setAttribute('disabled',true);
            form1.elements.NAME.value = memeObj.name;
            form1.elements.CAPTION.value = memeObj.caption;
            form1.elements.URL.value = memeObj.url;
            console.log(memeObj.name);
            id = memeObj.id;
            console.log(id);
            window.scrollTo(10000, 100);
            
        })
        const newdiv = document.createElement('div');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const newImg = document.createElement('img');
        newImg.src = memeObj.url;
        const bodyDiv = document.createElement('div');
        newImg.classList.add('card-img-top');
        newdiv.append(editButton);
        newdiv.append(newImg);
        bodyDiv.classList.add('card-body');
        
        p1.classList.add('card-title');
        p1.append("Name : ")
        p1.append(memeObj.name);
        
        p2.classList.add('card-text');
        p2.append("Caption: ")
        p2.append(memeObj.caption);
        
        bodyDiv.append(p1);
        bodyDiv.append(p2);
        newdiv.append(bodyDiv);
        memeList.append(newdiv);
        memeList.classList.add('col-md-4');
        

    }
}
getMemes();
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const newObj={
       name: form.elements.NAME.value,
       caption: form.elements.CAPTION.value,
       url:form.elements.URL.value
    }
    console.log("sending post");
    sendMeme(newObj);
    
    
})

form1.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const newObj={
       caption: form1.elements.CAPTION.value,
       url:form1.elements.URL.value
    }
    console.log(newObj);
    console.log("updating post");
    updateMeme(id,newObj);
    id=0;
    
    
})



const sendMeme = (meme)=>{
    axios.post('https://xmemeeapi.herokuapp.com/memes',meme)
         .then(response=>{
             
             console.log("sent post");
             memeList.innerHTML = "";
             console.log("elements reset");
             getMemes();
             console.log("memes fethched");
             form.reset();
         })
         .catch(error=>{
             console.log(error);
         })
}

const updateMeme=(id,obj)=>{
    axios.patch('https://xmemeeapi.herokuapp.com/memes/'+id,obj)
         .then(res=>{
            console.log("updated post");
            memeList.innerHTML = "";
            console.log("elements reset");
            getMemes();
            console.log("memes fethched");
            form1.reset();
            form1.style.display = "none"
            updateCap.style.display="none";
         })
    .catch(error => console.log(error))
}



