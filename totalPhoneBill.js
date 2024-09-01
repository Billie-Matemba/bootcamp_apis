export function totalPhoneBill(bill){
    const items = bill.split(',');
    let callCount = 0;
    let smsCount = 0;
    for(let i=0; i<items.length; i++) {
      const item = items[i].trim();
      if (item.includes('call')) {
          callCount++;
      }
      if (item.includes('sms')) {
          smsCount++;
      }
    }
    const total = ((callCount*2.75) +(smsCount*0.65));
    return 'R'+ total.toFixed(2);
  }
  