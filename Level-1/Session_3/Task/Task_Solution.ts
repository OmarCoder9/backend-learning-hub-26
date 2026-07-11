//Task 1

function cookRice() {
  console.log("Rice starting...");
  for (let i = 0; i < 3000000; i++) {}
  console.log("Rice done!");
}

function cookRiceAsync() {
  console.log("Rice starting...");
  setTimeout(() => console.log("Rice done!"), 0);
}

cookRice();
console.log("Am Farouk yells at the next customer");
cookRiceAsync();
console.log("Am Farouk yells at the next customer");

/* The Output:
Rice starting...
Rice done!
Am Farouk yells at the next customer
Rice starting...
Am Farouk yells at the next customer
Rice done!
*/
/*
The for loop in the cookRice function is synchronus so it blocked the code after it until it finshes 
the setTimeout in the cookRiceAsync function is Asynchronus so it didn't block the statments after it so the statments ran first before the setTimeout
*/

//Task 2

function orderRice(cb:(msg:string)=>void){
    console.log("Calling the rice supplier...");
    setTimeout(()=>{cb("Rice delivered!")}, 1000)
}
orderRice((msg)=>{
    console.log(msg);
})
console.log("Am Farouk keeps serving customers while waiting");

/*
Calling the rice supplier...
Am Farouk keeps serving customers while waiting
Rice delivered!
*/

//Task 3
const koshariOrder = new Promise((res, rej)=>{
    setTimeout(()=>{
        res("Order ready! 🍝")
    }, 2000)
}).then((data)=>{
    console.log(data);
}).catch((err) => console.log(err))

const sauseOrder = new Promise((res, rej)=>{
    rej("We're out of da2a!")
}).catch((err)=>{
    console.log("The rejected error", err);
    
})

//Task 4
function getRice():Promise<string>{
    return new Promise((res) => {
        setTimeout(() => {
            res("Rice ready");
        }, 1000);
    })
}
function getChickpeas(rice:string):Promise<string> {
  return new Promise((res) => {
    setTimeout(() => {
      res("Chickpeas ready, rice was: " + rice);
    }, 1000);
  });
}
function getSauce(chickpeas:string):Promise<string> {
  return new Promise((res) => {
    setTimeout(() => {
      res("Sauce added, previous: " + chickpeas);
    }, 1000);
  });
}
getRice()
    .then((rice) => getChickpeas(rice))
    .then((chickpeas) => getSauce(chickpeas ))
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

//Task 5
async function makeKoshari(){
    try{
        const rice = await getRice()
        const chickpeas = await getChickpeas(rice)
        const Sauce = await getSauce(chickpeas)
        console.log(Sauce);
        
    }catch(err){
        console.log(err);
        
    }
}
makeKoshari()