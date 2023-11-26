document.addEventListener('DOMContentLoaded', function() {
  const dayInput = document.getElementById('day');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');

  const label = document.querySelectorAll('label');
  const input = document.querySelectorAll('input');

  const displayYear = document.querySelector('.display-year');
  const displayMonth = document.querySelector('.display-month');
  const displayDay = document.querySelector('.display-day');

  const displayDayError = document.querySelector('.display-day-error');
  const displayMonthError = document.querySelector('.display-month-error');
  const displayYearError = document.querySelector('.display-year-error');
  const displayEmptyError = document.querySelectorAll('.display-empty-error');

  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const day = parseInt(dayInput.value, 10);
    const month = parseInt(monthInput.value, 10);
    const year = parseInt(yearInput.value, 10);
    
    if (dayInput.value.trim() === '' || monthInput.value.trim() === '' || yearInput.value.trim() === '') {
      displayEmptyError.forEach(emptyField => {
        emptyField.textContent = 'This field is required';
        input.forEach(input => {
          input.classList.add('error-input');
        });
        label.forEach(label => {
          label.classList.add('error');
        });  
      });
      return;
    } else {
      displayEmptyError.forEach(emptyField => {
        emptyField.textContent = '';
      });
    }

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      displayDayError.textContent = 'Please enter whole numbers';
      input.forEach(input => {
        input.classList.add('error-input');
      });
      label.forEach(label => {
        label.classList.add('error');
      });
      return;
    } else {
      displayDayError.textContent = '';
    }

    if (day < 1 || day > 31) {
      displayDayError.textContent = 'Must be a valid day';
      input.forEach(input => {
        input.classList.add('error-input');
      });
      label.forEach(label => {
        label.classList.add('error');
      });
    } else {
      displayDayError.textContent = '';
    }

    if (month < 1 || month > 12) {
      displayMonthError.textContent = 'Must be a valid month';
      input.forEach(input => {
        input.classList.add('error-input');
      });
      label.forEach(label => {
        label.classList.add('error');
      });
    } else {
      displayMonthError.textContent = '';
    }

    const currentYear = new Date().getFullYear();
    if (year > currentYear) {
      displayYearError.textContent = 'Must be in the past';
      input.forEach(input => {
        input.classList.add('error-input');
      });
      label.forEach(label => {
        label.classList.add('error');
      });
      return;
    } else {
      displayYearError.textContent = '';
    }

    const dateToCheck = new Date(year, month - 1, day);
    if (
      dateToCheck.getDate() !== day ||
      dateToCheck.getMonth() !== month - 1 ||
      dateToCheck.getFullYear() !== year
    ) {
      displayDayError.textContent = 'Must be a valid date';
      input.forEach(input => {
        input.classList.add('error-input');
      });
      label.forEach(label => {
        label.classList.add('error');
      });
      return;
    } else {
      displayDayError.textContent = '';
    }

    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day);

    let ageInMilliseconds = currentDate - birthDate;
    let ageDate = new Date(ageInMilliseconds);

    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    displayYear.textContent = years;
    displayMonth.textContent = months;
    displayDay.textContent = days;
  });
});