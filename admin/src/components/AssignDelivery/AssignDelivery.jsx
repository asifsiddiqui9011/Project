


// import React, { useState, useEffect, useContext } from 'react';
// import './AssignDelivery.css';
// import { AdminContext } from '../../Context/AdminContext.jsx';

// const updateDeliveryAssignment = async (orderId, deliveryBoyId) => {
//   const response = await fetch('/api/assignDeliveryBoy', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'auth-token': localStorage.getItem('auth-token'),
//     },
//     body: JSON.stringify({ orderId, deliveryBoyId }),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to update delivery assignment');
//   }
//   return response.json();
// };

// const AssignDelivery = ({ onAssignDelivery }) => {
//   // Destructure allorders and allUsers from AdminContext.
//   const { allorders, allUsers } = useContext(AdminContext);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDeliveryBoyId, setSelectedDeliveryBoyId] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [deliveryBoys, setDeliveryBoys] = useState([]);
//   const [cityFilter, setCityFilter] = useState('');

//   // Create a list of unique cities from orders for the filter dropdown.
//   const uniqueCities = Array.from(new Set(allorders.map((order) => order.Address.city)));

//   // Filter orders based on the selected city.
//   const filteredOrders = cityFilter
//     ? allorders.filter((order) => order.Address.city === cityFilter)
//     : allorders;

//   const handleOpenModal = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   // When a modal opens for an order, filter delivery boys from allUsers based on order city.
//   useEffect(() => {
//     if (isModalOpen && selectedOrder && allUsers) {
//       const filteredBoys = allUsers.filter(
//         (user) =>
//           user.role === 'delivery boy' &&
//           user.city === selectedOrder.Address.city
//       );
//       setDeliveryBoys(filteredBoys);
//       console.log('Filtered delivery boys:', filteredBoys);
//     }
//   }, [isModalOpen, selectedOrder, allUsers]);

//   const handleAssign = async () => {
//     if (selectedDeliveryBoyId && selectedOrder) {
//       try {
//         await updateDeliveryAssignment(selectedOrder._id, selectedDeliveryBoyId);
//         onAssignDelivery(selectedOrder._id, selectedDeliveryBoyId);
//         alert('Delivery assignment successful!');
//         // Reset modal-related state.
//         setIsModalOpen(false);
//         setSelectedOrder(null);
//         setSelectedDeliveryBoyId(null);
//         setDeliveryBoys([]);
//       } catch (error) {
//         console.error('Error assigning delivery:', error);
//         alert('Failed to assign delivery. Please try again.');
//       }
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null);
//     setSelectedDeliveryBoyId(null);
//     setDeliveryBoys([]);
//   };

//   return (
//     <div className="orders-wrapper">
//       {/* Dropdown to filter orders by city */}
//       <div className="filter-wrapper">
//         <label htmlFor="cityFilter">Filter by City: </label>
//         <select
//           id="cityFilter"
//           value={cityFilter}
//           onChange={(e) => setCityFilter(e.target.value)}
//         >
//           <option value="">All</option>
//           {uniqueCities.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Display orders based on the selected city */}
//       {filteredOrders.map((order) => (
//         <div key={order._id} className="order-item">
//           <div className="order-details">
//             <h4>Order #{order._id}</h4>
//             <p>City: {order.Address.city}</p>
//             {/* Additional order data */}
//             {order.status && <p>Status: {order.status}</p>}
//             {order.createdAt && (
//               <p>
//                 Ordered on:{' '}
//                 {new Date(order.createdAt).toLocaleDateString(undefined, {
//                   year: 'numeric',
//                   month: 'short',
//                   day: 'numeric',
//                 })}
//               </p>
//             )}
//           </div>
//           <button
//             className="assign-delivery__btn--open"
//             onClick={() => handleOpenModal(order)}
//           >
//             Assign Order
//           </button>
//         </div>
//       ))}

//       {/* Modal for assigning the delivery boy */}
//       {isModalOpen && selectedOrder && (
//         <div className="assign-delivery__modal-overlay">
//           <div className="assign-delivery__modal-content">
//             <h3>
//               Select Delivery Boy for {selectedOrder.Address.city} Order #{selectedOrder._id}
//             </h3>
//             {selectedOrder.status && (
//               <p>
//                 Current Status: <strong>{selectedOrder.status}</strong>
//               </p>
//             )}
//             {deliveryBoys.length === 0 ? (
//               <p>No delivery boys available for this city.</p>
//             ) : (
//               <ul className="assign-delivery__list">
//                 {deliveryBoys.map((boy) => (
//                   <li key={boy._id} className="assign-delivery__list-item">
//                     <label>
//                       <input
//                         type="radio"
//                         name="deliveryBoy"
//                         value={boy._id}
//                         onChange={() => setSelectedDeliveryBoyId(boy._id)}
//                       />
//                       {boy.username} {boy.experience && `- ${boy.experience} yrs exp`}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <div className="assign-delivery__modal-actions">
//               <button onClick={handleAssign} disabled={!selectedDeliveryBoyId}>
//                 Assign
//               </button>
//               <button onClick={handleCancel}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignDelivery;


// import React, { useState, useEffect, useContext } from 'react';
// import './AssignDelivery.css';
// import { AdminContext } from '../../Context/AdminContext.jsx';

// const updateDeliveryAssignment = async (orderId, deliveryBoyId) => {
//   const response = await fetch('/api/assignDeliveryBoy', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'auth-token': localStorage.getItem('auth-token'),
//     },
//     body: JSON.stringify({ orderId, deliveryBoyId }),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to update delivery assignment');
//   }
//   return response.json();
// };

// const AssignDelivery = ({ onAssignDelivery }) => {
//   const { allorders, allUsers } = useContext(AdminContext);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDeliveryBoyId, setSelectedDeliveryBoyId] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [deliveryBoys, setDeliveryBoys] = useState([]);
//   const [cityFilter, setCityFilter] = useState('');

//   const uniqueCities = Array.from(new Set(allorders.map((order) => order.Address.city)));

//   const filteredOrders = cityFilter
//     ? allorders.filter((order) => order.Address.city === cityFilter)
//     : allorders;

//   const handleOpenModal = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   useEffect(() => {
//     if (isModalOpen && selectedOrder && allUsers) {
//       const filteredBoys = allUsers.filter(
//         (user) =>
//           user.role === 'delivery boy' && user.city === selectedOrder.Address.city
//       );
//       setDeliveryBoys(filteredBoys);
//     }
//   }, [isModalOpen, selectedOrder, allUsers]);

//   const handleAssign = async () => {
//     if (selectedDeliveryBoyId && selectedOrder) {
//       try {
//         await updateDeliveryAssignment(selectedOrder._id, selectedDeliveryBoyId);
//         onAssignDelivery(selectedOrder._id, selectedDeliveryBoyId);
//         alert('Delivery assignment successful!');
//         setIsModalOpen(false);
//         setSelectedOrder(null);
//         setSelectedDeliveryBoyId(null);
//         setDeliveryBoys([]);
//       } catch (error) {
//         alert('Failed to assign delivery. Please try again.');
//       }
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null);
//     setSelectedDeliveryBoyId(null);
//     setDeliveryBoys([]);
//   };

//   return (
//     <div className="orders-wrapper">
//       <div className="filter-wrapper">
//         <label htmlFor="cityFilter">Filter by City: </label>
//         <select
//           id="cityFilter"
//           value={cityFilter}
//           onChange={(e) => setCityFilter(e.target.value)}
//         >
//           <option value="">All</option>
//           {uniqueCities.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="orders-table-wrapper">
//         <table className="orders-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>City</th>
//               <th>Status</th>
//               <th>Ordered On</th>
//               <th>Assign Delivery</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.Address.city}</td>
//                 <td>{order.status || '-'}</td>
//                 <td>
//                   {order.createdAt
//                     ? new Date(order.createdAt).toLocaleDateString(undefined, {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric',
//                       })
//                     : '-'}
//                 </td>
//                 <td>
//                   <button
//                     className="assign-delivery__btn--open"
//                     onClick={() => handleOpenModal(order)}
//                   >
//                     Assign
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && selectedOrder && (
//         <div className="assign-delivery__modal-overlay">
//           <div className="assign-delivery__modal-content">
//             <h3>
//               Assign Delivery for Order #{selectedOrder._id} ({selectedOrder.Address.city})
//             </h3>
//             <p><strong>Current Status:</strong> {selectedOrder.status || '-'}</p>
//             {deliveryBoys.length === 0 ? (
//               <p>No delivery boys available for this city.</p>
//             ) : (
//               <ul className="assign-delivery__list">
//                 {deliveryBoys.map((boy) => (
//                   <li key={boy._id} className="assign-delivery__list-item">
//                     <label>
//                       <input
//                         type="radio"
//                         name="deliveryBoy"
//                         value={boy._id}
//                         onChange={() => setSelectedDeliveryBoyId(boy._id)}
//                       />
//                       {boy.username} {boy.experience && `- ${boy.experience} yrs exp`}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <div className="assign-delivery__modal-actions">
//               <button onClick={handleAssign} disabled={!selectedDeliveryBoyId}>
//                 Assign
//               </button>
//               <button onClick={handleCancel}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignDelivery; 



import React, { useState, useEffect, useContext } from 'react';
import './AssignDelivery.css';
import { AdminContext } from '../../Context/AdminContext.jsx';

const AssignDelivery = () => {
  const { allorders, allUsers, url, fetchOrder,user } = useContext(AdminContext);

  // State for modal and assignment
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeliveryBoyId, setSelectedDeliveryBoyId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveryBoys, setDeliveryBoys] = useState([]);

  // Filter states
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Unique filter options
  const uniqueCities = Array.from(new Set(allorders.map((order) => order.Address.city)));
  const statusArray = allorders.map((order) => order.Status).filter(Boolean);
  const uniqueStatuses = Array.from(new Set(statusArray));

  // Filter orders based on selected filters
  const filteredOrders = allorders.filter((order) => {
    let isMatch = true;
    if (user && user.role === "clerk") {
      isMatch = isMatch && order.Address.city === user.city;
    }
    if (cityFilter) {
      isMatch = isMatch && order.Address.city === cityFilter;
    }
    if (statusFilter) {
      isMatch = isMatch && order.Status === statusFilter;
    }
    if (searchQuery) {
      isMatch = isMatch && order._id.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (dateFrom) {
      isMatch = isMatch && new Date(order.createdAt) >= new Date(dateFrom);
    }
    if (dateTo) {
      isMatch = isMatch && new Date(order.createdAt) <= new Date(dateTo);
    }
    return isMatch;
  });

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // When the modal opens, filter available delivery boys by the order's city.
  useEffect(() => {
    if (isModalOpen && selectedOrder && allUsers) {
      const filteredBoys = allUsers.filter(
        (user) =>
          user.role === 'delivery boy' &&
          user.city === selectedOrder.Address.city
      );
      setDeliveryBoys(filteredBoys);
    }
  }, [isModalOpen, selectedOrder, allUsers]);
  
  // Function to update delivery assignment in the backend
  const updateDeliveryAssignment = async (orderId, deliveryBoyId) => {
    const response = await fetch(`${url}/assignDeliveryBoy`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({ orderId, deliveryBoyId }),
    });
    if (!response.ok) {
      throw new Error('Failed to update delivery assignment');
    }
    return response.json();
  };

  const handleAssign = async () => {
    if (selectedDeliveryBoyId && selectedOrder) {
      try {
        await updateDeliveryAssignment(selectedOrder._id, selectedDeliveryBoyId);
        alert('Delivery assignment successful!');
        // Reset modal state
        fetchOrder(); // Refresh the orders list
        setIsModalOpen(false);
        setSelectedOrder(null);
        setSelectedDeliveryBoyId(null);
        setDeliveryBoys([]);
      } catch (error) {
        alert('Failed to assign delivery. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setSelectedDeliveryBoyId(null);
    setDeliveryBoys([]);
  };

  return (
    <div className="orders-wrapper">
      {/* Filters Container */}
      <h1 className="orders-wrapper-header">Assign Delivery</h1>
      <div className="filters-container">
        <div className="filter-item">
          <label htmlFor="cityFilter">City: </label>
          <select
            id="cityFilter"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option value="">All</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="statusFilter">Status: </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="dateFrom">Date From: </label>
          <input
            type="date"
            id="dateFrom"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="dateTo">Date To: </label>
          <input
            type="date"
            id="dateTo"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="orderSearch">Search Order ID: </label>
          <input
            type="text"
            id="orderSearch"
            placeholder="Enter Order ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>City</th>
              <th>Status</th>
              <th>Assigned Delivery Boy</th>
              <th>Ordered On</th>
              <th>Assign Delivery</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.Address.city}</td>
                <td>{order.Status || '-'}</td>
                <td>
                  {order.deliveryBoy ? (
                    typeof order.deliveryBoy === 'object' ? (
                      <>
                        {order.deliveryBoy.employeeId || '-'}
                        {order.deliveryBoy.username ? ` (${order.deliveryBoy.username})` : ''}
                      </>
                    ) : (
                      (() => {
                        const deliveryUser = allUsers.find(
                          (user) => user._id === order.deliveryBoy
                        );
                        return deliveryUser ? (
                          <>
                            {deliveryUser.employeeId || '-'}
                            {deliveryUser.username ? ` (${deliveryUser.username})` : ''}
                          </>
                        ) : (
                          order.deliveryBoy
                        );
                      })()
                    )
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : '-'}
                </td>
                <td>
                  <button
                    className="assign-delivery__btn--open"
                    onClick={() => handleOpenModal(order)}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for assigning a delivery boy */}
      {isModalOpen && selectedOrder && (
        <div className="assign-delivery__modal-overlay">
          <div className="assign-delivery__modal-content">
            <h3>
              Assign Delivery for Order #{selectedOrder._id} ({selectedOrder.Address.city})
            </h3>
            <p>
              <strong>Current Status:</strong> {selectedOrder.status || '-'}
            </p>
            {deliveryBoys.length === 0 ? (
              <p>No delivery boys available for this city.</p>
            ) : (
              <ul className="assign-delivery__list">
                {deliveryBoys.map((boy) => (
                  <li key={boy._id} className="assign-delivery__list-item">
                    <label>
                      <input
                        type="radio"
                        name="deliveryBoy"
                        value={boy._id}
                        onChange={() => setSelectedDeliveryBoyId(boy._id)}
                      />
                      {boy.username} {boy.experience && `- ${boy.experience} yrs exp`}
                    </label>
                  </li>
                ))}
              </ul>
            )}
            <div className="assign-delivery__modal-actions">
              <button onClick={handleAssign} disabled={!selectedDeliveryBoyId}>
                Assign
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignDelivery;