class BankAccount {
    balance = 0;

    deposit(amount) {
        balance += amount;
    }

    getBalance() {
        return #balance;
    }
}

const account = new BankAccount();
account.deposit(500);
console.log(account.getBalance()); // 500