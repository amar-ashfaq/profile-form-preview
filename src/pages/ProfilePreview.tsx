type ProfilePreviewProps = {
  name: string;
  email: string;
  bio: string;
  colour: string;
  imageURL?: string; // optional
};

function ProfilePreview({ name, email, bio, imageURL }: ProfilePreviewProps) {
  return (
    <div className="mt-8 p-4 border rounded-lg shadow-md bg-white space-y-4">
      <h2 className="text-xl font-semibold">Preview</h2>
      <p className="text-sm text-gray-700 mb-1">
        <span className="font-medium">Name:</span> {name}
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <span className="font-medium">Email:</span> {email}
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <span className="font-medium">Bio:</span> {bio}
      </p>
      {imageURL && (
        <img
          src={imageURL}
          alt="Profile"
          className="w-32 h-32 object-cover border border-gray-300"
        />
      )}
    </div>
  );
}

export default ProfilePreview;
