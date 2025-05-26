import { useEffect, useState } from "react";
import ProfilePreview from "./ProfilePreview";

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [colour, setColour] = useState("#ffffff");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("profileName") || "");
    setEmail(localStorage.getItem("profileEmail") || "");
    setBio(localStorage.getItem("profileBio") || "");
    setColour(localStorage.getItem("profileColour") || "#ffffff");
    setImageURL(localStorage.getItem("profileImageURL") || "");
  }, []);

  const clearFields = (e) => {
    e.preventDefault();
    console.log("Clearing input fields...");

    // clear the localStorage
    localStorage.clear();

    setName("");
    setEmail("");
    setBio("");
    setColour("#ffffff");
    setImageURL("");
  };

  const storeNameToLocalStorage = (e) => {
    setName(e.target.value);

    // save name to localStorage
    localStorage.setItem("profileName", e.target.value);
  };

  const storeEmailToLocalStorage = (e) => {
    setEmail(e.target.value);

    // save email to localStorage
    localStorage.setItem("profileEmail", e.target.value);
  };

  const storeBioToLocalStorage = (e) => {
    setBio(e.target.value);

    // save bio to localStorage
    localStorage.setItem("profileBio", e.target.value);
  };

  const storeColourToLocalStorage = (e) => {
    setColour(e.target.value);

    // save colour to localStorage
    localStorage.setItem("profileColour", e.target.value);
  };

  const storeImageURLToLocalStorage = (e) => {
    setImageURL(e.target.value);

    // save imageURL to localStorage
    localStorage.setItem("profileImageURL", e.target.value);
  };

  return (
    <div>
      <form>
        <p>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => storeNameToLocalStorage(e)}
            />
          </label>
        </p>
        <p>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => storeEmailToLocalStorage(e)}
            />
          </label>
        </p>
        <p>
          <label>
            Bio:
            <input
              type="text"
              value={bio}
              onChange={(e) => storeBioToLocalStorage(e)}
            />
          </label>
        </p>
        <p>
          <label>
            Colour:
            <input
              type="color"
              value={colour}
              onChange={(e) => storeColourToLocalStorage(e)}
            />
          </label>
        </p>
        <p>
          <label>
            Image URL:
            <input
              type="text"
              value={imageURL}
              onChange={(e) => storeImageURLToLocalStorage(e)}
            />
          </label>
        </p>
        <button type="button" onClick={clearFields}>
          Clear
        </button>
        <ProfilePreview
          name={name}
          email={email}
          bio={bio}
          colour={colour}
          imageURL={imageURL}
        />
      </form>
    </div>
  );
}

export default Home;
