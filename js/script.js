document.addEventListener("DOMContentLoaded", function(){
    //get the list items
    let saved_notes = getSavedNotes();
    let h3 = document.querySelector(".list-area h3");
    let list_items_content = document.querySelector(".list-items-content")

    if(saved_notes.length == 0){
        //there are no notes at the moments
        h3.innerHTML = "You have 0 notes at the moment";
    }else{
        h3.innerHTML = `You have ${saved_notes.length} notes at the moment`;


         let items_code = `<table>
                                                <thead>
                                                    <th>Item</th>
                                                    <th></th>
                                                </thead>
                                                <tbody>
                                            `

        for(let i = 0; i < saved_notes.length; i++){

            items_code += `<tr class="details">
                                            <td  class="input-controller"><input type="text" disabled value=" ${saved_notes[i]['item_name']}" class="input-result"> </td>
                                            <td class="det-btn"><a href='' class="editBtn">EDIT</a>   <span class="update-controller">
                                            <button onclick="saveBtn(${saved_notes[i].id})">SAVE</button></span> 
                                            <button onClick="del(${saved_notes[i].id}) "><ion-icon name="close-circle"></ion-icon>Delete</button></td>
                                           
                                           
                                    </tr>`

                                    
        }
        items_code += `</tbody>
                                            </table>
                                            `

        list_items_content.innerHTML = items_code;
        
        activateEditListeners()
        // activateSaveListeners()
        
        


    }

    



})

function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller input ")

    editBtn.forEach((eb, i)=>{
        eb.addEventListener("click", (e)=>{
            e.preventDefault()
            updateController[i].style.display = "block"
            inputs[i].disabled = false
        })

    })
}


function saveBtn(id){
    console.log(id);
    const inputs = document.querySelectorAll(".input-controller input")

    let storage = localStorage.getItem('lists')
    storage = JSON.parse(storage)
    // let findId = storage.find((store)=> store.id == id)
        for (let i = 0; i < storage.length; i++) {
            if(storage[i].id == id){
                storage[i].item_name = inputs[i].value
                localStorage.setItem('lists', JSON.stringify(storage))
            }
            
        }
        location.reload()
    
}



function createNewItem(event){
    event.preventDefault();

    const createItemDialog = document.querySelector(".create-item-dialog");

    createItemDialog.style.display = "block";
}


const closeDialog = document.querySelector(".close-dialog");

closeDialog.addEventListener("click", function(event){
    const createItemDialog = document.querySelector(".create-item-dialog");
    event.preventDefault();

    createItemDialog.style.display = "none";

});







const createItemForm = document.querySelector("#create-item-form");

//once the form is submitted
createItemForm.addEventListener("submit", function(event){
    event.preventDefault();

    let item_name = this.item_name.value.trim();
    let item_category = this.item_category.value;

    if(item_name.length != 0){
        //proceed
        const feedback = saveItem(item_name, item_category);

        if(feedback){
            alert("Item saved");
            location.reload()
        }
    }
})


function saveItem(item_name, item_category){
    //save to localStorage
    const list_object = {
        item_name: item_name,
        item_category: item_category,
        id: Date.now()
    }

    //check if the storage exists already
    let result = localStorage.getItem("lists");

    if(result == null || typeof result == undefined){
        let list_storage = [];

        list_storage.push(list_object);

        localStorage.setItem("lists", JSON.stringify(list_storage));
    }else{
        result = JSON.parse(result);

        result.push(list_object);

        localStorage.setItem("lists", JSON.stringify(result));

    }
    

    return true;
}




function getSavedNotes(){

    let result = localStorage.getItem("lists");

    if(result == null || typeof result == undefined){
        return [];
    }else{

        result = JSON.parse(result);

        return result;

    }

};


function del(id) {
    console.log(id);

    let getstore = JSON.parse(localStorage.getItem('lists'))
    let del = getstore.filter((saved_note) => {
        // console.log ('hello')

        return saved_note.id != id;
    })
    localStorage.setItem("lists", JSON.stringify(del));
    location.reload()
}

