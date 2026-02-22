const derivWS = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');

// 14 Volatility Indices to monitor
const symbols = ['R_10', 'R_25', 'R_50', 'R_75', 'R_100', '1HZ10V', '1HZ25V', '1HZ50V', '1HZ75V', '1HZ100V', 'R_150', 'R_200', 'R_250', '1HZ200V'];

derivWS.onopen = () => {
    symbols.forEach(s => {
        derivWS.send(JSON.stringify({ ticks: s, subscribe: 1 }));
    });
};

derivWS.onmessage = (msg) => {
    const res = JSON.parse(msg.data);
    if (res.msg_type === 'tick') {
        const { symbol, quote } = res.tick;
        updateUI(symbol, quote);
    }
};

function updateUI(symbol, price) {
    const el = document.getElementById(`heat-${symbol}`);
    if (el) {
        el.innerText = `${symbol}: ${price}`;
        // Add momentum coloring logic here
    }
}