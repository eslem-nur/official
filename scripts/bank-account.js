
class BankAccount {
    constructor() {
        this.balance = 0;
        this.transactions = [];
    }

    deposit(amount) {
        if (amount <= 0) {
            return "Deposit amount must be greater than zero.";
        }

        this.transactions.push({ type: 'deposit', amount: amount });
        this.balance += amount;

        return `Successfully deposited $${amount}. New balance: $${this.balance}`;
    }

    withdraw(amount) {
        if (amount <= 0 || amount > this.balance) {
            return "Insufficient balance or invalid amount.";
        }

        this.transactions.push({ type: 'withdraw', amount: amount });
        this.balance -= amount;

        return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
    }

    checkBalance() {
        return `Current balance: $${this.balance}`;
    }

    listAllDeposits() {
        const deposits = this.transactions
            .filter(t => t.type === 'deposit')
            .map(t => t.amount);
            
        return `Deposits: ${deposits.join(',')}`;
    }

    listAllWithdrawals() {
        const withdrawals = this.transactions
            .filter(t => t.type === 'withdraw')
            .map(t => t.amount);
            
        return `Withdrawals: ${withdrawals.join(',')}`;
    }
}

const myAccount = new BankAccount();



myAccount.deposit(200); 
myAccount.deposit(150); 
myAccount.withdraw(50);  
myAccount.withdraw(30);  
myAccount.deposit(50);  

    
    function updateBalanceDisplay() {
        document.getElementById('balanceDisplay').textContent = myAccount.checkBalance().match(/\d+/)[0];
        document.getElementById('depositsTotal').textContent = calculateTotal('deposit');
        document.getElementById('withdrawalsTotal').textContent = calculateTotal('withdraw');
    }
    
    function calculateTotal(type) {
        const transactions = myAccount.transactions.filter(t => t.type === type);
        return transactions.reduce((sum, t) => sum + t.amount, 0);
    }
    
    function showMessage(elementId, text, isError) {
        const element = document.getElementById(elementId);
        element.textContent = text;
        element.className = 'message show ' + (isError ? 'error' : 'success');
        setTimeout(() => {
            element.textContent = '';
            element.className = 'message';
        }, 3000);
    }
    
    function handleDeposit() {
        const input = document.getElementById('depositAmount');
        const amount = parseFloat(input.value);
        
        if (isNaN(amount)) {
            showMessage('depositMessage', 'Lütfen geçerli bir sayı girin.', true);
            return;
        }
        
        const result = myAccount.deposit(amount);
        showMessage('depositMessage', result, result.includes('greater than zero'));
        
        if (result.includes('Successfully')) {
            updateBalanceDisplay();
            refreshTransactionList();
        }
        
        input.value = '';
    }
    
    function handleWithdraw() {
        const input = document.getElementById('withdrawAmount');
        const amount = parseFloat(input.value);
        
        if (isNaN(amount)) {
            showMessage('withdrawMessage', 'Lütfen geçerli bir sayı girin.', true);
            return;
        }
        
        const result = myAccount.withdraw(amount);
        showMessage('withdrawMessage', result, result.includes('Insufficient') || result.includes('invalid'));
        
        if (result.includes('Successfully')) {
            updateBalanceDisplay();
            refreshTransactionList();
        }
        
        input.value = '';
    }
    
    function renderTransactions(transactions) {
        const list = document.getElementById('transactionList');
        
        if (transactions.length === 0) {
            list.innerHTML = '<p style="color: var(--text-muted); text-align: center;">İşlem bulunamadı.</p>';
            return;
        }
        
        let html = '';
        transactions.forEach((t, index) => {
            const typeLabel = t.type === 'deposit' ? 'Einzahlung' : 'Auszahlung';
            const icon = t.type === 'deposit' ? 'fa-arrow-down' : 'fa-arrow-up';
            const colorClass = t.type === 'deposit' ? 'deposit' : 'withdraw';
            html += `
                <div class="transaction-item">
                    <span class="transaction-type ${colorClass}">
                        <i class="fas ${icon}"></i> ${typeLabel}
                    </span>
                    <span class="transaction-amount">$${t.amount}</span>
                </div>
            `;
        });
        
        list.innerHTML = html;
    }
    
    function refreshTransactionList() {
        renderTransactions(myAccount.transactions);
    }
    
    function showAllTransactions() {
        setActiveTab('allTab');
        renderTransactions(myAccount.transactions);
    }
    
    function showDeposits() {
        setActiveTab('depositsTab');
        renderTransactions(myAccount.transactions.filter(t => t.type === 'deposit'));
    }
    
    function showWithdrawals() {
        setActiveTab('withdrawalsTab');
        renderTransactions(myAccount.transactions.filter(t => t.type === 'withdraw'));
    }
    
    function setActiveTab(tabId) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    }
    
    function loadTestData() {
        resetAccount();
        myAccount.deposit(200);
        myAccount.deposit(150);
        myAccount.withdraw(50);
        myAccount.withdraw(30);
        myAccount.deposit(50);
        
        updateBalanceDisplay();
        showAllTransactions();
        alert('Test verileri yüklendi: Bakiye $320');
    }
    
    function resetAccount() {
        Object.assign(myAccount, new BankAccount());
        updateBalanceDisplay();
        showAllTransactions();
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        updateBalanceDisplay();
    });
