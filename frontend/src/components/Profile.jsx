import React, {useContext, useEffect, useState} from "react";
import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import SkillModal from "./SkillModal";

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Radar } from 'react-chartjs-2';

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

const Profile = () => {
    const {token, user} = useContext(UserContext);
    const [skills, setSkills] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [id, setId] = useState(null);
    const avatarTypes = ["avataaars", "human", "bottts", "jdenticon", "identicon", "gridy", "micah"];
    // Setting up the initial states for the avatar using react hook 'useState'
    const [sprite, setSprite] = useState("bottts");
    const [seed, setSeed] = useState(1000);

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
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch("/api/skills", requestOptions);
        if (response.ok) {
            setSkills(await response.json());
            setLoaded(true);
        } else {
            setErrorMessage("Something went wrong. Couldn't create the skill");
        }
    };

    // use the function
    useEffect(() => {
        getSkills();
        handleSprite();
        handleGenerate();
    }, []);

    // everytime the modal is used it refreshes the skills that are there
    const handleModal = () => {
        setActiveModal(!activeModal);
        getSkills();
        setId(null);
    }

    // skills data to make the radar chart
    const dataRadar = {
        labels: JSON.parse(JSON.stringify(skills)).map((skill) => skill.name),
        datasets: [
            {
                label: 'Skills',
                data: JSON.parse(JSON.stringify(skills)).map((skill) => skill.level), 
                backgroundColor: 'rgba(63, 209, 187, 0.2)',
                borderColor: 'rgb(4, 181, 160)',
                borderWidth: 1,
            },
        ],
    };
    
    // if the skills are loaded and if they exist then display the table with the skills
    return (
        <>
            <SkillModal active={activeModal}
                        handleModal={handleModal}
                        id={id}
                        setErrorMessage={setErrorMessage}/>
            <div className='card equal-height'>
                {user &&
                    <div className="card-content is-flex">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-128x128 is-inline-block">
                                    <img className="is-rounded m-5"
                                         src={`https://avatars.dicebear.com/api/${sprite}/${seed}.svg`}
                                         alt="Sprite"/>
                                </figure>
                            </div>
                            <div className="media-content m-5">
                                <section className="section">
                                    <p className="title">Name: {user.name}</p>
                                    <p className="subtitle mt-2">Email: {user.email}</p>
                                    <p className="subtitle">Company position: {user.company_position}</p>
                                </section>
                                <section className="section">
                                    <p className="title">{user.name}'s skills:</p>
                                    {loaded && skills ? (
                                        <table className="table is-fullwidth">
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
                                                        <button className="button mr-2 is-info is-light"
                                                                onClick={() => handleUpdateSkill(skill.id)}>Update
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                            <button className="button m-5 is-primary" onClick={() => setActiveModal(true)}>Create skill</button>
                                        </table>
                                    ) : <p>Loading</p>}
                                    
                                    <ErrorMessage message={errorMessage}/>

                                    <Radar data={dataRadar}/>
                                </section>
                                
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Profile;
