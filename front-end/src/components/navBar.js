const NavBar = props=>{

    const{firstname, surname, username} = props.user;

    return(
        <div className="navBar">
            <img id="kanoLogo" src="/assets/kano.png"/>
            <div id="userDetails">
                {username}: {firstname} {surname} 
            </div>
        </div>
    )
}

export default NavBar;