import React from "react";
import Statistics from "components/Statistics";
import PieChart from "components/PieChart";
import Button from "components/Button";
import Input from "components/Input";
import Select from "components/Select";
import Avatar from "components/Avatar";
import UserCard from "components/UserCard";

function App() {
  return (
    <div className="App">

      <div className="p-20 flex justify-between">
        <Statistics text="All Employees" number={120} />
        <Statistics
          text="Present"
          number={97}
          subTitle="This Week"
          percentage={10}
          positive={false}
        />
        <Statistics
          text="Absent"
          number={5}
          subTitle="This Week"
          percentage={5}
          textColor="tomato"
        />
        <Statistics text="Remote" number={15} textColor="secondary" />
        <Statistics
          text="Leave"
          number={5}
          subTitle="This Week"
          percentage={5}
          textColor="tomato"
        />
      </div>
      <div className="p-20 flex justify-between">
        <PieChart
          text="Availability"
          progress={87.5}
          color="primary"
          percentage={8}
          positive={false}
        />
        <PieChart
          text="Abscentism"
          progress={12.8}
          color="tomato"
          percentage={10}
        />
        <PieChart
          text="Late coming"
          progress={5.1}
          color="tertiary"
          percentage={15}
        />
      </div>
      <div className="p-20 flex justify-between">
        <Button
          className="max-w-1/4"
          text="Text variant"
        ></Button>
        <Button link="the link" className="max-w-1/4 ml-2">
          Here we go
        </Button>
      </div>
      <div className="max-w-1/2 p-20 pt-5">
        <Input
          name="firstName"
          valErrorMsg="First Name is required"
          placeHolder="First Name"
          validateSelf
        />
      </div>
      <div className="max-w-1/2 p-20 pt-5">
        <Select
          name="firstName"
          placeHolder="Gender"
          inputs={[
            { name: "Male", value: "male" },
            { name: "Female", value: "female" }
          ]}
        />
      </div>
  
      <div
        style={{
          marginTop:"200px",
          height: "400px",
          width: "400px"
        }}
      > 
      
      
      <UserCard
        type="late"
        imgUrl="https://avatars.githubusercontent.com/u/22154654?s=460&u=f4903cdbf4bca8dba340739fa72390fc6db25b03&v=4"
      />

  

      <UserCard
        type="early"
        imgUrl="https://avatars.githubusercontent.com/u/22154654?s=460&u=f4903cdbf4bca8dba340739fa72390fc6db25b03&v=4"
      />

      </div>
  
    </div>
  );
}

export default App;
