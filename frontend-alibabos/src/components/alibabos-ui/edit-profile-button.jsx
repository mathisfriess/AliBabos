import { Button } from "@/components/ui/button";

export default function EditProfileButton() {
  const handleEditProfile = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/account?referrer=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&referrer_uri=${process.env.NEXT_PUBLIC_URL}/profile`;
  };

  return <Button id="edit-profile-button" onClick={handleEditProfile}>Edit Profile</Button>;
}
