import { Link, useNavigate } from "react-router-dom"

const FehlendeBerechtigung = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    
    return (
        <section>
            <h1>Fehlende Berechtigung für diese Seite</h1>
            <br />
            
            <div>
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default FehlendeBerechtigung;