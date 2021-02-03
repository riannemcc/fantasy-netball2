const ProfileSection = () => {
  const [user, { mutate }] = useUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const nameRef = useRef();
  // const bioRef = useRef();
  const [msg, setMsg] = useState({ message: "", isError: false });

  useEffect(() => {
    nameRef.current.value = user.name;
    // bioRef.current.value = bio.name;
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    // formData.append("bio", bioRef.current.value);
    const res = await fetch("/api/user", {
      method: "PATCH",
      body: formData,
    });
    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
      setMsg({ message: "Profile updated" });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  };

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <section>
        <h2>Edit Profile</h2>
        {msg.message ? (
          <p
            style={{
              color: msg.isError ? "red" : "#0070f3",
              textAlign: "center",
            }}
          >
            {msg.message}
          </p>
        ) : null}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name
            <input
              required
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
            />
          </label>
          {/* <label htmlFor="bio">
            Bio
            <textarea id="bio" name="bio" type="text" placeholder="Bio" />
          </label> */}
          <label htmlFor="teamSelection">
            Your team
            <input
              type="text" //What will the type be?
              id="teamSelection"
              name="teamSelection"
            />
          </label>
          <button disabled={isUpdating} type="submit">
            Save
          </button>
        </form>
      </section>
    </>
  );
};

const SettingPage = () => {
  const [user] = useUser();

  if (!user) {
    return (
      <>
        <p>Please sign in</p>
      </>
    );
  }
  return (
    <>
      <h1>Settings</h1>
      <ProfileSection />
    </>
  );
};

export default SettingPage;
