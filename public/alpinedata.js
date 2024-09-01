document.addEventListener('alpine:init', () => {
  Alpine.data('bootcamp', () => ({
    sentence: '',
    longestWord: '',
    shortestWord: '',
    totalLength: 0,
    bill: '',
    total: 0,
    callPrice: 2.75,
    smsPrice: 0.65,
    result: 0,
    usage: '',
    available: 0,

    gameWord() {
      axios.get('http://localhost:3007/api/wordGame', {
        params: { sentence: this.sentence },
      })
      .then((response) => {
        const json = response.data;
        this.longestWord = json.longestWord;
        this.shortestWord = json.shortestWord;
        this.totalLength = json.totalLength;
        
        setTimeout (() => {
          this.sentence = '';
        this.longestWord = '';
        this.shortestWord = '';
        this,this.totalLength = '';

        }, 3000)
       
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    },

    calculateTotal() {
      axios.post('http://localhost:3007/api/phonebill/total', {
        bill: this.bill,
      })
      .then((response) => {
        this.total = response.data.total;
        
    
        this.bill = '';

        setTimeout (() => {
          this.total = '';
        }, 3000);
      })
      .catch((error) => {
        console.error('Error calculating total:', error);
      });
    },

    setPrice(type, price) {
      axios.post('http://localhost:3007/api/phonebill/price', { type, price })
      .then((response) => {
        alert(response.data.message);
        
       
        if (type === 'call') {
          this.callPrice = price;
        } else if (type === 'sms') {
          this.smsPrice = price;
        }
      })
      .catch((error) => {
        console.error('Error setting price:', error);
      });
    },

    checkAirtime() {
      axios.post('http://localhost:3007/api/enough', {
        usage: this.usage,
        available: this.available,
      })
      .then((response) => {
        this.result = response.data.result;
        
  
        this.usage = '';
        this.available = 0;

        setTimeout (() => {
          this.result = 0;
        }, 3000)
      })
      .catch((error) => {
        console.error('Error checking airtime:', error);
      });
    },

    fetchPrices() {
      axios.get('http://localhost:3007/api/phonebill/prices')
      .then((response) => {
        this.callPrice = response.data.call;
        this.smsPrice = response.data.sms;
      })
      .catch((error) => {
        console.error('Error fetching prices:', error);
      });
    },
  }));
});
