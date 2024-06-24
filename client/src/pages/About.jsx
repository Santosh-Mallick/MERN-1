import { useAuth } from "../store/auth";

export const About = () => {
  const { user } = useAuth();
  return (
    <>
    <div>
     <p>{user.username}welcome to our website</p>
    </div>
    </>
  );
};
