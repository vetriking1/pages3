import  { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import './App.css'
const firebaseConfig = {
    apiKey: "AIzaSyAjdq8B3gQygcrL7DLeF41tYj-XGvkEJNU",
    authDomain: "wargers-b122d.firebaseapp.com",
    databaseURL: "https://wargers-b122d-default-rtdb.firebaseio.com",
    projectId: "wargers-b122d",
    storageBucket: "wargers-b122d.appspot.com",
    messagingSenderId: "508499934891",
    appId: "1:508499934891:web:92da7bd69de8552a5681ee",
    measurementId: "G-BVPSZDFF4Y"   
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    dob: '',
  });
  const [active, setActive] = useState(false);
  const [signedUp, setSignedUp] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const { username, email, password, dob } = formData;

    if (username.length > 2 && email.length > 8 && password.length > 5) {
      setActive(!active);
    } else {
      alert('Enter correct values');
    }

    if (active) {
      setSignedUp('Signed up Thanks');
      alert('Signed up');
      await setDoc(doc(db, 'data', username), {
        name: username,
        Email: email,
        Password: password,
        Dob: dob,
      });

      setFormData({
        username: '',
        email: '',
        password: '',
        dob: '',
      });
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Sign-Up</h2>
        <form>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="dob">Date of Birth</label>
            <input
              required
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div id="db">
              <button className="btn bg-primary" type="submit" onClick={handleSubmit}>
                Sign Up
              </button>
            </div>
            <p>{signedUp}</p>
          </div>
        </form>
      </div>
    </div>
  );
}


