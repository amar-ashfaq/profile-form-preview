import { useEffect, useState } from "react";
import ProfilePreview from "./ProfilePreview";

function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [colour, setColour] = useState<string>("#ffffff");
  const [imageURL, setImageURL] = useState<string>("");

  const [showClearMessage, setShowClearMessage] = useState<boolean>(false);

  useEffect(() => {
    setName(localStorage.getItem("profileName") || "");
    setEmail(localStorage.getItem("profileEmail") || "");
    setBio(localStorage.getItem("profileBio") || "");
    setColour(localStorage.getItem("profileColour") || "#ffffff");
    setImageURL(localStorage.getItem("profileImageURL") || "");
  }, []);

  const clearFields = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Clearing input fields...");

    // clear the localStorage
    localStorage.clear();

    setName("");
    setEmail("");
    setBio("");
    setColour("#ffffff");
    setImageURL("");

    setShowClearMessage(true);

    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowClearMessage(false);
    }, 3000);
  };

  const storeInputToLocalStorage =
    (key: string, setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setter(value);
      localStorage.setItem(key, value);
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
              onChange={storeInputToLocalStorage("profileName", setName)}
            />
          </label>
        </p>
        <p>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={storeInputToLocalStorage("profileEmail", setEmail)}
            />
          </label>
        </p>
        <p>
          <label>
            Bio:
            <input
              type="text"
              value={bio}
              onChange={storeInputToLocalStorage("profileBio", setBio)}
            />
          </label>
        </p>
        <p>
          <label>
            Colour:
            <input
              type="color"
              value={colour}
              onChange={storeInputToLocalStorage("profileColour", setColour)}
            />
          </label>
        </p>
        <p>
          <label>
            Image URL:
            <input
              type="text"
              value={imageURL}
              onChange={storeInputToLocalStorage(
                "profileImageURL",
                setImageURL
              )}
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
      {showClearMessage && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          Form cleared successfully!
        </p>
      )}
    </div>
  );
}

export default Home;
