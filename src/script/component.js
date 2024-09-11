export const UserInfo = (props) => {
    return (
        `
        <div class="user_info">
            <span class="welcome_message">Welcome,
                <span class="welcome_name">${props.firstName} ${props.lastName}</span>
            </span>
            <div id="logout">Logout</div>
        </div>
        `
    )
};

export const LoginContainer = () => {
    return (
        `
        <div id="login_container">
            <form id="login_contents">
                <h1 class="title">Graphql 📈📉</h1>
                <h2 class="title_guide">Sign in to your intra account</h2>
                <input type="text" name="username" id="username" placeholder="Username/Email" required>
                <input type="password" name="password" id="password" placeholder="Password" required>
                <input type="submit" value="Login" id="submit">
            </div>
        </div>
        `
    )
};

export const TabButton = (props) => {
    return (
        `
        <div class="tab_button">
            <button>${props.name}</button>
        </div>
        `
    )
};

export const Header = () => {
    return (
        `
        <header id="header">
            <h1 class="title">Graphql 📈📉</h1>
        </header>
        `
    )
};