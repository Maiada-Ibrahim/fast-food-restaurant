"use strict";

let formEL = document.getElementById('myform')
let selectEL = document.getElementById('myselect')
formEL.addEventListener('submit', fun)
let tableEL = document.getElementById('mytable')
let tbodyEL = document.getElementById('tbody')
let mainEL = document.getElementById('main')
tableEL.appendChild(tbodyEL)
let orderarray = []

let username
let foodtype
let order1
function fun(event) {

    event.preventDefault();
    username = event.target.username.value
    foodtype = event.target.myselect.value
    console.log(username)
    console.log(foodtype)
  
  
    let foodimage = new Image(100, 200);

    if (foodtype == 'shawrma') {
        foodimage.src = 'img/shawerma.png';

        let price = randomprice(1.20, 3.50)
        console.log(price)
        let order1 = new Order(username, foodtype, foodimage, price);



    } else if (foodtype == 'burger') {
        foodimage.src = 'img/burger.jpg';
        let price = randomprice(2.50, 6.50)
        let order1 = new Order(username, foodtype, foodimage, price);


    } else {
        foodimage.src = 'img/pizza.png';

        let price = randomprice(3.5, 11)

        order1 = new Order(username, foodtype, foodimage, price);
        

    }
      let rowscount = tableEL.rows.length
    for(let i=1 ;i<rowscount;i++){
        tableEL.deleteRow(1);     //لانه في صف للعنوان
    }
    
    readlocal()
    
}



function randomprice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}



function Order(username, foodtype, foodimage, price) {
    this.username = username;
    this.foodtype = foodtype;
    this.foodimage = foodimage;
    this.price = price;
    orderarray.push(this)
    localStorage.setItem("orderobject", JSON.stringify(orderarray));
}

console.log(orderarray)






function rendertbody() {
    for (let i = 0; i < orderarray.length; i++) {

        let trEL = document.createElement('tr')

        let tddetalsEL = document.createElement('td')
        tddetalsEL.textContent = `${orderarray[i].username}  ${orderarray[i].foodtype}` + `${orderarray[i].price}`

        // let tdfoodimageEL = document.createElement('td')
        // let divel = document.createElement('div')
        // divel.appendChild(orderarray[i].foodimage)
        // tdfoodimageEL.appendChild(divel)


    //    trEL.appendChild(tdfoodimageEL)
        trEL.appendChild(tddetalsEL)
        tbodyEL.appendChild(trEL)




    }


}

function readlocal() {
    let storedArray = localStorage.getItem("orderobject");
    let ourArray = JSON.parse(storedArray);

    console.log(ourArray)
    if (ourArray !== null) {

        orderarray = ourArray
        console.log(orderarray)

        //  let order1 = new Order(orderarray[i].username, orderarray[i].foodtype, orderarray[i].foodimage, orderarray[i].price);
        rendertbody()



    } else {
        
     }

}


















