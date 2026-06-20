function ProfilePage({ currentUser }) {
  return (
    <section className="profile">
      <h2 className="profile__title">Profile</h2>

      <p className="profile__text">Name: {currentUser?.name || "Loading..."}</p>

      <p className="profile__text">
        Email: {currentUser?.email || "Loading..."}
      </p>
    </section>
  );
}

export default ProfilePage;
