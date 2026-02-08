
export const checkValidSignInData=(email,password)=>{
    const isEmailValid=/^\S+@\S+\.\S+$/.test(email);
    const isPassValid=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);

    if(!isEmailValid)return "Email id is not valid";
    if(!isPassValid)return "Password is not valid";

    return null;
}

export const checkValidSignUpData = (name, email, password, confirmedPassword) => {

    const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
    const isPassValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);

    if (name.length < 2) return "Name must be at least 2 characters";

    if (!isEmailValid) return "Email id is not valid";

    if (!isPassValid) return "Password must contain 8+ characters, uppercase, lowercase, number and special character";

    if (password !== confirmedPassword) return "Passwords do not match";

    return null;
};


