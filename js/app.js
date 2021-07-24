"use strict";

let formEL = document.getElementById('myform')
//let selectEL = document.getElementById('myselect')
formEL.addEventListener('submit', funsubmit)
let tableEL = document.getElementById('mytable')
let tbodyEL = document.getElementById('tbody')
tableEL.appendChild(tbodyEL)
let orderarray = []

let username
let foodtype
let foodimage
let price
let chesese
let cheesecheckbox = document.getElementById('cheese')
let pepsicheckboxE = document.getElementById('pepsi')

let pepsiorpotato
function funsubmit(event) {

    event.preventDefault();
    username = event.target.username.value
    foodtype = event.target.myselect.value
    // let checkcheeseEL=event.target.cheese.value


    if (foodtype == 'shawrma') {
        foodimage = 'img/shawerma.png';

        if (cheesecheckbox.checked == true) { chesese = 'with extra cheese' } else { chesese = 'no extra chesese' }
        if (pepsicheckboxE.checked == true) { pepsiorpotato = 'with pepsi' } else { pepsiorpotato = 'with potato' }
        price = randomprice(1.20, 3.50) + 'JD'
        let order1 = new Order(username, foodtype, foodimage, chesese, pepsiorpotato, price);



    } else if (foodtype == 'burger') {
        foodimage = 'img/burger.jpg';

        if (cheesecheckbox.checked == true) { chesese = 'with extra cheese' } else { chesese = 'no extra chesese' }


        price = randomprice(2.50, 6.50) + 'JD'
        let order1 = new Order(username, foodtype, foodimage, chesese, price);


    } else {
        foodimage = 'img/pizza.png';
        if (cheesecheckbox.checked == true) { chesese = 'with extra cheese' } else { chesese = 'no extra chesese' }
        price = randomprice(3.5, 11) + 'JD'
        let order1 = new Order(username, foodtype, foodimage, chesese, price);


    }

    // let rowscount = tableEL.rows.length
    // for (let i = 1; i < rowscount; i++) {
    //     tableEL.deleteRow(1);    
    // }
    let rowCount = tableEL.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        tableEL.deleteRow(i);
    }
    readlocal()

}



function randomprice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}



function Order(username, foodtype, foodimage, chesese, pepsiorpotato, price) {
    this.username = username;
    this.foodtype = foodtype;
    this.foodimage = foodimage;
    this.chesese = chesese;
    this.price = price;
    this.pepsiorpotato = pepsiorpotato;
    orderarray.push(this)
    localStorage.setItem("orderobject", JSON.stringify(orderarray));
}

console.log(orderarray)






function rendertbody() {
    for (let i = 0; i < orderarray.length; i++) {

        let trEL = document.createElement('tr')

        let tddetalsEL = document.createElement('td')
        tddetalsEL.setAttribute('style', 'white-space: pre;');
        tddetalsEL.textContent = `${orderarray[i].username} \r\n ${orderarray[i].foodtype}\r\n` + `${orderarray[i].price}\r\n` + `${orderarray[i].chesese}\r\n` + `${orderarray[i].pepsiorpotato}`


        let foodimageEL = new Image(100, 200);
        foodimageEL.src = orderarray[i].foodimage
        let tdfoodimageEL = document.createElement('td')
        let divel = document.createElement('div')
        divel.appendChild(foodimageEL)
        tdfoodimageEL.appendChild(divel)

        let removeEL = document.createElement('td')
        let removebtnEL = document.createElement('button')
        removebtnEL.textContent = 'remove'
        removebtnEL.style.width = "60px"
        removebtnEL.style.height = '20px'
        removebtnEL.id = `${i}`
        removeEL.appendChild(removebtnEL)
        removebtnEL.addEventListener('click', removefun)


        trEL.appendChild(tdfoodimageEL)
        trEL.appendChild(tddetalsEL)
        trEL.appendChild(removeEL)
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


function removefun(event) {
    event.preventDefault();
    let rowid = event.target.id
    console.log(rowid)
    for (let i = 0; i < orderarray.length; i++) {
        if (i == rowid) {
            orderarray.splice(i, 1)
        }

    }
    localStorage.setItem("orderobject", JSON.stringify(orderarray));
    let rowCount = tableEL.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        tableEL.deleteRow(i);
    }
    readlocal()

}















