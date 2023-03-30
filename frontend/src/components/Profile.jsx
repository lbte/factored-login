import React, { useContext, useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import { Radar } from 'react-chartjs-2';
import SkillModal from "./SkillModal";

const Profile = () => {
    const [token] = useContext(UserContext);
    const [skills, setSkills] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [id, setId] = useState(null);
    const avatarTypes = ["avataaars", "human", "bottts", "jdenticon", "identicon", "gridy", "micah"];
    // Setting up the initial states using react hook 'useState'
    const [sprite, setSprite] = useState("bottts");
    const [seed, setSeed] = useState(1000);

    // user information
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [companyPosition, setCompanyPosition] = useState("");
      
    // Function to set the current sprite type
    const handleSprite = async () => {
        const pos = Math.floor(Math.random() * avatarTypes.length);
        setSprite(avatarTypes[pos]);
    };
      
    // Function to generate random seeds for the API
    const handleGenerate = async () => {
        let x = Math.floor(Math.random() * 1000);
        setSeed(x);
    };

    // function to trigger the update to happen
    const handleUpdateSkill = async (id) => {
        setId(id);
        setActiveModal(true);
    };

    // function to get the skills
    const getSkills = async () => {
        const requestOptions = {
            method: "GET",
            header: {
                "Content-Type": "application/json",
                Autorization: "Bearer" + token,
            },
        };

        const response = await fetch("/api/skills", requestOptions);

        if (!response.ok) {
            setErrorMessage("Something went wrong. Couldn't create the skill");
        } else {
            const data = await response.json();
            setSkills(data);
            setLoaded(true);
        }
    };

    // function to get the user information
    const getUserData = async () => {
        const requestOptions = {
            method: "GET",
            header: {
                "Content-Type": "application/json",
                Autorization: "Bearer" + token,
            },
        };

        const response = await fetch("/api/users/me", requestOptions);

        if (!response.ok) {
            setErrorMessage("Something went wrong. Couldn't get user data");
        } else {
            const data = await response.json();
            setName(data.name);
            setEmail(data.email);
            setCompanyPosition(data.company_position)
        }
    };

    // use the function
    useEffect(() => {
        getSkills();
        getUserData();
        handleSprite();
        handleGenerate();
    }, []);

    // everytime the modal is used it refreshes the skills that are there
    const handleModal = () => {
      setActiveModal(!activeModal);
      getSkills();
      setId(null); 
    }

    const data = {
      labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
      datasets: [
        {
          label: '# of Votes',
          data: [2, 9, 3, 5, 2, 3],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    // <Radar data={data} />

    // if the skills are loaded and if they exist then display the graph
    return (
        <>

            <SkillModal active={activeModal} handleModal={handleModal} token={token} id={id} errorMessage={setErrorMessage}/>
            <section className="section">
                <div class='card equal-height'>
                    <div class="card-content is-flex">
                        <div className="media">
                            <div className="media-left">
                            <figure class="image is-128x128 is-inline-block">
                                <img class="is-rounded m-5" src={`https://avatars.dicebear.com/api/${sprite}/${seed}.svg`} alt="Sprite" />
                            </figure>
                            </div>
                            <div className="media-content m-5">
                                <p className="title">Name: {name}</p>
                                <p className="subtitle">Email: {email}</p>
                                <p className="subtitle">Company position: {companyPosition}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
            {loaded && skills ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Level</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map((skill) => (
                            <tr key={skill.id}>
                                <td>{skill.id}</td>
                                <td>{skill.name}</td>
                                <td>{skill.level}</td>
                                <td>
                                    <button className="button m-5 is-info is-light" onClick={ () => handleUpdateSkill(skill.id)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ):<p>Loading</p>}
            </section>
            

                            

                        

            <button className="button m-5 is-primary" onClick={ () => setActiveModal(true)}>Create skill</button>
            
            <ErrorMessage message={errorMessage}/>
        </>
    );
};

export default Profile;