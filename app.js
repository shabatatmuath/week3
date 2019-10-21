function Bus(title, src) {
    this.title = title;
    this.src = src;
    this.voteCtr = 0;
    this.shownCtr = 0;
    Bus.all.push(this);
  }
  
  Bus.roundCtr = 0;
  Bus.roundLimit = 25;
  
  Bus.all = [];
  
  Bus.container = document.getElementById('bus-container');
  Bus.leftImage = document.getElementById('left-bus-image');
  Bus.middleImage = document.getElementById('middle-bus-image');
  Bus.rightImage = document.getElementById('right-bus-image');
  
  Bus.leftTitle = document.getElementById('left-bus-title');
  Bus.middleTitle = document.getElementById('middle-bus-title');
  Bus.rightTitle = document.getElementById('right-bus-title');

  
  Bus.leftObject = null;
  Bus.middleObject = null;
  Bus.rightObject = null;
  
  new Bus('Bag', 'images/bag.jpg');
  new Bus('Banana', 'images/banana.jpg');
  new Bus('Bathroom', 'images/bathroom.jpg');
  new Bus('Boots', 'images/boots.jpg');
  new Bus('Breakfast', 'images/breakfast.jpg');
  new Bus('Bubblegum', 'images/bubblegum.jpg');
  new Bus('Chair', 'images/chair.jpg');
  new Bus('Cthulhu', 'images/cthulhu.jpg');
  new Bus('Dog-duck', 'images/dog-duck.jpg');
  new Bus('Dragon', 'images/dragon.jpg');
  new Bus('Pen', 'images/pen.jpg');
  new Bus('Pet-sweep', 'images/pet-sweep.jpg');
  new Bus('Scissors', 'images/scissors.jpg');
  new Bus('Shark', 'images/shark.jpg');
  new Bus('Sweep', 'images/sweep.jpg');
  new Bus('Tauntaun', 'images/tauntaun.jpg');
  new Bus('Unicorn', 'images/unicorn.jpg');
  new Bus('Usb', 'images/usb.jpg');
  new Bus('Water-can', 'images/water-can.jpg');
  new Bus('Wine-glass', 'images/wine-glass.jpg');
  function renderNewBuses() {
  
    var forbidden = [Bus.leftObject, Bus.middleObject, Bus.rightObject ];
  
    do {
  
      Bus.leftObject = getRandomBus();
  
    } while (forbidden.includes(Bus.leftObject))
  
    forbidden.push(Bus.leftObject);
  

    do {
  
      Bus.middleObject = getRandomBus();
  
    } while (forbidden.includes(Bus.middleObject))
  
    forbidden.push(Bus.middleObject);
    do {
  
      Bus.rightObject = getRandomBus();

  
    } while(forbidden.includes(Bus.rightObject));
  
    
    Bus.leftObject.shownCtr++;
    Bus.middleObject.shownCtr++;
    Bus.rightObject.shownCtr++;
  
    var leftBusImageElement = Bus.leftImage;
    var middleBusImageElement = Bus.middleImage;
    var rightBusImageElement = Bus.rightImage;

  
    leftBusImageElement.setAttribute('src', Bus.leftObject.src);
    leftBusImageElement.setAttribute('alt', Bus.leftObject.title);
    middleBusImageElement.setAttribute('src', Bus.middleObject.src);
    middleBusImageElement.setAttribute('alt', Bus.middleObject.title);
    rightBusImageElement.setAttribute('src', Bus.rightObject.src);
    rightBusImageElement.setAttribute('alt', Bus.rightObject.title);
  
    Bus.leftTitle.textContent = Bus.leftObject.title;
    Bus.middleTitle.textContent = Bus.middleObject.title;
    Bus.rightTitle.textContent = Bus.rightObject.title;

  }
  
  function getRandomBus() {
    var index = Math.floor(Math.random() * Bus.all.length);
    return Bus.all[index];
  }
  
  function randomInRange(min, max) {
    var range = max - min + 1; 
    var rand = Math.floor(Math.random() * range) + min
    return rand;
  }
  
  function updateTotals() {
  
    var tableBody = document.getElementById('doc');
  
    tableBody.innerHTML = '';
  
    for (var i = 0; i < Bus.all.length; i++) {
      var bus = Bus.all[i];
      var row = addElement('tr', tableBody);
      addElement('td', row, bus.title);
      addElement('td', row, '' + bus.voteCtr );
      addElement('td', row, '' + bus.shownCtr);
      addElement('td', row, bus.title + '  '+ 'had' +'  '+ bus.voteCtr +'  '+'votes'+'  '+ 'and was shown'+'  ' +  bus.shownCtr +'  '+ 'times');

    }

  }
  
  function addElement(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    if(text) {
      element.textContent = text;
    }
    return element;
  }
  
  function clickHandler(event) {
  
    var clickedId = event.target.id;
    var busClicked;
  
    if(clickedId === 'left-bus-image') {
      busClicked = Bus.leftObject;
    } else if (clickedId === 'middle-bus-image') {
      busClicked = Bus.middleObject;
    }else if (clickedId === 'right-bus-image') {
      busClicked = Bus.rightObject;
    }
     else {
    }
  
    if(busClicked) {
      busClicked.voteCtr++;
      Bus.roundCtr++;
  
      updateTotals();
  
      if(Bus.roundCtr === Bus.roundLimit) {
  
        rendercharts();
         
            
        alert('No more clicking');
  
        Bus.container.removeEventListener('click', clickHandler);
  
      } else {
  
        renderNewBuses();
      }
    }
  }
  function  rendercharts() {
    var BusArray = [];
    var voteArr = [];
    var ShownArr = [];
    for (let i = 0; i < Bus.all.length; i++) {
      var MallInstent = Bus.all[i];
      BusArray.push(MallInstent.title + ' Vote');
      BusArray.push(MallInstent.title + ' Shown');
      voteArr.push(MallInstent.voteCtr);
      ShownArr.push(MallInstent.shownCtr);
    }
    var ctx = document.getElementById('Chart').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck ',
          'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'],
        datasets: [
          {
            label: 'Votes',
            backgroundColor: 'white',
            borderColor: 'black',
            data: voteArr,
          }
          ,
          {
            label: 'Shown',
            backgroundColor: 'black',
            borderColor: 'white',
            data: ShownArr,
          }
        ],
        options: {}
      }
    });
   }
  
 
  Bus.container.addEventListener('click', clickHandler);
    updateTotals();
  renderNewBuses();
