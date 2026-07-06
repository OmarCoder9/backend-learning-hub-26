//Part 0
//1. The Actual Printed Value is NaN because the price is a string that cannot be parsed into a number 
//2. because order has no attribute called shippingAddress
//3. Wrong total and program crash

//Part 1
function calculateOrderTotal(items :{price:number, qty:number}[], discount:number):number {
  let total = 0;
  for (const item of items) {
    total += item.price * item.qty;
  }
  return total - discount;
}

//by the frontend team
const order = {
  customer: "Layla",
  items: [
    { price: "250 EGP", qty: 2 },    
    { price: 100, qty: 1 },
  ],
};

console.log(calculateOrderTotal(order.items, "50")); 
console.log(order.shippingAddress.city); 
// the argument accepts a number and you sent a string to it so it won't compile

//Part 2
type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";
function canCancelOrder(status:OrderStatus):boolean{
    return status === "pending" || status === "shipped";
}
canCancelOrder("refunded")
//it will take a lot of hours to figure out that you miss typed the word "delivered"

//Part 3.A
type WarehouseBin = [aisle: number, shelf: number];
const binForOrder: WarehouseBin = [4, 12];
const badBin: WarehouseBin = [4, 12, "extra"]
// this is an error because you made a tuple and the tuple is immutable so you can't change or add or remove any element from it

//Part 3.B
class Repository<T extends { id: string }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}
interface Product { id: string; name: string; price: number }
const productRepo = new Repository<Product>()
productRepo.add({id:"2024", name:"Phone", price:20000})
productRepo.add({id:"2026", name:"Laptop", price:2000000000000})
productRepo.findById("2026")
interface Customer {id:string; name:string};
const customerRepo = new Repository<Customer>
//this generic type doesn't depend on the data type you write when write the class instead it depends on the data type you write when you declare an instace from that Class 
//it will raise an error if the id is missing 

//Part 4
interface Product {
  id: string;
  name: string;
  price: number;
  costPrice: number; // internal, never shown to customers
}

interface OrderItem {
  product: Product;
  qty: number;
}

interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  status: OrderStatus;        // reuse Part 2's type
  shippedAt?: string;         // optional — only exists once shipped
  readonly createdAt: string; // set once, never changes
}
let o1:Order = {
    id:"222",
    customer:"Omar",
    items: [{product:{id:"123",name:"phone", price:20000, costPrice:15000}, qty:1},{product:{id:"126",name:"laptop", price:50000, costPrice:35000}, qty:2}],
    status:"pending",
    createdAt:"15-Mars-2026"
} 
function shipOrder(o:Order):Order{
    return {...o, status:"shipped", shippedAt:new Date().toISOString()}
}
const shippedOrder = shipOrder(o1)

//if you tried to modify the created at it will not compile because it is a readonly attribute


function calculateOrderTotal1(items :Order["items"]):number {
  let total = 0;
  for (const item of items) {
    total += item.product.price * item.qty;
  }
  return total;
}


//Part 5

// Customer-facing product (without costPrice)
type PublicProduct = Omit<Product, "costPrice">;

// Input when creating a product (DB generates the id)
type CreateProductInput = Omit<Product, "id">;

// Any subset of Product fields can be updated
type UpdateProductInput = Partial<Product>;

// Product lookup table
type ProductCatalog = Record<string, Product>;

function toPublicProduct(product: Product): PublicProduct {
    const { costPrice, ...publicProduct } = product;
    return publicProduct;
}

let productCounter = 1;

function createProduct(input: CreateProductInput): Product {
    return {
        id: `p${productCounter++}`,
        ...input,
    };
}


function updateProduct(
    product: Product,
    changes: UpdateProductInput
): Product {
    return {
        ...product,
        ...changes,
    };
}


const keyboard = createProduct({
    name: "Mechanical Keyboard",
    price: 1200,
    costPrice: 800,
});

const monitor = createProduct({
    name: "24-inch Monitor",
    price: 3500,
    costPrice: 2600,
});


const publicKeyboard = toPublicProduct(keyboard);

console.log("Public Product:");
console.log(publicKeyboard);

// Output:
// {
//   id: 'p1',
//   name: 'Mechanical Keyboard',
//   price: 1200
// }


const updatedKeyboard = updateProduct(keyboard, {
    price: 1100,
});

console.log("Updated Product:");
console.log(updatedKeyboard);


const catalog: ProductCatalog = {
    [keyboard.id]: keyboard,
    [monitor.id]: monitor,
};


const foundProduct = catalog[keyboard.id];

console.log("Found Product:");
console.log(foundProduct);

/*
in old JS we will make some copies of the same object so if you adjusted one it won't adjust the others
this won't happen again because the interface and it's utils in typescript
*/

//Part 6
/*
For a small team like CodeMart I would choose colocated types because keeping types next to the functions and classes that use them makes the code easier to understand and maintain.
For a large organization I would prefer a centralized types.ts (or a dedicated types folder) so everyone can reuse the same domain models consistently.
Centralizing shared types reduces duplication and makes it easier to keep interfaces consistent,
while colocated types help avoid unnecessary complexity and merge conflicts in smaller projects.
*/

//Part 7
function getExternalWarehouseData() {
  return { id: "w-99", name: "Desk Lamp", price: 150, costPrice: 60, extra: "ignored" };
}

function receiveFromWarehouse(product: Product): void {
    console.log(product.name);
}
receiveFromWarehouse(getExternalWarehouseData())
//ts only cares that all attribute in product exists in the object returned from getExternalWarehouseData() with the same data types if there is more it is simply ignores it

receiveFromWarehouse({ id: "w-1", name: "Chair", price: 90, costPrice: 40, extra: "oops" })
/*
TypeScript performs an excess property check on fresh object literals.
This helps catch mistakes such as misspelled property names or accidental
extra fields before the code runs. Variables and returned objects are not
checked as strictly because they may legitimately contain additional
information from external systems.
*/

//Final Boss

type Result<T> =
    | { success: true; data: T }
    | { success: false; error: string };


    function placeOrder(
    customer: string,
    items: OrderItem[]
): Result<Order> {


    if (items.length === 0) {
        return {
            success: false,
            error: "Order must contain at least one item",
        };
    }

    const total = calculateOrderTotal1(items);

    if (total <= 0) {
        return {
            success: false,
            error: "Order total must be greater than zero",
        };
    }

    const order: Order = {
        id: `order-${Date.now()}`,
        customer,
        items,
        status: "pending",
        createdAt: new Date().toISOString(),
    };

    return {
        success: true,
        data: order,
    };
}


const emptyResult = placeOrder("Layla", []);

if (emptyResult.success) {
    console.log("Order ID:", emptyResult.data.id);
} else {
    console.log("Error:", emptyResult.error);
}


const validItems: OrderItem[] = [
    {
        product: keyboard,
        qty: 1,
    },
    {
        product: monitor,
        qty: 2,
    },
];

const orderResult = placeOrder("Omar", validItems);

if (orderResult.success) {
    console.log("Order created successfully!");
    console.log("Order ID:", orderResult.data.id);
    console.log("Customer:", orderResult.data.customer);
    console.log("Status:", orderResult.data.status);
    console.log("Created At:", orderResult.data.createdAt);
    console.log(
        "Total:",
        calculateOrderTotal1(orderResult.data.items)
    );
} else {
    console.log("Error:", orderResult.error);
}