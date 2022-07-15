import React, { useState } from "react"
import logo from '../../static/frontend/images/AoC-logo.png';
import embers from '../../static/frontend/images/embers1.jpg';
import bkg from '../../static/frontend/images/ashes-bkg.jpg';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (const i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

const Home = () => {
  const [email, setEmail] = useState("");
  const validateEmail = (email)  => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const handleInput = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateEmail(email)) {
      const csrftoken = getCookie('csrftoken');
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
          email
        })
      }
      fetch('/api/sign-up', requestOptions).then((response) => response.json()).then((data) => setEmail(""))
    }
    else {
      alert(`${email} is not valid, please enter a valid email`);
    }
  }


  return (
    <div className="signup-container" style={{
      backgroundImage: `url(${bkg})`,
    }}>
      <section className="landing-container">
        <header>
          <div className="logo">
            <img className="logo-image" src={logo} alt="Builds logo" />
          </div>
        </header>
        
        <div className="cta-text">
          <h1>Sign up for exclusive email updates</h1>
        </div> 
        <form className="signup-form" onSubmit={handleSubmit}>
          <input className="email-field" type="email" email="email" placeholder="e.g. john@gmail.com" value={email} onChange={handleInput} />
          <button className="cta-btn">Submit Email</button>
        </form>
      </section>
      <img className="embers1" src={embers} alt="" />
    </div>
  );
}

export default Home;
