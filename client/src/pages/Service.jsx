import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth();
  return (
    <>
    <div key={services._id}>
      {
        services.map((currElem, index) => {
          return(
            <>
              <div key={currElem._id}>
                <h1 key={currElem.k}>{currElem.service}</h1>
                <p key={index}>{currElem.description}</p>
              </div>
            </>
          );
        })
      }
    </div>
    </>
  )
}

// import { useAuth } from "../store/auth";
// import design from "../assets/images/design.png";

// export const Service = () => {
//   const { services } = useAuth();

//   return (
//   <>
//     <div className="main-section">
//       <section className="container services">
//         <h1>Our Services</h1>
//         <div className="container grid grid-three-cols">
//           {services.map((curElem,index) => {
//             const { price, description, provider, service, _id } = curElem;

//             return (
//             // eslint-disable-next-line react/jsx-key
//             <div className="card">
//               <div className="card-img">
//               <img src={design} key={_id} alt="designer" width="200" />
//               </div>
//               <div className="card-details">
//                 <div className="grid grid-two-cols">
//                   <p>{provider}</p><br />
//                   <p>{price}</p><br />
//                   <p>{index}</p><br />
//                 </div>
//                 <h2>{service}</h2><br />
//                 <p>{description}</p><br />
//               </div>
//             </div>
//           );
//           })}

//         </div>
//       </section>
//     </div>
//   </>
//   );
// };


