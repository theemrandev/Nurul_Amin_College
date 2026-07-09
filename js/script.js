$('.box').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  arrows: true,
  prevArrow: '.Previous',
  nextArrow: '.Next',
});

$('.counter').counterUp({
  delay: 10,
  time: 1000
});


    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
