
import Mainhome from "../homepagecomponets/Mainhome";
import Analysesbar from "../homepagecomponets/analysesbar";
import Services from "../homepagecomponets/services";
import Aboutus from "../homepagecomponets/aboutus";
import Howwork from "../homepagecomponets/howwork";

import Trust from "../homepagecomponets/trust";
import Contact from "../homepagecomponets/contact";
import Footer from "../homepagecomponets/footer";
import Header from "../homepagecomponets/header";

function Homepage() {
  return (
    <>
      <Header/>
      <Mainhome/>
      <Analysesbar/>
    
      
      <Howwork/>
       <Services/>
       <Aboutus/>
      <Trust/>
      <Contact/>
    <Footer/>
    </>
  )
}

export default Homepage