import React from "react";

const UserTypeRadio: React.FC<{
  userType: "C" | "B";
  setUserType: React.Dispatch<React.SetStateAction<"C" | "B">>;
  labels: { custormer: string; banker: string };
}> = ({ userType, setUserType, labels }) => (
  <div className="flex gap-4">
    <label>
      <input
        type="radio"
        value="C"
        checked={userType === "C"}
        onChange={() => setUserType("C")}
      />
      {labels.custormer}
    </label>
    <label>
      <input
        type="radio"
        value="B"
        checked={userType === "B"}
        onChange={() => setUserType("B")}
      />
      {labels.banker}
    </label>
  </div>
);

export default UserTypeRadio;
