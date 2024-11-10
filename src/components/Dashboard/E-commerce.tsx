"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

type ApplicationList = {
  id: string; // UUID type for ID
  company_name: string;
  type_ofApplication: string;
  application_status: string;
  position: string;
  email_followup: string;
};

const Ecommerce: React.FC = () => {
  const [applicationList, setApplicationList] = useState<ApplicationList[]>([]);

  const fetchData = async () => {
    const { data, error } = await supabase.from("Application").select("*");
    if (data) {
      setApplicationList(data);
    } else {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const handleAddRow = () => {
    const newRow: ApplicationList = {
      id: uuidv4(), // Generate a new UUID
      company_name: "",
      type_ofApplication: "",
      application_status: "",
      position: "",
      email_followup: "",
    };
    setApplicationList([...applicationList, newRow]);
  };

  const handleSave = async (index: number) => {
    const row = applicationList[index];

    if (!row.company_name || !row.type_ofApplication || !row.position) {
      alert("Please fill all the required fields.");
      return;
    }

    const { data, error } = await supabase.from("Application").insert([row]);

    if (error) {
      console.error("Error saving data:", error);
    } else {
      alert("Row saved successfully!");
      fetchData();
    }
  };

  const handleInputChange = (
    index: number,
    field: keyof ApplicationList,
    value: string
  ) => {
    const updatedList = [...applicationList];
    updatedList[index][field] = value;
    setApplicationList(updatedList);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Company Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Type of Application
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Application Status
              </th>
              <th className="border border-gray-300 px-4 py-2">Position</th>
              <th className="border border-gray-300 px-4 py-2">Email Followup</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicationList.map((application, index) => (
              <tr key={application.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {application.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={application.company_name}
                    onChange={(e) =>
                      handleInputChange(index, "company_name", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={application.type_ofApplication}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "type_ofApplication",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={application.application_status}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "application_status",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={application.position}
                    onChange={(e) =>
                      handleInputChange(index, "position", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={application.email_followup}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "email_followup",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleSave(index)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleAddRow}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Row
        </button>
      </div>
    </>
  );
};

export default Ecommerce;
