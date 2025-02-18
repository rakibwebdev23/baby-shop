import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import google from "../../assets/google.jpg";

const SocialSign = () => {
    const { googleSignUser } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleGoogleSignUser = () => {
        googleSignUser()
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email
                };

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data) {
                            navigate('/');
                        }
                    });
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="mb-6 flex justify-center items-center">
            <img
                onClick={handleGoogleSignUser}
                className="w-16 h-16 rounded-full cursor-pointer"
                src={google}
                alt=""
            />
        </div>
    );
};

export default SocialSign;