import madiba from "../../../assets/images/madiba_pic.jpg";
import edem from "../../../assets/images/edem_pic.jpg";
import elikem from "../../../assets/images/elikem_pic.png";
import React from "react";

const MeetTeam = () => (
    <main class="meet-the-team">
        <section class="team-intro">
            <h1>Meet the team</h1>
            <p>
                Our team, made up of fellow Ashesi University students,
                understands the challenges of finding the perfect study spot,
                especially during peak hours.
            </p>
        </section>
        <section class="team-members">
            <div class="member">
                <img src={edem} alt="Edem K. Anagbah" class="team-photo" />
                <p>Edem K. Anagbah</p>
            </div>

            <div class="member">
                <img
                    src={madiba}
                    alt="Madiba Hudson-Quansah"
                    class="team-photo"
                />
                <p>Madiba Hudson-Quansah</p>
            </div>

            <div class="member">
                <img src={elikem} alt="Elikem Hamenoo" class="team-photo" />
                <p>Elikem Hamenoo</p>
            </div>
        </section>
    </main>
);

export default MeetTeam;
