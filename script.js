const movieSelected = document.getElementById('movie');
const seatsSelected = document.getElementById('seatsSelected');
const totalPrice = document.getElementById('totalPrice');
const container = document.querySelector('.container');
const allSeats = document.querySelectorAll('.container .seat');

const safeState = (seats) => {
  const selectedSeats = [...seats].map((seat) => {
    return [...allSeats].indexOf(seat);
  });
  localStorage.setItem('seats', JSON.stringify(selectedSeats));
};

const updatePrice = () => {
  const selectedSeats = document.querySelectorAll(
    '.container .seat.selected:not(.occupied)'
  );

  const selectedSeatsCount = selectedSeats.length;

  totalPrice.innerText = selectedSeatsCount * +movieSelected.value;
  seatsSelected.innerText = selectedSeatsCount;

  safeState(selectedSeats);
};

const setSavedData = () => {
  const savedMovie = localStorage.getItem('movieSelected');
  const savedSeats = JSON.parse(localStorage.getItem('seats'));

  if (savedMovie !== null) {
    movieSelected.value = savedMovie;
  }

  if (savedSeats !== null) {
    savedSeats.forEach((seat) => {
      allSeats[seat].classList.add('selected');
    });
  }

  updatePrice();
};

const selectSeat = (seat) => {
  seat.classList.toggle('selected');
  updatePrice();
};

movieSelected.addEventListener('change', () => {
  localStorage.setItem('movieSelected', movieSelected.value);
  updatePrice();
});

container.addEventListener('click', (e) => {
  e.preventDefault();
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    selectSeat(e.target);
  }
});

setSavedData();
