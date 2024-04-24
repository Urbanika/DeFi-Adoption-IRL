import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { FaMoneyBillWave, FaChartLine, FaUsers } from 'react-icons/fa';
import { BsQuestionCircle } from 'react-icons/bs';
import { FiInfo } from 'react-icons/fi';
import { FiSettings, FiUser, FiCreditCard } from 'react-icons/fi';

const TabLayout = (props) => {
  const { passportScore } = props;
  return (
    <Tabs>
      <TabList>
        <Tab>Home</Tab>
        <Tab>Credit</Tab>
        <Tab>Profile</Tab>
        <Tab>Settings</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Welcome passportScore={passportScore} />
        </TabPanel>
        <TabPanel>
          <Credit />
        </TabPanel>
        <TabPanel>
          <Profile />
        </TabPanel>
        <TabPanel>
          <Settings />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const Welcome = ({ passportScore }: { passportScore: number | null }) => {
    const calculateProgress = () => {
        if (passportScore === null) return 0;
        return Math.min(passportScore, 100);
    };

    const progress = calculateProgress();

    const contentStyle = {
        backgroundColor: "#272530",
        padding: "20px",
        borderRadius: "8px",
        color: "white", 
    };

    const circleStyle = {
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        border: "8px solid #fff", 
        color: "#1AC1BF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "30px",
        fontWeight: "bold",
        margin: "0 auto 10px auto",
    };
  
    return (
        <>
            <br />
            <br />
            <div style={contentStyle}>
                {passportScore !== null ? (
                    <>
                        <div style={circleStyle}>
                            {progress}
                        </div>
                        <p style={{ ...messageStyle, textAlign: "center" }}>Your Passport Score</p> 
                    </>        
                ) : (
                    <>
                        <p>¡Bienvenido a nuestra dApp!</p>
                        <br />
                        <p>
                            Nuestra plataforma está diseñada para permitir que las empresas
                            locales accedan al microcrédito DeFi (Finanzas Descentralizadas)
                            utilizando datos tokenizados de la vida real. Implementamos un
                            enfoque innovador basado en hitos, respaldado por la participación
                            de la comunidad y expertos, para construir una calificación
                            crediticia soberana.
                        </p>
                        <br />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ textAlign: "center" }}>
                                <FaMoneyBillWave size={50} />
                                <p>Acceso a microcrédito DeFi</p>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <FaChartLine size={50} />
                                <p>Enfoque basado en hitos</p>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <FaUsers size={50} />
                                <p>Participación de la comunidad y expertos</p>
                            </div>
                        </div>
                        <br />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <BsQuestionCircle size={30} />
                            <p style={{ marginLeft: "10px" }}>¿Necesitas ayuda?</p>
                        </div>
                        <br />
                        <p>
                            Si tienes alguna pregunta o necesitas más información, no dudes en preguntar
                        </p>
                        <br />
                        <p><b>¡Empieza conectando tu billetera y explorando las oportunidades que tenemos para ti!</b></p>
                        <br />
                        <FiInfo size={20} />
                        <span style={{ marginLeft: "5px" }}>¿Qué es un microcrédito DeFi?</span>
                    </>
                )}
            </div>
        </>
    );
};

const messageStyle = {
    fontSize: "16px",
};
const Credit = () => {
    return (
      <>
        <br />
        <div style={{ textAlign: "center" }}>
          <p>Working on Credit...</p>
          <div style={{ display: "inline-block", position: "relative", width: "50px", height: "50px" }}>
            <FiCreditCard size={100} style={{ position: "absolute"}} />
          </div>
        </div>
        <br />
      </>
    );
};

const Profile = () => {
    return (
      <>
        <br />
        <div style={{ textAlign: "center" }}>
          <p>Working on Profile...</p>
          <div style={{ display: "inline-block", position: "relative", width: "50px", height: "50px" }}>
            <FiUser size={100} style={{ position: "absolute"}} />
           
          </div>
        </div>
        <br />
      </>
    );
};

const Settings = () => {
    return (
      <>
        <br />
        <div style={{ textAlign: "center" }}>
          <p>Working on Settings...</p>
          <div style={{ display: "inline-block", position: "relative", width: "50px", height: "50px" }}>
            <FiSettings size={100} style={{ position: "absolute" }} />
           
          </div>
        </div>
        <br />
      </>
    );
};




export { TabLayout, Welcome, Credit, Profile, Settings };
