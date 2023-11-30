export async function logoutSubmitHandler(navigate, setLogoutComponent, setUser, setProfilePhoto) {
    localStorage.removeItem("authenticationTokenAndData");
    
    setUser(null);
   
    setProfilePhoto("");
    
    setLogoutComponent(false);
   
    return navigate("/");
}