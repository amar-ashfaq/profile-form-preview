function ProfilePreview({ name, email, bio, imageURL }) {
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Bio:</strong> {bio}
      </p>
      {imageURL && <img src={imageURL} alt="Profile" />}
    </div>
  );
}

export default ProfilePreview;
