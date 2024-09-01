 export function enoughAirtime(projectedUsage, airtime){
    const dataRate = 12;
    const callRate = 1.88;
    const smsRate = 0.75;
    var splitProjectedUsage = projectedUsage.split(',');
      var sum = 0;
      for (let i = 0; i < splitProjectedUsage.length; i++) {
          var newProjectedUsage = splitProjectedUsage[i].trim();
          if (newProjectedUsage === 'data') {
              sum += dataRate;
          } else if (newProjectedUsage === 'call') {
              sum += callRate;
          } else if (newProjectedUsage === 'sms') {
              sum += smsRate;
          }
      }
      var remainingAirtime = airtime - sum;
      var finalResult = 'R' + remainingAirtime.toFixed(2);
      if (remainingAirtime < 0) {
          return 'R0.00';
      }return finalResult;
  }
  
  