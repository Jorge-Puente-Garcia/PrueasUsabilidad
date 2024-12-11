class Memoria {
  constructor() {
    this.elements = [
        {
            "Element": "Alpine","source": "multimedia/imagenes/Alpine_F1_Team_2021_Logop.svg"
        },
        {
            "Element": "Alpine","source": "multimedia/imagenes/Alpine_F1_Team_2021_Logop.svg"
        },
        {
            "Element": "AstonMartin","source": "multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1p.svg"
        },
        {
            "Element": "AstonMartin","source": "multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1p.svg"
        },
        {
            "Element": "McLaren","source": "multimedia/imagenes/McLaren_Racing_logop.svg"
        },
        {
            "Element": "McLaren","source": "multimedia/imagenes/McLaren_Racing_logop.svg"
        },
        {
            "Element": "Mercedes","source": "multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logop.svg"
        },
        {
            "Element": "Mercedes","source": "multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logop.svg"
        },
        {
            "Element": "RedBull","source": "multimedia/imagenes/Red_Bull_Racing_logop.svg"
        },
        {
            "Element": "RedBull","source": "multimedia/imagenes/Red_Bull_Racing_logop.svg"
        },
        {
            "Element": "Ferrari","source": "multimedia/imagenes/Scuderia_Ferrari_Logop.svg"
        },
        {
            "Element": "Ferrari","source": "multimedia/imagenes/Scuderia_Ferrari_Logop.svg"
        }
    ];
    this.resetBoard();
    this.shuffleElements();
    this.addEventListeners();
  }

  shuffleElements() {
    for (let i = this.elements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
    }
  }
  unflipCards() {
    this.lockBoard = true;
    setTimeout(() => {
      this.firstCard.setAttribute('data-state', 'unflip');
      this.secondCard.setAttribute('data-state', 'unflip');
      this.resetBoard();
    }, 1000);
  }
  resetBoard() {
    this.hasFlippedCard = false;
    this.lockBoard =false;
    this.firstCard= null;
    this.secondCard = null;
  }
  checkForMatch() {
    if (this.firstCard.getAttribute('data-element') == this.secondCard.getAttribute('data-element')) {
      this.disableCards();
    } else {
      this.unflipCards();
    }
  }
  disableCards() {
    this.firstCard.setAttribute('data-state', 'revealed');
    this.secondCard.setAttribute('data-state', 'revealed');
    this.resetBoard();
  }

  createElements(){
      var gameBoard = document.querySelector('section');
      for (let i = 0; i < this.elements.length; i++) {
          var card = document.createElement("article");
          var h3= document.createElement("h3");
          h3.innerText = "Tarjeta de memoria";
          var img = document.createElement("img");
          img.src = this.elements[i].source;
          img.alt = this.elements[i].Element;
          card.appendChild(h3);
          card.appendChild(img); 
          card.setAttribute('data-element', this.elements[i].Element);
          var contextoActual = this;
          card.onclick = function () {
            contextoActual.flipCard(this);
          };  

          card.setAttribute('data-state', 'hidden');
          gameBoard.appendChild(card);
    }
  }

  flipCard(card){
    if(card === this.firstCard) return;
    if(this.lockBoard) return;
    if(card.getAttribute('data-state')=='revealed')return;
    card.setAttribute('data-state', 'flip');
    if(this.hasFlippedCard){
      this.secondCard = card;
      this.checkForMatch();
    }else{
      this.firstCard = card;
      this.hasFlippedCard = true;
    }       
  }
  addEventListeners() {
    const cards = document.querySelectorAll('article');
    cards.forEach(card => card.addEventListener('click', this.flipCard.bind(this, card)));
  }
}