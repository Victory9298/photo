window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#burger').addEventListener('click', function () {
    document.querySelector('#menu').classList.toggle('is-active');
  });

  const burger = document.querySelector('.burger');
  burger.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('burger--active');
  });

});
