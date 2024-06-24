import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();
  const getContactsData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("contact data: ", data);
      if (response.ok) {
        console.log(response);
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //defining the function deleteContactById

  const deleteContactById = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,
            { method:'DELETE',
            headers: {
             Authorization: authorizationToken,
            },
            }
        );
        if (response.ok) {
            getContactsData();
       toast.success("deleted successsfully");
     } else {
      toast.error("Not deleted");
     }
    
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getContactsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {contactData.map((curContactData, index) => {
        return (
          <div key={index}>
            <p>{curContactData.email}</p>
            <button className="btn" onClick={() => deleteContactById(curContactData._id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
};
