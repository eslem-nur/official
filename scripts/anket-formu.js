const poll = new Map();

function addOption(option) {
    if (!option || option.trim() === "") {
        return "Option cannot be empty.";
    }
    
    if (poll.has(option)) {
        return `Option "${option}" already exists.`;
    }
    
    poll.set(option, new Set());
    return `Option "${option}" added to the poll.`;
}

function vote(option, voterId) {
    if (!poll.has(option)) {
        return `Option "${option}" does not exist.`;
    }
    
    const voters = poll.get(option);
    
    if (voters.has(voterId)) {
        return `Voter ${voterId} has already voted for "${option}".`;
    }
    
    voters.add(voterId);
    return `Voter ${voterId} voted for "${option}".`;
}

function displayResults() {
    let resultString = "Poll Results:";
    
    for (let [option, voters] of poll.entries()) {
        resultString += `\n${option}: ${voters.size} votes`;
    }
    
    return resultString;
}

addOption("Turkey");
addOption("Morocco");
addOption("Spain");

vote("Turkey", "traveler1");
vote("Turkey", "traveler2");
vote("Morocco", "traveler3");
    
    
    function handleAddOption() {
        const input = document.getElementById('optionInput');
        const message = document.getElementById('optionMessage');
        const select = document.getElementById('optionSelect');
        
        const result = addOption(input.value);
        message.textContent = result;
        message.className = result.includes('error') || result.includes('already') ? 'message error' : 'message success';
        
        if (result.includes('added')) {
            const option = document.createElement('option');
            option.value = input.value;
            option.textContent = input.value;
            select.appendChild(option);
            input.value = '';
        }
        
        setTimeout(() => message.textContent = '', 3000);
    }
    
    function handleVote() {
        const option = document.getElementById('optionSelect').value;
        const voter = document.getElementById('voterInput').value;
        const message = document.getElementById('voteMessage');
        
        if (!option || !voter) {
            message.textContent = 'Lütfen hem seçenek hem de ID girin.';
            message.className = 'message error';
            setTimeout(() => message.textContent = '', 3000);
            return;
        }
        
        const result = vote(option, voter);
        message.textContent = result;
        message.className = result.includes('already') || result.includes('does not exist') ? 'message error' : 'message success';
        
        if (result.includes('already')) {
            setTimeout(() => message.textContent = '', 3000);
        } else if (result.includes('voted')) {
            updateResultsDisplay();
            setTimeout(() => message.textContent = '', 3000);
        }
    }
    
    function handleResults() {
        const display = document.getElementById('resultsDisplay');
        const raw = displayResults();
        display.innerHTML = '<pre>' + formatResults(raw) + '</pre>';
        updateResultsDisplay();
    }
    
    function formatResults(text) {
        return text.replace(/\n/g, '<br>').replace(/(\w+):/g, '<strong>$1:</strong>');
    }
    
    function updateResultsDisplay() {
        const display = document.getElementById('resultsDisplay');
        const raw = displayResults();
        display.innerHTML = '<pre>' + formatResults(raw) + '</pre>';
    }
    
    function loadTestData() {
        // JS dosyasındaki varsayılan test verilerini yükler
        addOption("Turkey");
        addOption("Morocco");
        addOption("Spain");
        
        vote("Turkey", "traveler1");
        vote("Turkey", "traveler2");
        vote("Morocco", "traveler3");
        
        updateResultsDisplay();
        alert('Test verileri yüklendi: Turkey (2), Morocco (1), Spain (0)');
    }
