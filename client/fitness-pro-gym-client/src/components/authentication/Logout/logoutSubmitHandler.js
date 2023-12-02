export async function logoutSubmitHandler(navigate, setLogoutComponent, setUser, setProfilePhoto, setIsAdministrator) {
    localStorage.removeItem("authenticationTokenAndData");
    
    setUser(null);
   
    setProfilePhoto("");
    
    setIsAdministrator(false);
    
    setLogoutComponent(false);
   
    return navigate("/");
}