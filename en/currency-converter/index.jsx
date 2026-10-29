const { useState, useMemo } = React;

export function CurrencyConverter() {
  const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 156.7
  };

  // State für Eingabe und Währungen
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  
  const baseValue = useMemo(() => {
    if (!amount) return 0;
    // Umrechnung in USD als Zwischenwert: Betrag / Kurs der Ausgangswährung
    return amount / rates[fromCurrency];
  }, [amount, fromCurrency]);

  
  const convertedAmount = (baseValue * rates[toCurrency]).toFixed(2);

  return (
    <div id="currency-converter">
      <h2>Currency Converter</h2>
      
      {/* Input für den Betrag */}
      <label htmlFor="amount-input">Amount:</label>
      <input
        id="amount-input"
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
      />

      {/* Select für "From" */}
      <label htmlFor="from-currency">From:</label>
      <select
        id="from-currency"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>

      {/* Select für "To" */}
      <label htmlFor="to-currency">To:</label>
      <select
        id="to-currency"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>

      {/* Anzeige des Ergebnisses (Format: XX.XX CCC) */}
      <p id="result">
        {convertedAmount} {toCurrency}
      </p>
    </div>
  );
}