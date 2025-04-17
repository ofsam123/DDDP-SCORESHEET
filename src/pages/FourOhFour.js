
function FourOhFour(){
   return(
    <>
        <div id="particles-js"></div>
		<div className="countdown-bg"></div>

		<div className="error-screen">
			<h1>404</h1>
			<h5>We're sorry!<br/>The page you have requested cannot be found.</h5>
			<a href="/" className="btn btn-primary">Go back to Dashboard</a>
		</div>
    </>
   ); 
}

export default FourOhFour;