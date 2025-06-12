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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow flex flex-col md:flex-row gap-8">
        {/* Left side: Form */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Profile Form
          </h2>
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name:
                <input
                  type="text"
                  value={profile.name}
                  onChange={storeProfileToLocalStorage("name")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email:
                <input
                  type="email"
                  value={profile.email}
                  onChange={storeProfileToLocalStorage("email")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio:
                <input
                  type="text"
                  value={profile.bio}
                  onChange={storeProfileToLocalStorage("bio")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>
            </div>

            {/* Colour */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Colour:
                <input
                  type="color"
                  value={profile.colour}
                  onChange={storeProfileToLocalStorage("colour")}
                  className="w-full h-10 p-1 border border-gray-300 rounded-md"
                />
              </label>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL:
                <input
                  type="text"
                  value={profile.imageURL}
                  onChange={storeProfileToLocalStorage("imageURL")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>
            </div>

            <button
              type="button"
              name="clear"
              onClick={clearFields}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Clear
            </button>
          </form>

          {/* Clear message */}
          {showClearMessage && (
            <p className="text-green-600 font-semibold text-sm">
              Form cleared successfully!
            </p>
          )}
        </div>

        {/* Right side: Preview */}
        <div className="w-full md:w-1/2 border border-gray-200 rounded-md p-6 shadow-sm bg-gray-50 space-y-4">
          <ProfilePreview
            name={profile.name}
            email={profile.email}
            bio={profile.bio}
            colour={profile.colour}
            imageURL={profile.imageURL}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
