const ProfileImage = ({ username }: { username: string | undefined }) => {
	return <div>{username ?? "Profile"}</div>;
};

export default ProfileImage;
