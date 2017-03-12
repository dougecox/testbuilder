// Given a credit card number, this function should return a string with the 
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

    var CreditCards = function(name, prefixs, lengths) {
        this.name = name;
        this.prefixs = prefixs; // OBJ passed in 
        this.lengths = lengths;
        // checks card parameters to evaluate name
        this.check = function(value) {
          //console.log(this.prefixs);
          function prefixObjChecker(value, pre) {
            var obj = prefixs;
            for ( var prop in obj ) {
              if ( obj.hasOwnProperty(prop) ) {
                  //console.log( "prop: " + obj[prop].includes(value.slice(0,obj[prop]) ));
                  var prefixNumberValue = value.slice(0,obj[prop]);
                  if ( obj[prop].includes(value.slice(0,prop)) ) {
                    return true;
                  }
                }
              }
            return false;
            
          }
          //console.log(prefixLength + "  === " + value.length);
          //var cardPrefix = value.slice(0, prefixLength);
          if ( (this.lengths.includes(value.length) ) && ( prefixObjChecker(value,this.prefixs) ) ) { return this.name; }
          //else { return false; }
        };
      };

  
//  var dinerClub = new CreditCards("Diner's Club", );
    var maestroLength = function() {
      var array = [];
        for ( i = 12 ; i <= 19 ; i = i + 1) {
          array.push(i);
        }
      return array.slice();
    }();

    var discoverPrefixs = function() {
      var array = []; 
      array.push('6011');
      for (var i = 644; i <= 649; i++) {
        var string = i.toString();
        array.push(string);
      }
      array.push('65');
      return array;
    }();


    var prefixToObj = function(prefixes) {
        var a = prefixes;
        var obj = {};
        for(var i = 0; i < a.length; i = i+1) { 
          // check to see if length is key else make array
          var keyLength = a[i].length;
          if ( !obj.hasOwnProperty(keyLength) ) { obj[keyLength] = []; }
          obj[keyLength].push(a[i]);
          //console.log(obj);
        }
        return obj;
    };
    // return T/F :: cardNumber check card prefixes
    
    var chinaPrefixes = (function() {
      var array = [];
      return array.concat(arrayRangeFinder(622126, 622925)).concat(arrayRangeFinder(624, 626)).concat(arrayRangeFinder(6282, 6288));
})();

function arrayRangeFinder(start, end) {
      var tempArray = [];
      for (var i = start; i <= end; i++) {
        var tempString = i.toString();
        tempArray.push(tempString);
      }
      return tempArray;
    }

/*
China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.
*/

  // cardObject ( name, prefixes, cardLength)

  var dinerClub = new CreditCards("Diner's Club", prefixToObj(['39', '38']), [14]);
  var americanExpress = new CreditCards("American Express", prefixToObj(['37', '34']), [15]);
  var visa = new CreditCards("Visa", prefixToObj(['4']), [13, 16, 19] );
  var masterCard = new CreditCards("MasterCard", prefixToObj(['51', '52', '53', '54', '55']), [16]);
  var maestro = new CreditCards("Maestro", prefixToObj(['5018', '5020', '5038', '6304']), maestroLength);
  var discover = new CreditCards("Discover", prefixToObj(discoverPrefixs), [16, 19]);
  var chinaUnionPay = new CreditCards("China UnionPay", prefixToObj(chinaPrefixes), [16, 17, 18, 19]);
  var switchCard = new CreditCards("Switch", prefixToObj(['4903', '4905', '4911', '4936', '564182', '633110', '6333', '6759']), [16, 18, 19] );
  // update discover to check different prefixs length
  var companyList = [ dinerClub, maestro, americanExpress, visa, masterCard, discover, chinaUnionPay, switchCard];
  
  // adding function to check if there's a conflict, if so return switchCard as it has a bigger prefix in all cases of 4+..
  var visaSwitch = function(ccnumber) {
    if ( visa.check(ccnumber) && switchCard.check(ccnumber) ) {
      if ( ['4903', '4905', '4911', '4936'].includes(ccnumber.slice(0,4)) ) {
        return switchCard.name;
      }
      else { return visa.name;}
    }
    return false;
  };

  var cardCompany = function(number) {
    if ( visaSwitch(number) ) { return visaSwitch; }

    for (var company in companyList) {
      var valid = companyList[company].check( number); 
      if ( valid !== undefined ) { return valid; }
    }
    return false;
  };

    return cardCompany(cardNumber);
  };
