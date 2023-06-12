import "./AboutUs.css";
import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
export default function WebsiteHome() {
  return (
    <div>
      {/* <p>
                About MindMatter
                <br></br>
                At MindMatter, we provide an online counseling and emotional support platform designed to foster mental wellness. It anonymously connects you with the right expert from our panel consisting of psychologists, psychotherapists, counselors, life coaches and career coaches, who understand you and guide you through completely confidential individual sessions.

            </p>

            <div className="he">

                <h2>What is <span>Online Counselling and Therapy ?</span></h2>

            </div> */}

      <div class="about-section">
        <h1>About Us</h1>
        <p>
          At MindMatter, we provide an online counseling and emotional support
          platform designed to foster mental wellness. It anonymously connects
          you with the right expert from our panel consisting of psychologists,
          psychotherapists, counselors, life coaches and career coaches, who
          understand you and guide you through completely confidential
          individual sessions.
        </p>
      </div>

      <div>
        <MDBFooter
          bgColor="light"
          className="text-center text-lg-start text-muted"
        >
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div className="me-5 d-none d-lg-block">
              <span> “Reclaiming the Belief in Our Mental Possibilities”</span>
            </div>

            <div>
              <a href="" className="me-4 text-reset">
                <MDBIcon fab icon="facebook-f" />
              </a>
              <a href="" className="me-4 text-reset">
                <MDBIcon fab icon="twitter" />
              </a>
              <a href="" className="me-4 text-reset">
                <MDBIcon fab icon="google" />
              </a>
              <a href="" className="me-4 text-reset">
                <MDBIcon fab icon="instagram" />
              </a>
              <a href="" className="me-4 text-reset">
                <MDBIcon fab icon="linkedin" />
              </a>
              <a href="" className="me-4 text-reset">
                <MDBIcon fab icon="github" />
              </a>
            </div>
          </section>

          <section className="">
            <MDBContainer className="text-center text-md-start mt-5">
              <MDBRow className="mt-3">
                <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    <MDBIcon icon="gem" className="me-3" />
                    Our Mission
                  </h6>
                  <p>
                    Connecting the Best Trained and Certified Psychologist with
                    the People who are seeking emotional and mental wellness
                    support. Giving them the Quality and the Most affordable
                    counselling and therapy services in the World.
                  </p>
                </MDBCol>

                <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Services</h6>
                  <p>
                    <a href="onlinecounselling" className="text-reset">
                      Online Counselling
                    </a>
                  </p>
                  <p>
                    <a href="stressmanagement" className="text-reset">
                      Stress Management
                    </a>
                  </p>
                  <p>
                    <a href="depression" className="text-reset">
                      Depression
                    </a>
                  </p>
                  <p>
                    <a href="anxiety" className="text-reset">
                      Anxiety
                    </a>
                  </p>
                </MDBCol>

                {/* <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol> */}

                <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p>
                    <MDBIcon icon="home" className="me-2" />
                    Know-It , Gokhale Sanchit, Above Hotel Aamaya, BMCC Road,
                    Deccan Gymkhana, Pune: 411004 Maharashtra, INDIA
                  </p>
                  <p>
                    <MDBIcon icon="envelope" className="me-3" />
                    info@mindmatter.com
                  </p>
                  <p>
                    <MDBIcon icon="phone" className="me-3" /> +91 22 1234 5678
                  </p>
                  <p>
                    <MDBIcon icon="print" className="me-3" /> +91 22 8765 4321
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>

          <div
            className="text-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          >
            © 2023 Copyright:
            <a className="text-reset fw-bold" href="http://localhost:3000/home">
              MindMatter.com
            </a>
          </div>
        </MDBFooter>
      </div>

      {/* <h2 style="text-align:center">Our Team</h2>
<div class="row">
  <div class="column">
    <div class="card">
      <img src="/w3images/team1.jpg" alt="Jane" style="width:100%"/>
      <div class="container">
        <h2>Jane Doe</h2>
        <p class="title">CEO & Founder</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>jane@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="/w3images/team2.jpg" alt="Mike" style="width:100%"/>
      <div class="container">
        <h2>Mike Ross</h2>
        <p class="title">Art Director</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>mike@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="/w3images/team3.jpg" alt="John" style="width:100%"/>
      <div class="container">
        <h2>John Doe</h2>
        <p class="title">Designer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>john@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
</div> */}
    </div>
  );
}
