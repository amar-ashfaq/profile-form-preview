import { useEffect, useState } from "react";
import ProfilePreview from "./ProfilePreview";

type Profile = {
  name: string;
  email: string;
  bio: string;
  colour: string;
  imageURL?: string;
};

function Home() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    bio: "",
    colour: "#ffffff",
    imageURL: "",
  });

  const [showClearMessage, setShowClearMessage] = useState<boolean>(false);

  useEffect(() => {
    setProfile({
      name: localStorage.getItem("profileName") || "",
      email: localStorage.getItem("profileEmail") || "",
      bio: localStorage.getItem("profileBio") || "",
      colour: localStorage.getItem("profileColour") || "#ffffff",
      imageURL: localStorage.getItem("profileImageURL") || "",
    });
  }, []);

  const clearFields = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Clearing input fields...");

    // clear the localStorage
    localStorage.clear();

    setProfile({
      name: "",
      email: "",
      bio: "",
      colour: "#ffffff",
      imageURL: "",
    });

    setShowClearMessage(true);

    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowClearMessage(false);
    }, 3000);
  };

  const storeProfileToLocalStorage =
    (key: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      localStorage.setItem(`profile${capitaliseFirstLetter(key)}`, value);
      setProfile((previousState) => ({ ...previousState, [key]: value }));
    };

  const capitaliseFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      <form>
        <p>
          <label>
            Name:
            <input
              type="text"
              value={profile.name}
              onChange={storeProfileToLocalStorage("name")}
            />
          </label>
        </p>
        <p>
          <label>
            Email:
            <input
              type="email"
              value={profile.email}
              onChange={storeProfileToLocalStorage("email")}
            />
          </label>
        </p>
        <p>
          <label>
            Bio:
            <input
              type="text"
              value={profile.bio}
              onChange={storeProfileToLocalStorage("bio")}
            />
          </label>
        </p>
        <p>
          <label>
            Colour:
            <input
              type="color"
              value={profile.colour}
              onChange={storeProfileToLocalStorage("colour")}
            />
          </label>
        </p>
        <p>
          <label>
            Image URL:
            <input
              type="text"
              value={profile.imageURL}
              onChange={storeProfileToLocalStorage("imageURL")}
            />
          </label>
        </p>
        <button type="button" onClick={clearFields}>
          Clear
        </button>
        <ProfilePreview
          name={profile.name}
          email={profile.email}
          bio={profile.bio}
          colour={profile.colour}
          imageURL={profile.imageURL}
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
