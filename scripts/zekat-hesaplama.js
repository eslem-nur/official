        
    function calculateZakat() {
        // Girdi değerlerini al
        const goldPrice = parseFloat(document.getElementById('goldPrice').value) || 0;
        const goldGram = parseFloat(document.getElementById('gold').value) || 0;
        const silverGram = parseFloat(document.getElementById('silver').value) || 0;
        const cash = parseFloat(document.getElementById('cash').value) || 0;
        const trade = parseFloat(document.getElementById('trade').value) || 0;
        const debts = parseFloat(document.getElementById('debts').value) || 0;

        // Gümüş gram fiyatını altından yaklaşık olarak türetelim (veya sabit tutalım - örnek olarak altının 1/70'i kabul edilir ama basitlik için gümüş için sabit/tahmini oran veya ayrı alan eklenebilir. Standart nisap için altın esas alınır.)
        // Diyanet standartlarına göre Nisap sınırı 80.18 gram altındır.
        const nisapLimit = 80.18 * goldPrice;

        // Varlıkların TL karşılığı
        // Not: Gümüşün gram fiyatı için pratik olarak altının yaklaşık %1-1.5'i baz alınır ya da kullanıcı sadece altın üzerinden nisap takibi yapar. Burada gümüş için ortalama bir orantılama veya direkt altın fiyatına endeksli pratik hesaplama yapılabilir. Gümüş için 1gr gümüş = altın fiyatı / 70 varsayalım:
        const silverPrice = goldPrice > 0 ? goldPrice / 70 : 0;

        const totalGoldValue = goldGram * goldPrice;
        const totalSilverValue = silverGram * silverPrice;
        
        const totalAssets = totalGoldValue + totalSilverValue + cash + trade;
        const netWealth = totalAssets - debts;

        let zakatAmount = 0;
        const statusBadge = document.getElementById('statusBadge');
        const resultBox = document.getElementById('resultBox');

        resultBox.style.display = 'block';

        document.getElementById('resTotalAssets').innerText = totalAssets.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' TL';
        document.getElementById('resTotalDebts').innerText = debts.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' TL';
        document.getElementById('resNetWealth').innerText = netWealth.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' TL';
        document.getElementById('resNisapLimit').innerText = nisapLimit.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' TL';

        // Nisap kontrolü (Net varlık nisap miktarından büyük veya eşit mi?)
        if (netWealth >= nisapLimit) {
            zakatAmount = netWealth * 0.025; // %2.5 (1/40)
            statusBadge.className = 'status-badge status-eligible';
            statusBadge.innerText = 'Elhamdulillah, malınız nisap miktarını ulaştığı için zekat vermeniz farzdır.';
        } else {
            zakatAmount = 0;
            statusBadge.className = 'status-badge status-not-eligible';
            statusBadge.innerText = 'Malınız nisap miktarının altında olduğu için zekat farz değildir (İsteyen sadaka verebilir).';
        }

        document.getElementById('resZakatAmount').innerText = zakatAmount.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' TL';
    }
