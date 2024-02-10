import React, { useState, useContext, useEffect } from 'react'; 
import Header from '../Header/Header'; 
import { NavLink, useNavigate } from 'react-router-dom'; 
import profileDark from "../../images/profileDark.svg"; 
import CurrentUserContext from "../../contexts/CurrentUserContext"; 
 
function Profile({ onUpdateProfile, signOut }) { 
  const currentUser = useContext(CurrentUserContext); 
  const [name, setName] = useState(currentUser?.name); 
  const [email, setEmail] = useState(currentUser?.email); 
  const [isEditing, setIsEditing] = useState(false); 
  const navigate = useNavigate(); 
 
  const handleInputChange = (event) => { 
    console.log(isEditing);
    const { name, value } = event.target; 
    if (name === "name") { 
      setName(value); 
    } else if (name === "email") { 
      setEmail(value); 
    } 
  }; 
 
  const handleSubmit = (event) => { 
    event.preventDefault(); 
    setIsEditing(true); 

    onUpdateProfile({ email, name }); 
    console.log(isEditing); 
  }; 
 
  useEffect(function () { 
    if (!currentUser) { 
      console.warn('You forgot to log in'); 
      navigate("/signup"); 
    } 
  }, [currentUser, navigate]); 
 
  return (
    <>
      <Header
        backgroundColor="#202020"
        profileSrc={profileDark}
        isLoggedIn={true}
      />
      <main className="profile">
        <h1 className="profile__title">Привет, {name}</h1>
  
        <form className="profile__form" onSubmit={handleSubmit}>
          <span className="profile__input-text">Имя
            <label className="profile__label" htmlFor="name"></label>
            <input
              type="text"
              className="profile__input"
              name="name"
              id="name"
              minLength="2"
              maxLength="40"
              onChange={handleInputChange}
              value={name}
              placeholder="Введите имя"
              readOnly={!isEditing}
            />
          </span>
          <span className="profile__input-text">E-mail
            <label className="profile__label" htmlFor="email"></label>
            <input
              className="profile__input"
              required
              name="email"
              type="email"
              id="email"
              minLength="2"
              maxLength="40"
              onChange={handleInputChange}
              value={email}
              placeholder="Введите email"
              disabled={!isEditing}
            />
          </span>
          {isEditing ? (
            <button type="submit" className="profile__submit" onClick={() => setIsEditing(false)}>Сохранить</button>
          ) : (
            <>
              <button type="button" className="profile__edit" onClick={() => setIsEditing(true)}>Редактировать</button>
              <NavLink to="/" className="profile__link" onClick={signOut}>
                Выйти из аккаунта
              </NavLink>
            </>
          )}
        </form>
      </main>
    </>
  );
  }
  
  export default Profile;
  