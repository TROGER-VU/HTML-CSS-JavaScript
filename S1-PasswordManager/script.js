const hidePassword = (password) => {
    let hiddenPassword = "";
    for(let i = 0; i < password.length; i++){
        hiddenPassword += "*";
    }
    return hiddenPassword;
}

const copyContent = (content) => {
    navigator.clipboard.writeText(content).then( () => {
        alert("Copied");
    }).catch(err => {
        alert("Coping Failed");
    });
}

const deletePasswordData = (index) => {
    let passwordDetails = localStorage.getItem("passwordDetails");
    let passwordData = JSON.parse(passwordDetails);
    passwordData.splice(index, 1);
    localStorage.setItem("passwordDetails", JSON.stringify(passwordData));
    alert("Password Deleted Successfully.");
    populateSavePasswordDetails();
}

const editPasswordData = (index) => {
    let table = document.querySelector("table");
    let passwordDetails = localStorage.getItem("passwordDetails");
    table.innerHTML = `<tr>
                    <th style="background-color: lightgray">Website</th>
                    <th style="background-color: lightgray">Username</th>
                    <th style="background-color: lightgray">Password</th>
                    <th style="background-color: lightgray">Action</th>
                </tr>`
    
    let passwordData = JSON.parse(passwordDetails);
    let html = ""
    let color = "lightgray";
    let editable = "";
    for(let i=0;i<passwordData.length;i++){
        if(i == index) {
            editable = "contenteditable";
        } else {
            editable = "";
        }

        if(i%2==0){
            color = "white";
        }
        else{
            color = "whitesmoke";
        }
        row = passwordData[i];
        html += `
        <tr> 
                <td id = "${i + "0"}" style="background-color: ${color};" ${editable}>${row.website}<i onClick="copyContent('${row.website}')" class="fa-regular fa-clipboard"></i></td>
                <td id = "${i + "1"}" style="background-color: ${color};" ${editable}>${row.username}<i onClick="copyContent('${row.username}')" class="fa-regular fa-clipboard"></i></td>
                <td id = "${i + "2"}" style="background-color: ${color};" ${editable}>${hidePassword(row.password)} <i onCLick="copyContent('${row.password}')" class="fa-regular fa-clipboard"></i></td>
                <td style="background-color: ${color};">
                <button class="delete-btn" onClick="deletePasswordData('${i}')">Delete</button>
                <button class="edit-btn" onClick="editPasswordData('${i}')">Edit</button>
                <button class="update-btn" onClick="updatePasswordData('${i}')">Update</button>
            </td>
        </tr>
        `;
     }
    table.innerHTML = table.innerHTML + html;
}

const updatePassword = (index) => {
    const websiteData = document.getElementById(index + "0").innerText;
    const usernameData = document.getElementById(index + "1").innerText;
    const passwordData = document.getElementById(index + "2").innerText;

    console.log(websiteData, usernameData, passwordData);

    populateSavePasswordDetails();

}

const populateSavePasswordDetails = () => {
    let table = document.querySelector("table")
    let passwordDetails = localStorage.getItem("passwordDetails");
    if(passwordDetails == null){
        table.innerHTML = "No Details Available";
    } else {
        table.innerHTML = `<tr>
                    <th style="background-color: lightgray">Website</th>
                    <th style="background-color: lightgray">Username</th>
                    <th style="background-color: lightgray">Password</th>
                    <th style="background-color: lightgray">Action</th>
                </tr>`

        let passwordData = JSON.parse(passwordDetails);
        let html = ""
        let color = "lightgray";
        for(let i=0;i<passwordData.length;i++){
            if(i%2==0){
                color = "white";
            }
            else{
                color = "whitesmoke";
            }
            row = passwordData[i];
            html += `
            <tr>
                <td id = "${i + "0"}" style="background-color: ${color};">${row.website}<i onClick="copyContent('${row.website}')" class="fa-regular fa-clipboard"></i></td>
                <td id = "${i + "1"}" style="background-color: ${color};">${row.username}<i onClick="copyContent('${row.username}')" class="fa-regular fa-clipboard"></i></td>
                <td id = "${i + "2"}" style="background-color: ${color};" ${editable}>${hidePassword(row.password)} <i onCLick="copyContent('${row.password}')" class="fa-regular fa-clipboard"></i></td>
                <td style="background-color: ${color};">
                    <button class="delete-btn" onClick="deletePasswordData('${i}')">Delete</button>
                    <button class="edit-btn" onClick="editPasswordData('${i}')">Edit</button>
                    <button class="update-btn" onClick="updatePasswordData('${i}')">Update</button>
                </td>
            </tr>
            `;
        }
        table.innerHTML = table.innerHTML + html;
    }
}
populateSavePasswordDetails();
document.querySelector(".save-btn").addEventListener("click",(event)=>{
    event.preventDefault();
    let passwordDetails = localStorage.getItem("passwordDetails");
    if(passwordDetails == null){
        let passwordJSON = [];
        passwordJSON.push({
            website: website.value,
            username: username.value, 
            password: password.value
        });
        alert("Password Deatils Saved.");
        localStorage.setItem("passwordDetails", JSON.stringify(passwordJSON));
    } else {
        let passwordJSON = JSON.parse(passwordDetails);
        passwordJSON.push({
            website: website.value,
            username: username.value,
            password: password.value
        });
        localStorage.setItem("passwordDetails", JSON.stringify(passwordJSON));
        alert("Password Details Saved.")
    }
    website.value = "";
    username.value = "";
    password.value = "";

    populateSavePasswordDetails();
});