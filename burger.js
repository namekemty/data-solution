import { gsap } from "gsap";



const balls = document.getElementById('idBalls');
const leftBall = document.getElementById('leftBall');
const middleBall = document.getElementById('middleBall');
const rightBall = document.getElementById('rightBall');


balls.addEventListener('mouseenter', () => {
  gsap.to(middleBall, { duration: 0.2, width: '20px', height: '20px' });
  gsap.to(leftBall, { duration: 0.2, transform: 'translate(25px, 0)', width: '5px' });
  gsap.to(rightBall, { duration: 0.2, transform: 'translate(-20px, 0)', width: '5px' });
});

balls.addEventListener('mouseleave', () => {
  gsap.to(middleBall, { duration: 0.2, width: '10px' });
  gsap.to(leftBall, { duration: 0.2, transform: 'translate(0px, 0)', width: '10px' });
  gsap.to(rightBall, { duration: 0.2, transform: 'translate(0px, 0)', width: '10px' });
});
