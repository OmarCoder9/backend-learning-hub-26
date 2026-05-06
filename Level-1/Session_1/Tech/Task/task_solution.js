/*
    this is a pizza orders management system 
*/


//1 Values & Variables
let studentName = "Omar"
const pizzaFlavor = "pepperoni"

//2 Data Types
let hungerLevel = 10
let isPizzaHot = true
let deliveryAddress = "ElNozha Gesr El Suez"
console.log(typeof hungerLevel);
console.log(typeof isPizzaHot);
console.log(typeof deliveryAddress);

//3 Type Conversion & Coercion
let orderTotal = "85"
let boolean = true
let priceAfterTip = Number(orderTotal) + 15 + (+boolean)
console.log(priceAfterTip); 

//4 Basic Operators
let pizzaCost = 85
let tip = 15
let totalBill = pizzaCost + tip
let minutesOfWaiting = 45 + 15
console.log(minutesOfWaiting % 2 === 0 ? "Even" : "Odd");

//5 Operator Precedence
x = 2 + 3 * 4 - 1 // 13
console.log(x);
y = (2 + 3) * (4 - 1) //15
console.log(y);

//6 If / Else Statements
if(isPizzaHot && hungerLevel > 7){
    console.log("OPEN THE DOOR AND SPRINT");
}else if(hungerLevel >= 5 && hungerLevel <= 7){
    console.log("Walk, you have dignity");
}else{
    console.log("Order sushi next time");
}

//7 Statements & Expressions
let bool = hungerLevel > 5 //this is a boolen expression as it results a boolean and it doesn't do any thing else
if (hungerLevel > 5) { hungerLevel++ } //this is an statment beacause it is actually do something like increamenting the hungerLevel

//8 Strings
console.log(pizzaFlavor.toUpperCase());
console.log(pizzaFlavor.length);
console.log(pizzaFlavor.includes("pepper"));

//9 Template Literals
console.log(`The Student: ${studentName} ordered a ${pizzaFlavor} pizza the total bill: ${totalBill} and it will be ready after ${minutesOfWaiting} minutes`);


//10 Intro to Arrays & Objects
const toppings = ["Chicken Ranch", "Smokey Burger", "Sea Ranch"]
const order = {
    customer: studentName,
    flavor: pizzaFlavor,
    isDelivered: false
}
let isPizzaArrived = true
if(isPizzaArrived){
    order.isDelivered = true
}

//11 Functions & Arrow Functions
//this function calculates the total pizza price
function calculateTotal(price, tip) {
    return price + tip

}
const calculateTotalArrow = (price, tip) => price + tip
console.log(calculateTotal(pizzaCost, tip))
console.log(calculateTotalArrow(pizzaCost, tip))

const khaledStops = ["Ahmed", "Sara", "Mona", "Tarek"]
for (let i = 0; i < khaledStops.length; i++) {
    console.log(`Delivering to ${khaledStops[i]}...`);
    if(khaledStops[i] === "Ahmed") break;
}