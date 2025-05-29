type ProfilePreviewProps = {
  name: string;
  email: string;
  bio: string;
  colour: string;
  imageURL?: string; // optional
};

function ProfilePreview({
  name,
  email,
  bio,
  imageURL,
  colour,
}: ProfilePreviewProps & { colour: string }) {
  return (
    <div className="mt-8 md:mt-0 p-4 border rounded-lg shadow-md bg-gray-50 space-y-4">
      <h2 className="text-xl font-semibold">Preview</h2>
      <p className="text-sm text-gray-700 mb-1">
        <span className="font-semibold">Name:</span> {name}
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <span className="font-semibold">Email:</span> {email}
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <span className="font-semibold">Bio:</span> {bio}
      </p>
      <p className="text-sm text-gray-700 mb-1 flex items-center">
        <span className="font-semibold mr-2">Favourite Colour:</span>
        <span
          className="w-5 h-5 inline-block border border-gray-400 rounded"
          style={{ backgroundColor: colour }}
        />
      </p>

      {imageURL && (
        <img
          src={imageURL}
          alt="Profile"
          className="w-48 h-48 object-cover border border-gray-300"
        />
      )}
    </div>
  );
}

export default ProfilePreview;
