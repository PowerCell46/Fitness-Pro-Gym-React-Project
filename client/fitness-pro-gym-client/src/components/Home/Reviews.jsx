import React, { useState, useEffect } from 'react';
import "./reviews.css";


export function Reviews() {
  const [i, setI] = useState(0);

  const text1_options = [
    "Mark Berry",
    "Anatolii Ivanov",
    "Dimitar Mikov",
    "Evgeni Georgiev"
  ];

  const text2_options = [
    "Great old school gym! Good mixture of machines, free weights, and cardio. Good treadmills. I highly recommend.",
    "Good place to gain muscles! Simple and cheap. They are making good shakes!",
    "Малък, не натоварен, далеч от хората. Има всичко необходимо за вашата тренировка",
    "My favorite gym! Love coming here to train!"
  ];

  const color_options = [
    "linear-gradient(to right bottom, #845ec2, #eb4d9f, #ff695a, #feac00, #a8eb12)",
    "linear-gradient(to right top, #845ec2, #ae4ba4, #c53d80, #cb3d5a, #c34a36)",
    "linear-gradient(to right top, #c34a36, #ce7245, #d7955d, #e0b67e, #ead6a5)",
    "linear-gradient(to right top, #56b78e, #76a55a, #958e2f, #b17020, #c34a36)"
  ];

  const image_options = [
    "https://scontent.fsof9-1.fna.fbcdn.net/v/t39.30808-6/302415935_102109309307178_2676220735095459540_n.jpg?stp=cp6_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=u9jIZioEAtEAX_vM_xj&_nc_ht=scontent.fsof9-1.fna&oh=00_AfDhoDBqloYbstwtot7LCdhjvmqZDsHyFwZAOnGy_xxMMg&oe=6575911E",
    "https://scontent.fsof9-1.fna.fbcdn.net/v/t39.30808-6/407725335_122105138678135294_3510875320762105125_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=CgS8lBFaaEQAX9RYXAZ&_nc_ht=scontent.fsof9-1.fna&oh=00_AfAn5eyS6YHY4vWsHw_WxktjWyd5hVSKeIaIqZ_b6af8fg&oe=65767B7D",
    "https://scontent.fsof9-1.fna.fbcdn.net/v/t39.30808-6/365754432_6558345547537493_3379596218649066959_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=_z-DUR9GL7wAX9guOYj&_nc_ht=scontent.fsof9-1.fna&oh=00_AfCPTRpg7LIerON7czxhGHeEvtmMY0hOooz50kYWsDUv4Q&oe=6575124B",
    "https://scontent.fsof9-1.fna.fbcdn.net/v/t39.30808-6/236847752_4550026548353510_4055035221446588920_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=WQUhyAJpu4UAX_mWJzq&_nc_ht=scontent.fsof9-1.fna&oh=00_AfDdEKPN6E_6SkLsP__3LW4FQq4gb_YAQyswOtgfwVfPnA&oe=657670B3"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setI((prevI) => (prevI + 1) % text1_options.length);
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="home-main">
      <div id="carousel-wrapper" className={i > 0 ? "anim-next" : "anim-previous"} style={{ background: color_options[i] }}>
        <div id="menu">
          <div id="current-option">
            <span id="current-option-text1" data-previous-text="" data-next-text="">
              {text1_options[i]}
            </span>
            <span id="current-option-text2" data-previous-text="" data-next-text="">
              {text2_options[i]}
            </span>
          </div>
        </div>
        <div id="review-image" style={{ backgroundImage: `url(${image_options[i]})` }} />
      </div>
      <h1 id="reviews-h1">Reviews from <br /> our customers</h1>
    </main>
  );
}
