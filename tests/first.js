
name = {firstName: "Preethi", lastName: "Nandagopal"};

console.log(name.firstName + ' '+name.lastName)

//display array of names with first name and last name
let names = [
    {firstName: "Preethi", lastName: "Nandagopal"},
    {firstName: "John", lastName: "Doe"},
    {firstName: "Jane", lastName: "Smith"}
];

names.forEach(name => {
    console.log(`First Name: ${name.firstName}, Last Name: ${name.lastName}`);
});


let sum =0
numbers = [1,2,3,4,5]

for(i=0;i< numbers.length;i++){
    sum += numbers[i];
}
console.log(sum);

  var age = 25;
if (sum>10) {
    console.log(age); // 25
}

console.log(age); // ReferenceError


if (true) {
    var message = "Hello";
}

console.log(message); // "Hello"


function test() {
    var x = 10;
    console.log(x); // 10
}

test();

console.log(x); // ReferenceError




const orders = [
    { id: 101, customerId: "C1", amount: 500, status: "success" },
    { id: 102, customerId: "C2", amount: 200, status: "failed" },
    { id: 103, customerId: "C1", amount: 300, status: "success" }
];

// Array: hold all orders
const successfulOrders = orders.filter(
    order => order.status === "success"
);

// Number: calculate total
const total = successfulOrders.reduce(
    (sum, order) => sum + order.amount,
    0
);

// Set: unique customer IDs
const customerIds = new Set(
    orders.map(order => order.customerId)
);

// Map: look up orders by ID
const ordersById = new Map(
    orders.map(order => [order.id, order])
);

console.log(total);                 // 800
console.log(customerIds.size);      // 2
console.log(ordersById.get(102));   // Failed order object

3. The for...in loop
Use for...in to iterate over an object's enumerable property keys.?

fruits.forEach(fruit => {
    console.log(fruit);
});

fruits.forEach((fruit, index) => {
    console.log(index, fruit);
});


const user = {
    name: "Preethi",
    age: 30,

    greet: function () {
        console.log("Hello!");
    }

    //const user = {
    //greet: () => "Hello!"
//};
};

console.log(user.name); // Preethi
user.greet();           // Hello!


const bankAccount = {
    owner: "Preethi",
    balance: 1000,

    deposit(amount) {
        this.balance += amount;
    },

    getBalance() {
        return this.balance;
    }
};

bankAccount.deposit(500);

console.log(bankAccount.getBalance()); // 1500

//learn symmbols in js
//for loops - for...in, for...of, forEach
