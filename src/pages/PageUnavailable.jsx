import { Link } from 'react-router-dom'

export const PageUnavailable = () => {

    return <section className="page-unavailable main-layout m-page">
        <span>Sorry, this page isn't available.</span>
        <div>
            <p>The link you followed may be broken, or the page may have been removed.
                <Link to="/"> Go back to Instapound.</Link>
            </p>
        </div>
    </section>
}