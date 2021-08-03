import CSSModule from './Toolbar.module.css';

const toolbar = props => {
    return (
        <header className = {CSSModule.Toolbar}>
            <div>Menu</div>
            <div>Logo</div>
            <nav style = {{boxSizing: "border-box"}}>
                ...
            </nav>
        </header>
    );
};

export default toolbar;