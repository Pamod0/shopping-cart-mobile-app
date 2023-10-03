import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-2d9d1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingItemEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputEl.value 
    push(shoppingListInDB, inputValue)
    clearInputEl()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let arrayOfItems = Object.entries(snapshot.val())
        clearList()
    
        for(let i=0; i<arrayOfItems.length; i++) {
            let currentItem = arrayOfItems[i]
            let currentItemID = currentItem[0]
            let currentItemVal = currentItem[1]
            
            appendItem(currentItem)
        }
    }

    else {
        shoppingItemEl.innerHTML = "No Items"
    }

})

function clearInputEl() {
    inputEl.value = ""
}

function clearList() {
    shoppingItemEl.innerHTML = ""
}

function appendItem(inputItem) {
    let itemID = inputItem[0]
    let itemVal = inputItem[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemVal

    newEl.addEventListener("click", function() {
        let itemLocationInDB = ref(database, `shoppingList/${itemID}`)
        remove(itemLocationInDB)
    })
    
    shoppingItemEl.append(newEl)
    
}